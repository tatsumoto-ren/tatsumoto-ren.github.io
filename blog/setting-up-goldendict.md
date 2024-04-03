---
title: Setting up GoldenDict-NG
date: 1679452222
tags: ['guide', 'dictionaries']
---

GoldenDict-NG is a libre dictionary application for GNU/Linux and other OSes.
Like [Qolibri](setting-up-qolibri.html), it lets you search multiple dictionaries at the same time
so for every word you look up you immediately get a number of definitions.
GoldenDict-NG is a great tool for language learners,
and it becomes especially helpful
when one switches from bilingual dictionaries to monolingual dictionaries.
It can aid during the [monolingual transition](going-monolingual.html)
thanks to the ability to look up many words at once in separate tabs,
simplifying recursive look-ups.

****

## Installation

GoldenDict-NG is available as a free download from GitHub
or from repositories of many GNU distributions.
GoldenDict-NG is a successor of the vanilla GoldenDict.
It can create Anki cards, which is important for people following the AJATT method.

### Pacman-based distributions

If you use a Pacman-based distribution,
you can enable the
[archlinuxcn](https://github.com/archlinuxcn/repo/blob/master/README.md) repository
and then run Pacman to install GoldenDict-NG.

```
sudo pacman -S goldendict-ng-git
```

Alternatively,
install [goldendict-ng-git](https://aur.archlinux.org/packages/goldendict-ng-git)
from the [AUR](https://wiki.archlinux.org/title/Arch_User_Repository).
You're going to have to wait for it to compile.

```
trizen -S goldendict-ng-git
```

### Other distributions

Users of other distributions need to follow
[these instructions](https://github.com/xiaoyifang/goldendict-ng#installation)
or clone the repository and
[build from source](https://github.com/xiaoyifang/goldendict-ng#build-from-source).

## Obtain dictionaries

GoldenDict-NG supports a wide range of dictionary formats,
including [EPWING](yomichan-and-epwing-dictionaries.html#epwing)
and [MDX](yomichan-and-epwing-dictionaries.html#mdx).
They can be downloaded by clicking on the provided links.
EPWING support is a little buggy,
so I use GoldenDict-NG to view MDX dictionaries and Qolibri to view EPWING dictionaries.

After download finishes, open GoldenDict-NG,
go to "Dictionaries" (<kbd>F3</kbd>)
and specify the folders you've downloaded the dictionary files to
under "Sources" > "Files".

## Dictionary groups

Open "Dictionaries" (<kbd>F3</kbd>),
go to "Groups" and create any groups you want.
For example, you can have a group of dictionaries for learning English, Japanese, etc.
Dictionaries can be added to a group by dragging and dropping.

<p align="center"><img class="shadow" src="img/goldendict-groups.webp" alt="goldendict-groups"></p>
<p align="center"><i>Screenshot.</i></p>

Place the dictionaries you like the most on top for easy access.
If you are new to monolingual dictionaries,
I recommend `明鏡`, `大辞林`, `大辞泉`, `新明解`.
During the [monolingual transition](going-monolingual.html),
having as many dictionaries enabled as possible will help you
find a definition that is easier to understand.

## Hunspell dictionaries

Hunspell is a popular spell checker used by many applications, including GoldenDict-NG.
It helps deinflect Japanese words, catch typos and provide suggestions when searching.
To set up Hunspell dictionaries in GoldenDict-NG,
users need to download and install them first.

Users of pacman-based distributions can install
[hunspell-ja-git](https://aur.archlinux.org/packages/hunspell-ja-git).
Others can install the package manually from
[GitHub](https://github.com/Ajatt-Tools/hunspell-ja).

If you are learning other languages, install Hunspell dictionaries for them too.
For example:

* [hunspell-en_us](https://archlinux.org/packages/?q=hunspell-en_us)
* [hunspell-ru](https://archlinux.org/packages/?q=hunspell-ru)

The advantage of installing Hunspell dictionaries with `pacman`
(or the package manager of your distro)
is that all of them will be placed in the same directory: `/usr/share/hunspell`.
GoldenDict-NG doesn't have an option to load Hunspell dictionaries from different folders.
Once installed, open GoldenDict-NG, go to "Edit" > "Preferences" and finish setting them up.

<p align="center"><img class="shadow" src="img/goldendict-hunspell.webp" alt="goldendict-hunspell"></p>
<p align="center"><i>Screenshot.</i></p>

## Pronunciation audio

[Forvo.com pronunciation collection for GoldenDict](https://rutracker.org/forum/viewtopic.php?t=6211002)
is a collection of audio files from `Forvo.com`.
Among other languages,
this torrent includes 292,342 native pronunciations of Japanese words.
You can use these folders in Goldendict
after unpacking them into a directory of your choice.
To add a new folder,
open GoldenDict-NG,
go to "Dictionaries (<kbd>F3</kbd>)" > "Sources" > "Sound Dirs" > "Add",
then paste the path to an extracted folder.

<p align="center"><img class="shadow" alt="Sound Dirs" src="img/goldendict-sound-dirs.webp"></p>
<p align="center"><i>Sound Dirs Settings.</i></p>

<p align="center"><img class="shadow" alt="Forvo Search" src="img/goldendic-forvo-search.webp"></p>
<p align="center"><i>Search Forvo audio.</i></p>

## gd-tools

[gd-tools](https://github.com/Ajatt-Tools/gd-tools)
is a collection of tools for GoldenDict-NG
that aim to help in learning foreign languages.
To install `gd-tools`, follow the [instructions on GitHub](https://github.com/Ajatt-Tools/gd-tools#installation).
Arch Linux users can install the program [from the AUR](https://aur.archlinux.org/packages/gd-tools-git).

External programs can be added by opening Preferences (<kbd>F4</kbd>)
and going to "Sources" > "Programs".

<p align="center"><img class="shadow" alt="Programs" src="img/goldendict-programs.webp"></p>
<p align="center"><i>Screenshot.</i></p>


**Available features:**

* Sentence parsing.
* Image search.
* Stroke order diagrams.
* Example sentences.
* Query Anki collection to see if you already have a card for the word you're lookin up.

## Sentence splitting

`gd-marisa` is a part of `gd-tools` and can be used to split sentences into words.
Each word is clickable.
It allows you to look up a full sentence and then click on individual words.

Add the following command as and **external program**.

```
gd-marisa --word %GDWORD% --sentence %GDSEARCH%
```

<p align="center"><img class="shadow" src="img/goldendict-marisa-trie.webp"></p>
<p align="center"><i>Screenshot.</i></p>

## Anki integration

Read [how to connect with anki](https://github.com/xiaoyifang/goldendict-ng/blob/staged/website/docs/topic_anki.md)
to configure Anki integration.
Additionally, you need [AnkiConnect](https://ankiweb.net/shared/info/2055492159) installed.

<p align="center"><img class="shadow" alt="Anki settings" src="img/goldendict-ankiconnect.webp"></p>
<p align="center"><i>Screenshot.</i></p>

On the "Network" tab fill the following fields:

* Deck: The name of your Anki deck.
* Model: The name of your Note Type
* Word: Headword, vocabulary
* Text: Selected text, definition.
* Sentence: The contents of the translate line.

To create a new Anki card,
select the definition, right-click and select "Send to Anki".

## Mpvacious setup

> More information on Mpvacious is provided on subsequent pages.

[Mpvacious](https://github.com/Ajatt-Tools/mpvacious) can work with GoldenDict-NG.
If you append `autoclip_method=goldendict` to the config file (`subs2srs.conf`),
mpvacious will send every subtitle line directly to GoldenDict-NG
instead of copying text to the system clipboard.

A video demonstration is available
[here](https://github.com/Ajatt-Tools/mpvacious/blob/master/howto/goldendict.md).

## Transformers OCR setup

> More information on Transformers OCR is provided on subsequent pages.

[Transformers OCR](https://github.com/Ajatt-Tools/transformers_ocr)
can pass recognized text directly to GoldenDict-NG
instead of copying text to the system clipboard.
To pair them up, append `clip_command=goldendict %TEXT%` to the config file.

## Tips

### Enable clipboard scanning

Many third-party programs, such as [crqt-ng](resources.html#reading-ebooks)
can copy text to the system clipboard when it is selected.
GoldenDict-NG can watch the clipboard
and automatically perform lookups new text is copied.

To *enable scanning*, you can click on the light bulb icon on the toolbar.
The feature can be configured under "Preferences" <kbd>F4</kbd> > "Scan Popup".

### Disable main window stealing focus when searching

When a search is triggered (for example, by mpvacious),
the main window focuses itself even if it's already visible,
which may be undesirable for some users.
To change this behavior,
go to "Preferences" > "Advanced" >
disable "On a new search, focus the main window even if it's visible."

### Focus the translate line

Pressing <kbd>Ctrl</kbd>+<kbd>L</kbd> puts the mouse cursor inside the translate line.
This keyboard shortcut is the same as in web browsers, such as Firefox, so it's easy to remember.

### Make the translate line larger

Japanese characters look tiny on the translate line.
But you can click on it and press <kbd>Alt</kbd>+<kbd>+</kbd>
to make it bigger.

### Unclutter the top panel

Disabling "Edit" > "Dictionary bar" hides toggleable dictionaries.

<p align="center"><img class="shadow" alt="toolbar" src="img/goldendict-toolbar.webp"></p>
<p align="center"><i>Screenshot.</i></p>

A wider translate line is more convenient when editing pasted sentences.

Alternatively, enable "View" > "Search Pane".
The advantage of this mode is that there's a separate box for search suggestions.

### Set example sentence

If a dictionary has example sentences, it is possible to send an example to the *translate line*
before making an Anki card.
To do so, select the sentence, right-click and choose "Send <sentence> to the input line".

### Disable Full Text Search

[Full Text Search](https://xiaoyifang.github.io/goldendict-ng/ui_fulltextsearch/)
can cause the program to utilize 100% of the CPU **all the time**.
This is likely a bug.
Disable the feature in "Preferences" > "Full-text search".

### Keyboard shortcuts

All the available keyboard shortcuts are listed [here](https://xiaoyifang.github.io/goldendict-ng/ui_shortcuts/).
It's nice to memorize some of them to make navigation easier.

### Jump between definitions

Pressing <kbd>Alt</kbd>+Up arrow or <kbd>Alt</kbd>+Down arrow
switches to the previous or next dictionary definition.

### Remove duplicate display of EPWING headwords

Paste the code below in a file named `article-style.css`
in a folder with a name of your choosing in the `styles` folder of GoldenDict-NG.

* GNU+Linux folder location: `~/.goldendict/styles/`.
* Windows-like (ReactOS) folder location: `C:\Users\<user>\AppData\Roaming\GoldenDict\styles\`.

Restart GoldenDict-NG and enable the style in "Edit" > "Preferences" > "Add-on style".

<details>
<summary>CSS for GoldenDict-NG</summary>

```css
/* Add padding and a horizontal bar between each entry for the sake of readability */
.mdict {
    border-top: 0.15em solid #c4c4c4;
    margin-bottom: 0.5em;
    padding-top: 0.5em;
}

.gddictname {
    position: relative;
    z-index: 9;
    margin-bottom: -0.16em;
}

/* Remove duplicate headers in EPWING dictionaries. */
.epwing_article h3 {
    display: none;
}

.epwing_text:first-line {
    text-indent: -1em;
}

.epwing_text {
    padding-top: 0.5em;
    padding-left: 1em;
    border-top: 0.15em solid #c4c4c4;
    margin-bottom: 0.5em;
}
```

</details>

## Conclusion

GoldenDict-NG is an excellent tool that offers users a comprehensive range of features.
It is easy to install, set up, and users have access to many dictionaries.
The program is capable of generating Anki cards,
which is ideal for people doing AJATT.
Additionally, the option to create tabs makes it possible to do recursive look-ups.
