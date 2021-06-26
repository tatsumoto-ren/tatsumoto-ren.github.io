# AJT Kanji Transition deck

**Ajatt-Tools Kanji Transition deck**
is an Anki Deck for newcomers to Japanese based on the JP1K method.
If you want to learn the theory behind this deck, please read
[this article](learning-kanji.html).

The deck is designed to teach how to recognize Kanji
along with the most common 1000 words used in everyday conversations.
Prior knowledge of [kana](learning-kana-in-two-days.html) is required
but there is no need to do any isolated kanji study.

If you have already gone through RTK and know more than 1000 words,
you are unlikely to benefit from the deck.
However, if your vocabulary is below 1000 words,
I recommend that you give the Kanji Transition deck a try over studying kanji in isolation
and premade decks like Core or Tango.

The vocabulary used in the deck was taken from [Ankidrone Starter Pack](basic-vocabulary.html)
and consists of words commonly used in everyday life in Japan.
Cards are presented relatively in the `1T` (`i+1`) order.
Each word along with each sentence has native audio and an English translation.

We have prepared two versions of the deck.
One for people who prefer
[TSC](discussing-various-card-templates.html#targeted-sentence-cards-or-mpvacious-cards)
card format and another for people who like
[WCC](discussing-various-card-templates.html#word-context-cards)
more.

****

## TSCs deck

On the front there's an example sentence.
The target word is highlighted.
When reviewing the cards you can decide whether you want to read the whole sentence or not.

<p align="center"><img alt="tsc" class="shadow" src="img/jp1k-tsc.webp"></p>
<p align="center"><i>An example TSC from AJT Kanji Transition.</i></p>

If you're going to read the full sentence every time you rep a card,
prior knowledge of some grammar might be necessary.
The deck explains certain grammar points and particles,
but it is not enough to replace a proper grammar guide.
Refer to
[Tae Kim guide](http://www.guidetojapanese.org/learn/grammar)
when there's a sentence you don't grasp fully.

If a word is written in kanji,
you can view the furigana reading by hovering over it with your mouse.

<p align="center">
	<a class="download_button" href="https://www.patreon.com/posts/47991075" target="_blank">Download</a>
</p>
<p align="center">
	<a href="https://t.me/ajatt_tools/72" target="_blank">Mirror 1</a>
	<a href="https://ankiweb.net/shared/info/917377946" target="_blank">Mirror 2</a>
</p>

## WCCs deck

This deck has only the target word on the front.
Example sentence is hidden behind the "Reveal context" button.
Content on the back is similar to the TSC deck.

<p align="center"><img alt="tsc" class="shadow" src="img/jp1k-wcc.webp"></p>
<p align="center"><i>An example WCC from AJT Kanji Transition.</i></p>

The deck is available to all patrons.
To get it follow the link below.

<p align="center">
	<a class="download_button" href="https://www.patreon.com/posts/47990957" target="_blank">Download</a>
</p>

## Q&A

* **Q:** The deck contains some words that I don't think will be useful for me.

	**A:** The main source of words in the deck is a book called
	1000 Essential Vocabulary for the JLPT N5.
	It contains a number of pretty obvious katakana words
	and a short list of country names.
	If you don't want to learn them, press `@` to suspend such cards.
* **Q:** Do I really need to learn kanji spellings of words normally written in kana?

	**A:** If you feel intimidated by them, it's okay to suspend the cards.
	I like to always learn kanji spellings because even if a word is mostly written in kana,
	there's a chance that you encounter the kanjified version while reading.
* **Q:** I have poor retention.

	**A:** This is natural if you're a beginner,
	and your brain isn't used to memorizing Japanese yet.
	At first some words just won't stick,
	in which case try getting more immersion.
	The words and phrases in the deck are very common,
	and you'll be hearing them more frequently.
	If you find yourself failing cards over and over,
	install [Mortician](https://ankiweb.net/shared/info/1255924302)
	and it will bury them for you automatically.
	Usually the buried words become easier after you get some rest.
	If not, suspend the cards.
* **Q:** Sometimes I forget the meaning of the target word
but still remember the meaning of the whole sentence,
therefore I can infer the meaning of the target word.
Is it alright to do that?

	**A:** Yes.
	Sentence cards tend to form context-dependent memories,
	but eventually knowledge transfers from being context-dependent to context-independent.
* **Q:** What to do next?

	**A:** If you try the deck out,
	please put any feedback or corrections you have in [the chat](join-our-community.html).

	After you complete the deck,
	you are free to start mining sentences on your own.
	If you still need a sentence pack to help you out, refer to [basic vocab](basic-vocabulary.html).

## Convert any deck to the JP1K format

If you don't like this deck,
the good news is that making your own JP1K-style deck is very easy.
All you need to do is take any premade deck
and change the card template a bit.
Explore our
[resources section](resources.html)
or
[AnkiWeb](https://ankiweb.net/shared/decks/japanese)
for premade Anki decks.

First, open the Card Types settings and find where the target word or sentence is placed.
Let's say for the sake of this example that the field's name is `Word`.

```
<div>{{Word}}</div>
```

Then replace `{{Word}}` with the corresponding field that contains furigana
and add `furigana:` before its name to tell Anki
that the field should be rendered with readings shown above the kanji.
If your premade deck doesn't have a furigana field, you have to add it to the Note Type
and mass-generate readings with the Japanese support add-on.

```
<div>{{furigana:WordFurigana}}</div>
```

Now to make the furigana hidden by default add a class name or id
to the tag around the target word.
This class name will be used shortly to refer to the tag.

```
<div class="question">{{furigana:WordFurigana}}</div>
```

Finally, you need a css rule that tells Anki to keep the furigana hidden by default,
and a second rule that tells to make it visible on hover.

```
.question ruby rt { visibility: hidden; }
.question ruby:hover rt { visibility: visible; }
```

This should be it. Enjoy your own JP1K deck.

Tags: anki, kanji, vocab
