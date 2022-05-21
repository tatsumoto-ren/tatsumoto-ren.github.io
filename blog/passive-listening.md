# Passive listening

When we talk about immersion, we usually divide it into active and passive.
*Active immersion* requires full attention to the content
and can be practiced through reading and watching content in the target language.
*Passive immersion* means listening to the language while in idle activities.
When listening passively you're not fully focused on the content,
instead you're doing something else
while having the speech in your target language play in the background.

We do passive immersion during times in a day when we can't actively engage with the language,
such as when cooking, cleaning or commuting.
Although your attention is divided during passive immersion,
because you're left with no other choice,
it is still better compared to no immersion at all.

As noted in the introduction article, there are countless opportunities
to do passive listening throughout the day.
Make passive listening a habit.
Every moment of your life has to be spent interacting with Japanese.

Passive listening is one of the key components of the AJATT method,
so it is important to make it as convenient as possible.
If preparing immersion content is tedious, you are not going to do it.

****

## Role of passive listening

In the beginning passive immersion doesn't contribute much to comprehension gains,
instead it helps you start distinguishing sounds and phonemes of your target language.
Focus your attention on hearing the sounds.
Maybe at first you won't even be able to hear where one word ends and another one starts,
but as you progress expect passive listening to boost your phonetic awareness
and eventually start contributing to your comprehension.
Passive immersion doesn't do much without active immersion.
You shouldn't neglect either of them.

## Rules of passive immersion

Passive immersion can lead to very little or no language gains if done wrong.
Stick to the following whenever you engage in passive immersion.

* **Re-listen.**
Focus on listening passively to the content you've already engaged with actively
and comprehended via dictionary lookups, attention to scenery
and other means of making input more comprehensible.
Re-listening creates repetition, and repetition is good for the brain.
If you listen to something you haven't previously watched and comprehended,
it is essentially going to be white noise, and it won't help you much.
* **Rotate immersion content.**
Repetition becomes boring if done too many times, and boredom impedes learning.
It's important to rotate immersion,
in other words regularly add new content and remove old content from your playlist.

In this article you'll find out how to automatically extract audio from what you've watched
and how to rotate immersion content.

## Choosing content

The best source of passive immersion is audio from TV shows you've already watched.
Another option is to listen to an audiobook of a novel you've previously read.
These two options help the most because you already know the story.

Beginners are not recommended listening to podcasts and radio shows.
It is difficult to make such content comprehensible
because it lacks transcriptions and visual context.
Though if you're outside, and you have nothing else to listen to, you must choose something.

If you're an advanced learner,
it is okay to use purely audio-based material such as podcasts
as one of the primary sources of both passive and active immersion.

Music is the worst content for passive immersion.
It contains unnatural speech, and it is difficult to hear the lyrics.
We tend to mishear lyrics even when we listen to songs in our native language.

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
e.g. moved to the `archive` folder inside your `mpd` music directory.
`impd` considers *old* audio files that were added to immersion pod more than 10 days ago.

If you're rewatching an older TV-show
or if the video file is stored outside the configured `video_dir` folder,
you can add individual files to immersion pod by calling `impd add`.
This command ignores modification dates of the video files.

## When you're not home

Synchronize your immersionpod folder to your mobile device with
[rsync](https://wiki.archlinux.org/index.php/Rsync)
or
[syncthing](https://wiki.archlinux.org/index.php/Syncthing).
When you're out, use
[a compatible music player](resources.html#audio-players) of your choice to continue immersing.

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

Tags: guide
