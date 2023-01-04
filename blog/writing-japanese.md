---
title: Writing Japanese
date: 1615918788
tags: ['guide']
---

After you've got a few thousand hours of input
and can read content made for natives relatively effortlessly
it makes sense to start practicing writing Japanese by hand.
Bear in mind that being able to do so is not necessary unless you plan to live in Japan.
Nowadays writing is done on a keyboard
and doesn't require recalling characters from memory.
However, writing practice has the potential to improve your overall reading ability.

<p align="center"><img alt="write japanese" src="img/write_japanese.webp"></p>

****

## Preparations

To write Japanese you need something to write on and something to write with.

* Paper, a few A4 sheets.
* A pencil or a pen.
* [原稿用紙 pdf](https://duckduckgo.com/?q=%E5%8E%9F%E7%A8%BF%E7%94%A8%E7%B4%99+a4+pdf&kp=-2&kl=jp-jp&ia=web),
[like this](http://www.sousakuba.com/genkouyousi/).
There are quite a lot of options to choose from,
so I'm going to link a search page where you can find any pdf you want.

Print the pdf you've downloaded on the paper you've got, and you should be set.

<p align="center"><img width="50%" class="shadow" alt="kanji" src="img/kanji_notebook.webp"></p>

The point of printing 原稿用紙 is to have boxes
that you should attempt to fit each character in.
You can also draw a grid yourself or grab a math exercise book.

<p align="center">
<img width="50%" alt="exercise book" src="img/exercise_book.webp">
</p>

Don't buy premade 漢字練習帳 or 原稿用紙 from somewhere, unless it costs $1 or less.

## Writing kana

Let's start with kana.
Download the writing deck below.
You should be able to complete it within two days.

<p align="center">
<img class="shadow" alt="kana writing card" src="img/kana_writing_card.webp">
</p>

Each card contains a kana character written in romaji
along with its pronunciation on the front
and a stroke diagram on the back.
Your goal is to write the character on paper.
If you are able to do it with the correct stroke order then press "Good".
Otherwise press "Again".

<p align="center">
<a class="download_button" href="https://ankiweb.net/shared/info/1233553736">Download</a>
</p>
<p align="center">
<a href="https://t.me/ajatt_tools/82">Mirror</a>
</p>

## Writing kanji

After you finish the kana, it's time to start learning how to write kanji.
This step is more complex and is going to take much longer.

### How Japanese do it

While watching real Japanese people in anime I noticed how they're tested on kanji in school.

<p align="center"><img alt="anime kanji test" src="img/kanji_test.webp"></p>
<p align="center"><i>Episode 3 of <a href="https://myanimelist.net/anime/37450">青春ブタ野郎はバニーガール先輩の夢を見ない</a>.</i></p>

You're given a sentence in Japanese,
and there's a target word in each sentence written in kana.
Your job is to write it in kanji.
Given the example sentence, it is hard to confuse similarly sounding words.
Notice 保証 vs 保障 on the screenshot above.

This method has been implemented in the Ajatt-Tools TSC note type.
When you download the deck linked below,
you notice that each note has a field called `MakeProductionCard`.
If you put any text in the field, a production targeted sentence card will be created.

<p align="center"><img class="shadow" alt="production card" src="img/production_TSC.webp"></p>
<p align="center"><i>A production targeted sentence card.</i></p>

In my opinion this is the most natural way to learn writing.
The method doesn't rely on English keywords whatsoever.
Making mnemonics might be helpful but is totally optional.
Feel free to use this note type for your own sentence cards.

<p align="center">
<a class="download_button" href="setting-up-anki.html#import-an-example-mining-deck">Download</a>
</p>

As with kana cards, if you could produce a word
with the right stroke order, grade the card "good".
If you couldn't write it, then mark the card "again".

Because the method is aimed at people who are already fluent,
it requires making your own cards.
By the time you start learning to write,
you should have plenty of sentence cards in your Anki collection to generate production cards from.
However, if you want a premade sentence pack that can be used for writing,
you can download [Ankidrone Starter Pack](basic-vocabulary.html).

### How to make your own cards

I recommend making production cards out of your old targeted sentence cards.
To do so choose a kanji you want to learn and find a note in your sentence bank
where the target word contains this kanji.
I recommend against using recently learned or new vocabulary for production cards,
doing so can negatively affect retention.

### Place production cards in another deck

Instead of moving cards manually to a writing deck,
you can put an override option on a specific card type,
so all your production cards go in a specific deck when they are generated.

If you want your production cards to be in another deck,
open Anki's main window and select
"Tools" > "Manage Note Types" > Select your Note Type >
"Cards" > Select your production Card Type > "Options" > "Deck override".
I put `筆記` here which is the name of my writing deck.

<p align="center"><img alt="deck override" src="img/anki-deck-override.webp"></p>
<p align="center"><i>Deck override.</i></p>

### In what order should I learn words

When applying this method, it is wise to start with simpler kanji first.
The exact order may wary.
I would like to note the following options:
* **Working your way up school grades or JLPT levels.**
Start with the easiest level and make production cards for each kanji.
The [Kanji Grid](useful-anki-add-ons-for-japanese.html#kanji-grid) add-on
is going to help you determine what character to learn next.
You can move production cards to a separate deck to make filtering easier.
* **Following the RTK order.**
Make cards for each kanji in the Heisig's book.
Check out [this site](https://hochanh.github.io/rtk/rtk1-v6/index.html)
for an online RTK index.
* **Using a custom list.**
In such lists characters are sorted to ensure that no kanji appears before its parts.
[TopoKanji](https://github.com/scriptin/topokanji) is a good example.

### Learning the stroke order

There's no need to specifically memorize stroke order rules.
After learning to write a few hundred words in Anki
you will naturally acquire the ability to guess the stroke order of most new kanji you encounter,
and stroke order diagrams on your cards won't let you make a mistake and not notice it.

The important part is to have a stroke order font included on your cards
and precisely follow the order each time a card comes up.

### What about Production RTK

Sometimes you see people recommending doing *RTK after you're fluent*.
This means taking the first volume of the book *Remembering The Kanji* by James Heisig
and making each kanji into an Anki card.
After the first volume people usually skip the second one and continue with the third.
The second volume is skipped because it teaches readings of kanji, not their meanings.

There are two ways of doing it that I know of:

1) Using the English keywords provided by Heisig.
2) Replacing English keywords with Japanese words partially written in kana.

The first method creates associations between a kanji and an arbitrary English keyword.
Because English keywords do not connect to real Japanese it **doesn't work**.
When you read Japanese there are no English keywords to reinforce your memory,
and when you write Japanese there's no guarantee
that being able to produce a kanji by its keyword
is going to enable you to produce the word that uses the kanji
given that the word itself isn't directly associated with the English keyword.

The second method **doesn't work** because
due to the way kanji are taught in the book you don't work at the level of words,
instead you have to write each kanji separately.
This leads to "cloze" cards where each card has a word on the front
but only one character in the word is hidden.
Learning how to produce parts of words
doesn't guarantee the ability to write whole words when necessary.
Moreover, this method requires to replace all Heisig's keywords with your own,
essentially presenting a task comparable to writing your own RTK.
