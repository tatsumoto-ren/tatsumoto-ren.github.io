---
title: Passive immersion tech
date: 1618268880
tags: [guide]
---

*Passive immersion* means listening to the language while in idle activities.
When listening passively you're not fully focused on the content,
instead you're doing something else
while having the speech in your target language play in the background.

Passive listening is one of the key components of the AJATT method,
so it is important to make it as convenient as possible.
If preparing immersion content is tedious, you are not going to do it.
This article covers technology for passive immersion.

****

## Prerequisites

If you are not familiar with the theory behind passive immersion,
read [this article](passive-immersion.html).

Key points to take away:

* We engage in passive immersion when there is no option to do active immersion.
  For instance, when we are occupied with other, unrelated tasks,
  we can still listen to our target language while doing so.
* The hours spent on passive immersion contribute to the overall progress.
  Even though passive immersion is less effective than active immersion,
  doing passive immersion is always better than doing nothing.
* Passive immersion revolves around repetition.
  It is recommended to actively immerse oneself in the material prior to listening to it passively.
  This way, you are better equipped to understand what is happening.
  You know the words, know the story, understand what's going on.

  During passive immersion usually one pays less attention to the content.
  You can zone out, but when you turn your attention back,
  you will not be lost because it's not your first time.

  On the other hand, listening to unfamiliar gibberish is not particularly helpful.
* To maximize the effectiveness of passive immersion,
  it is beneficial to listen to the same audio file multiple times.
  But it is also essential to *rotate* the content after a certain point,
  removing the old files and adding new files on a regular basis.
  This can be done easily and automatically with the help of scripts.

## Obtaining content

Passive immersion is largely about repetition.
So for passive immersion
you are going to use the content you have previously [downloaded](resources.html#immersion-material)
and have already actively immersed in.
For instance, if you watched an episode of a TV show today,
that episode is going to become your passive immersion content.
All you need to do is convert it to audio.

To make things easier,
make sure to download what you watch,
so you can extract the audio and add it to your passive listening playlist.

Other possible types of content to passively immerse in are
[YouTube](immersion-with-youtube.html) streams, podcasts and radio shows.
They are more appropriate for intermediate learners.
Unfortunately,
transcripts are usually not available for these types of content,
so actively immersing oneself in them is not an option,
thus reducing the quality of immersion.

## mpd

First, to start listening you have to install a music player.
[mpd](https://wiki.archlinux.org/index.php/Music_Player_Daemon)
is a music player with a server-client architecture,
it runs in the background as a daemon,
and you need a separate client application to connect to it.
The most widely used mpd client is `ncmpcpp`, but there are many alternatives listed on
[Arch Wiki](https://wiki.archlinux.org/index.php/Music_Player_Daemon#Clients), such as
[Cantata](https://archlinux.org/packages/?name=cantata)
or
[GMPC](https://aur.archlinux.org/packages/gmpc/).

After you've installed `mpd`, create the config and playlists directories:

```
$ mkdir -p ~/.config/mpd/playlists
```

To configure `mpd`, edit `~/.config/mpd/mpd.conf`.
Make sure to specify your `music_directory` correctly.

[Example configuration file](https://github.com/tatsumoto-ren/dotfiles/blob/main/.config/mpd/mpd.conf)

`mpd` must run in the background to be able to play music.
To enable autostart, add `mpd &` (mind the trailing `&`) to your `~/.xprofile` or `~/.xinitrc`.
Alternatively, use autostart settings of your DE/WM.

## ncmpcpp

[ncmpcpp](https://wiki.archlinux.org/index.php/Ncmpcpp) is a ncurses-based MPD client.
It can help you manage your audio files and playlists,
start and stop playback, and everything else you'd expect from an audio player.

`ncmpcpp` reads user's settings from the `~/.ncmpcpp/config` file.
When configuring `ncmpcpp` make sure that `mpd_music_dir` points to the same directory
as specified in `music_directory` in `mpd.conf`.

[Example configuration file](https://github.com/tatsumoto-ren/dotfiles/blob/main/.config/ncmpcpp/config)

Key bindings are configured in `~/.config/ncmpcpp/bindings`.

[Example bindings file](https://github.com/tatsumoto-ren/dotfiles/blob/main/.config/ncmpcpp/bindings)

## Condensing audio

The quantity of immersion is the greatest predictor
of how quick you're going to be making language gains.
One of the ways of increasing quantity of immersion is making it more language-dense.
This is done by condensing the material you use for passive immersion.

Language density is the **amount of language per unit of time**.
If we look at subtitle files for episodes of anime,
one episode may contain 450 lines of dialogue,
while another may only contain 250 lines of dialogue.
The two episodes differ greatly in language density,
but if you remove the spaces where no one is talking,
the densities will be equal.

To increase immersion density of a given episode of a TV show,
we need to extract all fragments where something was being said and combine them into a single file.
As a result we get audio for the original show with all the blank spaces taken out.
In practice, for a typical episode of anime the corresponding condensed audio file
is usually around 50% shorter, which means that you're getting twice as much immersion
when you listen to condensed audio compared to the original video file.

Condensing audio enables you to spend all available time
listening to your target language
while passively immersing.

## impd

To create, store and play condensed audio files we're going to use
[impd](https://github.com/Ajatt-Tools/impd),
a small tool that simplifies passive listening down to a few commands.
You can give it a folder with the anime and dramas you've recently watched,
and it's going to make condensed audio for all the episodes stored there,
automatically add them to your `mpd` music directory and start playing.

To get `impd`, install the
[impd-git](https://aur.archlinux.org/packages/impd-git/)
AUR package or follow the installation steps on GitHub.

```
$ trizen -S impd-git # or yay
```

To complete the installation, create a config file
to tell `impd` where to search for the video files.

```
$ mkdir ~/.config/immersionpod
$ echo 'video_dir=/mnt/archive/video/anime' > ~/.config/immersionpod/config
```

`impd` operates by *rotating* immersion material.
To rotate your immersion, call `impd rotate`.

Rotation consists of two steps:

1) `impd` searches for recently added files in your video directory,
   extracts audio and condenses it if possible.
   The resulting audio is saved to the `mpd` music directory.
   By default, `impd` considers *recent* all videos
   that were downloaded or modified less than 10 days ago.
   `impd` doesn't touch old videos by default,
   so it won't pick up anime and dramas that you downloaded a long time ago.
2) Old immersion material gets archived,
   i.e., moved to the `archive` folder inside your `mpd` music directory.
   By default, `impd` considers *old* audio files
   that were added to immersion pod more than 10 days ago.

If you're rewatching an older TV-show
or if the video file is stored outside the configured `video_dir` folder,
you can add individual files to immersion pod by calling `impd add`.
This command ignores modification dates of the video files.

You can optionally set a keybinding in `mpv`'s config
to condense the currently open video.
Add this line to `~/.config/mpv/input.conf`:

```
Ctrl+b run "/bin/sh" "-c" "impd add '${=path}'"
```

## When you're not home

Synchronize your immersionpod folder to your mobile device.
There are many programs for file synchronization.

* [Syncthing](https://wiki.archlinux.org/index.php/Syncthing)
* [Rsync](https://wiki.archlinux.org/index.php/Rsync)

When you're out, use
[a compatible music player](resources.html#audio-players) of your choice to continue immersing.

[AntennaPod](https://f-droid.org/packages/de.danoeh.antennapod/),
a podcast player,
can be used to play condensed audio instead of a conventional music player.
After you synchronize your `immersionpod` directory,
open AntennaPod, press "Add podcast" > "Add local folder"
and select path to `immersionpod/current`.

## Condensing audiobooks

Audiobooks contain a lot of silence which lowers density of immersion.
After you've read a book, you might want to condense it to listen to it later,
but because audiobooks don't have subtitles, tools like `impd` won't help.
Fortunately,
[Audacity](https://archlinux.org/packages/?name=audacity)
has a function to truncate silence.

Select the entire clip by pressing `Ctrl+A`, then press
Effect > Truncate silence. After you adjust the settings, press OK.

<p align="center"><img src="img/audacity-truncate-silence.webp" alt="Truncate silence" class="shadow"></p>
<p align="center"><i>Truncate silence.</i></p>

Alternatively, you can [use FFmpeg](reading-books.html#remove-silence-from-an-audiobook).

## Podcasts

I've got an immersion tip for constant passive listening involving podcasts.

1) Take an Android device.
2) Install
[AntennaPod](https://f-droid.org/packages/de.danoeh.antennapod/)
or a similar podcast player.
3) Import this
[podcasts.opml](https://gist.github.com/tatsumoto-ren/1df342d5270680f3c9dca078a93298a4)
file
([direct download](https://gist.githubusercontent.com/tatsumoto-ren/1df342d5270680f3c9dca078a93298a4/raw/d885f6c2f6ba11076f1e7b5c930472925e050304/podcasts.opml)).
4) Start playing and just leave the device in the corner of your room.

You can use this tip if you already understand Japanese to an extent.
Listening to something you don't understand is not good for immersion.
It's a very easy way to immerse, but it doesn't beat condensed audio.

I also tried this method with [radio](https://search.f-droid.org/?q=radio&lang=en),
specifically [RadioDroid](https://f-droid.org/en/packages/net.programmierecke.radiodroid2/),
though the results weren't as good because radio is often more about music than talking.
