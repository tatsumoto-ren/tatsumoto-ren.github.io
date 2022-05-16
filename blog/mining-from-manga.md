# Mining from manga

When we read manga,
sometimes there's a need to quickly OCR a portion of the screen
to look up new words and add sentences to Anki.
To do so, you're going to use an optical character recognition program and a few helper tools.

****

## Setting up OCR

Install the following dependencies:

```
$ sudo pacman -S --needed sxiv maim tesseract xclip imagemagick unzip
```

* [sxiv](https://wiki.archlinux.org/title/Sxiv)
is an excellent image viewer.
For this setup you can replace it with any image viewer, but `sxiv` is what I use.
* [tesseract](https://github.com/tesseract-ocr/tesseract)
is the OCR engine. It is considered fairly accurate, and many people like it.
* [maim](https://github.com/naelstrof/maim)
is a utility for taking screenshots which can take parts of the screen.
* [xclip](https://github.com/astrand/xclip)
is a tool for copying text to clipboard.
* [imagemagick](https://wiki.archlinux.org/title/ImageMagick)
is a command-line image editor.
It's going to come handy to edit the screenshots before Tesseract analyzes them.
* [unzip](https://archlinux.org/packages/extra/x86_64/unzip/)
is a tool for extracting zip archives.

Download
[maimocr](https://github.com/tatsumoto-ren/dotfiles/blob/main/.local/bin/maimocr)
and save it as `~/.local/bin/maimocr`.
`maimocr` is a script we are going to use to recognize Japanese text.

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

Now you can quickly call `maimocr` anywhere by pressing the keyboard shortcut.

## Usage

Tesseract doesn't work without
[trained data files](https://tesseract-ocr.github.io/tessdoc/Data-Files.html).
These files tell Tesseract how to read and recognize text from images.
When you first run `maimocr`, it should download Japanese data files **automatically**.
Check the terminal output to see if the process succeeds.

When you run it the second time,
`maimocr` will ask you to select an area with Japanese text and try to OCR it.
The resulting text will be saved to the system clipboard.
Use it in combination with Yomichan Search
to quickly lookup Japanese words in real-time.

> To open Yomichan Search, open your Web Browser and press `Alt+Insert`.
> [Yomichan](https://foosoft.net/projects/yomichan/) should be already installed.

<video width="1920" autoplay loop controls>
	<source src="https://g33k.se/_matrix/media/r0/download/g33k.se/ybEPaUFRInYLqQsaMKVWdfqp" type="video/mp4">
</video>
<p align="center"><i>Video demonstration.</i></p>

## Expanding data set

By default, `maimocr` automatically downloads
[tessdata.zip](https://g33k.se/_matrix/media/r0/download/g33k.se/chvDlHzjiXgDEdeGTFnyOExv)
([mirror](https://t.me/ajatt_tools/173))
with Tesseract data files,
then saves the files to `~/.local/share/tessdata`.

To use additional data files with `maimocr`,
copy any new `*.traineddata` files to `~/.local/share/tessdata`.

<details>

<summary>Capture2Text files</summary>

> These instructions are no longer necessary.
> The files are included by default.

Download [capture2text](http://capture2text.sourceforge.net/#download).
We won't need the program itself because it's garbage
but the trained data files are going to be useful.
Extract the contents of the `tessdata` folder to `~/.local/share/tessdata`:

```
$ unzip -j Capture2Text_v*_64bit.zip 'Capture2Text/tessdata/*' -d ~/.local/share/tessdata
```

Alternatively, download just the Capture2Text Japanese files from
[here](https://sourceforge.net/projects/capture2text/files/Dictionaries/Japanese.zip/download).

<p align="center"><img class="shadow" alt="Capture2Text archive" src="img/capture2text.webp"></p>
<p align="center"><i>Contents of the ZIP archive.</i></p>

</details>

## Troubleshooting

If you notice that the script fails to OCR certain images,
try to zoom in or find a scan with a better resolution.
Tesseract works poorly at low resolutions.

Nonstandard fonts often fail to OCR properly.
In this case I don't have a definitive answer at the moment.
Try searching for more `*.traineddata` files online
and adding them to the `tessdata` folder.

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

## Other software

* [kanjitomo](https://aur.archlinux.org/packages/kanjitomo/).
It's quite bloated and forces you to use a Japanese to English dictionary
instead of a Japanese to Japanese one.
* [manga-ocr](https://github.com/kha-white/manga-ocr).
Can be used to OCR Japanese text instead of Tesseract.
Unfortunately, I haven't been able to install it and can't comment on it.

Tags: guide
