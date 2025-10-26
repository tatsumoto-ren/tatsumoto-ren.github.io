---
title: Spaced repetition
date: 1655007397
tags: ['guide']
---

To study efficiently
and help you keep track of the learning process
one of the first things you're going to want to do is
obtain a spaced repetition system.
In this article let's cover the theory behind spaced repetition,
why you need it
and what system to use.

****

## What's spaced repetition

> When you have memorized something,
> you need to review that material,
> otherwise you will forget it.

Spaced repetition is a memorization technique
where you review learned information at gradually increasing time intervals.
Any learned material gets forgotten over time,
but when we review something right before we forget it,
we can extend how long we know it for.

<p align="center"><img alt="srs intervals" src="img/srs-intervals.webp"></p>
<p align="center"><i>An example of progressing intervals.</i></p>

In order to get the best results,
the intervals between revisions of the same piece of information gradually increase.
When you first learn something, the memory of it is weak.
If you don't review the information soon, you are likely to forget it.
To keep remembering it, you need to review it very frequently.
If you continue reviewing, over time the memory grows stronger.
The stronger the memory is, the less often you need to review it.
You are keeping the old information in memory
while spending less and less time maintaining it.

SRS is short for "spaced repetition system".
A spaced repetition system is a program
that automates spaced repetition
helping you retain large quantities of information long-term.

When using an SRS you create electronic flashcards.
Flashcards test you on information contained in them,
forcing you to actively recall what you've memorized.
The system shows you a flashcard before you forget it,
so you can maintain and strengthen your memories.

## The forgetting curve

Hermann Ebbinghaus discovered the forgetting curve back in nineteenth century.
The forgetting curve shows how information or knowledge stored within the brain is lost over time
if the individual makes no attempt to retain it.

<p align="center"><img alt="srs intervals" src="img/forgetting-curve.webp"></p>
<p align="center"><i>Forgetting curve.</i></p>

Memory gradually declines with the passage of time.
The curve shows that we eventually forget whatever we don't review.
If we actively practice recalling it,
the rate at which the memory declines slows down.

In order to overcome the forgetting curve
and retain a learned word in your long-term memory,
it needs to be reviewed occasionally.
Ideally, the most optimal time to review something is right before you forget it.
The memory becomes stronger with each review.
By spacing out sessions over time we create room for new information.

This idea is similar to building a muscle.
If you practice lifting weights, and the weights are too heavy,
you won't be able to practice at all.
If they're too easy, you won't gain anything.
When practicing recall,
if you review learned information too late,
you find that you have forgotten it,
and you have to learn it again.
If you review too early,
the information is too easy and doesn't leave any impression on the brain.
The SRS algorithm tries to schedule recall sessions
so that the difficulty is just about right.

## Retention rate

There's no way to completely eliminate forgetting.
Instead, an SRS helps you forget less or *forget strategically*.
SRS is set to promise you a certain retention rate.
Your retention rate refers to the percentage of cards
that you successfully remember when reviewing.
With some SRS you directly input the desired retention rate,
and the system is trying to deliver the results.
With other SRS you can't control the retention rate you want,
but you can influence it by changing other settings,
like the multiplier of intervals between repetitions.

If your retention rate is 90%,
on every review session you forget 10% of the flashcards that come up for review.
Every forgotten piece should be relearned.

Chasing 100% retention turns out to be impossible in practice.
You're good as long as you review your flashcards every day and relearn forgotten material.
Essentially if you want to ensure you never forget something,
you have to review it *every minute*,
which requires unlimited time.

## SRS applications

Currently, there are many SRS applications available.

### Anki

[Anki](https://wiki.archlinux.org/title/Anki) is a Spaced Repetition System, an SRS.
Anki was created by Damien Elmes in 2006.
It's cross-platform, rich with features,
and supports [add-ons](https://ankiweb.net/shared/addons/), written in Python.
The catalog of add-ons is massive.
There are many add-ons that greatly aid language study, including a few of my own.
Because of the add-ons it's in my opinion really the only SRS application worth taking seriously.

What's most important, Anki is
[libre software](https://www.gnu.org/philosophy/free-sw.html)
that respects the users'
[freedom](https://web.archive.org/web/20250717095705if_/https://igwiki.lyci.de/wiki/Freedom)
and community.

Today Anki is considerably worse than it was back in 2006, or even in 2017.
It's noticeably slower, clunkier, harder to use, easier to break, etc.
But I still think it's worth using for all the benefits it gives,
and if you take into account that it practically has no competitors.
With the help of add-ons we are able to fix some common problems of Anki
and make the app more user-friendly.

There are many reasons to hate Anki.
In fact, each new version adds a few more reasons.
Some people refuse to put up with the new "features" of Anki
and the constant flood of changes for the sake of making changes.
They keep using an older version, like `2.1.35`.
This choice means missing out on new add-ons and suffering from old bugs.
Other people choose to upgrade and witness the rush towards decay Anki is at right now.

The gradual downfall only affects the desktop version.
[AnkiDroid](https://github.com/ankidroid/Anki-Android),
the Android application,
is developed by a separate group of people
and is completely fine as of now.

### Mnemosyne

[Mnemosyne](https://wiki.archlinux.org/index.php/Mnemosyne)
is another flashcard program that uses a spaced repetition algorithm.

> Mnemosyne aims to be a user-friendly flash card program,
> with a clean, deceptively simple interface
> that does not require you to wrap your head around complicated concepts
> before you can start using it.

Mnemosyne can import Anki decks.
Anki has a Mnemosyne `.db` file importer.
With the mutual support you should be able to migrate back and forth if you want.

### Supermemo

[Supermemo](https://wikipedia.org/wiki/SuperMemo?lang=en)
is a [proprietary malware](https://www.gnu.org/proprietary/proprietary.html) program.
You can't use Supermemo on GNU/Linux and Android.

The algorithm Anki uses is actually based on an older version of Supermemo.

## Alternative to the SRS

If you had the misfortune of visiting some language learning forums that shall not be named,
you may have encountered an opinion that using an SRS is not necessary to learn a foreign language.
Strictly speaking, it's true of course.
The central part of AJATT is immersion.
The SRS doesn't play a crucial role in the learning process,
it is often called "a supplement".
Many people have become fluent without using spaced repetition.

One alternative to using spaced repetition is
randomly coming across the same word multiple times.
If you're taking an immersion-based approach to language learning,
eventually you will see the word enough times to *acquire it*.
Another alternative is keeping a notepad with a list of words you've looked up.
The list has to be reviewed at times, but unlike the SRS the process is not automated.

A major problem that happens when learning languages is that
a learner is liable to forget a word over and over until the word is seen many times.
The SRS takes care of that constant "leaking bucket" problem
where you only remember things learned recently.
With the SRS you are sure you don't slide down,
you are only moving forward.

Anki is popular among people learning Japanese,
and apparently Chinese,
but it's not that popular among learners of other languages.
The reason Anki is popular is most likely that
Japanese learners have to memorize how to read words written in kanji.
I've been using Anki for many years,
and I notice that most of the time when I fail a card
it is because I don't remember the reading,
not because I don't remember the meaning.
People learning other languages don't have to deal with kanji,
so it is easier for them to get to fluency without using the SRS.

We recommend that people following the AJATT method use spaced repetition.
For the majority of people the benefits are limitless.
SRS applications help to learn vocabulary faster,
overcome forgetting,
close the gap between you and native speakers.
But if using the SRS reduces your motivation or enjoyment,
it may be in your best interest to forgo using any SRS
and instead focus on the core of the method, getting input.

## The chosen SRS

Anki still remains my SRS of choice.
I use it every day for language learning and to study other subjects.
In later chapters we'll discuss how to install and set it up.
