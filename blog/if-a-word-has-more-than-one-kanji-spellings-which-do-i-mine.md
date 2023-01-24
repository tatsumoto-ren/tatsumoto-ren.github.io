---
title: If a word has more than one kanji spellings, which do I mine?
date: 1674594011
tags: ['faq']
position: -9952
---

The most straightforward and easiest approach
is to mine the exact spelling that you saw in your immersion.
And it should work in most cases.
An exception would be when you see a word written in kana but want to add it to the SRS
[in kanji](should-i-learn-kanji-forms-of-words-usually-written-in-kana.html).

A less efficient but more mistake-proof approach would be to mine all spellings
that appear in a dictionary.
But since making several targeted sentence cards for one word is more work,
I would make a
[TSC](discussing-various-card-templates.html#targeted-sentence-cards)
for one spelling and
[SWCs](discussing-various-card-templates.html#simple-word-cards)
for all other spellings.

A more optimized approach is to put each spelling in a search engine.
Mine the one that brings more results.
Usually search engines tell you how many results have been found for each search term.
When searching, restrict the language to Japanese,
or there will be Chinese sites in the results,
and the number of occurrences of a word will be incorrect.

[rankspellings](https://github.com/tatsumoto-ren/dotfiles/blob/main/.local/bin/rankspellings)
is a script from my dotfiles that searches words on Google or Yahoo
and prints the number of search results for each.
You can use it to find the most common spelling of a word.

For example:

```
> rankspellings -g 川蝉 翡翠 魚狗
翡翠	19300000
川蝉	487000
魚狗	6130
```

`翡翠` appears to be the most *useful* spelling among others.
