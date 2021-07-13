# How to review

Though Anki is an excellent piece of software,
you can learn languages more effectively if you tweak some settings and know how to review.
Even if you're using Anki for something other than studying human languages,
this article may still help you.

****

## Anki settings

Make sure you've applied the settings from the
[Setting up Anki](setting-up-anki.html#anki-settings)
article.
Below is a quick overview.

* Set starting ease to 131%.
It's kind of a magic number.
130% is the lowest possible ease, but Anki **doesn't** allow you to reliably use it.
By bumping it up 1% you avoid the limitation.
Because the Ease effectively becomes locked between 131% and 130%, it can't decrease further.
This way you hijack Anki's default behavior which otherwise would lead to falling into Ease Hell.
* Set Interval Modifier to not less than 190%.
This initial increase counteracts the low Starting Ease.
You can increase it further if your retention is high enough.
I think up to 300% should be fine.
* Enable Anki 2.1 scheduler (`V2` scheduler).
It's a little less limiting, less buggy and more convenient.

## Check your retention

I recommend periodically checking your monthly
[True Retention](useful-anki-add-ons-for-japanese.html#true-retention).
Shift-click on the "Stats" button at the top of the Anki window.
The recommended retention is 75%-90%.
If you see that your retention stays out of these boundaries,
act accordingly.
Decrease your Interval Modifier if your retention is too low, increase if it's high.

## Filtered decks

Don't review in filtered decks.
After experimenting with filtered decks for multiple years
I've come to the conclusion that they're too buggy and too unreliable.
They're only good for temporarily storing cards (in case of backlogs, for example).
Some bugs I've run into completely messed up intervals of my cards.

## Fighting backlogs

This is where filtered decks come handy.
Ideally you want to finish your review every day.
In practice, it's not always possible.
There are going to be days when you accumulate backlogs.
If it happens, your review queue becomes divided between cards that are due today,
most of which you still remember,
and the cards that were due the previous days,
which you've likely forgotten a great number of.

If you were to try to eliminate the backlog
by simply reviewing the cards until no more due cards are left,
Anki would show you the backlogged cards first.
Anki is programmed in a way that makes it prioritize cards
with older due dates over the cards that are due today.
If the backlog is large enough,
this would put you in a long-lasting state of needless forgetting.
If you go along with Anki's algorithm and prioritize relearning forgotten cards,
then you will end up forgetting the cards that were due today,
unless you manage to clear your entire backlog in one sitting.

The solution is to create a filtered deck
and use it to store the cards that became due before today.
To do this, press "F" or go to "Tools" > "Create filtered deck...".

Let's say my Japanese deck is called "Japanese".
The Search field is going to look like this:

```
deck:Japanese is:due -prop:due>-1 -rated:1 -is:learn
```

* `deck:Japanese` limits search to my Japanese deck.
* `is:due` tells Anki to select only due cards.
* `-prop:due>-1` excludes cards due today.
* `-rated:1` excludes cards that were already reviewed today.
* `-is:learn` excludes cards in the learning or relearning queues.

Once you have the filtered deck set up, you've *stopped the bleeding*.
Every day after you've finished your normal reviews come back to the filtered deck
and *decrease* the number of cards it can store.
The cards will be returned to your Japanese deck.
Review those cards.

<p align="center"><img alt="filtered deck" class="shadow" src="img/anki-backlog.webp"></p>
<p align="center"><i>Deck settings.</i></p>

The benefit of using filtered decks for fighting backlogs is that
you don't move any cards yourself.
Once they leave the filtered deck,
they automatically return to the decks they were pulled out from.

## Get the AJT Flexible Grading add-on

AJT Flexible Grading comes with three important features:

* Pass-Fail mode
* Grading from the front side
* The ability to hide some or all answer buttons.

To install the add-on, follow the instructions on AnkiWeb.

<p align="center"><img src="https://raw.githubusercontent.com/Ajatt-Tools/FlexibleGrading/main/img/flexible_grading.webp"></p>

<p align="center"><a class="download_button" href="https://ankiweb.net/shared/info/1715096333">Download</a></p>

## Pass-Fail mode

The Pass-Fail mode essentially doesn't let you press "Hard" and "Easy" buttons.
There are two benefits associated with this.

One being that having to decide between various options
can actually make your Anki study less efficient.
When you're deciding how to grade a card, you're wasting your mental resources.
Do it a hundred times, and you'll experience something called decision fatigue.
Instead of deciding how well you know something simply decide whether you know it or not.

Another being that most Anki users don't understand
what Anki's "Hard" and "Easy" buttons actually do.
Both buttons affect the cards' Ease factor.
Using the "Hard" button can penalize you and greatly add to your review count over time.
Using the "Easy" button can artificially inflate your card scheduling intervals
and lead to forgetting and lower retention in the future.
For the vast majority of us the best option is to simply use Anki's "Good" and "Again" buttons.

## Flexible grading

Flexible grading refers to the ability to pass an Anki card without having to reveal the answer.
If you believe that you really know the content of a flashcard,
you may decide to skip its reverse side and immediately grade the card.
It should speed up review time and save you some keypresses.

Flexible grading is enabled by default in the add-on's options.
You can grade the cards by pressing Vim-keys on your keyboard or by using the default Anki hotkeys.

The bindings:

| Vim bindings | Default bindings | Description |
| ------------ | ---------------- | ----------- |
| `h`          | `1`              | Again, Fail |
| `j`          | `2`              | Hard        |
| `k`          | `3`              | Good, Pass  |
| `l`          | `4`              | Easy        |

Pressing 1-4 to grade cards is convenient, but it's not as convenient.
Vim-like bindings let you grade the cards
with your fingers lying on the home row keys,
much like when you navigate a document in Vim.

<p align="center"><img alt="keyboard" src="https://raw.githubusercontent.com/Ajatt-Tools/FlexibleGrading/main/img/keyboard.webp"></p>

I'm sure you'll appreciate how much more quickly you'll be able to finish your reviews.

## Getting rid of answer buttons

Once you get used to blasting through your reps with Vim-like hotkeys,
you realize that the answer buttons are completely redundant.
AJT Flexible Grading has an option to remove those buttons,
making the Anki UI less cluttered.

## Last review stats at the top

Have you ever had doubts like, "did I grade that card right?" after doing a rep?
Maybe your finger slipped a bit and you're not sure whether you pressed the right button.
AJT Flexible Grading shows the result of the last review at the top.
It tells you what button you pressed and what interval the card has right now.
By clicking on the stat you can bring up the card browser window showing the last answered card.

## Summary

The SRS best practices:

1) Starting Ease 131%.
1) Interval Modifier 190%, increase if needed.
1) Enable the V2 scheduler.
1) Don't review in filtered decks.
1) Use filtered decks for storing old due cards (backlog).
1) Install AJT Flexible Grading.
1) Use the Pass-Fail mode to avoid "Hard" and "Easy" buttons.
1) Grade easy cards from their front side.
1) Use the Vim hotkeys when reviewing.

Tags: anki
