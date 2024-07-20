---
title: Immersion with YouTube
date: 1647786750
tags: ['guide']
---

YouTube is a popular website where people can upload and watch videos.
Through watching YouTube you can immerse with native Japanese content.
Such content can be of particular interest to people
who want to understand colloquial Japanese,
speech with a lot of mumbling, slurs and slang.
There are many language-dense streams and podcasts on YouTube
that can be used for background listening.
You can also find news channels with more formal speech.

****

<p align="center">
<img alt="watching youtube" src="img/watching-youtube.webp">
</p>

## How to access

Like many popular big tech websites today,
YouTube uses proprietary JavaScript code, which is not safe to run.
If you go to the website, it won't work if you block proprietary JavaScript code from running.
In addition to that, YouTube contains privacy violating trackers and collects data about users.
To access the videos, use various alternative ways that minimize tracking.

There are several ways you can watch YouTube.

1) [Invidious](https://github.com/iv-org/invidious).
   Invidious is an alternative front-end to YouTube.
   It lets you choose from a number of instances based on their health.
   A list of Invidious instances can be found on https://api.invidious.io/.
   Invidious gives you direct download links for every video.
2) [yt-dlp](https://wiki.archlinux.org/index.php/yt-dlp).
   yt-dlp is a program to download videos.
   To search for videos and obtain their links,
   you still need to use a front end such as Invidious or
   [youtube-viewer](https://github.com/trizen/youtube-viewer).
3) [mpv](https://wiki.archlinux.org/title/Mpv).
   `mpv` is a video player.
   It can utilize a built-in `yt-dlp` hook to play YouTube videos.
   I recommend downloading videos before watching them, however.
   Storing immersion material locally makes [sentence mining](sentence-mining.html) substantially easier.
4) Not using YouTube at all.
   Explore privacy-respecting platforms
   like [PeerTube](https://joinpeertube.org/) and [Odysee](https://odysee.com/).
   Chances are, you'll find Japanese immersion content there too.
   `yt-dlp` works on these websites as well.

## Subtitles

Subtitles play an important role for language learners.
On YouTube, you can find a wide variety of videos in Japanese with built-in Japanese subtitles.
Not every video has human-made subtitles, and auto-generated subtitles aren't accurate.
Avoid using them if possible.

To find content with subtitles,
open Invidious,
click on `[+] Filters` and under "Features" enable "Subtitles/CC".
Or you can try adding "字幕可" or "CC" at the end of the search term.

After downloading a video and subtitles for it,
you can put it into `subs2srs`
or watch it in `mpv` with `mpvacious` and make flashcards.

The following sites offer video search based on target language subtitles:

* [YouGlish](https://youglish.com/japanese)
* [CaptionPop](https://www.captionpop.com/)

We recommend utilizing their search features but using `mpv` to watch the videos.

## yt-dlp

[yt-dlp](https://wiki.archlinux.org/index.php/yt-dlp)
is a program
that can be used to download videos from YouTube and similar sites.
`yt-dlp` can also download audio tracks separately.

On Arch Linux, yt-dlp can be installed by running this command:

```
sudo pacman -S yt-dlp
```

To download a video, execute:

```
yt-dlp 'https://youtube.com/<video>'
```

If you want to download just the audio, use this command:

```
yt-dlp --extract-audio --format bestaudio/best 'https://youtube.com/<video>'
```

**Tip:**
add these commands as [aliases](https://askubuntu.com/questions/17536/how-do-i-create-a-permanent-bash-alias)
to access them without too much typing.

`yt-dlp` reads its configuration from `~/.config/yt-dlp/config`.
See my
[example configuration file](https://github.com/tatsumoto-ren/dotfiles/blob/main/.config/youtube-dl/config).
This configuration enables `yt-dlp` to automatically download
Japanese (`ja`) subtitles in `ass` format
and save the downloaded files to a dedicated folder.
Change output location (marked with `-o`) to a folder of your preference.

See `man yt-dlp` for a comprehensive list of options.

## mpv

It is possible to open a YouTube link directly in mpv
and watch it without saving the video on the hard drive.
All you need to do is pass a video link as an argument to mpv.

```
mpv 'https://youtube.com/<video>'
```

I personally don't do so because there's a few hiccups
that interfere with things like rewinding and making Anki cards.

## Mobile devices

If you have an [Android](our-immersion-learning-toolset.html#android) device,
install one of the YouTube clients from F-Droid
to access YouTube and keep your privacy.

* [NewPipe](https://f-droid.org/en/packages/org.schabi.newpipe/).
* [LibreTube](https://f-droid.org/en/packages/com.github.libretube/)
  An alternative frontend for that uses the Piped API to load data and play videos.
* [Tubular](https://apt.izzysoft.de/fdroid/index/apk/org.polymorphicshade.tubular).
  NewPipe with SponsorBlock.

## Notes

* [pipe-viewer](https://github.com/trizen/pipe-viewer) is a lightweight YouTube client for Linux.
* In my dotfiles I have
  [a script](https://github.com/tatsumoto-ren/dotfiles/blob/main/.local/bin/rank-invidious-instances)
  that sorts Invidious instances based on the number of users.
  The least used instances are usually faster.
* Install [Privacy Redirect](https://github.com/SimonBrazell/privacy-redirect)
  or [LibRedirect](https://libredirect.github.io/)
  to avoid accidentally going to the official website when opening YouTube links.
* If you go directly to `youtube.com`, keep
  [Watch on Odysee](https://github.com/kodxana/Watch-on-Odysee)
  enabled to be notified when an alternative Odysee version of the video is available.
* [UntrackMe](https://f-droid.org/packages/app.fedilab.nitterizeme/)
  for Android redirects YouTube links to Invidious.
  On top of that it can transform many other links.
* If you add `24/7` or `ライブ` behind your searches on YouTube,
  you can find channels that stream Japanese all day.
