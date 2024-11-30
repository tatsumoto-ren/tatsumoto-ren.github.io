---
title: I Stopped Using Matrix
date: 1732986171
---

I have some exciting news, folks!
You've been asking me to do this for a long time,
and now the moment has finally arrived.
I've decided to discontinue our Matrix community
in favor of a different platform.

****

I started using Matrix in 2018 and became a strong advocate for it in 2020.
In that year,
I created DJT (Daily Japanese Thread),
a Japanese learning community on Matrix
dedicated to talking about the [AJATT](whats-ajatt.html) method of language learning.
For a long time,
I tried to persuade people to join Matrix,
but now it's time to cut my losses and move on.

Matrix has its drawbacks, which isn't surprising.
I've ignored them for quite some time,
but I can't continue doing that.

The reality is that all Matrix clients are hideous.
They are slow,
and every time I open Element,
I have to wait for ages for everything to load.
Some clients fail to load anything at all.
Some clients also consume a lot of RAM.
If a room has many service events (like joins, nickname changes, avatar changes, etc.),
it starts to lag when you try to scroll through the timeline.
As an admin,
you can't clear a room's history with just one click.
Moreover,
if you attempt to redact all messages from a particular user,
which is often necessary when someone posts spam,
you'll be rate-limited by your homeserver,
and eventually,
the room will start lagging.
Meanwhile, [Telegram](https://wiki.archlinux.org/title/Telegram) works instantly.

Most Matrix servers are also awful.
They often have strict and unreasonable rules,
or no rules at all,
and they tend to be very slow.
You can get banned randomly.
I once got banned from a server because the admin ran out of disk space
and started purging people's accounts to reclaim it back.
Servers don't sync properly,
which can leave rooms in conflicting states.
For example,
you might appear as an admin of a room on one server
but as a regular user on another.
Even worse,
your account may be completely absent from a room when viewed from a different server.
There are also many spammers,
and we constantly have to deal with deleting their spam.
Another issue is that people are often reluctant to register on Matrix.
DJT is also available on Telegram, where the community is noticeably more active.

These downsides are well-known, and I've dealt with them for years.
I considered quitting but kept putting it off until now.
The real reason I decided to leave is different from what most people talk about.

What ultimately pushed me to leave Matrix was discovering that
my homeserver's admin was using my account without my consent.
Specifically,
he used some sort of server
[admin API](https://web.archive.org/web/20240619034056if_/https://matrix-org.github.io/synapse/v1.46/admin_api/rooms.html#make-room-admin-api)
to send events to my room under my name
without logging into my account.
To anyone present in the room,
it appeared as though I was sending those events myself.
This is simply insane!
No messaging platform should allow this.
Only you should have access to your account.

This might sound too terrible to be true,
but in fact,
[this article](https://anarc.at/blog/2022-06-17-matrix-notes/#room-admins)
mentions the possibility.

> Room administrators are bound to their Matrix ID which is, in turn, bound to
> their home servers. This implies that a home server administrators could (1)
> impersonate a given user and (2) use that to hijack the room. So in practice,
> the home server is the trust anchor for rooms, not the user themselves.
>
> In an encrypted room even with fully verified members, a compromised or
> hostile home server can still take over the room by impersonating an admin.
> That admin (or even a newly minted user) can then send events or listen on
> the conversations.

When I noticed this happening,
I messaged the server's admin.
At the time,
I was using the `cutefunny.art` homeserver.
Here's what he told me:

> I can understand how it feels a little intrusive,
> but it doesn't invade on peoples privacy, private conversations stay private.

Even if private conversations are encrypted and cannot be tampered with,
I primarily use Matrix for public discussions.
The fact that a room's timeline can be manipulated
to make it appear as though I did something I never actually did
is deeply concerning.

This whole situation shows that Matrix is intrinsically unsafe.
I understand that most Matrix server admins use their power responsibly,
but I think it shouldn't be possible for such abuses to occur in the first place.
It's easy to misuse this power.
I've seen it happen.
There are hundreds of Matrix servers,
and many people choose a server randomly.
If it happened to me,
it could easily happen to someone else as well.

Basically,
if you use Matrix,
you either have to host your own server
or be at the mercy of whoever is hosting it for you.
I think it's unreasonable to expect everyone to host their own server.
Therefore,
the next best option is to find a better place to communicate.
Ideally,
the platform **shouldn't depend on third-party servers for hosting users' data**.
And of course,
only you should have the power to deactivate or remove your account,
which is not the case on Matrix.
There are [many alternatives to Matrix](https://bkil.gitlab.io/secuchart/)
that do not host conversations on servers you can't control.
Good options that I've found include Session and SimpleX.
Since Session doesn't support large groups,
I've decided to move my conversations over to [SimpleX](https://simplex.chat/).

When I decided to create a Japanese learning community in 2020,
I chose both Matrix and Telegram.
The reason I chose Matrix was that other options
(like [Discord](https://spyware.neocities.org/articles/discord))
were unfit due to being proprietary and/or spyware.
The Telegram and Matrix chats have existed somewhat independently of each other,
although we used a [Matrix-to-Telegram bridge bot](https://t2bot.io/telegram/) at some point.
Eventually,
we removed the bot because it caused more inconvenience than it was worth.

For the past few months,
the Matrix community has been largely inactive (despite having over 5,000 members),
while the Telegram community has remained much more vibrant.
This is disappointing given that I have been a strong advocate for using Matrix
and have promoted it widely.
For some reason,
people are not moving to Matrix at the rate I had hoped.
So,
over the past couple of months,
I've been considering telling our members on Matrix to migrate to something else.
The upside is that we won't lose many active members by discontinuing our Matrix community.

If you've been a member of our Matrix chat,
please feel free to [migrate to Telegram](join-our-community.html#our-group) instead.
Additionally,
I recently created a [chat on SimpleX](join-our-community.html#simplex-chat).

The Telegram group has been around since 2020.
There,
you can discuss learning Japanese
and ask our longtime members who already know Japanese for advice.
While it's unfortunate that Telegram's backend is proprietary,
at least you're not running any non-free code on your computer when using the
[FOSS client](https://github.com/telegramdesktop/tdesktop/).

I don't expect SimpleX to become popular anytime soon.
As of 2024,
SimpleX is still in its early stages in terms of features and usability.
However,
since many people refuse to use Telegram
because it requires registering with a phone number,
SimpleX will serve as a viable alternative.

****

Things to read:

* [Matrix notes](https://anarc.at/blog/2022-06-17-matrix-notes/).
* [Possible alternatives to Matrix](https://bkil.gitlab.io/secuchart/).
