---
title: How to extract audio from immersion content for passive listening?
date: 1669303072
tags: ['faq']
position: -9932
---

I recommend that you take a look at
[impd](https://github.com/Ajatt-Tools/impd).
It's a program that is specifically designed to automatically manage [background immersion](whats-immersion.html).
It extracts audio,
**removes** chunks where no one is speaking
and saves the files to your `mpd` folder automatically.
Being able to increase immersion density is really useful,
and in practice such condensed audio files are up to 2 times shorter
than if you just extracted the original audio.

If you're a brainlet,
[subs2srs](our-immersion-learning-toolset.html#subs2srs) has a built-in tool to extract audio from video.

If you want more customization,
learn how to use
[FFmpeg](https://wiki.archlinux.org/title/FFmpeg)
from the terminal.
It's very versatile.
You can take it further
and write scripts in Bash that would use FFmpeg to automate the process.

FFmpeg can also record audio from your computer
in case you're watching some [DRM](https://drm.info/what-is-drm.en.html)ed trash
that you're unable to download.
[dmenurecord](https://github.com/tatsumoto-ren/dotfiles/blob/main/.local/bin/dmenurecord)
is an example of a script that can automate recording of audio and screen with FFmpeg.
[Audacity](https://archlinux.org/packages/?name=audacity)
is graphical program that can record audio coming out of your computer.
