---
title: How Anki works
date: 1655135740
tags: ['anki', 'guide']
---

Since in this guide we are going to use Anki to study our target language,
let's talk about how it works.

****

<img src="img/how-anki-works.webp" float="right">

Studying in Anki consists of the following points.

* Creating *notes*.
* Learning new flashcards.
* Reviewing previously learned flashcards.

Notes and cards in Anki are not the same.
You create *notes*, but study *cards*.

A **note** is a piece of related fields of information.
A Japanese vocabulary note would have fields for
the word itself, its reading, the definition, and so on.

A question and answer pair is called a **card**.
When you create a note,
one or more cards are generated automatically using *Card Templates*.
Card templates define how cards look,
what fields are shown on each card and how they are arranged.

Each flashcard will have a front side and a back side.
On the front side there's a question that needs to be answered.
The answer is placed on the back side.
Language learners most often place
a word, a phrase or a sentence in a foreign language on the front and its *meaning* on the back.

New cards in Anki are the cards that you haven't learned yet.
A new card can stay new any amount of time waiting for you to learn it.
Anki lets you choose how many new cards you want to learn each day.
Once you have learned a card,
it "graduates" and becomes a "review card".
After a certain amount of time the card has to be reviewed.

The act of learning new cards and reviewing existing cards
is done in the form of quizzing oneself.

1) Anki shows the front side of the card to you.
1) You try to recall the answer and reveal the back side.
1) You compare your memory and the information on the back side of the card.
3) Anki asks for your feedback.
   You have to answer whether you knew the answer to the question.
   This feedback is used to calculate the next time you should see the card.

The way Anki schedules flashcards is easy to understand.
First a card is created.
Then you learn it, and it receives a starting interval, `1` day by default.
After the interval expires, the card needs to be reviewed.
If you tell Anki that you remember the card, that means you've "passed" the review.
Each time you successfully review a flashcard after its interval ends, the interval increases.
When using the default Anki algorithm, the interval grows like this:

```
New interval = Old interval * Ease factor * Interval modifier
```

The Ease is `2.5` by default, and Interval modifier is `1` by default.
We have two different parameters because
the Interval modifier is set for a deck (or multiple decks)
and the Ease factor is attached to each individual card,
so two cards can have different Ease factors.
If you have a card, and you constantly answer "Good" when it comes up for review,
its interval will grow something like this: 1 day, 3 days, 8 days, 20 days, etc.
The Interval modifier, initial Ease factor, Starting interval,
and other variables can be changed in Settings.

If you forget a flashcard,
it enters a "relearn" queue and has to be relearned.
After a previously forgotten flashcard is relearned,
its interval gets reduced or reset depending on the settings.

Each day Anki forms a queue of cards for you to review.
Every card whose interval has ended on that day or before that day will be in the queue.
It is important to keep up with reviews, or you will forget what you've learned.

As you can see, Anki doesn't approach scheduling intelligently.
It doesn't "predict" anything, and it doesn't "guess" when you're going to forget things.
It only multiplies interval of a flashcard indefinitely.
The algorithm is simple but it works well.

With Anki you can synchronize your flashcards across multiple devices
using the built-in synchronization service.
It enables you to study at home from a PC and outside from a phone, for example.

To have a better understanding of Anki
I advise you to read
[Getting Started](https://docs.ankiweb.net/getting-started.html)
part of the Anki manual.
