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

### [A list of homeservers](https://glowers.club/wiki/doku.php?id=wiki:homeservers) recommended by [Glowers Club](https://glowers.club/wiki/)
| Server                   | Web client                                          | Extra |
| :---                     | :---                                                | :---  |
| `matrix.thisisjoes.site` | [thisisjoes.site](https://element.thisisjoes.site/) |       |
| `matrix.kiwifarms.net`   | [kiwifarms.net](https://riot.kiwifarms.net/)        | 🏆    |
| `halogen.city`           | [halogen.city](https://halogen.chat/)               | 🏆    |
| `nerdsin.space`          | [nerdsin.space](https://nerdsin.space/)             | 🏆    |
| `matrix.zygoat.club`     | [zygoat.club](https://riot.zygoat.club/)            | 🏆    |

### Homeservers recommended by [#d:anontier.nl](https://matrix.to/#/#d:anontier.nl):

| Server             | Web client                                            | Extra |
| :---               | :---                                                  | :---  |
| `waifuhunter.club` | [waifuhunter.club](https://chat.waifuhunter.club/)    | 🏆    |
| `midov.pl`         | [midov.pl](https://element.midov.pl/element/)         | 🏆    |
| `anontier.nl`      | [anontier.nl](https://element.anontier.nl/)           |       |

### My selection

| Server                  | Web client                                                  | Extra |
| :---                    | :---                                                        | :---  |
| `cutefunny.art`         | [cutefunny.art](https://matrixclient.cutefunny.art/)        | 🏆    |
| `matrix.linuxdelta.com` | [linuxdelta.com](https://element.linuxdelta.com/)           | 🏆    |
| `kde.org`               | [kde.org](https://webchat.kde.org/)                         |       |
| `m.wfr.moe`             | [wfr.moe](https://c.wfr.moe/)                               |       |
| `sakura.ci`             | None                                                        |       |
| `iddqd.chat`            | [iddqd.chat](https://iddqd.chat/)                           |       |
| `maeli.net`             | None                                                        |       |
| `trygve.me`             | [trygve.me](https://element.trygve.me/)                     |       |
| `nltrix.net`            | [nltrix](https://element.nltrix.net/)                       |       |
| `nitro.chat`            | [nitro.chat](https://app.nitro.chat/)                       |       |
| `cuteworld.space`       | [element.cuteworld.space](https://element.cuteworld.space/) |       |

### Servers run by Japanese people

| Server                | Web client                                       | Extra |
| :---                  | :---                                             | :---  |
| `matrix.fedibird.com` | [fedibird.com](https://element.fedibird.com/)    | 🏆    |
| `matrix.juggler.jp`   | [juggler.jp](https://matrix-element.juggler.jp/) |       |

Source: [matrix-room-list-jp](https://matrix-room-list-jp.netlify.app/)

## Do not use

The list contains popular servers that have proven themselves unreliable.
A server is added to this list if it has been caught banning user accounts
or rooms without prior notice.

| Server                         | Information                                                                                          |
| :---                           | :---                                                                                                 |
| `matrix.org`                   | Explained above.                                                                                     |
| `*.modular.im` or `*.ems.host` | Affiliated with matrix.org.                                                                          |
| `tchncs.de`                    | Admin blocked rooms in pursuit of censorship.                                                        |
| `asra.gr`                      | Admin deactivated users' accounts after receiving fake reports.                                      |
| `3000.chat`                    | Admin deactivated users' accounts after receiving fake reports.                                      |
| `lolisho.chat`                 | Admin deactivated users' accounts for no apparent reason. Admin leaked IP addresses of some users.   |
| `synod.im`                     | Admin deactivated users' accounts for no apparent reason.                                            |
| `utwente.io`                   | Admin deactivated users' accounts for no apparent reason.                                            |
| `envs.net`                     | Admin blocked rooms in pursuit of censorship.                                                        |

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
like this: `https://matrix.dalek.zone/#/room/#djtspace.g33k.se`.

* https://element.fablabchemnitz.de/
* https://c.wfr.moe/
* https://riot.ukvly.org/
* https://riot.tzchat.org/
* https://element.asra.gr/
* https://webchat.kde.org/
* https://element.anontier.nl/
* https://crystal-temple.flak.is/
* https://element.linuxdelta.com/ 🏆
* https://matrix.dalek.zone/
* https://im.tetaneutral.net/
* https://element.ggc-project.de/
* https://matrix.3dns.eu/ 🏆
* https://nerdsin.space/ 🏆
* https://www.jabawok.net/riot/

### With Element

These servers have
[Element](https://web.archive.org/https://element.io/).
It's a web application that you can use to chat
without having to use a desktop client.

* https://chat.darkcloud.ca/
* https://element.georgefloyd.link/
* https://chat.cfx.re/ 🏆
* https://halogen.chat/ 🏆
* https://element.cpn.so/ 🏆
* https://matrix.dpin.de/ 🏆
* https://chat.vscape.tk/ 🏆
* https://matrix.radu.at/ 🏆
* https://matrix.3dns.eu/ 🏆
* https://chat.mistli.net/ `matrix.mistli.net` 🏆
* https://fsoc.lol/matrix/ 🏆
* https://riot.shendai.rip/ 🏆
* https://chat.mypagenow.de/ 🏆
* https://matrix.okoyono.de/ 🏆
* https://element.avlikos.gr/ 🏆
* https://element.entr0py.de/ 🏆
* https://chat.inscomers.net/ 🏆
* https://element.efertone.me/ 🏆
* https://matrix.pittamitz.at/ 🏆
* https://matrix.dandl.bayern/ 🏆
* https://matrix.quickbrb.com/ 🏆
* https://chat.samtripoli.com/ 🏆
* https://chat.dresden.network/ 🏆
* https://element.crossbach.de/ 🏆
* https://element.schaeferit.de/ 🏆
* https://matrix.patricknour.de/ 🏆
* https://element.tinternet.net/ 🏆
* https://www.schotty.com/matrix/ 🏆
* https://matrix.pancrypticon.net/ 🏆
* https://element.radiowarnerd.org/ 🏆
* https://element.fablabchemnitz.de/ 🏆
* https://matrix-client.seditio.xyz/ 🏆
* https://element.divided-by-zero.eu/ 🏆
* https://comf.chat/
* https://element.liberta.casa/
* https://element.okash.it/
* https://web.yuri.im/
* https://matrix.base8.org/
* https://unita.online/
* https://chat.zelchat.de/
* https://element.rptc.bid/
* https://chat.peek-a-boo.at/
* https://element.cccgoe.de/
* https://mx.aire.ml/
* https://matrix.therealblue.de/
* https://element.internet-portal.cz/
* https://element.nobelium.no/
* https://element.w1l.duckdns.org/
* https://chat.leon.wtf/
* https://matrix.club-tech.fr/
* https://chat.joinpoint.org/
* https://element.simonetti.nl/
* https://www.schotty.com/
* https://matrix.riotcat.org/
* https://chat.thorko.de/
* https://chat.cambsac.org.uk/
* https://cell.linuxbrujo.net/
* https://matrix.n2n.io/
* https://chat.das-labor.org/
* https://element.lion.fm/
* https://element.sebdu.de/
* https://okaris.de/
* https://element.juniorjpdj.pl/
* https://matrix.dalek.zone/
* https://chat.greensteps.cn/
* https://element.matrix4ulm.de/
* https://c.a2sc.eu/
* https://c.wfr.moe/
* https://uddu.chat/
* https://ahriman.tk/
* https://mx.aire.ml/
* https://chat.crq.ac/
* https://chat.guy.sh/
* https://chat.usr.nz/
* https://mxs.riot.im/
* https://ngonbay.com/
* https://chat.leel.ch/
* https://chat.rye.dev/
* https://im.skytel.ee/
* https://mazc.riot.im/
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
* https://riot.ukvly.org/
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
* https://chat.catgirl.biz/
* https://element.fff.chat/
* https://riot.zygoat.club/
* https://matrix.jdsoft.de/
* https://matrix.n3xus.one/
* https://matrix.boba.chat/
* https://element.hope.net/
* https://riot.backstop.it/
* https://element.kif.rocks/
* https://3000.chat/element/
* https://chat.oscillas.com/
* https://element.eclabs.de/
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
* https://riot.qonfucius.social/
* https://crystal-temple.flak.is/
* https://element.fatherjim.tech/
* https://chat.synistersyntax.com/
* https://element.privacytools.io/
* https://element.thisisjoes.site/
* https://element.matthewgall.chat/
* https://element.midov.pl/element/
* https://grid.rrze.fau.de/riotweb/

### Without Element

These Matrix servers don't offer the web interface,
but you can still register an account.
Install one of the clients listed on
[Arch Wiki](https://wiki.archlinux.org/index.php/List_of_applications#Matrix_clients),
press "create account", then find advanced options
and change the server from the default to the one you want.

* https://p3a.io/ 🏆
* https://l12c.eu/ 🏆
* https://fick.es/ 🏆
* https://javil.eu/ 🏆
* https://bmw12.nl/ 🏆
* https://cisek.ca/ 🏆
* https://group.lt/ 🏆
* https://whyc.dev/ 🏆
* https://hirt.dev/ 🏆
* https://kleph.eu/ 🏆
* https://rage.lol/ 🏆
* https://linkor.io/ 🏆
* https://prmxcl.fr/ 🏆
* https://lodere.es/ 🏆
* https://faelix.im/ 🏆
* https://ruzik.xyz/ 🏆
* https://denshi.org/ 🏆
* https://mat.amo.ms/ 🏆
* https://obermui.de/ 🏆
* https://kssler.win/ 🏆
* https://zangief.nl/ 🏆
* https://priv8.chat/ 🏆
* https://banber.org/ 🏆
* https://3x3cut0r.de/ 🏆
* https://jfrumen.com/ 🏆
* https://im.tnode.eu/ 🏆
* https://syz7ygy.org/ 🏆
* https://www.hellug.gr/
* https://citadel7.org/ 🏆
* https://rawbit.ninja/ 🏆
* https://lukas.studio/ 🏆
* https://curved.space/ 🏆
* https://lolison.chat/ 🏆
* https://ellipsys.xyz/ 🏆
* https://halogen.city/ 🏆
* https://cl0secall.net/ 🏆
* https://juniorjpdj.pl/ 🏆
* https://matrix.47q.de/ 🏆
* https://mittelwind.de/ 🏆
* https://tricuties.com/ 🏆
* https://matrix.fuz.re/ 🏆
* https://matrix.erh.se/ 🏆
* https://canarynet.xyz/ 🏆
* https://matrix.fuz.re/ 🏆
* https://matrix.lorf.io 🏆
* https://matrix.dnix.de/ 🏆
* https://chat.thorko.de/ 🏆
* https://im.memnonic.at/ 🏆
* https://fatherjim.tech/ 🏆
* https://matrix.jrop.me/ 🏆
* https://swirl.funny.cl/ 🏆
* https://elsmussols.net/ 🏆
* https://kansanvalta.org/ 🏆
* https://matrix.rptc.bid/ 🏆
* https://matrix.cirk2.de/ 🏆
* https://freedommuse.org/ 🏆
* https://matrix.wfrei.de/ 🏆
* https://matrix.daspr.io/ 🏆
* https://matrix.knax.xyz/ 🏆
* https://matrix.dnlr.org/ 🏆
* https://schaffarzik.net/ 🏆
* https://chat.jit.social/ 🏆
* https://tetaneutral.net/ 🏆
* https://matrix.asger.xyz/ 🏆
* https://plus-sensible.me/ 🏆
* https://matrix.osm8.tech/ 🏆
* https://matrix.jhell.org/ 🏆
* https://skylinetv.stream/ 🏆
* https://chat.twomoons.de/ 🏆
* https://matrix.ladiv.org/ 🏆
* https://matrix.ravc.tech/ 🏆
* https://matrix.cs-syd.eu/ 🏆
* https://matrix.vleij.com/ 🏆
* https://matrix.kvych.net/ 🏆
* https://vanderwarker.dev/ 🏆
* https://matrix.rakozy.us/ 🏆
* https://matrix.glargh.fr/ 🏆
* https://matrix.nesven.eu/ 🏆
* https://beckendoktor.com/ 🏆
* https://matrix.jibby.org/ 🏆
* https://matrix.elwms.org/ 🏆
* https://matrix.nesven.eu/ 🏆
* https://pancrypticon.net/ 🏆
* https://matrix.neaweb.ch/ 🏆
* https://matrix.dapor.net/ 🏆
* https://matrix.asger.xyz/ 🏆
* https://matrix.lasi-it.de/ 🏆
* https://matrix.dificen.to/ 🏆
* https://matrix.binwang.me/ 🏆
* https://matrix.mfietze.de/ 🏆
* https://matrix.huneck.net/ 🏆
* https://matrix.znurre.com/ 🏆
* https://matrix.cabaal.net/ 🏆
* https://matrix.truhost.eu/ 🏆
* https://matrix.prof-x.net/ 🏆
* https://matrix.codenic.de/ 🏆
* https://matrix.poweron.dk/ 🏆
* https://matrix.lazzurs.ie/ 🏆
* https://definitionhub.com/ 🏆
* https://matrix.sumill.com/ 🏆
* https://matrix.keiron.xyz/ 🏆
* https://matrix.grusbv.com/ 🏆
* https://matrix.hemmnet.de/ 🏆
* https://matrix.apiks.world/ 🏆
* https://matrix.emri.online/ 🏆
* https://matrix.hofra.rocks/ 🏆
* https://matrix.arakimo.net/ 🏆
* https://matrix.troback.com/ 🏆
* https://matrix.alucryd.xyz/ 🏆
* https://matrix.flick-it.de/ 🏆
* https://neuland.technology/ 🏆
* https://matrix.pangrand.fr/ 🏆
* https://matrix.net4sec.com/ 🏆
* https://chatencriptado.com/ 🏆
* https://matrix.dabbill.com/ 🏆
* https://matrix.hishobo.com/ 🏆
* https://matrix.tmiland.com/ 🏆
* https://matrix.i-taros.net/ 🏆
* https://netrunner-vault.de/ 🏆
* https://matrix.genscorp.es/ 🏆
* https://matrix.racistism.tk 🏆
* https://matrix.netcavy.net/ 🏆
* https://matrix.net4sec.com/ 🏆
* https://matrix.zeronyms.com/ 🏆
* https://matrix.nord.digital/ 🏆
* https://chat.deprecated.org/ 🏆
* https://matrix.catchra.host/ 🏆
* https://matrix.dunkklar.org/ 🏆
* https://matrix.kengstrom.se/ 🏆
* https://matrix.googboog.com/ 🏆
* https://matrix.telesight.nl/ 🏆
* https://matrix.chaospott.de/ 🏆
* https://matrix.spectreos.de/ 🏆
* https://matrix.caracals.org/ 🏆
* https://matrix.interhop.org/ 🏆
* https://matrix.heiming.info/ 🏆
* https://gottliebtfreitag.de/ 🏆
* https://matrix.zenocyne.com/ 🏆
* https://matrix.solonari.net/ 🏆
* https://matrix.petrutoni.nl/ 🏆
* https://matrix.zoz-serv.org/ 🏆
* https://matrix.aaronhess.xyz/ 🏆
* https://matrix.csrichter.com/ 🏆
* https://matrix.marshall.haus/ 🏆
* https://matrix.jerrycrazy.be/ 🏆
* https://matrixtest.strits.dk/ 🏆
* https://matrix.foreskin.tips/ 🏆
* https://matrix.danyocean.com/ 🏆
* https://matrix.jjgadget.tech/ 🏆
* https://matrix.optoutpod.com/ 🏆
* https://matrix.linuxbrujo.net/ 🏆
* https://matrix.wolfwarrior.de/ 🏆
* https://sergiotarxz.hopto.org/ 🏆
* https://matrix.thecovrigs.net/ 🏆
* https://matrix.familyhainz.de/ 🏆
* https://matrix.muensterhack.de/ 🏆
* https://matrix.otonokizaka.moe/ 🏆
* https://matrix.mueller.network/ 🏆
* https://matrix.loutre-noire.fr/ 🏆
* https://riot.markshorten.co.uk/ 🏆
* https://matrix.aviancarrier.de/ 🏆
* https://matrix.adamcogswell.com/ 🏆
* https://matrix.lars-mielchen.de/ 🏆
* https://matrix.budem.de/_matrix/ 🏆
* https://matrix.leipzigesports.de/ 🏆
* https://matrix.gears-gadgets.com/ 🏆
* https://slipstream.thebell.house/ 🏆
* https://matrix.niveau-keller.com/ 🏆
* https://synapse.mateuszreszka.xyz/ 🏆
* https://matrix.restitutor-orbis.eu/ 🏆
* https://bridge.slashengineering.com/ 🏆
* https://matrix.antoine-langlois.net/ 🏆
* https://matrix.archgang.xyz/_matrix/static/ 🏆
* https://llllllllllllllllllllllllllllllllllllllllllllllll.space/ 🏆
* https://mcl.gg/
* https://brad.li/
* https://jn2p.de/
* https://kvbx.de/
* https://stop.pe/
* https://llit.eu/
* https://zoit.net/
* https://pcg.life/
* https://oblak.be/
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
* https://ramrod.top/
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
* https://blacksec.de/
* https://malooma.bzh/
* https://geese.party/
* https://xentonix.net/
* https://xentonix.net/
* https://lolifan.club/
* https://kotilo.dy.fi/
* https://calcuode.com/
* https://hemmerle.dev/
* https://converser.eu/
* https://dunstkreis.ch/
* https://chat.filik.eu/
* https://m.deadcrab.de/
* https://im.su.cvut.cz/
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
* https://matrix.jarno.ca/
* https://matrix.nx-pod.de/
* https://matrix.v-lan.org/
* https://matrix.jhell.org/
* https://matrix.sensin.eu/
* https://matrix.muehml.eu/
* https://matrix.senan.xyz/
* https://matrix.privex.io/
* https://matrix.puhoy.net/
* https://matrix.lukamb.de/
* https://matrix.jling.dev/
* https://matrix.complb.de/
* https://matrix.bda.space/
* https://chat.twomoons.de/
* https://synapse.chefst.de/
* https://matrix.radres.xyz/
* https://matrix.sibnsk.net/
* https://matrix.sykorp.com/
* https://sixgorillion.club/
* https://matrix.thegolem.cz/
* https://nekomimi.solutions/
* https://roleplaygateway.com/
* https://matrix.unknown.place/
* https://matrix.danyocean.com/
* https://matrix.get-racing.de/
* https://matrix.intahnet.co.uk/
* https://matrix.fatherjim.tech/
