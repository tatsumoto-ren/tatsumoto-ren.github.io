---
title: What are your current thoughts on Morphman? Do you recommend it?
date: 1669308531
tags: ['faq']
position: -9892
---

I used [Morphman](https://ankiweb.net/shared/info/900801631)
for brief periods of time in 2018-2019.
Its card sorting feature always seemed too intrusive to me.
I don't use Morphman anymore,
and I don't recommend it for intermediate learners,
but beginners may benefit from it.

This is how I would use Morphman:

0) Have a large enough sentence bank.
   2,000+ sentences should be enough, but the more, the better.
   You can use [subs2srs](our-immersion-learning-toolset.html#subs2srs)
   to generate sentence banks.
1) Install Morphman, set it up.
2) Recalculate the database, then **disable** the add-on.
3) Morphman will have tagged all cards
   that it thinks are [1T](one-target-sentences.html) for you.
   Manually pick what cards you're going to learn from the ones marked as `1T`.

If you don't understand how to use Morphman,
search for a guide online.
For example,
[this article](https://web.archive.org/web/20201220134610if_/https://massimmersionapproach.com/table-of-contents/anki/morphman/)
from the old Mia's site.
Or [this video](https://redirect.invidious.io/watch?v=wwp1lJZPBXg)
guide by `OhTalkWho`.

To keep your main profile clean,
it's advised to store your sentence bank in a separate profile
that you don't sync with AnkiWeb.
With [Cross Profile Search and Import](https://ankiweb.net/shared/info/1772763629)
you can import selected cards into your main profile.

In my current mining workflow
I use [mpv with mpvacious](mining-from-movies-and-tv-shows.html).
`mpv` is a video player.
Mpvacious is a plugin for mpv.
With Mpvacious you can make an Anki card
that has audio and a picture with one button press
while watching something in mpv.
Mpvacious offers a number of pros
that really make it way more efficient than Morphman+subs2srs.

* With subs2srs every subtitle line is its own card.
  But often you want two or three subtitle lines on one card
  because together they form a single sentence
  or are inseparable in some other way.
  To work around this problem people use [Merge Notes](https://ankiweb.net/shared/info/1425504015).
  Mpvacious lets you join together multiple subtitle lines when making a card.
* You have no direct control over how subs2srs cuts audio.
  You have to time your subtitles perfectly before you run it,
  or you will end up with incorrectly cut clips with missing or undesirable parts.
  Mpvacious allows the user to set exactly where the audio starts and ends.
* Morphman is bad at guessing what words you know.
  It looks at your Anki collection to determine that,
  and you can also supply it with a custom word list.
  Still,
  it constantly feeds you useless cards
  that don't teach you anything or that you don't understand at all.
  For example, a proper noun
  or a different spelling of a word you already know.
  You have to manually tag those cards to stop them from appearing.
* Morphman is not a very polished program.
  It is buggy and bloated, and it constantly does something you don't want.
  It can be intrusive because by default it wants to reorder your entire collection.
