---
title: How do I change an environment variable?
date: 1683666551
tags: ['faq']
---

In the [guide](table-of-contents.html)
I sometimes instruct to set or change environment variables.
Environment variables provide a way to store simple settings
that can be accessed and used by various programs and scripts running on the system.
Changing environment variables is a common task for users,
and it can be done in different ways.
I'm going to present you the easiest way, and you can read about other ways on Arch Wiki.

****

First, determine what shell you have installed by executing `echo $SHELL` in the terminal.
If you have `bash`, open the `~/.bash_profile` file.
If you have `zsh`, open the `~/.zprofile` file.

Next, add the setting you want to add to the file.
For example, the line below changes the default text editor to
[nvim](https://wiki.archlinux.org/title/Neovim):

```
export EDITOR="nvim"
```

Save the file, then **relogin** or **reboot**
because the profile file is read only once per user session.

To learn more, read
[Environment varialbes on Arch Wiki](https://wiki.archlinux.org/title/Environment_variables).
For example,
another way to set environment variables that may be interesting
is to add them to the `/etc/environment` file.
You need root privileges to edit this file.
The variables will be set globally, for every user in the system.
