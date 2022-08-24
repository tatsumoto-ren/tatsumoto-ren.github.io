---
title: Japanese locale
date: 1657735823
tags: ['guide']
---

A [Locale](https://wiki.archlinux.org/title/Locale)
is a set of information that most programs use
for determining country and language specific settings.
Since you're learning Japanese,
generate and enable the Japanese locale on your system.

****

## Importance

Setting up locale is a prerequisite to:

* [Typing in Japanese](how-to-type-in-japanese.html).
* Installing and displaying [Japanese fonts](japanese-fonts.html).

Thus, this article comes first.

The instructions are intended for systemd.
If you happen to have a different init system,
you may have to perform different commands or edit different files.
Consult [Gentoo Wiki](https://wiki.gentoo.org/wiki/Localization/Guide) or a similar resource.

## Instructions

Uncomment the languages you use in `/etc/locale.gen`
by removing the `#`s from their corresponding lines.
If the file is empty, you have to add the languages yourself.
At least English and Japanese should be enabled.
See the example below.

```
en_US.UTF-8 UTF-8
ja_JP.UTF-8 UTF-8
```

Don't forget to enable other languages you want to use.

Then save the file and regenerate the locale.

```
$ sudo locale-gen
```

Finally, edit `/etc/locale.conf` and set the system locale.
It doesn't have to be set to Japanese.

```
LANG=en_US.UTF-8
```

If you set your system locale to Japanese, the system logs will also be in Japanese.
This is not convenient because sometimes we need to search the web for a system error, for example.
For such searches, English works best.
If you want to set your computer to Japanese,
do it for a local user instead of the whole system.

## Change local language

**Note:** This step is for people who know at least some Japanese and can read it.

Create or edit `~/.config/locale.conf`.

```
LANG=ja_JP.UTF-8
```

Set `LANG` for your shell as well, by editing startup files.

* [Bash](https://wiki.archlinux.org/title/Bash#Configuration_files): `~/.profile` or `~/.bash_profile`
* [Zsh](https://wiki.archlinux.org/title/Zsh#Startup/Shutdown_files): `~/.zprofile`

Add the following line.

```
export LANG=ja_JP.UTF-8
```

If you are using a desktop environment, such as `GNOME` or `KDE`,
its language settings may be overriding the settings in `locale.conf`.
You have to change language via the GUI menus.

## See also

Since this is a very low-level topic,
the steps for your system may differ.
On this page I mentioned what I did for my system running vanilla Arch Linux.
Read Arch Wiki and Gentoo Wiki for further explanations.
