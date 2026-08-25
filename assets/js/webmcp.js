(function (global) {
  'use strict';

  var DEFAULT_ARTICLES_URL = '/webmcp/articles.json';
  var DEFAULT_BOOK_NOTES_URL = '/webmcp/book-notes.json';

  function normalize(value) {
    return String(value || '')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  function pathFrom(value) {
    if (!value) return '';

    try {
      return new URL(value, 'https://tylerwince.com').pathname.replace(/\/+$/, '') || '/';
    } catch (_error) {
      return String(value).replace(/[?#].*$/, '').replace(/\/+$/, '') || '/';
    }
  }

  function publicEntry(entry) {
    return {
      slug: entry.slug,
      title: entry.title,
      author: entry.author,
      date: entry.date,
      rating: entry.rating,
      genre: entry.genre,
      description: entry.description,
      topics: entry.topics || [],
      url: entry.url,
      content: entry.content
    };
  }

  function candidateEntry(entry) {
    return {
      slug: entry.slug,
      title: entry.title,
      author: entry.author,
      url: entry.url
    };
  }

  function resolveEntry(entries, selector, currentPath) {
    var requested = String(selector || '').trim();
    var requestedPath = pathFrom(requested || currentPath);
    var requestedText = normalize(requested);

    var exact = entries.find(function (entry) {
      return pathFrom(entry.path || entry.url) === requestedPath ||
        normalize(entry.slug) === requestedText ||
        normalize(entry.title) === requestedText;
    });

    if (exact) return { entry: exact, candidates: [] };
    if (!requestedText) return { entry: null, candidates: [] };

    var matches = entries.filter(function (entry) {
      return normalize(entry.title).includes(requestedText) ||
        normalize(entry.slug).includes(requestedText) ||
        normalize(entry.author).includes(requestedText);
    });

    if (matches.length === 1) return { entry: matches[0], candidates: [] };
    return { entry: null, candidates: matches.slice(0, 10).map(candidateEntry) };
  }

  function loadCollection(fetchFn, url) {
    var collectionPromise;

    return function () {
      if (!collectionPromise) {
        collectionPromise = fetchFn(url, { credentials: 'same-origin' })
          .then(function (response) {
            if (!response.ok) throw new Error('Unable to load ' + url + ' (' + response.status + ')');
            return response.json();
          })
          .then(function (entries) {
            if (!Array.isArray(entries)) throw new Error('Expected an array from ' + url);
            return entries;
          })
          .catch(function (error) {
            collectionPromise = null;
            throw error;
          });
      }

      return collectionPromise;
    };
  }

  function excerptFor(content, queryTerms, length) {
    var text = String(content || '').replace(/\s+/g, ' ').trim();
    if (!text) return '';

    var lower = text.toLowerCase();
    var position = -1;
    queryTerms.some(function (term) {
      position = lower.indexOf(term);
      return position >= 0;
    });

    if (position < 0) position = 0;
    var radius = Math.floor(length / 2);
    var start = Math.max(0, position - radius);
    var end = Math.min(text.length, start + length);
    if (end - start < length) start = Math.max(0, end - length);

    return (start > 0 ? '…' : '') + text.slice(start, end).trim() + (end < text.length ? '…' : '');
  }

  function searchBookNotes(entries, query, requestedLimit) {
    var normalizedQuery = normalize(query);
    var terms = normalizedQuery.split(' ').filter(Boolean);
    var limit = Math.max(1, Math.min(Number(requestedLimit) || 5, 10));

    if (!normalizedQuery) {
      return {
        query: String(query || ''),
        count: 0,
        totalBookNotes: entries.length,
        error: 'Provide a non-empty search query.',
        results: []
      };
    }

    var results = entries.map(function (entry) {
      var title = normalize(entry.title);
      var author = normalize(entry.author);
      var content = normalize(entry.content);
      var searchable = [title, author, content].join(' ');
      var matchedTerms = terms.filter(function (term) { return searchable.includes(term); });

      if (!matchedTerms.length) return null;

      var score = (matchedTerms.length / terms.length) * 100;
      if (title === normalizedQuery) score += 120;
      else if (title.includes(normalizedQuery)) score += 70;
      if (author === normalizedQuery) score += 80;
      else if (author.includes(normalizedQuery)) score += 45;
      if (content.includes(normalizedQuery)) score += 35;

      terms.forEach(function (term) {
        if (title.includes(term)) score += 14;
        if (author.includes(term)) score += 9;
        if (content.includes(term)) score += 3;
      });

      return {
        score: score,
        slug: entry.slug,
        title: entry.title,
        author: entry.author,
        date: entry.date,
        rating: entry.rating,
        genre: entry.genre,
        url: entry.url,
        matchedTerms: matchedTerms,
        excerpt: excerptFor(entry.content, terms, 320)
      };
    }).filter(Boolean);

    results.sort(function (a, b) {
      return b.score - a.score || String(a.title).localeCompare(String(b.title));
    });

    var selected = results.slice(0, limit).map(function (result) {
      delete result.score;
      return result;
    });

    return {
      query: String(query),
      count: selected.length,
      totalMatches: results.length,
      totalBookNotes: entries.length,
      results: selected
    };
  }

  function createSiteTools(options) {
    options = options || {};
    var fetchFn = options.fetch || global.fetch;
    var currentPath = options.currentPath || (global.location && global.location.pathname) || '/';
    var loadArticles = loadCollection(fetchFn, options.articlesUrl || DEFAULT_ARTICLES_URL);
    var loadBookNotes = loadCollection(fetchFn, options.bookNotesUrl || DEFAULT_BOOK_NOTES_URL);

    return [
      {
        name: 'read_article',
        description: "Read the complete text and metadata for one of Tyler Wince's published articles. Pass its title, slug, or URL. On an article page, omit the argument to read the current article.",
        inputSchema: {
          type: 'object',
          properties: {
            article: {
              type: 'string',
              description: 'Article title, slug, or URL. Omit to use the current article page.'
            }
          },
          additionalProperties: false
        },
        annotations: { readOnlyHint: true },
        execute: function (input) {
          input = input || {};
          return loadArticles().then(function (articles) {
            var resolved = resolveEntry(articles, input.article, currentPath);
            if (resolved.entry) return { found: true, article: publicEntry(resolved.entry) };
            return {
              found: false,
              error: resolved.candidates.length ? 'The article selector is ambiguous.' : 'No matching article was found.',
              candidates: resolved.candidates
            };
          });
        }
      },
      {
        name: 'read_book_notes',
        description: "Read Tyler Wince's complete notes and metadata for a book. Pass its title, author, slug, or URL. On a book-note page, omit the argument to read the current notes.",
        inputSchema: {
          type: 'object',
          properties: {
            book: {
              type: 'string',
              description: 'Book title, author, slug, or URL. Omit to use the current book-note page.'
            }
          },
          additionalProperties: false
        },
        annotations: { readOnlyHint: true },
        execute: function (input) {
          input = input || {};
          return loadBookNotes().then(function (books) {
            var resolved = resolveEntry(books, input.book, currentPath);
            if (resolved.entry) return { found: true, bookNotes: publicEntry(resolved.entry) };
            return {
              found: false,
              error: resolved.candidates.length ? 'The book selector is ambiguous.' : 'No published notes were found for that book.',
              candidates: resolved.candidates
            };
          });
        }
      },
      {
        name: 'search_book_notes',
        description: "Search across the titles, authors, and full text of Tyler Wince's published book notes. Returns ranked matches with excerpts and URLs; use read_book_notes for a complete result.",
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              minLength: 1,
              description: 'Words or a phrase to find in book-note titles, authors, or note text.'
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 10,
              default: 5,
              description: 'Maximum number of ranked results to return.'
            }
          },
          required: ['query'],
          additionalProperties: false
        },
        annotations: { readOnlyHint: true },
        execute: function (input) {
          input = input || {};
          return loadBookNotes().then(function (books) {
            return searchBookNotes(books, input.query, input.limit);
          });
        }
      }
    ];
  }

  function registerSiteTools(options) {
    options = options || {};
    var documentRef = options.document || global.document;
    var modelContext = options.modelContext || (documentRef && documentRef.modelContext);

    if (!modelContext || typeof modelContext.registerTool !== 'function') {
      return Promise.resolve({ supported: false, registered: [] });
    }

    var tools = createSiteTools(options);
    return tools.reduce(function (promise, tool) {
      return promise.then(function (registered) {
        return Promise.resolve(modelContext.registerTool(tool)).then(function () {
          registered.push(tool.name);
          return registered;
        });
      });
    }, Promise.resolve([])).then(function (registered) {
      return { supported: true, registered: registered };
    });
  }

  var api = {
    createSiteTools: createSiteTools,
    registerSiteTools: registerSiteTools,
    resolveEntry: resolveEntry,
    searchBookNotes: searchBookNotes
  };

  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  } else if (global.document) {
    var register = function () {
      registerSiteTools().catch(function (error) {
        if (global.console && typeof global.console.warn === 'function') {
          global.console.warn('Unable to register WebMCP site tools:', error);
        }
      });
    };

    if (global.document.readyState === 'loading') {
      global.document.addEventListener('DOMContentLoaded', register, { once: true });
    } else {
      register();
    }
  }
})(typeof globalThis !== 'undefined' ? globalThis : this);
