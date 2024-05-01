---
title: List of Matrix servers
date: 1611943875
tags: ['matrix']
---

[Matrix](https://wiki.archlinux.org/index.php/Matrix)
is a FLOSS protocol for open federated instant messaging.
Matrix ecosystem consists of many servers which can be used for registration.
This is a list of Matrix servers for people
who ask what server to choose to register on.

To use Matrix, install a
[client](https://wiki.archlinux.org/index.php/List_of_applications#Matrix_clients)
first.
One of the most popular clients is
[Element](https://archlinux.org/packages/?name=element-desktop).

If you are new to Matrix, read
[Matrix quickstart guide](matrix-quickstart-guide.html).

****

## Matrix.org users

If you already have an account hosted on Matrix.org,
please deactivate your account
and create a new account on another homeserver immediately.
Matrix.org is the largest Matrix homeserver, and most Matrix apps suggest it by default.
Many users new to Matrix end up using this server because they don't know that other servers exist.
Unfortunately, Matrix.org is far from the best choice.
Due to its absurdly strict rules,
the server is known for frequent bans of rooms and user accounts,
and it does so without prior notice.
Basically, Matrix.org uses its size and special status to impose censorship.

Luckily, changing Matrix homeservers is as easy as switching Email providers.
Below I have a list of servers with less strict terms of service.

<p align="center"><img class="shadow" alt="registration" src="img/element_registration.webp"></p>
<p align="center"><i>Click "Edit".</i></p>

## How to choose

Choose a server that doesn't engage in chaotic account or room purges.
Being on such a homeserver is no different from being on Discord.
If a homeserver has rules, read them to check if they're unreasonably strict.
Keep an eye on the usual things that tend to stink.
For example, if a homeserver is trying to suppress certain political opinions,
restrict you from posting certain types of content
or otherwise [impose authoritarian environment](https://glowers.club/wiki/doku.php?id=jannies).

## Recommendations

Ideally you would host your own homeserver on your own hardware, but not everyone can do that.
This section contains homeservers hand-picked by me and trusted third-parties.
With a 🏆 I marked servers that have received a <span title="ACL ban">trophy of recognition</span> from the Matrix HQ team.

Not all the servers may be open for registration at any point of time.
You may need to Email an admin to get an account.

| Server                   | Web client                                                    | Extra                                                |
| :---                     | :---                                                          | :---                                                 |
| `plan9.rocks`            | None                                                          | [Register here](https://plan9.rocks/register/)       |
| `cutefunny.art`          | [cutefunny.art](https://matrixclient.cutefunny.art/)          | 🏆                                                   |
| `sakura.ci`              | [web.sakura.ci](https://web.sakura.ci/)                       |                                                      |
| `iddqd.chat`             | [iddqd.chat](https://iddqd.chat/)                             | last checked - closed                                |
| `trygve.me`              | [trygve.me](https://element.trygve.me/)                       |                                                      |
| `nitro.chat`             | [nitro.chat](https://app.nitro.chat/)                         |                                                      |
| `midov.pl`               | [midov.pl](https://element.midov.pl/element/)                 | [Register here](https://midov.pl/registerform.sh) 🏆 |
| `w33b.cloud`             | [element.w33b.cloud](https://element.w33b.cloud/)             |                                                      |
| `matrix.thisisjoes.site` | [thisisjoes.site](https://element.thisisjoes.site/)           | last checked - closed                                |
| `eientei.org`            | [matrix.eientei.org](https://matrix.eientei.org/)             |                                                      |
| `matrix.im`              | [element](https://element.matrix.im)                          |                                                      |
| `sibnsk.net`             | [element](https://element.sibnsk.net)                         |                                                      |
| `matrix.unredacted.org`  | [element](https://element.unredacted.org)                     | last checked - closed                                |
| `zelchat.de`             | [chat.zelchat.de](https://chat.zelchat.de/)                   |                                                      |

## Servers run by Japanese people

| Server                | Web client                                       | Extra                    |
| :---                  | :---                                             | :---                     |
| `matrix.fedibird.com` | [fedibird.com](https://element.fedibird.com/)    | 🏆 last checked - closed |
| `matrix.juggler.jp`   | [juggler.jp](https://matrix-element.juggler.jp/) |                          |

Source: [matrix-room-list-jp](https://matrix-room-list-jp.netlify.app/)

## Do not use

The list contains popular servers that have proven themselves unreliable.
A server is added to this list if it has been caught banning user accounts
or rooms without prior notice.

| Server                         | Information                                                                                                                                   |
| :---                           | :---                                                                                                                                          |
| `waifuhunter.club`             | Admin deactivated users' accounts without prior notice.                                                                                       |
| `matrix.org`                   | Explained above.                                                                                                                              |
| `*.modular.im` or `*.ems.host` | Affiliated with matrix.org.                                                                                                                   |
| `tchncs.de`                    | Admin blocked rooms in pursuit of censorship.                                                                                                 |
| `asra.gr`                      | Admin deactivated users' accounts after receiving fake reports.                                                                               |
| `lolisho.chat`                 | Admin deactivated users' accounts for no apparent reason. Admin leaked IP addresses of some users.                                            |
| `synod.im`                     | Admin deactivated users' accounts for no apparent reason.                                                                                     |
| `utwente.io`                   | Admin deactivated users' accounts for no apparent reason.                                                                                     |
| `envs.net`                     | Admin blocked rooms in pursuit of censorship.                                                                                                 |
| `nerdsin.space`                | Admin deactivated users' accounts after receiving fake reports.                                                                               |

A full list that includes less popular servers is available
[here](https://tatsumoto-ren.github.io/matrix/#blocklist).

## Other servers

### Sorted list

I have a sorted list that updates automatically every 12 hours
[here](https://tatsumoto-ren.github.io/matrix/).

Selection criteria.

* Open registration
* Domain length
* Up-to-date version of Synapse

The list is good for fetching new and updated servers,
but there are no guarantees that the results are good.

### Servers that support links to rooms

A separate list for servers that can be used to link rooms.
This is very useful if you want to share a room with someone
but don't want to use `element.io` or `matrix.to` because they are behind cloudflare
or because your room can't be reached via `matrix.to`.

To link a room append `#/room/#your_room:example.com`
to the instance's Element address,
like this: `https://c.wfr.moe/#/room/#djtspace.midov.pl`.

* https://element.fablabchemnitz.de/
* https://riot.ukvly.org/
* https://riot.tzchat.org/
* https://crystal-temple.flak.is/
* https://im.tetaneutral.net/
* https://matrix.eientei.org/
* https://im.tetaneutral.net/
* https://element.arcticfoxes.net/
