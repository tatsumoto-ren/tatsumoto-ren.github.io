# Mining from manga

When we read manga,
sometimes there's a need to quickly OCR a portion of the screen
to look up new words and add sentences to Anki.
To do so, you're going to use an optical character recognition program and a few helper tools.

****

Install the following dependencies:

```
$ sudo pacman -S --needed sxiv maim tesseract xclip
```

* [sxiv](https://wiki.archlinux.org/title/Sxiv)
is an excellent image viewer.
For this setup you can replace it with any image viewer, but `sxiv` is what I use.
* [tesseract](https://github.com/tesseract-ocr/tesseract)
is the OCR engine. It is considered fairly accurate, and many people like it.
* [maim](https://github.com/naelstrof/maim)
is an utility for taking screenshots which can take parts of the screen.
* [xclip](https://github.com/astrand/xclip)
is a tool for copying text to clipboard.

By default Tesseract is not very good at detecting Japanese characters,
but the quality of OCR operations can be improved by using custom trained data.

Download [capture2text](http://capture2text.sourceforge.net/#download).
We won't need the program itself because it's garbage
but the trained data files are going to be useful.
Extract the contents of the `tessdata` folder to `~/.local/share/capture2text_tessdata`:

```
$ unzip -j Capture2Text_v*_64bit.zip 'Capture2Text/tessdata/*' -d ~/.local/share/capture2text_tessdata
```

Alternatively, download just the Capture2Text Japanese files from
[here](https://sourceforge.net/projects/capture2text/files/Dictionaries/Japanese.zip/download).

<p align="center"><img class="shadow" alt="capture2text archive" src="img/capture2text.webp"></p>
<p align="center"><i>Contents of the ZIP archive.</i></p>

You don't need to install any data files from the repositories of your distro,
the ones in the `capture2text` archive are way better.

Create a new file *~/.local/bin/imageocr*:

```
#!/bin/sh

maim --hidecursor -s |
tesseract stdin stdout \
	-l jpn \
	--tessdata-dir ~/.local/share/capture2text_tessdata |
tr -d ' ' |
xclip -selection clipboard
```

Make the file executable:

```
$ chmod +x ~/.local/bin/imageocr
```

Bind this script to any key in your DE, WM, sxhkd, xbindkeysrc, etc. Here's an example for
[i3wm](https://i3wm.org/):

```
bindsym $mod+o exec --no-startup-id imageocr
```

The script is very trivial, so I hope you can understand it without explanations.
When run, it will ask you to select an area with Japanese text and try to OCR it.
The resulting text will be saved to the system clipboard.
Use it in combination with Yomichan Search
to quickly lookup Japanese words in real-time.

To open Yomichan Search, open your Web Browser and press `Alt+Insert`.
[Yomichan](https://foosoft.net/projects/yomichan/) should be already installed.

**Note:** As an alternative, you can install [kanjitomo](https://aur.archlinux.org/packages/kanjitomo/)
but it's quite big and forces you to use a Japanese to English dictionary
instead of a Japanese to Japanese one.

Tags: guide
