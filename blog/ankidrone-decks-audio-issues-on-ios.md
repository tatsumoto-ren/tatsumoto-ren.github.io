---
title: "Ankidrone decks: Audio issues on iOS"
date: 1765131767
tags: ['faq', 'decks']
position: 100
---

> I wanted to reach out regarding [Ankidrone Essentials](ankidrone-essentials.html) V8.
> On my computer, all the audio files play without any issues.
> However, in Anki Mobile on iOS, many of the audio files do not play.
>
> I tried converting all the OGG files to MP3 to make them compatible,
> but I ran into problems.
>
> Do you know if there is a way to make this deck play all the audio files in
> Anki Mobile, or does it only work on the computer? Any guidance or solution
> would be greatly appreciated.

****

Most [Anki](setting-up-anki.html) decks linked on our site
come with audio in the [Opus](https://opus-codec.org/) format.
iOS does not support Opus.

We do not recommend using iThings for a number of reasons:

* [www.fsf.org/campaigns/apple](https://www.fsf.org/campaigns/apple)
* [www.gnu.org/proprietary/malware-apple.html](https://www.gnu.org/proprietary/malware-apple.html)

The best solution is to sell your iThing
and get a device that is supported by [GrapheneOS](https://grapheneos.org/).

Using MP3 audio in Anki is not recommended
because MP3 files must be a lot larger than Opus files to match quality,
which wastes disk space and slows syncing.

If you still use AnkiMobile (the [proprietary](https://www.gnu.org/proprietary/) Anki app),
use `m4a` or `webm` containers for Opus files.
It will allow iOS to play Opus files, while still maintaining compatibility with non-Apple devices.
Run `ffmpeg` in your `collection.media` folder to convert files.

Example command:

```
for file in ./*.ogg; do
    new_name=${file%.*}.webm
    ffmpeg -i "$file" -c copy "$new_name"
done
```

If you still want MP3,
see [this page](https://trac.ffmpeg.org/wiki/Encode/MP3) for details.
