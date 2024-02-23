---
title: Our Immersion Learning Toolset
date: 1612374836
tags: [guide]
---

<p align="center"><img alt="Ajatt-Tools" class="shadow" src="https://avatars.githubusercontent.com/u/69172625?s=200&v=4"></p>

At
[Ajatt Tools](https://github.com/Ajatt-Tools)
we're developing tools to help you connect with another language.
We hope that they and other
[libre](https://www.gnu.org/philosophy/free-sw.html)
projects developed by the community will help you in your language learning journey.

****

## Overview

Technical instructions on this site are intended for GNU/Linux users,
but most of the software I list here is cross-platform.
If you're not using GNU/Linux yet,
you should be able to use the tools on any OS in the meantime
while you're preparing to switch.

<details>

<summary>Our software recommendations</summary>

I deliberately advocate for free/libre software.
Quitting Windows is like quitting tobacco.
Tobacco is bad for your health.
Likewise, non-free software is
[bad for your freedom](https://www.gnu.org/proprietary/proprietary.html).

The point of free software is that we have control of our software and our computing.
A system with a back door doesn't qualify.

If you think you can't be bothered to install the GNU operating system,
bear in mind that it only takes about 20 minutes to do so.
It will take you years to master a foreign language, so it's a good investment.

</details>

## [GNU/Linux](https://www.gnu.org/gnu/about-gnu.html)

GNU/Linux is a suitable replacement for
[Windows](https://www.gnu.org/proprietary/malware-microsoft.html)
or
[macOS](https://www.gnu.org/proprietary/malware-apple.html).

I favor
[Arch Linux](https://archlinux.org/) and distributions based on it,
but any other distro is fine
as long as it's not overly complicated or difficult to use as a daily driver.
If you've ever used a Debian-based distro, you know how slow the package manager is.
On the other hand, the package manager used in Arch-based distros
is one of the fastest package managers out there.

**Possible options:**

* [Arch Linux](https://archlinux.org/).
  The default installation is very minimal,
  installation steps have to be executed manually.
* [EndeavourOS](https://endeavouros.com/).
  A successor of Antergos, a lightweight distro close to Arch Linux.
  A really good, user-friendly starting distro.
  [Video](https://redirect.invidious.io/watch?v=Bl1r6_L2eig).
* [Garuda Linux](https://garudalinux.org/).
  A rolling release distro based on Arch Linux with Chaotic AUR enabled by default.
* [Manjaro](https://manjaro.org/).
  Aims to be user-friendly and offers lots of goodies out of the box.
* [Parabola](https://www.parabola.nu/).
  A fully free/libre equivalent of Arch Linux.

  Parabola doesn't ship proprietary firmware and uses the Linux-libre kernel.
  Devices that require proprietary blobs will not function.
  A lot of WiFi-cards on laptops are affected.

  Software packages tend to be outdated, especially the kernel.
* [Hyperbola](https://www.hyperbola.info/).
  A distro that aims to be stable and secure, as well as fully free/libre.
* [Artix](https://artixlinux.org/).
  Arch Linux without systemd.

**Alternatives suggested by our members:**

* [NixOS](https://nixos.org/)
* [GuixSD](https://guix.gnu.org/)
* [Gentoo](https://www.gentoo.org/)

**Also read**: [Reviews of All Linux Distros](https://lukesmith.xyz/articles/reviews-of-all-linux-distros-that-matter/).

## [Anki](https://wiki.archlinux.org/index.php/Anki)

Create, manage and review flashcards
to remember the words, phrases, and grammar points
you've studied.

* [Setting up Anki](setting-up-anki.html)
* [Japanese support for Anki](anki-japanese-support.html)
* [Useful Anki add-ons](useful-anki-add-ons-for-japanese.html)
* [Add-ons by Ajatt-Tools](https://ankiweb.net/shared/by-author/1344485230)
* [Our collection of Note Types](https://github.com/Ajatt-Tools/AnkiNoteTypes)

## [mpv](https://wiki.archlinux.org/title/Mpv)

`mpv` is a video player with support for user-scripts.

* [Mining from movies and TV-shows](mining-from-movies-and-tv-shows.html)
* [User Scripts by Ajatt-Tools](https://github.com/search?q=topic%3Ampv+org%3AAjatt-Tools+fork%3Atrue&type=repositories)
* [User Scripts that users of mpv have published](https://github.com/mpv-player/mpv/wiki/User-Scripts)

## [mpvacious](https://github.com/Ajatt-Tools/mpvacious)

Make instant Anki cards from movies and TV shows.

* [AUR package](https://aur.archlinux.org/packages/mpv-mpvacious/)
* [Demo video](https://redirect.invidious.io/watch?v=vU85ramvyo4)
* [Video tutorial](https://redirect.invidious.io/watch?v=tkFxnY0mehE)

## [impd](https://github.com/Ajatt-Tools/impd)

Passive listening is one of the key components of the AJATT method,
so it is useful to make it as convenient as possible.
`impd` is a small tool for managing background immersion.
Create condensed audio,
automatically add episodes of TV shows you've watched to your
[mpd](https://wiki.archlinux.org/index.php/Music_Player_Daemon)
playlist,
and archive audio that you've listened to enough times.

* [AUR package](https://aur.archlinux.org/packages/impd-git/)
* [Passive immersion guide](passive-listening.html)

## [GoldenDict](setting-up-goldendict.html)

Goldendict is a libre dictionary program for GNU+Linux and other operating systems.
It offers an easy-to-use interface and supports a variety of dictionary formats.
It allows users to quickly look up words and phrases,
create Anki flashcards,
and can especially help during and after the monolingual transition.

GoldenDict can be enchanced by adding external programs as dictionaries
and displaying their output in the search results.

* [Dictionaries](yomichan-and-epwing-dictionaries.html#mdx)
* [External programs](https://github.com/Ajatt-Tools/gd-tools)

## [qolibri](https://aur.archlinux.org/packages/qolibri/)

A QT-based EPWING dictionary viewer.
Qolibri lets you search multiple EPWING dictionaries at the same time,
so for any word you look up you get a list of different definitions.
Since using a Japanese to Japanese dictionary can be difficult for beginners
being able to see one word described in multiple ways makes it easier
to understand what it really means.

* [Setup guide](setting-up-qolibri.html)
* [Dictionaries](yomichan-and-epwing-dictionaries.html)

External resources:

* [In-Depth J-J Dictionary Walk through](https://redirect.invidious.io/watch?v=D-AfT8XW63w)
* [Making Monolingual Sentence Cards in Real Time](https://redirect.invidious.io/watch?v=BzuLGmkihf4)

## [crqt-ng](https://gitlab.com/coolreader-ng/crqt-ng)

* [Install from the AUR](https://aur.archlinux.org/packages?K=crqt-ng)
* [Reading books](reading-books.html)

## [Rikaitan](setting-up-yomichan.html)

Look up unknown words with the hover of a mouse
and make Anki flashcards with a single click.

* [Setting up Rikaitan](setting-up-yomichan.html)
* [Dictionaries](yomichan-and-epwing-dictionaries.html)

## [ames](https://github.com/Ajatt-Tools/ames)

Anki Media Extractor Script.
Allows you to easily add screenshots and audio recordings to your Anki cards.

* [AUR package](https://aur.archlinux.org/packages/ames/)

## [subs2srs](http://subs2srs.sourceforge.net/)

A small utility that allows you to mass-generate Anki decks
based on your favorite foreign language movies and TV shows
to aid in the language learning process.

* [AUR package](https://aur.archlinux.org/packages?K=subs2srs)
* [FAQ](https://subs2srs.sourceforge.net/#faq)

## Android

Having a mobile device is not strictly necessary for learning Japanese,
but it can be handy.
It can be used to review Anki flashcards when you're not home.
You can use it for passive listening if you load it with
[condensed audio](passive-listening.html#condensing-audio).
Some people are even able to do active immersion on Android,
though I think it's a torture with such a small screen.

Not all Android phones or tablets are safe to use out of the box.
If you do own an Android device, be sure to install
[F-Droid](https://f-droid.org/en/),
which is an application catalog for libre programs.
Liberate your device by flashing a new aftermarket
<abbr title="a third-party operating system that replaces the factory-installed one">ROM</abbr>
with no Google applications.
[GrapheneOS](https://grapheneos.org/) is a popular choice, but requires a compatible phone.
If aftermarket ROMs are not available for your device,
you could at least obtain root access and get rid of Google Play and other Google applications.

F-Droid [can be flashed](https://f-droid.org/en/packages/org.fdroid.fdroid.privileged.ota/)
using TWRP (or other Android recovery)
or installed as a [Magisk](https://github.com/topjohnwu/Magisk) module
to allow for automatic background updates.

Most Android devices can't be fully liberated
because they depend on non-free drivers and firmware.
These drivers control things like Wi-Fi, Bluetooth, GPS, microphone, camera.

Don't buy iThings, you can't install a free OS on them.
Most Anki decks linked on this site come with
[ogg/opus](https://opus-codec.org/) audio
and [webp](https://developers.google.com/speed/webp) images.
These formats are not supported on iThings.

Some people would like to completely reject mobile phones because they are surveillance tools.

**Further information:**

* [Android - Privacy Guides](https://www.privacyguides.org/android/)
* [LineageOS](https://lineageos.org/), a custom ROM that supports many devices.
* [Neo Store](https://f-droid.org/packages/com.machiav3lli.fdroid/) is a more modern F-Droid client.
* [Liberate your device - FSF](https://fsfe.org/activities/android/liberate.en.html)
* [Android and Users' Freedom](https://www.gnu.org/philosophy/android-and-users-freedom.html)
* [Recommended Apps from F-Droid - DivestOS](https://divestos.org/index.php?page=recommended_apps)
* **[Android software for learning Japanese](resources.html#android-software)**
