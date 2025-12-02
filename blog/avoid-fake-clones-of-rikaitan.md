---
title: Avoid fake clones of Rikaitan
date: 1687713455
---

There's a fake fork of Rikaitan that's spreading.
This article explains what happened after the previous version was abandoned,
why the clone is untrusted,
and what we (AJATT) are doing to protect the Rikaitan project.

****

If you started learning Japanese before 2023, you probably remember that
[AJATT](whats-ajatt.html) used to recommend a browser extension called *Yomichan*.
It is a browser extension that shows pop-up dictionary lookups on web pages.
It no longer exists under that name.
The successor fork is [Rikaitan](setting-up-yomichan.html).

Yomichan was created and maintained by a third-party developer unrelated to AJATT.
That project was killed by its creator.
On **Feb 26, 2023**, he recklessly abandoned it,
which later led to a hijack attempt by a malicious group who gained attention through spamming.
The creator could have selected a number of trusted people and assigned them as admins of the GitHub repository,
but he chose not to, which was irresponsible.

At Ajatt-Tools, we decided to fork the extension and continue maintaining it.
Now Rikaitan is the successor to the original extension.
Rikaitan is free/libre software.
The AJATT community maintains it, and anyone can contribute.

Recently, a clone of Rikaitan has been gaining popularity under a different name and logo.
I used to avoid mentioning that clone,
but unfortunately,
other bad actors are promoting it,
so this warning is necessary.
The clone is not endorsed by us and should be avoided.
If you see a browser extension with this logo, stay away from it.
If someone recommends it to you, send them this article.
Do not mention its name anywhere on the Internet.
Say "Rikaitan" if you agree the hijack should fail.

<p align="center"><img style="min-width: 128px; height: auto;" alt="fake clone logo" src="img/fake-rikaitan-clone.svg"></p>
<p align="center"><i>The logo the Fake clone uses.</i></p>

After Yomichan was abandoned,
a malicious group attempted to hijack the project.
The AJATT community resisted by creating and maintaining Rikaitan.
The fake clone is associated with a hostile online group of Japanese learners
that has a history of spamming, targeted raids, and other abusive behavior
toward other language-learning communities.
They have attacked AJATT,
and even raided and spammed our chat group.
They also promote [nonfree (proprietary) software](https://www.gnu.org/proprietary/proprietary.html), which is often malware.
For these reasons,
we consider them **untrustworthy**,
we will not allow them to hijack Rikaitan,
and we will not trust them to maintain any forks.
At Ajatt-Tools,
we are committed to fighting this hijack.

They recently tried to obscure their origins by creating a separate GitHub organization,
but the same people still run it,
so the attempt did not deceive anyone.

When Yomichan was abandoned,
that group immediately forked it and began spamming and advertising their fork.
That helped them attract attention and some users.
Their apparent goal is to hijack development to promote their flawed language-learning method and,
eventually, include some form of malware.
When bad actors control important tools,
it harms security and damages legitimate forks that never intended a takeover.

Initially,
Ajatt-Tools did not plan to create Rikaitan because we're involved in many other projects.
We were forced to maintain Rikaitan to resist the hijack.

Many former Yomichan contributors were misled by the group's shilling,
and some even contributed to the clone's fake GitHub repository with good intent.
To keep Rikaitan up to date,
we merged some of those changes back into Rikaitan,
similar to how LibreWolf pulls changes from Firefox.
Every commit was scanned and any potential malware was removed.
