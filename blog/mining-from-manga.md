# Mining from manga

When we read manga,
sometimes there's a need to quickly OCR a portion of the screen
to look up new words and add sentences to Anki.
To do so, you're going to use an optical character recognition program and a few helper tools.

****

## Setting up OCR

Install the following dependencies:

```
$ sudo pacman -S --needed sxiv maim tesseract xclip imagemagick
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
* [imagemagick](https://wiki.archlinux.org/title/ImageMagick)
is a command-line image editor.
It's going to come handy to edit the screenshots before Tesseract analyzes them.

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

Download
[maimocr](https://github.com/tatsumoto-ren/dotfiles/blob/main/.local/bin/maimocr)
and save it as `~/.local/bin/maimocr`.

Make the file executable:

```
$ chmod +x ~/.local/bin/maimocr
```

The directory `~/.local/bin` should be in your
[PATH](faq.html#how-do-i-add-a-directory-to-the-path).

Bind this script to any key in your DE, WM, sxhkd, xbindkeysrc, etc. Here's an example for
[i3wm](https://i3wm.org/):

```
bindsym $mod+o exec --no-startup-id maimocr
```

The script is very trivial, so I hope you can understand it without explanations.
When run, it will ask you to select an area with Japanese text and try to OCR it.
The resulting text will be saved to the system clipboard.
Use it in combination with Yomichan Search
to quickly lookup Japanese words in real-time.

> To open Yomichan Search, open your Web Browser and press `Alt+Insert`.
> [Yomichan](https://foosoft.net/projects/yomichan/) should be already installed.

If you notice that the script fails to OCR certain images,
try to zoom in or find a scan with a better resolution.
Tesseract works poorly at low resolutions.

**Note:** As an alternative, you can install [kanjitomo](https://aur.archlinux.org/packages/kanjitomo/)
but it's quite big and forces you to use a Japanese to English dictionary
instead of a Japanese to Japanese one.

## Adding screenshots

If you want to add a screenshot from a manga to your Anki card, `maim` can do that too.
[maimpick](https://github.com/tatsumoto-ren/dotfiles/blob/main/.local/bin/maimpick)
is a script that uses `maim` to screenshot parts of the screen and copy them to the clipboard.
Install it to the same location as `maimocr`, make it executable and bind it to a key.

In addition to `maim`, `maimpick` requires
[dmenu](https://wiki.archlinux.org/title/dmenu)
and
[xdotool](https://archlinux.org/packages/?name=xdotool)
to work.

**Note:**
[ames](https://github.com/Ajatt-Tools/ames)
is another program that can add screenshots to Anki.

Tags: guide
