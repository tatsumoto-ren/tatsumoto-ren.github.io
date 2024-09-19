---
title: Reading books
date: 1678350776
tags: ['guide']
---

Reading a book is a simple process.
You don't need much technology to read a book.
In contrast,
when watching a movie,
you need software that can create Anki cards from the subtitles.
Or,
when reading manga,
you need an OCR tool to extract text from the images.
But to read a book, all you may need is
a dictionary on hand to look up unfamiliar words.
And a program that can open and display books, of course.
If you have a paper book, you don't even need a computer.
Nevertheless, there are some tips I'd like to discuss here.

In this article, we'll discuss a few tips and tricks to help make
reading books in Japanese easier and more enjoyable.

****

## Obtaining books

There are many ways to obtain books.
For your convenience
I have compiled a list of various places [in Resources](resources.html#books).
In my experience `Zlibrary` together with torrent sites are able to satisfy most needs.

Things to avoid are [Amazon](https://stallman.org/amazon.html),
books with [DRM](https://drm.info/what-is-drm.en.html).

## Book reader software

Most book readers
[listed on Arch Wiki](https://wiki.archlinux.org/title/List_of_applications#Readers_and_viewers)
suck ass.
But some are okay.
I have tried a lot,
and for the most decent ones I have written short [reviews](resources.html#reading-ebooks).
`crqt-ng` is what I use these days.
It does a lot of things right.

* It runs natively, without nasty technologies like Electron, JavaScript, etc.
* It can display furigana correctly.
* You can set up Japanese fonts instead of Chinese fonts,
  which is important because Chinese kanji and Japanese kanji
  are printed [differently](japanese-fonts.html#chinese-glyphs).
* It doesn't lag.
* You have a continuous view mode.
* You can create bookmarks.
  Bookmarks can be easily accessed,
  you can have any number of them,
  and they are easy to spot visually.
* It can automatically send text to the system clipboard when you select it.
  This is extremely useful
  if you want to use `crqt-ng` alongside [Rikaitan Search](what-is-yomichan-search.html),
  [Qolibri](setting-up-qolibri.html#watch-clipboard)
  or [GoldenDict](setting-up-goldendict.html#enable-clipboard-scanning).

<p align="center"><img src="img/coolreader-yomichan.webp" alt="crqt-ng and Rikaitan Search"></p>
<p align="center"><i>crqt-ng and Rikaitan Search, side by side in i3wm.</i></p>

## Reading on Android

If you have an [Andriod](our-immersion-learning-toolset.html#android) device,
try [KOreader](https://f-droid.org/en/packages/org.koreader.launcher.fdroid/) from F-Droid.
KOreader is a book reader application
that was designed to be used on E-ink devices,
but it can also be used on Android.
It properly displays furigana.

This app [supports](https://github.com/koreader/koreader/wiki/Dictionary-support) `StarDict` dictionaries.
You can download the dictionaries
[from here](https://mega.nz/folder/rIIHhAxb#d6GV9ZNTj9gUEaQtfGluqg/folder/LYAmgLLI),
or you can use your own dictionaries,
converting them to the `StarDict` format
with [PyGlossary](https://github.com/ilius/pyglossary).
The dictionaries should be placed in `/sdcard/koreader/data/dict`.
[Refer to the Wiki](https://github.com/koreader/koreader/wiki/Dictionary-support)
for further details.

If you want to create Anki cards,
install [Anki plugin for KOreader](https://github.com/Ajatt-Tools/anki.koplugin).

## Reading alongside an audiobook

This is a tip for people who aren't used to reading in a foreign language yet.
Hearing the audio as you're reading helps comprehend what's going on
and teaches you how the words you read should be pronounced.

If a book is old,
for example if it's something by `夏目漱石`,
audiobooks can be grabbed directly [from YouTube](immersion-with-youtube.html#yt-dlp).
But to find audiobooks for most modern books
you have to search on Torrent sites or elsewhere.

[Mpvacious](mining-from-movies-and-tv-shows.html#mpvacious) can create Anki cards from audio files.
Creating cards from audiobooks is similar to creating cards for movies and TV shows,
except you have to set timings manually,
and it won't create a picture because there is no video stream.
If you have mpvacious installed, open an audio-book in mpv just by calling `mpv /path/to/file`.
Each time you want to create a new card,
press <kbd>a</kbd> to bring up the advanced menu,
press <kbd>s</kbd> to set the start time,
seek forward with arrow keys or the `h` and `l` keys to the end of the phrase,
and press <kbd>e</kbd> to set the end time.
Press <kbd>n</kbd> to create a card,
or update an existing card by pressing <kbd>m</kbd>.

## Remove silence from an audiobook

Before listening to an audiobook,
it may be desirable to remove any sections containing no spoken dialogue (silence).
To accomplish this, a command like the following should suffice.
You need FFmpeg installed to run it.

```
ffmpeg -i /path/to/audiobook -af silenceremove=stop_periods=-1:stop_duration=0.3:stop_threshold=-50dB -c:a libopus /path/to/output.opus
```

* Add this command as a function to your `.bashrc` to avoid copying it every time.
* See this [reference](http://underpop.online.fr/f/ffmpeg/help/silenceremove.htm.gz).

## Hand-held book readers

There are dedicated mobile devices made specifically for reading books.
My advice regarding them is the same as with [Andriod](our-immersion-learning-toolset.html#android):
find a device that you can use without running any non-free software.
Definitely don't buy [Amazon Swindle](should-i-buy-a-kindle-to-read-japanese-books.html).

Often people want to read on an e-ink device.
I have never owned one, but it would probably be nice to have!
The main advantage is apparently that your eyes don't get tired as much
compared to reading on a computer screen.
One example of such a device is [PineNote](https://wiki.pine64.org/wiki/PineNote).

[KOreader](resources.html#reading-ebooks)
is a book reader application designed for e-ink devices,
and it supports installing dictionaries,
which is great for language learners.
Try it if you have an e-ink device.
