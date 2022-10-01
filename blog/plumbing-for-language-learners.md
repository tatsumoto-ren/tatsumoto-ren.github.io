---
title: Plumbing for language learners
date: 1664571289
tags: ['guide']
---

In this article let's talk about passing text between applications
Usually people simply select and copy-paste text from one window to the other,
but there's a way to make it faster by using the concept of plumbing.

Plumbing is something that can make using a computer so much more convenient and fast.
I think everybody should use it.

****

## What is plumbing

Plumbing is a style of passing messages between applications.
Usually it works as follows.
You can select a piece of text with your mouse and call a plumber program.
Depending on what the text is,
the plumber will perform or suggest you different actions. For example:

* A URL opens a browser window.
* A file opens in a text editor.
* A name of a command invokes a man page.

On GNU+Linux
you can make a simple plumbing script in Bash,
taking advantage of the fact that
the primary selection always contains the last selected text.
Bind the script to a key combination (like <kbd>Mod</kbd>+<kbd>C</kbd>).
When you run it,
it asks you what to do with the text stored in the primary selection.
Then you can select an action to perform on the text.

Among other things,
the concept of plumbing can be used to help learn languages.
When the user selects a word in a foreign language,
it can be sent to a dictionary application
or a site with definitions, example sentences, images or pronunciations.
With a plumber you can do a lot of things faster
and without having to assign dozens of extra keyboard shortcuts.

Another way to understand plumbing is to look at Android's share menu.
Android's Share menu makes it easy to pass information to any compatible app on your phone.
The difference is that on Android you have to use a touch screen.
On a GNU+Linux machine you operate a plumbing script using the keyboard.

## Demonstration

Watch the video below.
I select some text and press <kbd>Mod</kbd>+<kbd>C</kbd> to call the plumber.
Using `Rofi` I can choose to send the selected text to various apps and websites.

<video width="1920" muted loop controls>
	<source src="https://nerdsin.space/_matrix/media/r0/download/nerdsin.space/9c5a600087544c8d81ff3bd6d30f5389c78652fb" type="video/mp4">
</video>
<p align="center"><i>Video demonstration.</i></p>

## Installation

You can get an example plumber script from my [dotfiles](https://github.com/tatsumoto-ren/dotfiles).
The script is called `cabl`.
If you're using my dotfiles, you already have it.

To install `cabl` manually,
save **[this file](https://github.com/tatsumoto-ren/dotfiles/blob/main/.local/bin/i3cmds/cabl)**
to `~/.local/bin`.

```
$ curl -o ~/.local/bin/cabl 'https://github.com/tatsumoto-ren/dotfiles/blob/main/.local/bin/i3cmds/cabl'
```

Make sure the directory is added [to the PATH](faq.html#how-do-i-add-a-directory-to-the-path)
and the file is executable.

## Dependencies

The script depends on:

* [dmenu](https://wiki.archlinux.org/title/Dmenu)
* [xclip](https://archlinux.org/packages/?name=xclip)
* [xorg-xprop](https://archlinux.org/packages/?name=xorg-xprop)
* [ffmpeg](https://wiki.archlinux.org/title/FFmpeg) - optional
* [task-spooler](https://aur.archlinux.org/packages/task-spooler) - optional

Install dependencies:

```
$ sudo pacman -S --needed dmenu xclip xorg-xprop
```

If you use [Rofi](https://wiki.archlinux.org/title/Rofi) as a replacement for `dmenu`,
you can add [this script](https://github.com/tatsumoto-ren/dotfiles/blob/main/.local/bin/dmenu)
to the `PATH` to redirect `dmenu` calls to Rofi.

## Bind to a shortcut

To add a keyboard shortcut,
you can use options of your WM or DE.
You can also use [sxhkd](https://archlinux.org/packages/?name=sxhkd).

Here is a snippet from my
[~/.config/i3/config](https://github.com/tatsumoto-ren/dotfiles/blob/main/.config/i3/config)
showing how to bind `cabl` to a keyboard shortcut.

```
# Run cabl
bindsym $mod+c          exec --no-startup-id cabl

# Run cabl on clipboard contents
bindsym $mod+Shift+v    exec --no-startup-id cabl clip
```

The first bind takes text from the primary selection.
The last one takes text from the system clipboard.

## Usage

While doing anything on your computer,
select some text and press <kbd>Mod</kbd>+<kbd>C</kbd>.
A menu will appear asking you where to *plumb* the selected text.
You can type or select options the same way you use any other `dmenu` prompt.

If you press <kbd>Mod</kbd>+<kbd>Shift</kbd>+<kbd>v</kbd>,
the script will read the content of the clipboard instead of the primary selection.

## Functions

This plumbing script has a number of useful features directed at language learners.

* `add to impd` - add selected URL to immersion pod, for example a YouTube video.
* `ankisearch` - Search text in your Anki collection.
* `aozorasearch` - Search text in Aozora Bunko novels, find example sentences.
* `forvo` - Find pronunciations on Forvo.
* `webliosentences` - Find sentences on Weblio.
* `captionpop` - Find sentences with audio on Captionpop.
* `weblio` - Search Weblio for a word's definition.
* `kotobank` - Search definitions on Kotobank.
* `jisho` - Search text on Jisho.
* `massif` - Search example sentences on Massif.
* `nyaasearch` - Find text on Nyaa. For example, if it's a name of a TV show.
* `pronunciation` - Search text on Forvo and add found audio file to the Anki collection.
* `qolibri` - Launch qolibri and search for text.
* `sakuraparis` - Search definitions on Sakura-Paris.
* `simplytranslate` - Translate text with Simplytranslate.
* `weblio` - Search definitions on Weblio.
* `webliosentences` - Search example sentences on Weblio.
* `wikipedia` - Search text on Wikipedia.
* `wiktionary` - Search text on Wiktionary.
* `youglish` - Search text on Youglish.
* `youreijp` - Search example sentences on 用例.
* `furiganainfo` - Search text on Furiganainfo. Show different readings of a Japanese word.
* `mostcommonspelling` - Find the most common spelling from a list of words separated by spaces, dots or commas.
  Use this when you don't know which is the most common way to write a specific word.
  This function requires my dotfiles to be installed.

## Extra

Luke Smith has made a
[video about plumbing](https://odysee.com/@Luke:7/plumbing-in-linux-la-plan-9-from-bell:e).
The original Bash script from the video is no longer available,
but mine has all the same functionality plus more.
