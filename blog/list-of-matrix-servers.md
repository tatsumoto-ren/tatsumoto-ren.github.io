# List of Matrix servers

[Matrix](https://wiki.archlinux.org/index.php/Matrix)
is a FLOSS protocol for open federated instant messaging.
It is used in our Japanese learning community as an alternative to proprietary software such as
[Discord](how-to-save-the-japanese-learning-community.html).
Matrix ecosystem consists of many servers which can be used for registration.
Since many people joining us ask what server to choose, I've made a list.

To use Matrix, install a
[client](https://wiki.archlinux.org/index.php/List_of_applications#Matrix_clients)
first.
One of the most popular clients is
[Element](https://archlinux.org/packages/?name=element-desktop).

****

## Matrix.org users

If you already have an account hosted on Matrix.org,
please create a new account on another homeserver before you join any of
[our rooms](join-our-community.html).
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
Being on a such homeserver is no different from being on Discord.
Take a look at
[Austin Huang's list](https://austinhuang.me/matrix-homeservers.html#list)
to check if a server has unreasonably strict rules.
Keep an eye on the usual things that tend to stink.
For example, if a homeserver is trying to suppress certain political opinions,
restrict you from posting certain types of content
or otherwise impose authoritarian environment.

## Tips for room admins

If you decide to create and manage a large public room,
it is very important that you don't lose access to it.
Always keep at least two admin accounts in the room, each hosted on a **different** homeserver.
If one homeserver goes offline or decides to ban you or *shutdown* your room,
you will still be able to control the room via the other admin account.

The number one thing you should be aware of as a room admin is
[room shutdowns](https://github.com/matrix-org/synapse/blob/develop/docs/admin_api/rooms.md#delete-room-api).
A room shutdown is when a homeserver admin
forces all existing members registered on the homeserver
out of your room
and prevents all future joins.
A room shutdown only affects users on the server that initiated the shutdown.
To minimize possible damage that a shutdown would cause to your room
always tell your members to use homeservers you trust.

Choose a server which runs the latest version of
[Synapse](https://github.com/matrix-org/synapse).
Newer versions give you access to higher
[room versions](https://spec.matrix.org/unstable/rooms/).
To check a server's Synapse version, run the following shell command.
Replace `homeserver.name` with the URL of your homeserver, e.g. `g33k.se`.

```
curl -s 'https://homeserver.name/_matrix/federation/v1/version'
```

Alternatively, paste the server's URL to
[federationtester.matrix.org](https://federationtester.matrix.org/).

It's a good idea to ban certain servers from participating in your room completely, using
[Server ACLs](https://matrix.org/docs/guides/moderation#banning-servers-from-rooms-server-acls).
Server ACLs let you block all accounts registered on unwanted homeservers
from being able to join your room.
The homeserver which gets blocked the most often is, you guessed it, `matrix.org`.

## Recommendations

* [A list of homeservers](https://glowers.club/wiki/doku.php?id=wiki:homeservers)
recommended by
[Glowers Club](https://glowers.club/wiki/):
	* [thisisjoes.site](https://thisisjoes.site/) `matrix.thisisjoes.site`
	* [jews.rip](https://jews.rip/)
	* [kiwifarms.net](https://riot.kiwifarms.net/)
	* [iddqd.social](https://iddqd.social/element/)
	* [200acres.org](https://riot.200acres.org/)
	* [transhumanist.club](https://matrix.transhumanist.club/)
	* [halogen.city](https://halogen.chat/)
	* [nerdsin.space](https://nerdsin.space/)
	* [ubersm.art](https://chat.ubersm.art/)
	* [zygoat.club](https://riot.zygoat.club/) `matrix.zygoat.club`
* Homeservers recommended by [#d:anontier.nl](https://matrix.to/#/#d:anontier.nl):
	* [waifuhunter.club](https://chat.waifuhunter.club/)
	* [nerdsin.space](https://nerdsin.space/)
	* [midov.pl](https://element.midov.pl/element/)
	* [anontier.nl](https://element.anontier.nl/)
	* [ma.neko.bar](https://element.neko.bar/)
	* [cuum.space](https://element.cuum.space/)
* My selection:
	* [cutefunny.art](https://matrixclient.cutefunny.art/)
	* [3000.chat](https://3000.chat/element/)
* Servers run by Japanese people:
	* [fedibird.com](https://matrix.fedibird.com/)
	* [sabakan.industries](https://matrix.sabakan.industries/)
	* [juggler.jp](https://matrix.juggler.jp/)
	* [smith.gdgd.jp.net](https://smith.gdgd.jp.net/)

*Not all the servers may be open for registration at any point of time.*

## Other servers

### Sorted list

Explore the sorted list
[here](https://tatsumoto-ren.github.io/matrix/).

Selection criteria.

* Open registration
* Domain length
* Up-to-date version of Synapse

### Servers that support links to rooms

A separate list for servers that can be used to link rooms.
This is very useful if you want to share a room with someone
but don't want to use `element.io` or `matrix.to` because they are cuckflared.

To link a room append `#/room/#your_room:example.com`
to the instance's Element address,
like this: `https://nerdsin.space/#/room/#djt:g33k.se`.

* https://c.wfr.moe/
* https://nerdsin.space/
* https://matrix.3dns.eu/
* https://riot.ukvly.org/
* https://chat.tomesh.net/
* https://riot.tzchat.org/
* https://element.asra.gr/
* https://webchat.kde.org/
* https://element.im.f3l.de/
* https://element.anontier.nl/
* https://matrix.ffggrz.de/app/
* https://crystal-temple.flak.is/

### With Element

These servers have
[Element](https://web.archive.org/https://element.io/).
It's a web application that you can use to chat
without having to use a desktop client.

* https://g24.at/
* https://mtrx.nz/
* https://c.a2sc.eu/
* https://c.wfr.moe/
* https://uddu.chat/
* https://ahriman.tk/
* https://mx.aire.ml/
* https://chat.crq.ac/
* https://chat.guy.sh/
* https://houtworm.im/
* https://chat.usr.nz/
* https://mxs.riot.im/
* https://ngonbay.com/
* https://chat.leel.ch/
* https://chat.rye.dev/
* https://halogen.chat/
* https://im.skytel.ee/
* https://mazc.riot.im/
* https://unita.online/
* https://web.synod.im/
* https://talk.comm.cx/
* https://cardy.riot.im/
* https://chat.gould.cx/
* https://chat.vyas.net/
* https://gnome.riot.im/
* https://nerdsin.space/
* https://riot.kudos.im/
* https://riot.pcg.life/
* https://riot.zorc.xyz/
* https://salty.riot.im/
* https://app.nitro.chat/
* https://chat.eforah.nl/
* https://chat.mmoya.org/
* https://element.42l.fr/
* https://chat.thorko.de/
* https://matrix.btln.de/
* https://my.m4tr1x.chat/
* https://matrix.3dns.eu/
* https://riot.ukvly.org/
* https://chat.tomesh.net/
* https://chat.ubersm.art/
* https://chat.utwente.io/
* https://chat.zelchat.de/
* https://matrix.mlp.chat/
* https://el.aria-net.org/
* https://element.1984.cz/
* https://riot.downey.net/
* https://element.asra.gr/
* https://im.solokeys.com/
* https://matrix.abigo.de/
* https://matrix.nwca.xyz/
* https://riot.tzchat.org/
* https://webchat.kde.org/
* https://matrix.ffggrz.de/
* https://chat.catgirl.biz/
* https://element.fff.chat/
* https://riot.zygoat.club/
* https://matrix.jdsoft.de/
* https://chat.sp-codes.de/
* https://matrix.n3xus.one/
* https://matrix.boba.chat/
* https://element.envs.net/
* https://matrix.dfc.world/
* https://element.hope.net/
* https://riot.backstop.it/
* https://element.kif.rocks/
* https://3000.chat/element/
* https://chat.oscillas.com/
* https://element.eclabs.de/
* https://element.im.f3l.de/
* https://element.myserv.me/
* https://element.pwoss.org/
* https://element.trygve.me/
* https://chat.freakachu.org/
* https://element.avlikos.gr/
* https://riot.kiwifarms.net/
* https://riot.matrix-jp.net/
* https://element.nltrix.net/
* https://riot.scamdemic.wtf/
* https://chat.queersin.space/
* https://webchat.freitrix.de/
* https://mailstation.de/riot/
* https://the-apothecary.club/
* https://chat.fairydust.space/
* https://chat.michel-slm.name/
* https://element.matrix4ulm.de/
* https://riot.qonfucius.social/
* https://crystal-temple.flak.is/
* https://element.fatherjim.tech/
* https://chat.synistersyntax.com/
* https://element.privacytools.io/
* https://element.thisisjoes.site/
* https://matrix.pancrypticon.net/
* https://element.matthewgall.chat/
* https://element.midov.pl/element/
* https://grid.rrze.fau.de/riotweb/
* https://ma.neko.bar/_matrix/client/

### Without Element

These Matrix servers don't offer the web interface,
but you can still register an account.
Install one of the clients listed on
[Arch Wiki](https://wiki.archlinux.org/index.php/List_of_applications#Matrix_clients),
press "create account", then find advanced options
and change the server from the default to the one you want.

* https://mcl.gg/
* https://brad.li/
* https://jn2p.de/
* https://kvbx.de/
* https://stop.pe/
* https://llit.eu/
* https://zoit.net/
* https://pcg.life/
* https://oblak.be/
* https://zinz.dev/
* https://causa.li/
* https://kuvio.de/
* https://cirk2.de/
* https://vacci.ne/
* https://m.edw.ai/
* http://rthome.me/
* https://bau-ha.us/
* http://kanik0.wtf/
* https://darvit.nl/
* https://furry.lol/
* https://koehn.com/
* https://nibbana.jp/
* https://dalek.zone/
* https://lostpod.me/
* https://ramrod.top/
* https://lomnik.net/
* https://willy.club/
* https://home55.net/
* https://m.webgo.de/
* https://kahakai.de/
* http://im.tnode.eu/
* https://tusooa.xyz/
* https://phoxden.net/
* https://chatmud.com/
* https://secureim.de/
* https://cakeboss.it/
* https://spodeli.org/
* https://blacksec.de/
* https://malooma.bzh/
* https://geese.party/
* https://xentonix.net/
* https://xentonix.net/
* https://lolifan.club/
* https://halogen.city/
* https://kotilo.dy.fi/
* https://calcuode.com/
* https://hemmerle.dev/
* https://unita.online/
* https://converser.eu/
* https://matrix.lrn.fm/
* https://dunstkreis.ch/
* https://chat.filik.eu/
* https://m.deadcrab.de/
* https://im.su.cvut.cz/
* https://matrix.fuz.re/
* http://matrix.lod.com/
* https://shirokumo.net/
* https://vanpetegem.me/
* https://marxwatch.org/
* https://matrix.pi2.dev/
* https://drastical.tech/riot/
* https://matrix.phcn.de/
* https://matrix.dhp.com/
* https://matrix.bits.at/
* https://duncanturk.com/
* https://matrix.nikel.me/
* https://matrix.ohea.xyz/
* https://matrix.goe.land/
* https://chat.avlikos.gr/
* https://matrix.neko.dev/
* https://matrix.cirr.com/
* https://matrix.altay.fr/
* https://matrix.sebdu.de/
* https://matrix.jarno.ca/
* https://matrix.nx-pod.de/
* https://matrix.v-lan.org/
* https://pancrypticon.net/
* https://matrix.jhell.org/
* https://matrix.sensin.eu/
* https://matrix.muehml.eu/
* https://matrix.senan.xyz/
* https://matrix.privex.io/
* https://matrix.puhoy.net/
* https://matrix.nesven.eu/
* https://matrix.lukamb.de/
* https://matrix.jling.dev/
* https://matrix.complb.de/
* https://matrix.bda.space/
* https://chat.twomoons.de/
* https://matrix.dapor.net/
* https://synapse.chefst.de/
* https://matrix.radres.xyz/
* https://matrix.sibnsk.net/
* https://matrix.sykorp.com/
* https://sixgorillion.club/
* https://matrix.thegolem.cz/
* https://nekomimi.solutions/
* https://roleplaygateway.com/
* https://matrix.chaospott.de/
* https://matrix.unknown.place/
* https://matrix.danyocean.com/
* https://matrix.get-racing.de/
* https://matrix.un-hack-bar.de/
* https://matrix.intahnet.co.uk/
* https://matrix.fatherjim.tech/
* https://matrix.magnumchaos.org/

Tags: matrix
