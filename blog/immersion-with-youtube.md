# Immersion with YouTube

YouTube is a popular website where people can upload and watch videos.
Through watching YouTube you can immerse with native Japanese content.
Such content can be of particular interest to people
who want to understand colloquial Japanese,
speech with a lot of mumbling, slurs and slang.
There are many language-dense streams and podcasts on YouTube
that can be used for background listening.
You can also find news channels with more formal speech.

****

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
2) [Youtube-dl](https://wiki.archlinux.org/index.php/Youtube-dl).
Youtube-dl is a program to download videos.
To search for videos and obtain their links,
you still need to use a front end such as Invidious or
[youtube-viewer](https://github.com/trizen/youtube-viewer).
3) [mpv](https://wiki.archlinux.org/title/Mpv).
`mpv` is a video player.
It can utilize a built-in Youtube-dl hook to play YouTube videos.
I recommend downloading videos before watching them, however.
Storing immersion material locally makes sentence mining substantially easier.
4) Not using YouTube at all.
Explore privacy-respecting platforms
like [PeerTube](https://joinpeertube.org/) and [Odysee](https://odysee.com/).
Chances are, you'll find Japanese immersion content there too.
If you go to the YouTube website, keep
[Watch on Odysee](https://github.com/kodxana/Watch-on-Odysee)
enabled to be notified when an alternative Odysee version of the video is available.

## Subtitles

Subtitles play an important role for language learners.
On YouTube, you can find a wide variety of videos in Japanese with built-in Japanese subtitles.
Not every video has human-made subtitles, and auto-generated subtitles aren't accurate.
Avoid using them if possible.
After downloading a video with subtitles,
you can put it into subs2srs
or watch it in mpv with mpvacious and make flashcards.

## Youtube-dl

[Youtube-dl](https://wiki.archlinux.org/index.php/Youtube-dl)
is a program
that can be used to download videos from YouTube and similar sites.
Youtube-dl can also download audio tracks separately.

On Arch Linux, Youtube-dl can be installed by running this command:

```
$ sudo pacman -S youtube-dl
```

To download a video, execute:

```
$ youtube-dl 'https://youtube.com/<video>'
```

If you want to download just the audio, use this command:

```
$ youtube-dl --extract-audio --format bestaudio/best 'https://youtube.com/<video>'
```

**Tip:** add these commands as
[aliases](https://askubuntu.com/questions/17536/how-do-i-create-a-permanent-bash-alias)
to access them without too much typing.

Youtube-dl reads its configuration from `~/.config/youtube-dl/config`.
See my
[example configuration file](https://github.com/tatsumoto-ren/dotfiles/blob/main/.config/youtube-dl/config).
This configuration enables Youtube-dl to automatically download
Japanese (`ja`) subtitles in `ass` format
and save the downloaded files to a dedicated folder.
Change output location (marked with `-o`) to a folder of your preference.

See `$ man youtube-dl` for a comprehensive list of options.

## Notes

* In my dotfiles I have
[a script](https://github.com/tatsumoto-ren/dotfiles/blob/main/.local/bin/rank_invidious_instances)
that sorts Invidious instances based on the number of users.
The least used instances are usually faster.
* There's a fork of Youtube-dl called [yt-dlp](https://github.com/yt-dlp/yt-dlp) with more features.
* Install [Privacy Redirect](https://github.com/SimonBrazell/privacy-redirect)
avoid accidentally going to the official website when opening YouTube links.
