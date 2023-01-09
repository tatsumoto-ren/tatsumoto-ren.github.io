---
title: How do I add a directory to the PATH?
date: 1673282846
tags: ['faq']
position: -9896
---

Let's say you want to add `~/.local/bin` to the PATH.
According to
[Arch Wiki](https://wiki.archlinux.org/title/Environment_variables#Per_user),
to add a directory to the PATH for local usage, put following in `~/.bash_profile`:

```
export PATH="${PATH}:${HOME}/.local/bin"
```

Replace `${HOME}/.local/bin` with the path of the directory you want to add.

If you use
[zsh](https://wiki.archlinux.org/title/Zsh),
instead of `~/.bash_profile` edit `~/.zprofile`.
