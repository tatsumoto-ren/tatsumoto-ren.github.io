# Setting up Yomichan

[Yomichan](https://foosoft.net/projects/yomichan/) is a browser extension
with a pop up dictionary
that allows you to look up unknown words with the hover of a mouse.
On top of that Yomichan can be set up to create Anki cards from the words which you look up.

The process of picking sentences from your immersion
and making Anki cards is called *sentence-mining* or *sentence-picking*.
Each mined sentence has to contain one unknown piece of information,
which is referred to as *target word*.

You don't necessarily have to pick an entire sentence,
but if you're a TSC user it is not necessary to keep mined items short.
When you're out in the wild picking sentences, select the ones that are interesting to you.
Your goal is not to mine every word.

****

## Installation

Yomichan is available for both Chromium-based and Firefox-based web browsers.
To install Yomichan, follow one of the download links below.

* [Firefox add-ons](https://addons.mozilla.org/en-US/firefox/addon/yomichan/)
* [Chrome Web Store](https://chrome.google.com/webstore/detail/yomichan/ogmnaimimemjmbakcfefmnahgdfhfami)

In order to be able to create Anki cards later you need the
[AnkiConnect](https://ankiweb.net/shared/info/2055492159) plugin.
It can be installed by opening Anki and going to
Tools > Add-ons > Get Add-ons... > Code: `2055492159` > OK.

## Download dictionaries

Yomichan needs dictionary files to operate.
Dictionaries are distributed in `.zip` archives.
The archives should not be unzipped before installation.

You can find dictionary files [here](yomichan-and-epwing-dictionaries.html).

## Configuration

The great thing about Yomichan is its customizeability.
To access the settings page, click the
![yomichan-settings](https://foosoft.net/projects/yomichan/img/yomichan-icon.svg)
button in the browser toolbar and choose "Settings".

### Install dictionaries

To install a new dictionary, select "Dictionaries" on the sidebar,
then click "Configure installed and enabled dictionaries…".
The "Import" button in the bottom lets you choose a dictionary file.

For the first month or two after finishing
[kanji](jp1k-anki-deck.html)
and
[basic vocabulary](basic-vocabulary.html)
you're going to need only the English JMdict and optionally the English KANJIDIC.
The first one is a very popular Japanese to English dictionary
which you can find on [jisho.org](https://jisho.org/),
the second one lets you see information about individual kanji.
After you begin transitioning to Japanese-Japanese dictionaries, install them as well.
My favorite ones are `大辞林` and `新明解`.

### Pitch accents

[Pitch accent](https://en.wikipedia.org/wiki/Japanese_pitch_accent)
is taken very seriously among Japanese learners.
If you don't know pitch accent of a word,
you don't know how it's pronounced.

To view pitch accent information in Yomichan popups,
you need to install
[Kanjium dictionary](https://foosoft.net/projects/yomichan/dl/dict/kanjium_pitch_accents.zip).
You can also find it in the archive with all the other dictionaries you downloaded earlier.

To configure how pitch accent information is displayed,
go to "Settings" > "Appearance" > "Pitch accent display styles".
Enable "Downstep notation" and "Downstep position".
I don't recommend enabling "Graph"
because it doesn't show connections between moraes and their corresponding pitches.

### Anki settings

To set up Anki integration,
go to "Settings" > "Anki".
Make sure "Enable Anki integration" is on,
Anki is running and AnkiConnect is installed.

Scroll down and click "Configure Anki card format..."
to select the Note Type for your mining deck.

The settings below are for the
[Japanese sentences](https://github.com/Ajatt-Tools/AnkiNoteTypes/tree/main/templates/Japanese%20sentences)
Note Type.
You can install it by importing [this example deck](setting-up-anki.html#import-an-example-mining-deck).

We have a
[repository](https://github.com/Ajatt-Tools/AnkiNoteTypes)
with user-created Note Types.
It includes a very convenient system of importing and exporting the Note Types,
and everyone is welcome to add their templates by making a pull request.

#### Settings overview

| Field                | Value                                             |
| -----------          | -----------                                       |
| `SentKanji`          | `{cloze-prefix}<b>{cloze-body}</b>{cloze-suffix}` |
| `VocabKanji`         | `{expression}`                                    |
| `VocabFurigana`      | `{furigana-plain}`                                |
| `VocabPitchPattern`  | `{pitch-accents}`                                 |
| `VocabPitchNum`      | `{pitch-accent-positions}`                        |
| `VocabDef`           | `{glossary-brief}`                                |

<details>

<summary>Screenshot</summary>

<p align="center"><img class="shadow" alt="yomichan settings" src="img/yomichan_anki_settings.webp"></p>

</details>

#### Commentary

* The value set for `SentKanji` lets you automatically make the target word bold.
Alternatively, replace it with `{sentence}` if you don't want it to be highlighted.
* `SentFurigana` is left empty.
You may have noticed that Yomichan can add furigana to sentences
with the `{sentence-furigana}` tag.
Unfortunately, it uses an html-based `ruby` format which is hard for the user to edit.
I recommend leaving the `SentFurigana` field blank
and using the Japanese support add-on to generate furigana.
* `SentEng` can be used together with
[subs2srs](https://aur.archlinux.org/packages/subs2srs/)
and premade decks such as
[AnkiDrone Starter Pack](basic-vocabulary.html#anki-deck).
* `MorphManFocus`
is a field for compatibility with
[Morphman](https://ankiweb.net/shared/info/900801631).
* `SentAudio` and `Image` are to be filled by [mpvacious](mining-from-movies-and-tv-shows.html).
* If you set `VocabDef` to `{clipboard-text}`
you can manually select which part of the definition you want
by pressing `Ctrl+C` before you make a card.
* `VocabAudio` is left empty.
I don't recommend assigning `{audio}`
because all default audio sources in Yomichan
often provide samples with incorrect pitch accent.
Furthermore, enabling `{audio}` significantly slows down card creation
because Yomichan has to access pronunciation servers and download audio every time.

### Handlebars

Usually the term *handlebars* is used to refer to the formatting of Anki cards created by Yomichan.
Handlebars can be configured by going to
"Settings" > "Anki" > "Configure Anki card templates...".
Some people may recommend you to modify the handlebars
but no matter what you do your settings
are going to be broken on next Yomichan update anyway, and you can't prevent it.

Instead, it is advised to modify styling of your Note Type directly in Anki.
For example, you can remove dictionary bullet points by copying the code below.
The following snippet was taken from the
[Japanese sentences](https://github.com/Ajatt-Tools/AnkiNoteTypes/tree/main/templates/Japanese%20sentences)
Note Type.

```
ul, ol {
    list-style-type: none;
    display: inline;
    margin: 0px;
    padding: 0px;
}
```

### Popup size

The default pop up box size is rather small
which makes it difficult to work with monolingual dictionaries.
To increase its size, go to "Settings" > "Position & Size" and set the size to a higher value.
I use `480x480`.

### Styling

Yomichan offers rich capabilities for styling thanks to the use of CSS.
The appearance of the popup window can be changed by going to
"Settings" > "Appearance" > "Configure custom CSS...".

Most people keep their settings rather simple,
but there are a few important modifications I'd like to mention.

1) **Hide furigana.**
When you use the popup window, it shows you all kanji readings right away.
This is not desirable because you want to recall the readings yourself before looking them up.
The code below makes furigana appear only when you hover over words.
	```
	ruby rt { visibility: hidden; }
	ruby:hover rt { visibility: visible; }
	```
1) **Increase font size.**
By default Yomichan uses very small font.
If you're using monolingual dictionaries, you're going to find the font uncomfortable.
To increase its size, the following code can be used:
	```
	.gloss-item { font-size: 1.5em; }
	```
	Adjust the size to suit your preference.
1) **Make tags smaller.**
Tags aren't that important, so it makes sense to shrink them a bit to save space.
	```
	.tag { font-size: 12px; }
	```
1) **Miscellaneous.**
CSS can do almost everything.
For example, by modifying `body` you can set font color and background color:
	```
	body { color: #2A1B0A; background-color: #FFFAF0; }
	```
	To find the right class name to apply your styles to,
	right click on the part of the popup window that you're interested in and choose "Inspect".
	You will be presented with the html structure of the popup.
	Classes are defined inside html tags.
	For example, the class name for the tag below is `gloss-content`.
	```
	<span class="gloss-content" lang="ja">...</span>
	```

### Profiles

Set up a second profile to make it easier to switch between mining
[simple word cards](discussing-various-card-templates.html#simple-word-cards)
and
[targeted sentence cards](discussing-various-card-templates.html#targeted-sentence-cards-or-mpvacious-cards).
Go to "Settings" > "Profile" > "Configure profiles...".
Under "Conditions" select:

```
if "Modifier Keys" "Include" "Ctrl"
```

Change which profile is being modified under "Profile" > "Editing profile",
go back to [Anki settings](#anki-settings) and set up a second Note Type to mine simple word cards.
An example Note Type can be found
[here](https://github.com/Ajatt-Tools/AnkiNoteTypes/tree/main/templates/Japanese%20words).
Now when you press `Shift+Ctrl` while reading Yomichan is going to use the new profile.

### Replacement patterns

If Yomichan fails to look up words such as
`近々` or `屡々`,
try adding the following replacement pattern.
Go to "Settings" > "Translation" > "Configure custom text replacement patterns…",
then press "Add".

* Pattern: `(.)々`
* Replacement: `$1$1`

### Recursive lookups

If you're someone who just started using monolingual dictionaries,
you may often require to look up words inside definitions.

<p align="center"><img alt="child popup" src="img/child-popup.webp"></p>
<p align="center"><i>Recursive lookups.</i></p>

To enable this feature, go to "Settings" > "Popup".
Change the following settings:
* Allow scanning popup content - on.
* Maximum number of child popups - any high number.
* Allow scanning popup source terms - on.

<p align="center"><img class="shadow" alt="child popups settings" src="img/child-popups-settings.webp"></p>
<p align="center"><i>Settings.</i></p>

### Keyboard shortcuts

There's one thing about Yomichan that probably annoys everyone.
That's having to scroll down to find the right definition.
Before you lose your mind,
change some keyboard shortcuts.
Go to "Settings" > "Shortcuts" > "Configure standard keyboard shortcuts…".

* Go to previous entry: `K`
* Go to next entry: `J`

These shortcuts let you jump between entries faster.
You don't have to scroll anymore,
especially if you keep many monolingual dictionaries installed.

<p align="center"><img class="shadow" alt="shortcuts" src="img/yomichan-shortcuts.webp"></p>
<p align="center"><i>Shortcuts.</i></p>

### Miscellaneous

* "General" > "Show the welcome guide on browser startup": disable.
* "Scanning" > "Scan delay": `0`.
* "Popup Position & Size" > "Scale": adjust to your preference.
* "Text Parsing" > "Show space between parsed words": disable.
* "Clipboard" > "Enable search page clipboard text monitoring": enable.

## Usage

Yomichan popups appear when you hover over Japanese text while holding down the Shift key.

You can try it with this text:

```
私達はイラク出身です。
```

<p align="center"><img class="shadow" alt="yomichan window" src="img/yomichan_popup.webp"></p>
<p align="center"><i>Yomichan popup.</i></p>

Inside the box you can see definitions grouped by dictionary.
To hide the window press `Esc` or click outside the box.
If you have KANJIDIC installed, clicking on individual kanji in the expression
will bring up additional information about the kanji.

You can access Yomichan Search by pressing `Alt+Insert`
or by clicking
![yomichan-settings](https://foosoft.net/projects/yomichan/img/yomichan-icon.svg)
on the toolbar and choosing "Search".
There you can use Yomichan similarly to
[qolibri](https://aur.archlinux.org/packages/qolibri/).

By clicking on
![play-audio](https://foosoft.net/projects/yomichan/img/play-audio.svg)
you can hear an approximate pronunciation of the selected word.
Unless you're using a custom pronunciation server, don't trust the default audio sources
and don't add the pronunciations to Anki for the reasons explained earlier.

[Yomichan Forvo Server](https://ankiweb.net/shared/info/580654285)
for Anki 2.1 solves the problem with pronunciations
by letting you add a custom audio source
that features pronunciations made by native speakers.
To install and set it up please follow the instructions on the add-on page.
The add-on is also available on [GitHub](https://github.com/jamesnicolas/yomichan-forvo-server).

The ![plus](https://foosoft.net/projects/yomichan/img/btn-add-expression.png) button
allows you to make Anki cards in one click.
Assuming you've configured your Note Type,
now you can create properly formatted targeted sentence cards while reading.

Tags: guide, dictionaries, yomichan
