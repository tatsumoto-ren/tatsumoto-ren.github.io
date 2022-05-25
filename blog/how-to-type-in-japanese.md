# How to type in Japanese

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

## Input method framework

In this tutorial, I'm going to explain how to use
[Fcitx](https://wiki.archlinux.org/index.php/Fcitx),
but other frameworks are also available.

<details>

<summary>Other IMFs</summary>

[Fcitx5](https://wiki.archlinux.org/title/Fcitx5) is the successor of Fcitx.
Currently, it has issues when working with i3wm and possibly other WMs.
I can't recommend it yet.

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

To install Fcitx, run the following command.

```
$ sudo pacman -S fcitx fcitx-configtool fcitx-qt5 fcitx-qt6
```

Note: `fcitx-qt6` is needed
to use Qt6 applications (like Anki 2.1.50 and later) with Fcitx.

If you're not running an Arch-based distro, find the appropriate packages in the repositories.

Next on the list, you need to enable autostart.
Assuming you're starting Xorg using
[startx/xinit](https://wiki.archlinux.org/title/Xinit)
like a Chad, the best way to achieve it is to modify `~/.xinitrc`, adding the following lines.

```
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS=@im=fcitx
fcitx &
```

Note that the
[xinitrc](https://wiki.archlinux.org/title/Xinit#xinitrc)
file may be located anywhere on your computer depending on how you set up your
[dotfiles](https://wiki.archlinux.org/title/Dotfiles).
If you have an
[xprofile](https://wiki.archlinux.org/title/Xprofile) file,
and you source it on start up,
it is also possible to put the commands there.
It doesn't really matter which file you put the commands to as long as it is sourced on start up.

You can look at the contents of my `xinitrc` file
[here](https://github.com/tatsumoto-ren/dotfiles/blob/main/.config/x11/xinitrc).

## Input method editor

I recommend either KKC or Mozc.

KKC is not as rich as Mozc, but it gives a more plug-and-play experience.

Install [fcitx-kkc](https://archlinux.org/packages/?name=fcitx-kkc).

```
$ sudo pacman -S fcitx-kkc
```

Although Mozc originates from Google Japanese Input, it is free/libre.

Install [fcitx-mozc](https://archlinux.org/packages/?name=fcitx-mozc).

```
$ sudo pacman -S fcitx-mozc
```

## Configuration

To configure Fcitx, run `fcitx-configtool`.
You can also bring it up via an application launcher, like
[Rofi](https://wiki.archlinux.org/title/Rofi).

In the settings, press `+` to add the input methods you want.
Input methods themselves don't require any specific configuration.
In case you want to explore their settings,
KKC can be configured by clicking on the gear icon.

<p align="center"><img src="img/fcitx-configure-input-methods.webp" alt="input methods"></p>
<p align="center"><i>Fcitx settings.</i></p>

To configure Mozc, you need to use the Fcitx's tray icon.

<p align="center"><img src="img/fcitx-configure-mozc.webp" alt="Mozc settings"></p>
<p align="center"><i>How to access Mozc settings.</i></p>

By default, you switch between IMEs by pressing Ctrl+Space.
I prefer to use an add-on called Input method selector instead.
In the config tool, set the trigger hotkey to none by clicking on it and pressing Enter.
Then go to "Addon" > "Input method selector", press "Configure" and set Global SelectKey.
I prefer Super+Space.

<p align="center"><img src="img/fcitx-configure-im-selector.webp" alt="input methods"></p>
<p align="center"><i>Enable Input method selector.</i></p>

Now, when you press Super+Space,
it will bring up a menu where you can choose an input method.

<p align="center"><img src="img/fcitx-im-selector.webp" alt="input methods"></p>
<p align="center"><i>Input method selector.</i></p>

## Usage

Using an IME usually comes down to typing what you want, then pressing Space to convert it.
Every IME wants you to suffer, that's why the way each of them is used slightly differs.
Don't expect keyboard shortcuts to be the same across IMEs.
Some shortcuts may even be missing completely.

## Android

On Android, you need to download a Japanese keyboard.
To do this open the [F-Droid](https://f-droid.org/) catalog,
then in the search bar type `Mozc`.

<p align="center"><img src="img/f-droid-mozc.webp" alt="input methods" style="width: 400px;"></p>
<p align="center"><i>Mozc for Android.</i></p>

Once installed, launch the app and follow the instructions to set it up.

Most Japanese people use a 12 keys type layout.
This is how the keyboard looks like.
You tap and pull toward the character you'd like to input.
Once you get used to it, it's much faster than the QWERTY layout
because typing words requires less total keystrokes.

<p align="center"><img src="img/f-droid-mozc-keyboard.webp" alt="input methods" style="width: 400px;"></p>
<p align="center"><i>Japanese keyboard.</i></p>

To type the small `っ` character, select `つ`, then tap on the `大⇔小` button and pull up.

If you don't like the 12 keys keyboard layout,
you can switch to the QWERTY layout in settings.

Tags: guide
