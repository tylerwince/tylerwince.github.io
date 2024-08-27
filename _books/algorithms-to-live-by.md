---
layout: book
title: "Algorithms To Live By"
author: "Brian Christian and Tom Griffiths"
date: 2000-01-01
stars: 5
---

## Summary

Have you ever wondered if there's a better way to organize your closet, manage your time, or make important life decisions? In "Algorithms to Live By," Brian Christian and Tom Griffiths offer a look at how the algorithms that power our computers can be applied to our everyday lives. This is a deep dive into the world of computer science and its applicability to the complexities of human existence.

The authors take us on a journey through various computational concepts, from optimal stopping theory to caching to game theory, and show how these ideas can be practically applied to real-world scenarios. Whether it's deciding when to stop apartment hunting and sign a lease (the secretary problem), how to organize your desk (caching), or how to balance exploration and exploitation in life choices (the multi-armed bandit problem), Christian and Griffiths provide insights that are both fascinating and immediately applicable.

As someone who appreciates the predictability of computers and the ability to apply algorithms to solve nearly every problem, I appreciated Christian and Griffiths's ability to bridge the gap between those computer science concepts and practical, everyday decisions. The authors don't just explain algorithms; they translate them into human terms, making complex ideas accessible and relevant to readers - no CS degree required! By the end of the book, you'll find yourself looking at your daily challenges through a new lens, armed with computational strategies to tackle everyday decisions.

## Key Takeaways

1. **Optimal Stopping**: The 37% rule, derived from the secretary problem, suggests exploring 37% of options before committing to maximize the chances of making the best choice. This algorithm balances the risk of stopping too early with the cost of searching too long. Example: When house hunting with a deadline, view 37% of available houses before making an offer on the next house that's better than all previous ones.

2. **Explore/Exploit**: This algorithm addresses the tension between gathering new information (exploring) and utilizing known options (exploiting). The optimal strategy shifts from exploration to exploitation as time or opportunities diminish. Example: In a three-year overseas work assignment, spend the first year trying various local restaurants (explore), then spend the remaining time revisiting favorites (exploit).

3. **Sorting**: The book discusses various sorting algorithms, emphasizing that perfect sorting is often unnecessary and inefficient in real life. The authors argue that the time and effort spent on meticulous sorting often outweigh the time saved during retrieval, especially for small to medium-sized collections. Instead, they suggest using "good enough" methods like bucketing items into broad categories. This approach minimizes upfront organizing time while still making items reasonably easy to find. Example: Rather than meticulously organizing books alphabetically by author (which takes considerable time and must be maintained with each new addition), group them by broad subjects. This method is quicker to implement and maintain, and in most cases, doesn't significantly increase the time needed to find a specific book. The key is to match the level of organization to the actual frequency and nature of your searches, avoiding over-optimization that costs more time than it saves.

4. **Caching**: This concept, borrowed from computer memory management, suggests keeping frequently used items easily accessible and rarely used ones stored away. The "least recently used" (LRU) principle can efficiently organize both physical spaces and information. Example: In your closet, keep recently worn clothes at the front and move rarely worn items to the back or storage.

5. **Scheduling**: The authors explore various scheduling algorithms like First-In-First-Out (FIFO) and Shortest Processing Time First (SPT). They discuss how these can be applied to real-life time management, considering factors like task importance, deadlines, and dependencies. Example: When facing multiple tasks, tackle the quickest ones first to reduce cognitive load and build momentum (SPT), unless there are urgent deadlines to meet.

6. **Bayes's Rule**: This fundamental principle of probability theory shows how to update beliefs based on new evidence. It's particularly useful for decision-making in uncertain situations. Example: If a medical test for a rare disease (1% prevalence) has a 1% false positive rate, a positive result doesn't necessarily mean you have a 99% chance of having the disease. Bayes's Rule helps calculate the true probability. In this case, if the test is 99% accurate for true positives, the actual probability of having the disease given a positive test result is only about 50%. This counterintuitive result demonstrates why Bayes's Rule is crucial for interpreting evidence correctly in many real-world scenarios.

7. **Overfitting**: This concept from machine learning warns against drawing too-specific conclusions from limited data. The authors argue that sometimes, thinking less and avoiding over-analysis can lead to better decisions, especially in complex situations. Example: When creating a financial budget, don't try to account for every possible expense scenario. Instead, create broader categories to allow for flexibility.

8. **Relaxation**: This technique involves "relaxing" or removing constraints on a problem to find a good-enough solution, then gradually reintroducing constraints. It's useful for tackling seemingly insurmountable challenges. Example: When planning a complex project, start by ignoring budget constraints to brainstorm ideal solutions, then gradually reintroduce financial limitations to find a feasible plan.

9. **Randomness**: Understanding the role of chance in outcomes can improve decision-making and reduce unproductive worry about uncontrollable factors. The authors discuss how to distinguish between scenarios where skill matters and where randomness dominates. Example: In evaluating the performance of investments or employees, consider whether the time frame is long enough to distinguish skill from luck.

10. **Networking**: The book applies network theory to social and professional connections, discussing concepts like "triadic closure" (friends of friends becoming friends) and the strength of weak ties. Example: When job hunting, reaching out to acquaintances (weak ties) often provides more novel information and opportunities than close friends.

11. **Game Theory**: This branch of mathematics helps in understanding strategic interactions. The authors show how game theory concepts can be applied to everyday scenarios involving competition or cooperation. Example: In salary negotiations, understanding your BATNA (Best Alternative To a Negotiated Agreement) helps in determining your strategy and walkaway point.

## Favorite Quotes

> There is a particular set of problems that all people face, problems that are a direct result of the fact that our lives are carried out in finite space and time. What should we do, and leave undone, in a day or in a decade? What degree of mess should we embrace—and how much order is excessive? What balance between new experiences and favored ones makes for the most fulfilling life? These might seem like problems unique to humans; they're not. For more than half a century, computer scientists have been grappling with, and in many cases solving, the equivalents of these everyday dilemmas. How should a processor allocate its "attention" to perform all that the user asks of it, with the minimum overhead and in the least amount of time? When should it switch between different tasks, and how many tasks should it take on in the first place? What is the best way for it to use its limited memory resources? Should it collect more data, or take an action based on the data it already has? Seizing the day might be a challenge for humans, but computers all around us are seizing milliseconds with ease. And there's much we can learn from how they do it.
>
> <span class="page-number">- Page 3</span>

> Thinking algorithmically about the world, learning about the fundamental structures of the problems we face and about the properties of their solutions, can help us see how good we actually are, and better understand the errors that we make.
>
> <span class="page-number">- Page 5</span>

> What the precise balance should be depends on the exact parameters of the situation, but thinking about sorting as valuable only to support future search tells us something surprising: Err on the side of messiness. Sorting something that you will never search is a complete waste; searching something you never sorted is merely inefficient. The question, of course, becomes how to estimate ahead of time what your future usage will be.
>
> <span class="page-number">- Page 72</span>

> Every decision is a kind of prediction: about how much you'll like something you haven't tried yet, about where a certain trend is heading, about how the road less traveled (or more so) is likely to pan out. And every prediction, crucially, involves thinking about two distinct things: what you know and what you don't. That is, it's an attempt to formulate a theory that will account for the experiences you've had to date and say something about the future ones you’re guessing at. A good theory, of course, will do both. But the fact that every prediction must in effect pull double duty creates a certain unavoidable tension.
>
> <span class="page-number">- Page 151</span>

> One of the implicit principles of computer science, as odd as it may sound, is that computation is bad: the underlying directive of any good algorithm is to minimize the labor of thought. When we interact with other people, we present them with computational problems—not just explicit requests and demands, but implicit challenges such as interpreting our intentions, our beliefs, and our preferences. It stands to reason, therefore, that a computational understanding of such problems casts light on the nature of human interaction. We can be "computationally kind" to others by framing issues in terms that make the underlying computational problem easier. This matters because many problems—especially social ones, as we've seen—are intrinsically and inextricably hard.
>
> <span class="page-number">- Page 256</span>

---
Last updated: 2024-08-27
