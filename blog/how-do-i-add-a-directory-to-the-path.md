---
title: How do I add a directory to the PATH?
date: 1673282846
tags: ['faq']
position: -9896
---

Let's say you want to add `~/.local/bin` to the PATH.
According to
[Arch Wiki](https://wiki.archlinux.org/title/Environment_variables#Per_user),
to add a directory to the PATH for local usage, add or edit the following
[environment variable](how-do-i-change-an-environment-variable.html):

```
export PATH="${PATH}:${HOME}/.local/bin"
```

Replace `${HOME}/.local/bin` with the path of the directory you want to add.
