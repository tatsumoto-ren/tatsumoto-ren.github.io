# Yomichan and EPWING dictionaries

[Yomichan](https://foosoft.net/projects/yomichan)
is a web browser extension with a pop-up dictionary
that allows you to look up unknown words with the hover of a mouse.

EPWING is a [terrible](https://foosoft.net/projects/zero-epwing/) dictionary format
that was allegedly utilized in portable electronic dictionaries.

These two usually go together because Yomichan supports
[importing EPWING dictionaries](https://github.com/FooSoft/yomichan-import).

To view EPWINGs you need [qolibri](https://aur.archlinux.org/packages/qolibri/),
a dictionary viewer that lets you search multiple EPWING files at one time
so for every word you look up you immediately get multiple definitions.
Another alternative is [GoldenDict](https://wiki.archlinux.org/index.php/GoldenDict).

You can install qolibri with
[trizen](https://aur.archlinux.org/packages/trizen/)
or
[yay](https://aur.archlinux.org/packages/yay/):

```
$ trizen -S qolibri # or yay
```

To get Yomichan follow
[our setup guide](setting-up-yomichan.html).
In order to be able to make Anki cards don't forget to install
[AnkiConnect](https://ankiweb.net/shared/info/2055492159).

To actually use the software and look up words you need to get dictionary files.
A few basic Japanese to English dictionaries are available on the
[Yomichan webpage](https://foosoft.net/projects/yomichan/index.html#dictionaries),
but most dictionaries you need to acquire yourself.
Below is a list of links where you can find dictionaries for qolibri and Yomichan.

****

### EPWING
* [Original EPWING archive from mattvsjapan](https://www.mediafire.com/file/hr30l1pw004gac9/EPWINGs.rar/file)
* [Immersion Wiki](https://drive.google.com/drive/folders/1S8c70eKADlNkyW_Orz2B7Ge49xFQjg42)
* [Mega](https://mega.nz/folder/rIIHhAxb#d6GV9ZNTj9gUEaQtfGluqg)
* [Shared by BritVSJapan](https://www.mediafire.com/folder/ldyklp3362pgg/Japanese_Dictionaries)
* [NHK pitch accent dictionary EPWING](http://www.mediafire.com/file/sxmpse8n92c9oxg/NHKACT.zip) -
very useful EPWING with pitch accent information
* [Shinmeikai EPWING with pitch accent](http://www.mediafire.com/file/q9b95d1ad9wnjxd/Shinmeikai.7z)

To import dictionaries in qolibri click `Setting` → `Book and group settings`
and insert the location where the dictionary files are stored on your computer.
Then press `Start search`. Once the dictionaries are loaded,
you want to put the ones that you use most often at the top
to have quicker access to their definitions.

### Yomichan

An archive with dictionaries for Yomichan can be downloaded by following the link below.

<p align="center">
	<a class="download_button" href="https://t.me/ajatt_tools/115">Download</a>
</p>
<p align="center">
	<a href="https://disk.yandex.com/d/dmS_-JVE2fkMDQ">Mirror</a>
</p>

<details>
<summary>Sources</summary>

The dictionaries were compiled from various places.
Below is a list of public folders that were used.

* [Immersion Wiki](https://drive.google.com/drive/folders/1S8jeDa5NJt76dn9tq52engRCFLjIzvN1)
* [Mega](https://mega.nz/folder/rIIHhAxb#d6GV9ZNTj9gUEaQtfGluqg)
* [Shared](https://www.youtube.com/watch?v=5oxdPY9eH48) by mattvsjapan:
	* [Yomichan Dictionaries](https://www.mediafire.com/file/o3b6jt999dtd9vc/Yomichan_Dictionaries.zip/file)
	* [Shinmeikai5](https://mega.nz/file/A5cRxIpY#fcCGZyWX6cZoFYwKoKzbdHnxm_S86WM3PSbDA4ifKUM)
	* [Pitch Accent Dictionary](https://mega.nz/file/A5cRxIpY#fcCGZyWX6cZoFYwKoKzbdHnxm_S86WM3PSbDA4ifKUM)

</details>

Next go to Yomichan settings and scroll down to the `Dictionaries` tab
and click the button `Import Dictionary`.

## What these dictionaries are

### Bilingual

The goal of bilingual dictionaries is to provide you with a rough tool
to enable you to get by until you go monolingual.
So the TLDR here is to import only
[JMdict](https://foosoft.net/projects/yomichan/dl/dict/jmdict_english.zip)
and move on.

* [JMdict](https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project).
The dictionary that you find on
[Jisho.org](https://jisho.org/).
JMdict doesn't have example sentences.
If you need them, try the resources listed
[here](resources.html#examples-and-pronunciations).
* 研究社新和英大辞典 - A dictionary made by Japanese people and intended for Japanese people.
It has example sentences but I don't recommend using it over JMdict
because it clutters Yomichan window.
Keep it in qolibri in case you need the examples.
* 新和英 - A version of 研究社新和英大辞典 without example sentences.
* 研究社露和辞典 - A Russian-Japanese Dictionary.
Russian speakers praise it a lot.
Has example sentences.

### Monolingual

Once you've started the monolingual transition, it is time to use real dictionaries.
`JMdict` is very limited and only contains simple translations, many of which can be misleading
because it's very rare for a word in one language to have an exact,
one-to-one correlate in another language.
Monolingual dictionaries, on the other hand, are very powerful because
they provide detailed definitions and usage examples.
With monolingual dictionaries you can learn your target language in your target language.

**Most recommended dictionaries:**

* 大辞林 (and it's different versions)
* 新明解国語辞典
* 大辞泉
* 明鏡国語辞典

`大辞林` and `大辞泉` are quite similar to each other,
have good definitions and contain many entries.
Prefer デジタル大辞泉 over the original 大辞泉.
It has an extra 120 000 entries and contains images.
`明鏡` and `新明解` use easy language and are considered beginner-friendly.
`新明解` doesn't have many entries and has a convoluted definition structure
that employs a lot of redirections marked with `△` and `（）`
which force the reader to jump back and forth. But mostly it's very good.
`大辞林` and `新明解` have pitch accent information so you may want to import them first.

**Additional dictionaries:**

* 旺文社国語辞典.
A dictionary by Oubunsha.
Advertised as easy to understand for people new to monolingual dictionaries.
However, I've found that certain defintions use more difficult vocabulay than `大辞林`.
The file is big because it contains images.
There's a version without images called 旺文社国語辞典 第十一版 **画像無し**.
* Weblio古語辞典. Archaism dictionary from Weblio.
* 新辞林
* 実用日本語表現辞典
* 日本国語大辞典. The biggest Japanese dictionary in the world.
	* 精選版 日本国語大辞典
	* 小学館 国語大辞典
* 岩波書店 岩波国語辞典
* 広辞苑
* 故事ことわざの辞典. Proverb dictionary.


**Note:** If you want to use `デジタル大辞泉` or `旺文社国語辞典`,
images may render incorrectly unless you
append the follwing rules to your Popup CSS.
If this happens, go to Yomichan settings > "Appearance" > "Configure custom CSS...".

<details>
<summary>Popup CSS for images</summary>

```
.gloss-image-description {
    text-align: center;
}

.definition-item-content,
.gloss-image-link {
    max-width: 100%;
}

.gloss-image-container {
    background: none !important;
}

.gloss-image-link[data-has-aspect-ratio="true"] .gloss-image {
    position: static;
    max-height: 200px;
}

.gloss-image-link[data-has-aspect-ratio="true"] .gloss-image-aspect-ratio-sizer {
    display: none;
}

.gloss-image-container-overlay {
    display: none;
}

img {
    will-change: transform;
}
```

</details>

### Frequency lists

Frequency lists are dictionaries
that display how frequently a word might appear in a given corpus.
Often frequency dictionaries have different frequency notations.
In some, a higher frequency number may indicate that the word is more frequent.
In others, it's the opposite.
You can use these dictionaries to judge
whether it is worth for you to learn a certain word or not.
Words that appear more frequently than others are more useful.

If you have downloaded the full collection of dictionaries for Yomichan linked above,
you should have the frequency lists as well.
Below I provide a separate link for those who are only interested in the frequency lists.

<p align="center">
	<a class="download_button" href="https://t.me/ajatt_tools/109">Download</a>
</p>
<p align="center">
	<a href="https://disk.yandex.com/d/iaKHgFKTwjCMPw">Mirror</a>
</p>

**Recommended:**

* Netflix frequency list
* Anime & Jdrama frequency list

These are a must-have if you watch dramas or anime a lot.

**Additional frequency lists:**

* Innocent corpus. Based on 5000+ novels.
* Narou. [Top 300 Narou stories](http://wiki.wareya.moe/Narou).
* VN. Visual Novels.
* BCCWJ - Based on [Long Unit Word list data](https://ccd.ninjal.ac.jp/bccwj/en/freq-list.html).
* Daijirin. Words that appear in the `大辞林` monolingual dictionary.
You may want to take a look at it if you've decided to go monolingual
and you need to prioritize learning dictionary vocabulary.

### Other

* [JMnedict](https://www.edrdg.org/enamdict/enamdict_doc.html). Japanese names.
* [KANJIDIC](https://www.edrdg.org/wiki/index.php/KANJIDIC_Project). J-E kanji dictionary.
* 漢字源. Monolingual kanji dictionary.
* [Kanjium](https://github.com/mifunetoshiro/kanjium). Pitch accent dictionary.

## Don't import all Yomichan dictionaries

You need to have a lot of dictionaries at hand
because Japanese to Japanese dictionaries always have gaps in them.
There will always be words that are in some dictionaries and not in others.

**A few examples:**
* `夢海鼠` is only in `日本国語大辞典`.
* `禿同` is only in `実用日本語表現辞典`.

Though you might think that using every dictionary in Yomichan is a good idea
and load up all of them, I would advice you not to do so.
Sometimes the word that you're trying to look up
isn't the one that comes up first in the dictionary.
If you want to find it you have to scroll down,
and if you have many dictionaries imported this is going to be pretty annoying.

So what I recommend you to do instead is to have as few dictionaries as possible
and use qolibri whenever there's a word that you can't find in Yomichan.

Tags: dictionaries, yomichan, epwing
