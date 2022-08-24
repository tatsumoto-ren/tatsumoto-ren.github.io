---
title: Removing Chinese from subtitles and the basics of vim
date: 1606984029
tags: [vim, subtitles]
---

Let's talk about Japanese subtitles. Many of us have used [kitsunekko](https://kitsunekko.net/dirlist.php?dir=subtitles/japanese/&sort=date&order=desc)
and have seen those strange subtitles with Chinese translation on the first line and then below it
the actual Japanese on the second line. When you use [mpv](https://mpv.io/) to
[mine sentences](https://github.com/Ajatt-Tools/mpvacious) from these subtitles
you almost never want Chinese to end up on your Anki cards. Here's where `vim` comes handy.

So let's say I've downloaded
[this subtitle file](https://kitsunekko.net/subtitles/japanese/Adachi%20to%20Shimamura/[YG][Adachi%20to%20Shimamura][08][1080P%20HEVC-10bit%20AAC].ass),
what do I do to fix it?

When you open the file, you see that Chinese and Japanese lines are marked differently.
In this particular example, Chinese dialog lines are preceded by `Adachi,,` and `Adachi-JPCN,,`
and Japanese by `Adachi-JP,,`.

```
Dialogue: 1,0:03:56.13,0:03:57.24,Adachi-JP,,0,0,0,,何かほしいの？
Dialogue: 0,0:02:42.29,0:02:49.68,Adachi-JPCN,,0,0,0,,{\blur1}有你在的道路这世界就会变得不可思议地喜欢
Dialogue: 0,0:20:35.60,0:20:38.74,Adachi,,0,0,0,,这个关键词是从我的先祖那得来的
```

So to delete all lines containing Chinese dialogs, use `:g` with the `d` command,
supplying the pattern:

```
:g/Adachi,,\|Adachi-JPCN,,/d
```

**The commands mean:**
* `:g` - find all lines
* `/pattern/` - matching your pattern
* `\|` - equivalent to `or` in English
* `/d` - delete the matched lines

And you're done! Now you can save the file and exit `vim` by pressing `ZZ`.
