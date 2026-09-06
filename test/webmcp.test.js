'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const {
  createSiteTools,
  registerSiteTools,
  resolveEntry,
  searchArticles,
  searchBookNotes
} = require('../assets/js/webmcp.js');

const articlesFixture = [
  {
    slug: 'choosing-what-i-keep',
    title: 'Choosing What I Keep',
    date: '2025-11-13T00:00:00-07:00',
    description: 'How I built Etch to help ideas stick.',
    topics: ['memory', 'software'],
    url: 'https://tylerwince.com/2025/11/13/choosing-what-i-keep/',
    path: '/2025/11/13/choosing-what-i-keep/',
    content: 'In college, I carried around this little stack of flashcards.'
  },
  {
    slug: 'flashcards',
    title: 'Flashcards',
    date: '2025-01-10T00:00:00-07:00',
    description: 'A learning habit.',
    topics: ['learning'],
    url: 'https://tylerwince.com/2025/01/10/flashcards/',
    path: '/2025/01/10/flashcards/',
    content: 'A few minutes of practice each day.'
  }
];

const booksFixture = [
  {
    slug: 'co-intelligence',
    title: 'Co-Intelligence',
    author: 'Ethan Mollick',
    date: '2024-07-15',
    rating: 3,
    url: 'https://tylerwince.com/books/co-intelligence/',
    path: '/books/co-intelligence/',
    content: 'AI is eating the world. Invite AI to the table and use it to find the edges of the problem space.'
  },
  {
    slug: 'the-righteous-mind',
    title: 'The Righteous Mind',
    author: 'Jonathan Haidt',
    date: '2024-10-10',
    rating: 5,
    url: 'https://tylerwince.com/books/the-righteous-mind/',
    path: '/books/the-righteous-mind/',
    content: 'Moral foundations theory explains care, fairness, loyalty, authority, sanctity, and liberty.'
  }
];

function fakeFetch(collections, requests) {
  return async function (url) {
    requests.push(url);
    const value = collections[url];
    if (!value) return { ok: false, status: 404, json: async () => ({}) };
    return { ok: true, status: 200, json: async () => value };
  };
}

function toolsByName(tools) {
  return Object.fromEntries(tools.map((tool) => [tool.name, tool]));
}

test('defines four read-only Site tools with strict schemas', () => {
  const tools = createSiteTools({ fetch: async () => ({ ok: true, json: async () => [] }) });

  assert.deepEqual(tools.map((tool) => tool.name), [
    'read_article',
    'search_articles',
    'read_book_notes',
    'search_book_notes'
  ]);

  for (const tool of tools) {
    assert.equal(tool.annotations.readOnlyHint, true);
    assert.equal(tool.inputSchema.type, 'object');
    assert.equal(tool.inputSchema.additionalProperties, false);
  }
});

test('reads an article by title and from the current article route', async () => {
  const requests = [];
  const fetch = fakeFetch({ '/articles.json': articlesFixture, '/books.json': booksFixture }, requests);
  const tools = toolsByName(createSiteTools({
    fetch,
    articlesUrl: '/articles.json',
    bookNotesUrl: '/books.json',
    currentPath: '/2025/11/13/choosing-what-i-keep/'
  }));

  const byTitle = await tools.read_article.execute({ article: 'Choosing What I Keep' });
  const byCurrentPage = await tools.read_article.execute({});

  assert.equal(byTitle.found, true);
  assert.equal(byTitle.article.slug, 'choosing-what-i-keep');
  assert.match(byTitle.article.content, /stack of flashcards/);
  assert.deepEqual(byCurrentPage, byTitle);
  assert.deepEqual(requests, ['/articles.json'], 'article index should be fetched once and cached');
});

test('reads book notes by URL, title, slug, or unique author', async () => {
  const requests = [];
  const fetch = fakeFetch({ '/articles.json': articlesFixture, '/books.json': booksFixture }, requests);
  const tools = toolsByName(createSiteTools({
    fetch,
    articlesUrl: '/articles.json',
    bookNotesUrl: '/books.json'
  }));

  const byUrl = await tools.read_book_notes.execute({ book: 'https://tylerwince.com/books/co-intelligence/' });
  const byTitle = await tools.read_book_notes.execute({ book: 'The Righteous Mind' });
  const bySlug = await tools.read_book_notes.execute({ book: 'co-intelligence' });
  const byAuthor = await tools.read_book_notes.execute({ book: 'Ethan Mollick' });

  assert.equal(byUrl.bookNotes.title, 'Co-Intelligence');
  assert.equal(byTitle.bookNotes.author, 'Jonathan Haidt');
  assert.equal(bySlug.bookNotes.slug, 'co-intelligence');
  assert.equal(byAuthor.bookNotes.author, 'Ethan Mollick');
  assert.deepEqual(requests, ['/books.json'], 'book-note index should be fetched once and cached');
});

test('searches article metadata and full text, ranking titles before body matches', () => {
  const ranked = searchArticles(articlesFixture, 'flashcards', 1);
  assert.equal(ranked.totalMatches, 2);
  assert.equal(ranked.count, 1);
  assert.equal(ranked.results[0].slug, 'flashcards');

  for (const query of ['Etch', 'mémory', 'college', 'college memory']) {
    const result = searchArticles(articlesFixture, query, 5);
    assert.equal(result.count, 1, query);
    assert.equal(result.results[0].slug, 'choosing-what-i-keep', query);
    assert.match(result.results[0].excerpt, /stack of flashcards/);
    assert.ok(result.results[0].excerpt.length <= 322);
  }

  assert.equal(searchArticles(articlesFixture, 'college nonexistent', 5).count, 0);
  assert.match(searchArticles(articlesFixture, ' --- ', 5).error, /non-empty/);
  const many = Array.from({ length: 12 }, (_, index) => ({ ...articlesFixture[0], slug: 'article-' + index }));
  assert.equal(searchArticles(many, 'college', 100).count, 10);
});

test('article search and reading share one cached index', async () => {
  const requests = [];
  const tools = toolsByName(createSiteTools({
    fetch: fakeFetch({ '/articles.json': articlesFixture }, requests),
    articlesUrl: '/articles.json'
  }));
  const result = await tools.search_articles.execute({ query: 'college', limit: 3 });
  const article = await tools.read_article.execute({ article: result.results[0].url });
  assert.equal(article.article.slug, 'choosing-what-i-keep');
  assert.deepEqual(requests, ['/articles.json']);
});

test('reports missing and ambiguous selectors without inventing content', () => {
  const duplicateAuthor = booksFixture.concat({
    ...booksFixture[0],
    slug: 'another-book',
    title: 'Another Book',
    path: '/books/another-book/',
    url: 'https://tylerwince.com/books/another-book/'
  });

  const ambiguous = resolveEntry(duplicateAuthor, 'Ethan Mollick', '/');
  const missing = resolveEntry(booksFixture, 'A book that is not here', '/');

  assert.equal(ambiguous.entry, null);
  assert.equal(ambiguous.candidates.length, 2);
  assert.equal(missing.entry, null);
  assert.deepEqual(missing.candidates, []);
});

test('searches full book-note text, ranks strong matches, and returns bounded excerpts', () => {
  const moral = searchBookNotes(booksFixture, 'moral foundations', 5);
  const ai = searchBookNotes(booksFixture, 'AI problem space', 1);
  const empty = searchBookNotes(booksFixture, '   ', 5);

  assert.equal(moral.results[0].slug, 'the-righteous-mind');
  assert.match(moral.results[0].excerpt, /Moral foundations theory/i);
  assert.equal(ai.count, 1);
  assert.equal(ai.results[0].slug, 'co-intelligence');
  assert.ok(ai.results[0].excerpt.length <= 322);
  assert.equal(empty.count, 0);
  assert.match(empty.error, /non-empty/);
});

test('registers every tool through document.modelContext', async () => {
  const registered = [];
  const result = await registerSiteTools({
    modelContext: {
      registerTool: async (tool) => registered.push(tool)
    },
    fetch: async () => ({ ok: true, json: async () => [] })
  });

  assert.equal(result.supported, true);
  assert.deepEqual(result.registered, ['read_article', 'search_articles', 'read_book_notes', 'search_book_notes']);
  assert.deepEqual(registered.map((tool) => tool.name), result.registered);
});

test('built Jekyll indexes contain complete article and book-note content', { skip: !process.env.WEBMCP_BUILD_DIR }, () => {
  const buildDir = process.env.WEBMCP_BUILD_DIR;
  const articles = JSON.parse(fs.readFileSync(path.join(buildDir, 'webmcp/articles.json'), 'utf8'));
  const books = JSON.parse(fs.readFileSync(path.join(buildDir, 'webmcp/book-notes.json'), 'utf8'));

  assert.ok(articles.length > 0);
  assert.ok(books.length > 0);
  assert.ok(articles.every((article) => article.slug && article.title && article.url && article.content.trim()));
  assert.ok(books.every((book) => book.slug && book.title && book.author && book.url && book.content.trim()));

  const article = articles.find((entry) => entry.slug === 'choosing-what-i-keep');
  const coIntelligence = books.find((entry) => entry.slug === 'co-intelligence');
  assert.match(article.content, /stack of flashcards/i);
  assert.match(coIntelligence.content, /AI is eating the world/i);

  const articleTools = toolsByName(createSiteTools({
    fetch: fakeFetch({ '/articles.json': articles, '/books.json': books }, []),
    articlesUrl: '/articles.json',
    bookNotesUrl: '/books.json',
    currentPath: article.path
  }));

  return Promise.all([
    articleTools.read_article.execute({}).then((result) => {
      assert.equal(result.article.slug, 'choosing-what-i-keep');
    }),
    articleTools.search_articles.execute({ query: 'stack of flashcards', limit: 3 }).then((result) => {
      assert.equal(result.results[0].slug, 'choosing-what-i-keep');
    }),
    articleTools.read_book_notes.execute({ book: 'Co-Intelligence' }).then((result) => {
      assert.match(result.bookNotes.content, /Invite AI to the table/i);
    }),
    articleTools.search_book_notes.execute({ query: 'moral foundations', limit: 3 }).then((result) => {
      assert.equal(result.results[0].slug, 'the-righteous-mind');
    })
  ]);
});
