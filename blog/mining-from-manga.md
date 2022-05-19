# Mining from manga

When we read manga,
sometimes there's a need to quickly
[OCR](https://wikiless.org/wiki/Optical_character_recognition?lang=en)
a portion of the screen
to look up new words and add sentences to Anki.
To do so, you're going to use an optical character recognition program and a few helper tools.

****

## Preface

Our goal is to be able to use [Yomichan](setting-up-yomichan.html) with manga.
We need a toolchain that does the following:

1) Takes a screenshot,
selecting the part of the screen
that contains a speech bubble with Japanese text.
2) Processes the taken screenshot.
3) Recognizes the text and copies it to the system clipboard.
4) Using Yomichan's Clipboard Monitor we can perform lookups.

To recognize text on the pages of a manga,
you can use Tesseract or Transformers.
Tesseract is a more lightweight tool but makes more mistakes on average.
With Transformers you have to install a big number of
[Python](https://docs.python.org/3/faq/general.html#what-is-python)
packages that take up several gibibytes of disk space,
but you get much better text recognition.

In this article I explain how to set up both.
The resulting user workflow is identical, see the demo below.

<video width="1920" autoplay loop controls>
	<source src="https://g33k.se/_matrix/media/r0/download/g33k.se/ybEPaUFRInYLqQsaMKVWdfqp" type="video/mp4">
</video>
<p align="center"><i>Video demonstration.</i></p>

## Image viewer

To read manga,
it is nice to have an image viewer.
I use [sxiv](https://wiki.archlinux.org/title/Sxiv),
but for this setup you can install any image viewer.

## Setting up Tesseract

Install the following dependencies:

```
$ sudo pacman -S --needed tesseract maim xclip imagemagick unzip
```

* [tesseract](https://github.com/tesseract-ocr/tesseract)
is the OCR engine. It is considered fairly accurate, and many people like it.
* [maim](https://github.com/naelstrof/maim)
is a utility for taking screenshots which can take parts of the screen.
* [xclip](https://github.com/astrand/xclip)
is a tool for copying text to the clipboard.
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

### Usage

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

### Keyboard shortcut

Bind this script to a keyboard shortcut in your DE, WM, sxhkd, xbindkeysrc, etc.
Here's an example for [i3wm](https://i3wm.org/):

```
bindsym $mod+o exec --no-startup-id maimocr
```

Now you can quickly call `maimocr` anywhere by pressing the keyboard shortcut.

### Expanding data set

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

### Troubleshooting

If you notice that the script fails to OCR certain images,
try to zoom in or find a scan with a better resolution.
Tesseract works poorly at low resolutions.

Nonstandard fonts often fail to OCR properly.
In this case I don't have a definitive answer at the moment.
Try searching for more `*.traineddata` files online
and adding them to the `tessdata` folder.

## Setting up Transformers

Install [transformers_ocr](https://aur.archlinux.org/packages/transformers_ocr)
from the [AUR](https://wiki.archlinux.org/title/Arch_User_Repository).

```
$ trizen -S transformers_ocr
```

`transformers_ocr` makes use of the following programs:

* [maim](https://github.com/naelstrof/maim) to take screenshots.
* [xclip](https://github.com/astrand/xclip) to copy text to the clipboard.

If you're not running a distribution based on Arch Linux,
install manually by following the
[instructions on GitHub](https://github.com/Ajatt-Tools/transformers_ocr).

By itself `transformers_ocr` is just a short wrapper script
that installs Transformers and other required Python packages.
After the installation you need to download additional dependencies.
Run the following command.

```
$ transformers_ocr download
```

It will download [manga-ocr](https://pypi.org/project/manga-ocr/),
a Python library responsible for optical character recognition.
The files will be saved to `~/.local/share/manga_ocr`
and take up `2GiB` of disk space.

**Note:** `transformers_ocr` saves the Python packages to a standalone directory
to ensure that later you can uninstall everything by simply removing the directory.

### Usage

To OCR text on a manga page, run:

```
$ transformers_ocr recognize
```

The tool works similarly to the one explained in the Tesseract section.
It will ask you to select an area with Japanese text and try to OCR it.
The resulting text will be saved to the system clipboard.
Use it in combination with Yomichan Search
to quickly lookup Japanese words in real-time.

> To open Yomichan Search, open your Web Browser and press `Alt+Insert`.
> [Yomichan](https://foosoft.net/projects/yomichan/) should be already installed.

The first run will take longer than usual.
There's yet another set of files that have to be downloaded for the OCR to work.
The files will be save to `~/.cache/huggingface` and take up another `500MiB`.

### Keyboard shortcut

Bind this script to a keyboard shortcut in your DE, WM, sxhkd, xbindkeysrc, etc.
Here's an example for [i3wm](https://i3wm.org/):

```
bindsym $mod+o exec --no-startup-id transformers_ocr recognize
```

### Autostart

Before `transformers_ocr` can recognize text,
it needs to start a background listener.
Although this is optional,
to minimize the startup lag,
add the following command to autostart.

```
transformers_ocr listen
```

Here's an example for [i3wm](https://i3wm.org/):

```
exec --no-startup-id transformers_ocr listen
```

## Adding screenshots

If you want to add a screenshot from a manga to your Anki card,
[maim](https://archlinux.org/packages/community/x86_64/maim/)
can do that too.
[maimpick](https://github.com/tatsumoto-ren/dotfiles/blob/main/.local/bin/maimpick)
is a script that uses `maim` to screenshot parts of the screen and copy them to the clipboard.
Install it to `~/.local/bin`, make it executable and bind it to a key.
Explore my [dotfiles](https://github.com/tatsumoto-ren/dotfiles) for details.

In addition to `maim`, `maimpick` requires
[dmenu](https://wiki.archlinux.org/title/dmenu)
and
[xdotool](https://archlinux.org/packages/?name=xdotool)
to work.

**Note:**
[ames](https://github.com/Ajatt-Tools/ames)
is another program that can add screenshots to Anki.

## Other software

See [Resources](resources.html#ocr-for-manga).

Tags: guide
