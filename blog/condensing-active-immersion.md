---
title: Condensing active immersion
date: 1656087109
tags: [guide]
---

Watching movies and TV shows counts towards active immersion
and requires full attention to the content.
We can apply a little optimization to condense active immersion.
This small trick helps if you're watching something boring or if you're tight on time.

****

As mentioned in the article about passive listening,
you can increase the density of your immersion
by creating [condensed audio](passive-listening.html#condensing-audio).
To make a condensed audio file
we extract all fragments where something was being said and combine them into a single file.
As a result we get audio for the original show with all the blank spaces taken out.

But what about active immersion?
You can apply a similar technique while watching a video in
[mpv](https://wiki.archlinux.org/title/Mpv).
By fast forwarding parts where no one is speaking
you increase the density of your immersion.

Needless to say,
manually increasing the playback speed when no one's talking
is annoying and tiresome.
No one does that.
However, with a user-script for mpv it can be done automatically.

`sub-transition` is a user-script
that allows automatically skipping parts of a video that don't contain any subtitles.
Skipping is done by speeding up playback while no subtitles are present.
In addition, it can pause video before the end or at the start of a subtitle line.
For the script to work it is necessary to have an active subtitle track.

Follow the instructions on GitHub to set it up.

<p align="center"><a class="download_button" href="https://github.com/Ajatt-Tools/sub-transition">Download</a></p>

`sub-transition` comes with an OSD menu
that lets you easily control options,
save settings and toggle transitions.
To open the menu, press `shift+n`.

Press `t` to toggle transtions.
Use the vim keys (`h`,`j`,`k`,`l`)
to move through the settings list and change values.
Press `s` to save the settings.
