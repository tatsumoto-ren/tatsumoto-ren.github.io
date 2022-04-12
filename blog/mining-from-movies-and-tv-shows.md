# Mining from movies and TV-shows

*Sentence mining* is the process of picking sentences from your immersion and making Anki cards.
Each sentence has one unknown piece of information,
which is referred to as *target word*.

To mine sentences from movies and TV-shows
you are going to need the mpv video player,
and a plugin for mpv called mpvacious.

****

## mpv

mpv is the best video player for language learners.
It is fast, minimal, extensible and compatible with all video formats.
mpv is available on most distributions of GNU/Linux.
To install it on Arch Linux, execute the following command:

```
$ sudo pacman -S mpv
```

Make sure you have version 0.33.0 or later.
If such a version is not available on your distribution, see
[here](https://mpv.io/installation/)
for different installation options.

Start mpv at least once to create the config folder
which will be located at `~/.config/mpv/`.

To configure mpv,
create and open `~/.config/mpv/mpv.conf`.
This step is not strictly necessary.

<details>

<summary>Example configuration file</summary>

```
# Define language preferences
alang=ja,jp,jpn,japanese,en,eng,english,English,enUS,en-US
slang=ja,jp,jpn,japanese,en,eng,english,English,enUS,en-US

# mpv will resume where you left off when you reopen a media file
save-position-on-quit=yes

# Automatically use external subtitle files that contain the name of the media file
sub-auto=fuzzy

# Additional folders for storing subtitle files.
# You can drop all subs in the "subs" folder to keep files organized.
sub-file-paths=ass:srt:sub:subs:subtitles

# Subtitle font. Make sure the font you select is installed
# and contains all characters that are included in your subtitle files.
# https://archlinux.org/packages/extra/any/noto-fonts-cjk/
sub-font="Noto Sans CJK JP Regular"

# Change subtitle font size.
sub-font-size=40

# Uncomment this if you want mpv to override styles from SubStation Alpha (.ssa/.ass) subtitles
# sub-ass-override=force

# Improves audio when the playback speed is changed.
af-add=scaletempo2

# Screenshots
screenshot-directory="~/Pictures/Screenshots/"
screenshot-template="%F_%wHh%wMm%wSs%wTms"
screenshot-format=jpg
screenshot-jpeg-quality=90
screenshot-high-bit-depth=yes
```

</details>

**Note:** To tell mpv to show subtitles in the font you selected in the config, press `u`.
If you want to make the setting permanent, add `sub-ass-override=force` to `mpv.conf`.

`~/.config/mpv/input.conf` contains key bindings.
For all available bindings, see `/usr/share/doc/mpv/input.conf`.

<details>

<summary>Example input.conf</summary>

```
# Increase / decrease subtitle font size
# Works only when sub-ass-override=force
# https://www.reddit.com/r/mpv/comments/dg5yzj/trouble_decreasing_subtitles_size/
/ add sub-scale +0.1
? add sub-scale -0.1

# Cycle video aspect ratios; "-1" is the container aspect
A cycle-values video-aspect "16:9" "16:10" "4:3" "2.35:1" "-1"

# Vim-like seeking
l seek  5
h seek -5
j seek -60
k seek  60

# Cycle between subtitle files
K cycle sub
J cycle sub down

# Skip to previous/next subtitle line (disabled - use mpvacioius)
#H no-osd sub-seek -1
#L no-osd sub-seek 1

# Search sub-text on Jisho.org
# https://github.com/mpv-player/mpv/issues/4695#issuecomment-609876072
Ctrl+j run "/bin/sh" "-c" "xdg-open 'https://jisho.org/search?keyword=${sub-text}'"

# skip to next/previous file
> playlist-next
< playlist-prev

# Add/subtract 50 ms delay from subs
Z add sub-delay +0.05
z add sub-delay -0.05

# Adjust timing to previous/next subtitle
X sub-step 1
x sub-step -1

# Toggle OSD visibility
V script-binding visibility
```

</details>

## Download content

Always download what you watch.
This way it's easier to work with the files,
make Anki cards,
take screenshots,
cut clips,
[make condensed audio](passive-listening.html),
and so on.
Don't use "services" that spy on you such as Netflix, Hulu, VRV, Funimation or Crunchyroll.

Explore
[Resources](resources.html#immersion-material)
to find ways to download Japanese content.

## Obtain subtitles

To learn Japanese from visual content such as anime or jdramas you need Japanese subtitles.
Subtitles can be found on
[Kitsunekko](https://kitsunekko.net/dirlist.php?dir=subtitles%2Fjapanese%2F)
and on our
[Resources page](resources.html#japanese-subtitles).
If you want to synchronize the subtitles, see the
[autosubsync-mpv](https://github.com/Ajatt-Tools/autosubsync-mpv)
page.

Sometimes the only subtitle files
available for a particular video are image-based (`.sup` or `.sub`).
Often this is the case with subtitles for movies.
They don't contain any text and by themselves are not very useful.
SUP files can be converted to plain text (`.srt`)
using OCR (Optical Character Recognition) programs
such as [subtitleedit](https://aur.archlinux.org/packages/subtitleedit).

Don't forget that if you have English subtitles enabled,
at best you're going to improve your English,
but your Japanese is not going to get any better.

## mpvacious

[mpvacious](https://github.com/Ajatt-Tools/mpvacious)
is a plugin for the mpv video player
that allows you to make Anki cards
while watching movies and TV shows in your target language.

mpvacious can update Anki cards you add with Yomichan
by filling the audio and screenshot fields.
Here is a video demonstration:

<p align="center"><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/vU85ramvyo4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

### Requirements

mpvacious needs
[AnkiConnect](https://ankiweb.net/shared/info/2055492159)
and
[xclip](https://archlinux.org/packages/extra/x86_64/xclip/)
to work.

### Installation

mpvacious can be installed with `git`:

```
$ git clone 'https://github.com/Ajatt-Tools/mpvacious.git' ~/.config/mpv/scripts/subs2srs
```

### Configuration

Download the
[example config file](https://github.com/Ajatt-Tools/mpvacious/blob/master/.github/RELEASE/subs2srs.conf)
and save it to `~/.config/mpv/script-opts/subs2srs.conf`.
If you use the Note Type from the
[recommended mining deck](setting-up-anki.html#import-an-example-mining-deck),
you don't need to change any settings at all.
If you don't, make sure to adjust at least the following variables:
* `sentence_field`
* `audio_field`
* `image_field`

### Usage

1) Make sure Anki is running.
1) Open a video in mpv.
1) Press `Ctrl+t` to activate clipboard autocopy.
1) Open your web browser and activate Yomichan Search by pressing `Alt+Insert`.
1) Enable clipboard monitor in Yomichan Search.
1) When there is a word you want to mine, create a card with Yomichan.
1) Go back to the mpv window and press `Ctrl+m`.
If you want to grab a sentence that spans multiple lines,
press `a` to open the advanced menu.
Then mark the lines you want to appear on the card
by pressing `c` and moving the position with `Shift+h` and `Shift+l`.
Finish by pressing `m`.
1) The Anki Browser window should appear with the card updated.

You can save sentences for later without adding definitions.
To do so, press `Ctrl+n`.

### Updating

To update mpvacious, run the command below:

```
$ cd ~/.config/mpv/scripts/subs2srs && git pull
```

## Should I use a "text hooker" page?

No.

Though you often see such recommendations,
I think it unnecessarily complicates your setup.
Yomichan Search can do the same thing simpler.

Tags: guide
