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
$ trizen -S qolibri
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

<p class="download_button"><a href="https://t.me/ajatt_tools/36">Download</a></p>

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
* [Shared by shoui](https://drive.google.com/file/d/1hcxKK-06LJxp-pr-8EuSPrCaFhWwXylp/view?usp=sharing)
([monolingual guide](https://learnjapanese.moe/monolingual/))

</details>

Next go to Yomichan settings and scroll down to the `Dictionaries` tab
and click the button `Import Dictionary`.

## What these dictionaries are

### Bilingual

The goal of bilingual dictionaries is to provide you with a rough tool
to enable you to get by until you make the monolingual transition.
So the TLDR here is to import only
[JMdict](https://foosoft.net/projects/yomichan/dl/dict/jmdict_english.zip)
and move on.

* JMdict - The dictionary that you find on
[Jisho.org](https://jisho.org/).
It doesn't have example sentences but as a workaround you can search them on Jisho
by typing `word #sentence`. [Example](https://jisho.org/search/test%20%23sentence).
* 研究社新和英大辞典 - A dictionary made by Japanese people and intended for Japanese people.
It has example sentences but I don't recommend using it over JMdict
because it clutters Yomichan window.
Keep it in qolibri in case you need the examples.
* KireiCake - A dictionary for Japanese slang.
Has many duplicate entries with JMdict,
so it's safe to ignore it.
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

* スーパー大辞林
* 新明解国語辞典
* 大辞泉
* 明鏡国語辞典

`大辞林` and `大辞泉` are quite similar to each other,
have good definitions and contain many entries.
Prefer デジタル大辞泉 over the original 大辞泉. It has an extra 120 000 entries.
`明鏡` and `新明解` use easy language and are considered beginner-friendly.
`新明解` doesn't have many entries and has a convoluted definition structure
that employs a lot of redirections marked with `△` and `（）`
which force the reader to jump back and forth. But mostly it's very good.
`大辞林` and `新明解` have pitch accent information so you may want to import them first.

**Additional dictionaries:**

* Weblio古語辞典 - Archaism dictionary from Weblio
* 新辞林
* 実用日本語表現辞典
* 日本国語大辞典 - The biggest Japanese dictionary in the world
	* 精選版 日本国語大辞典
	* 小学館 国語大辞典
* 岩波書店 岩波国語辞典
* 広辞苑
* 故事ことわざの辞典 - proverb dictionary


### Frequency lists

**The two that I recommend are:**

* Netflix frequency list
* Anime & Jdrama frequency list

These are a must-have if you watch dramas or anime a lot.

**Additional frequency lists:**

* Innocent corpus - novels
* Narou - [top 300 Narou stories](http://wiki.wareya.moe/Narou)
* VN - visual novels

### Other

* JMnedict - Japanese names
* KANJIDIC - J-E kanji dictionary
* 漢字源 - Monolingual kanji dictionary

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
