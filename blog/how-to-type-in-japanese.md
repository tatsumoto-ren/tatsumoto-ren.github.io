---
title: How to type in Japanese
date: 1640684087
tags: [guide, ime]
---

<p align="center">
<img alt="Japanese keyboard" src="img/keyboard.webp" style="width: 400px;">
</p>

Ever wondered how Japanese people type?
No one knows the answer.
Some people say that they use huge keyboards with hundreds of keys like on the picture.
Luckily for us, we don't have to imitate Japanese people and buy a keyboard like that.
There are programs called **Input Method Editors** (IMEs)
that help us do the same thing on a regular computer keyboard.
With an IME you type Latin letters
and the software automatically converts them to Japanese characters.

Typing words in a dictionary,
searching the web
or talking to people who pretend to be Japanese on the Internet
all require being able to input Japanese characters.
If you're serious about learning Japanese,
you need to learn how to do it.

****

## Japanese input

In [Introduction](introduction-to-learning-japanese.html#writing-systems)
I briefly mentioned what writing systems Japanese has.
Typing in Japanese requires you to be at least somewhat familiar with hiragana, katakana, and kanji.
The writing systems are covered in their own articles.
For now you need to understand that
due to complexity of these writing systems they can't be typed directly.
In order to type in Japanese, you need to install a number of programs on your computer.

## How an IME works

On a PC, the process is as follows.

1) You type a Japanese word in roman letters. For example, `hiiragi`.
2) `ひいらぎ` appears on the screen as the IME immediately converts what you type to kana.
3) To convert `ひいらぎ` to `柊`, the word's kanji form,
you need to press Space and select from a number of choices.
Or you can leave the word as is by pressing Enter.

Japanese people themselves type with
<abbr title="A representation of Japanese in Latin script.">romaji</abbr>
when using a computer keyboard.

Often in Japanese,
a single word can be spelled multiple ways,
and different words can be read the same.
For example, `しんちょう` could be written as `慎重`, or as `身長`.
This is why you may be given multiple options to choose from when you press Space.

Let's walk through how to install a Japanese keyboard in GNU+Linux.
There are actually two components you have to install to set everything up.
One is called an Input Method Framework (IMF)
and the other one is called an Input Method Editor (IME).
An IMF is a program that allows the user to switch between different IMEs,
whilst the IMEs are responsible for converting Latin characters to Japanese.
You can have several IMEs installed and running at the same time,
but you can only run one IMF at a time.

## Locale

It is possible that your computer would not let you input Japanese
unless your locale is correct.
Set it up following the instructions [here](japanese-locale.html).

## Input method framework

In this tutorial, I'm going to explain how to use
[Fcitx5](https://wiki.archlinux.org/title/Fcitx5) [ˈfaɪtɪks],
but other frameworks are also available.

<details>

<summary>Other IMFs</summary>

[IBus](https://wiki.archlinux.org/title/IBus) is preinstalled in GTK-based environments like GNOME.
If you're using GNOME, chances are that you don't have to configure anything at all.
Just go to the Settings and enable Japanese input.
Because I've had problems getting IBus to work with i3wm, I don't recommend it.

</details>

This is what you need to do.

1) Install Fcitx.
2) Enable Fcitx to run on start up.
3) Install an IME.
4) Configure everything.

To install `Fcitx`, run the following command.

```
sudo pacman -S fcitx5-im
```

* `fcitx5-qt` is needed to use Qt6 applications (like Anki 2.1.50 and later) with Fcitx.
* If you're not running an Arch-based distro, find the appropriate packages in the repositories.

Next on the list, you need to enable autostart.
Assuming you're starting Xorg using
[startx/xinit](https://wiki.archlinux.org/title/Xinit)
like a Chad, the best way to achieve it is to modify `~/.xinitrc`, adding the following lines.

```
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
fcitx5 -dr &
```

Note that the
[xinitrc](https://wiki.archlinux.org/title/Xinit#xinitrc)
file may be located anywhere on your computer, depending on how you set up your
[dotfiles](https://wiki.archlinux.org/title/Dotfiles).
If you have an
[xprofile](https://wiki.archlinux.org/title/Xprofile) file,
and you source it on start up,
it is also possible to put the commands there.
It doesn't really matter which file you put the commands in as long as it is sourced on startup.

If you previously used `localectl`, `setxkbmap`, or X configuration files for
[setting a keyboard layout](https://wiki.archlinux.org/title/Xorg/Keyboard_configuration#Setting_keyboard_layout),
edit or remove those settings because key bindings set via Xorg will interfere with Fcitx.
You need to disable the key bindings you plan to use in Fcitx.
For example, to disable the config file created by `localectl`, run:

```
sudo mv /etc/X11/xorg.conf.d/00-keyboard.conf{,.old}
```

Also,
check other config files located in `/etc/X11/` or `/etc/X11/xorg.conf.d`.
If you have `setxkbmap` commands in your `xinitrc`, edit them as well.

**Note:** You can look at the contents of my `xinitrc` file
[here](https://github.com/tatsumoto-ren/dotfiles/blob/main/.config/x11/xinitrc).
I run [this script](https://github.com/tatsumoto-ren/dotfiles/blob/main/.config/x11/keyboard_layouts)
on startup to automatically start Fcitx when I log in.

## Input method editor

**Note**: [A Wiki page with all input methods](https://fcitx-im.org/wiki/Special:MyLanguage/Input_method_engines#Japanese).

I recommend either KKC or Mozc.

KKC is not as feature-rich as Mozc,
but it offers a more plug-and-play experience.

Install [fcitx5-kkc](https://archlinux.org/packages/?name=fcitx5-kkc).

```
$ sudo pacman -S fcitx5-kkc
```

Although Mozc originates from Google Japanese Input, it is free/libre.

Install [fcitx5-mozc](https://archlinux.org/packages/?name=fcitx5-mozc).

```
$ sudo pacman -S fcitx5-mozc
```

## Configuration

To configure Fcitx, run `fcitx5-configtool`.
You can also launch it from an application launcher like
[Rofi](https://wiki.archlinux.org/title/Rofi).

To add input methods,
type their names into the "Search input method" box.
Input methods usually do not need extra configuration.
If you want to explore their settings,
open the method's menu by clicking the icon that looks like <kbd>☰</kbd> (horizontal lines).

<p align="center"><img src="img/fcitx-configure-input-methods.webp" alt="input methods"></p>
<p align="center"><i>Fcitx settings.</i></p>

By default,
you switch between IMEs with <kbd>Ctrl</kbd>+<kbd>Space</kbd>.
I prefer an add-on called **Input method selector** instead.
In the config tool, remove the default Trigger hotkey.
Then go to "Addon" > "Input method selector", press "Configure" and set Trigger Key.
I use <kbd>Super</kbd>+<kbd>Space</kbd>.

<p align="center"><img src="img/fcitx-configure-im-selector.webp" alt="input methods"></p>
<p align="center"><i>Enable Input method selector.</i></p>

Alternatively, edit `~/.config/fcitx5/conf/imselector.conf` and set:

```
[TriggerKey]
0=Super+space
```

Now, when you press <kbd>Super</kbd>+<kbd>Space</kbd>,
a menu will appear where you can choose an input method.

<p align="center"><img src="img/fcitx-im-selector.webp" alt="input methods"></p>
<p align="center"><i>Input method selector.</i></p>

## Usage

Using an IME usually means typing what you want,
then pressing <kbd>Space</kbd> to convert it.
Every IME wants you to suffer,
so usage differs slightly between them.
Don't expect the same keyboard shortcuts across IMEs.
Some shortcuts may be missing entirely.

To enable Japanese input in Fcitx,
press <kbd>Super</kbd>+<kbd>Space</kbd> and select it (Kana-kanji, Mozc, etc.).
Or click the Fcitx icon in the taskbar and choose a Japanese input method.

The Kana-kanji keyboard layout has multiple input modes: `あ ア ｱ A Ａ`.

To cycle between Latin input modes, press <kbd>Alt</kbd>+<kbd>L</kbd>.
There are two Direct (Latin) input modes:
Half-width (`English`) and the full-width (`Ｅｎｇｌｉｓｈ`).
Direct Input types letters exactly as they appear on your keyboard, like an English layout.

To cycle between Japanese input modes, press <kbd>Alt</kbd>+<kbd>K</kbd>.
There are three Japanese input modes:
Hiragana (`ひらがな`), katakana (`カタカナ`), and half-width katakana (`ｶﾀｶﾅ`).
Hiragana mode activates the input method editor (IME) as you type
and attempts to interpret your input as Japanese.

Fcitx can remember the input mode you were using, either *per-app* or *per-window*.
Configure this in `fcitx-configtool` > "Global Config" > "Share State Among Window".

## Tips

* Typing with <kbd>Alt</kbd> pressed down forces Latin input.
* When in Hiragana mode,
  pressing <kbd>Alt</kbd>+<kbd>&#96;</kbd> switches to Latin mode.
* KKC: <kbd>Alt</kbd>+<kbd>K</kbd> toggles between hiragana and katakana
  (and their half-width forms).
* KKC: <kbd>Alt</kbd>+<kbd>L</kbd> cycles between full-width and half-width Latin letters.
* Finish and commit edit: <kbd>Enter</kbd>.
* Discard current edit: <kbd>Esc</kbd>.
* Convert, or press again to select a different candidate: <kbd>Space</kbd>.
* Autocomplete: <kbd>Tab</kbd>.
* Navigate candidates: <kbd>Up</kbd> and <kbd>Down</kbd>, or number keys for quick selection.
* Convert to hiragana: <kbd>F6</kbd>.
* Convert to katakana: <kbd>F7</kbd>.
* Convert to half-width katakana: <kbd>F8</kbd>.
* Convert to full-width romaji: <kbd>F9</kbd>.
* Convert to romaji: <kbd>F10</kbd>
* Undo last edit: <kbd>Ctrl</kbd>+<kbd>Z</kbd>.
* [How to type X](how-to-type-x-with-fcitx.html)?

## Android

On Android,
you'll need to download a Japanese keyboard.
To do this, use
the [F-Droid](https://f-droid.org/) catalog.

<p align="center"><img src="img/f-droid-mozc.webp" alt="input methods" style="width: 400px;"></p>
<p align="center"><i>Mozc for Android.</i></p>

Available Japanese input apps:

* [スミレ 日本語キーボード](https://f-droid.org/packages/com.kazumaproject.markdownhelperkeyboard/).
  Sumire is a privacy-first Japanese keyboard for simple, fast typing.
* [Fcitx5](https://f-droid.org/packages/org.fcitx.fcitx5.android/).
  Supports Japanese input via
  the [Anthy Plugin](https://f-droid.org/packages/org.fcitx.fcitx5.android.plugin.anthy).
* [Mozc](https://f-droid.org/en/packages/org.mozc.android.inputmethod.japanese/).
  Mozc's F‑Droid build is old and may have issues on newer Android versions.
* Gboard.
  Google's proprietary app **Gboard** is [malware](https://www.gnu.org/proprietary/proprietary.html).
  If you still choose it,
  **block** the app's internet access to limit telemetry.
  Install it using
  [Aurora Store](https://f-droid.org/en/packages/com.aurora.store/).

Other FOSS keyboards have open issues requesting a Japanese layout:

* [Helium](https://github.com/Helium314/HeliBoard/issues/639)
* [FlorisBoard](https://github.com/florisboard/florisboard/issues/2290)

Once you've installed an input method,
launch the app and follow the instructions to set it up.

Most Japanese people prefer a **12-key layout**.
Here's what the keyboard looks like.
In this layout,
you tap and flick toward the character you want.
Once you get used to it,
it's much faster than the QWERTY layout
because typing words requires fewer total keystrokes.

<p align="center"><img src="img/f-droid-mozc-keyboard.webp" alt="input methods" style="width: 400px;"></p>
<p align="center"><i>Japanese keyboard.</i></p>

* To type the small `っ` character, select `つ`, then tap on the `大⇔小` button and pull up.
* In order to type brackets, simply swipe left and right on the `や` key.
* By default,
  if you simply pressed the `あ` button twice,
  you would end up with `い` instead of `ああ`.
  This happens because the two inputs register as toggling.
  Instead you need to press `あ`, then the right arrow (`>`), then `あ` again.

If you don't like the 12 keys keyboard layout,
you can switch to the QWERTY layout in settings.
