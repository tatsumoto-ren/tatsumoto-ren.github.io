---
title: Understanding monolingual definitions
date: 1641419148
tags: [dictionaries, epwing]
position: 9999
---

A typical entry in a monolingual dictionary looks similar to this:

```
あした [3] 【明日・朝】 （名）
（１）今日の次の日。
（２）夜が終わって，明るくなった時。あさ。
```

Every dictionary usually has its own, unique system of notation.
On this page I primarily use `大辞泉` as an example.
If you need help finding monolingual dictionaries, see the
[Dictionaries](resources.html#dictionaries) resources section.

***

## Back of the book

If your dictionary has an EPWING version,
chances are that you can open the
[back of the book section](setting-up-qolibri.html#how-to-use-the-dictionaries)
in Qolibri.
The back of the book will tell you exactly what symbols the dictionary uses and what they mean.

If you're out of luck, try searching the web.
The keywords that should work are `凡例`, `記号一覧`, `約物一覧`
followed by the name of the dictionary.

## Headword

First you see the word in kana.
The number to the right in square brackets `[]` is pitch accent.
You'll find about pitch accent at the end of the page.

If next to the hiragana reading you see a slightly different reading in katakana,
it likely indicates how the word was spelled before World War II.

```
きのう ｷﾉﾌ [2] 【昨日】
```

Inside the fat brackets `【】` you see how it can be written in kanji.
Different kanji spellings are separated with a `・`.
It means that the word can be written multiple ways.

```
きゅう‐か【球果・毬果】
```

Inside the kanji notation you may see triangles like this.

```
くじゃく【▽孔▼雀】
```

* `▼` or `×` mean that the kanji character is not standard, not a 常用漢字.
* `▽` means that the kanji reading is not standard.

Parts of okurigana may be inside round brackets.
This means that the okurigana inside the `（…）` can be omitted. E.g., 売り上げ becomes 売上げ.

```
うり‐あげ【売〔り〕上げ・売上】
```

`-` or `=` indicate `熟字訓`.

```
あした【明＝日】
```

`熟字訓` is when a *Japanese* reading is assigned to a kanji compound.
In other words,
it means that there's no relation between the reading of a word and the kanji used to write it.

* `‐` indicates that this reading is listed in the
「[付表](https://gakusyu.shizuoka-c.ed.jp/japanese/syou_56/moji/04/fuhyou.pdf)」
section of
[常用漢字表](https://www.bunka.go.jp/kokugo_nihongo/sisaku/joho/joho/kijun/naikaku/pdf/joyokanjihyo_20101130.pdf).
* `＝` means this reading is **not** listed in the 「付表」 section.

There is no clear reason why kanji end up in 付表.
It's just another way Japanese people like to shoot themselves in the foot.

`熟字訓` can be seen in words such as:

* 果物(くだもの)
* 土産(みやげ)
* 素人(しろうと)
* 五月雨(さみだれ)
* etc.

In addition to `-` and `=`,
in other dictionaries `熟字訓` can be marked as `《word》`, `｛word｝` or `〈word〉`, like this.

```
あひる【〈家鴨〉】(名)
マガモを飼い慣らして改良したカモ科の家禽。
```

## Parts of speech

After the kanji reading inside round brackets the entry is telling you the part of speech.
For example, `名` means it's a noun, `動五` means it's a `五段活用` verb, etc.
The part of speech notation can be a bit complex and has to do with 学校文法,
so I recommend [getting familiar](https://www.kokugobunpou.com/) with that.
If you have [recursive lookups](setting-up-yomichan.html#recursive-lookups) enabled
in [Rikaitan](setting-up-yomichan.html), hover over the part of speech to see what it means.

Sometimes after `[文]` it tells you what part of speech this word was in classical Japanese.
In the example below it says that the `下一段` verb was `下二段` in classical Japanese.

```
たす・ける [3] 【助ける・扶ける】 （動カ下一）[文]カ下二 たす・く
力を添えて人や動物を，死の危険や苦痛・災難から逃れさせる。
```

<details>

<summary>Different parts of speech, from デジタル大辞泉.</summary>

|     Symbol     | Meaning                                    |
|:--------------:|--------------------------------------------|
|     ［名］     | 名詞                                       |
|     ［代］     | 代名詞                                     |
|    ［動五］    | 動詞五段活用                               |
| ［動五（四）］ | 動詞口語五段活用、文語四段活用             |
|    ［動四］    | 動詞四段活用                               |
|   ［動上一］   | 動詞上一段活用                             |
|   ［動上二］   | 動詞上二段活用                             |
|   ［動下一］   | 動詞下一段活用                             |
|   ［動下二］   | 動詞下二段活用                             |
|   ［動カ変］   | 動詞カ行変格活用                           |
|   ［動サ変］   | 動詞サ行変格活用                           |
|   ［動ナ変］   | 動詞ナ行変格活用                           |
|   ［動ラ変］   | 動詞ラ行変格活用                           |
|   ［動特活］   | 動詞特殊活用                               |
|     ［形］     | 形容詞                                     |
|    ［形ク］    | 形容詞ク活用                               |
|   ［形シク］   | 形容詞シク活用                             |
|    ［形動］    | 形容動詞                                   |
|  ［形動タリ］  | 形容動詞タリ活用                           |
|  ［形動ナリ］  | 形容動詞ナリ活用                           |
|  ［ト・タル］  | 「－と」の形で副詞、「－たる」の形で連体詞 |
|    ［連体］    | 連体詞                                     |
|     ［副］     | 副詞                                       |
|     ［接］     | 接続詞                                     |
|     ［感］     | 感動詞                                     |
|    ［助動］    | 助動詞                                     |
|    ［格助］    | 格助詞                                     |
|    ［接助］    | 接続助詞                                   |
|    ［副助］    | 副助詞                                     |
|    ［係助］    | 係助詞                                     |
|    ［終助］    | 終助詞                                     |
|    ［間助］    | 間投助詞                                   |
|    ［並助］    | 並立助詞                                   |
|   ［準体助］   | 準体助詞                                   |
|  ［　］(スル)  | サ行変格活用の動詞となる                   |
|    〔接頭〕    | 接頭語                                     |
|    〔接尾〕    | 接尾語                                     |
|    〔語素〕    | 語素                                       |
|    〔連語〕    | 連語                                       |
|     〔枕〕     | 枕詞                                       |
|     ［文］     | 文語形                                     |

</details>

## Meanings

Meanings are usually shown as numbered lists.
After each definition there may be one or more example sentences in `「」` brackets.
When there's only one meaning, it's not numbered.

```
ひるがえ・る ﾋﾙｶﾞﾍﾙ [3] 【翻る】（動ラ五［四］）
（１）ひらりと裏がえる。「木の葉が風に―・る」
（２）旗などが高く上がってひらひらと動く。「校旗が―・る」
（３）今までの態度や言動が急に変わる。「悪心たちまち―・りて/仮名草子・伊曾保物語」
```

You may want to grab the example sentence when making Anki cards.
If you see a slash inside the brackets, the sentence comes from a piece of literature,
and the name of the work is written after the slash.
Contrary to normal example sentences,
such sentences often come from pretty old literary works.
They tend to be quite difficult,
and you probably don't need to bother trying to understand them.

<details>

<summary>Symbols found inside definitions.</summary>

|      Symbol      | Meaning                    |
|:----------------:|----------------------------|
|        ⇒         | その項目を見よ             |
|        →         | 参照せよ                   |
|        ⇔         | 対義語・対語               |
|      [補説]      | 語誌・表記などの補説       |
| ［アクセント］　 | アクセント表示             |
|     《季　》     | 季語                       |
|     ［歌枕］     | 歌枕                       |
|     ［可能］     | 可能動詞                   |
|     ［派生］     | 派生語                     |
|     ［類語］     | 類語                       |
|    ［下接句］    | その語が下に付いてできる句 |
|    ［下接語］    | その語が下に付いてできる語 |
|     ［用法］     | 用法の使い分け             |

</details>

<details>

<summary>Kanji entries</summary>

|    Symbol    | Meaning        |
|:------------:|----------------|
|    ［音］    | 字音           |
|    ［訓］    | 字訓           |
|    （慣）    | 慣用音         |
|    （呉）    | 呉音           |
|    （漢）    | 漢音           |
|    （唐）    | 唐音           |
| ［名のり］　 | 人名に用いる訓 |
|   ［難読］   | 難読語         |

</details>

## Understanding pitch accent

The pitch accent number that you see in dictionaries
indicates where the pitch drop occurs, counting by **moras**.

A mora can be defined as
a single kana character except small kana (`ゃ`,`ゅ`,`ょ` but not `っ`),
optionally followed by a small kana.
Each mora is given **the same** amount of time when pronounced.

Examples:

* `にゃ` is one mora.
* `あ` is one mora.
* `ー` (long vowel mark) and small `っ` each count as one mora.
* `東京(とうきょう)` has 4 moras: `と`, `う`, `きょ` and `う`.

Every mora is either pronounced with low tone of voice or with high tone of voice.
In most Japanese words,
the pitch starts low, then raises after the first mora, and then **drops** somewhere after the second mora.
There can be **only one** pitch drop in any single word,
unless it's a combination of two words.
Pitch accent number in a monolingual dictionary tells where tone of voice changes from high to low.

The word [おうだんほどう【横断歩道】](https://sakura-paris.org/dict/NHK%E6%97%A5%E6%9C%AC%E8%AA%9E%E7%99%BA%E9%9F%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%83%B3%E3%83%88%E8%BE%9E%E5%85%B8/exact/%E6%A8%AA%E6%96%AD%E6%AD%A9%E9%81%93) has accent `[5]`
which means that the drop occurs after the 5th mora.
In other words,
`お` is pronounced low,
moras after `お` are high,
all moras after `ほ` are low.
The word is pronounced like this: `オ↑ーダンホ↓ドー`.

If the accent number is `[0]`, it means there is no pitch drop.
The word is pronounced with a *flat accent*.
The first mora is low, and every mora after the first is high.
After the word ends, the following syllables remain high
until there's a drop in any word that comes after in a sentence.

The word [せいかつ【生活】](https://sakura-paris.org/dict/NHK%E6%97%A5%E6%9C%AC%E8%AA%9E%E7%99%BA%E9%9F%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%83%B3%E3%83%88%E8%BE%9E%E5%85%B8/exact/%E7%94%9F%E6%B4%BB) has accent `[0]`
which means that the drop doesn't occur.
`せ` is pronounced low,
moras after `せ` are high.
The word is pronounced like this: `セ↑イカツ`.

If the accent number is `[1]`,
it means that the first mora is high
and the drop occurs after the first mora.
Then the accent stays low until there's a rise in any following word in a sentence.

The word [かいがい【海外】](https://sakura-paris.org/dict/NHK%E6%97%A5%E6%9C%AC%E8%AA%9E%E7%99%BA%E9%9F%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%83%B3%E3%83%88%E8%BE%9E%E5%85%B8/exact/%E6%B5%B7%E5%A4%96) has accent `[1]`
which means that the drop happens after the first mora.
`か` is pronounced high,
moras after `か` are pronounced low.
The word is pronounced like this: `カ↓イガイ`.

Any Japanese word has one of the `4` pitch accent *patterns*.
Pitch accent patterns make categorizing Japanese words easier
since instead of memorizing a number it is sufficient to memorize what group a word belongs to.

* `平板型`.
  Pitch number is `0`.
  Flat accent.
  The first mora is low, then accent stays high.
  Examples: [しんじん【新人】](https://sakura-paris.org/dict/NHK%E6%97%A5%E6%9C%AC%E8%AA%9E%E7%99%BA%E9%9F%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%83%B3%E3%83%88%E8%BE%9E%E5%85%B8/exact/%E6%96%B0%E4%BA%BA), [ピアノ](https://sakura-paris.org/dict/NHK%E6%97%A5%E6%9C%AC%E8%AA%9E%E7%99%BA%E9%9F%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%83%B3%E3%83%88%E8%BE%9E%E5%85%B8/exact/%E3%83%94%E3%82%A2%E3%83%8E), [じょゆう【女優】](https://sakura-paris.org/dict/NHK%E6%97%A5%E6%9C%AC%E8%AA%9E%E7%99%BA%E9%9F%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%83%B3%E3%83%88%E8%BE%9E%E5%85%B8/exact/%E5%A5%B3%E5%84%AA), [ふくそう【服装】](https://sakura-paris.org/dict/NHK%E6%97%A5%E6%9C%AC%E8%AA%9E%E7%99%BA%E9%9F%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%83%B3%E3%83%88%E8%BE%9E%E5%85%B8/exact/%E6%9C%8D%E8%A3%85).
* `頭高型`.
  Pitch number is `1`.
  Accent on the head.
  The first mora is high, the following moras are low.
  Examples: [あう【会う】](https://sakura-paris.org/dict/NHK%E6%97%A5%E6%9C%AC%E8%AA%9E%E7%99%BA%E9%9F%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%83%B3%E3%83%88%E8%BE%9E%E5%85%B8/exact/%E4%BC%9A%E3%81%86), [らいげつ【来月】](https://sakura-paris.org/dict/NHK%E6%97%A5%E6%9C%AC%E8%AA%9E%E7%99%BA%E9%9F%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%83%B3%E3%83%88%E8%BE%9E%E5%85%B8/exact/%E6%9D%A5%E6%9C%88), [スーツ](https://sakura-paris.org/dict/NHK%E6%97%A5%E6%9C%AC%E8%AA%9E%E7%99%BA%E9%9F%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%83%B3%E3%83%88%E8%BE%9E%E5%85%B8/exact/%E3%82%B9%E3%83%BC%E3%83%84).
* `中高型`. Pitch number is `2`, `3`, `4`, and so on,
  but is always **less** than the number of moras.
  Pitch drops somewhere before the end of the word.
  Examples: [はやい【速い】](https://sakura-paris.org/dict/NHK%E6%97%A5%E6%9C%AC%E8%AA%9E%E7%99%BA%E9%9F%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%83%B3%E3%83%88%E8%BE%9E%E5%85%B8/exact/%E9%80%9F%E3%81%84), [おてあらい【お手洗い】](https://sakura-paris.org/dict/NHK%E6%97%A5%E6%9C%AC%E8%AA%9E%E7%99%BA%E9%9F%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%83%B3%E3%83%88%E8%BE%9E%E5%85%B8/exact/%E3%81%8A%E6%89%8B%E6%B4%97%E3%81%84), [へいわじょうやく【平和条約】](https://sakura-paris.org/dict/NHK%E6%97%A5%E6%9C%AC%E8%AA%9E%E7%99%BA%E9%9F%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%83%B3%E3%83%88%E8%BE%9E%E5%85%B8/exact/%E5%B9%B3%E5%92%8C%E6%9D%A1%E7%B4%84), [うごきまわる【動き回る】](https://sakura-paris.org/dict/NHK%E6%97%A5%E6%9C%AC%E8%AA%9E%E7%99%BA%E9%9F%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%83%B3%E3%83%88%E8%BE%9E%E5%85%B8/exact/%E5%8B%95%E3%81%8D%E5%9B%9E%E3%82%8B).
* `尾高型`. Pitch number is equal to the number of moras.
  Pitch drops immediately after the end of the word
  and stays low until there's a rise in any following word.
  The `尾高型` pattern is different from the `平板型` pattern which doesn't cause pitch to drop.
  However, when said in isolation, `尾高型` words sound just like `平板型` words.
  Thus,
  when listening,
  it's impossible to tell if a word is `尾高型` or `平板型` without hearing the following word
  because the two patterns are distinguished by the presence of a drop after the last mora.
  Examples: [ゆき【雪】](https://sakura-paris.org/dict/NHK%E6%97%A5%E6%9C%AC%E8%AA%9E%E7%99%BA%E9%9F%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%83%B3%E3%83%88%E8%BE%9E%E5%85%B8/exact/%E9%9B%AA), [しっぽ【尻尾】](https://sakura-paris.org/dict/NHK%E6%97%A5%E6%9C%AC%E8%AA%9E%E7%99%BA%E9%9F%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%83%B3%E3%83%88%E8%BE%9E%E5%85%B8/exact/%E5%B0%BB%E5%B0%BE), [いもうと【妹】](https://sakura-paris.org/dict/NHK%E6%97%A5%E6%9C%AC%E8%AA%9E%E7%99%BA%E9%9F%B3%E3%82%A2%E3%82%AF%E3%82%BB%E3%83%B3%E3%83%88%E8%BE%9E%E5%85%B8/exact/%E5%A6%B9).

Sometimes a dictionary entry contains several pitch accent numbers.
It means that the word can be pronounced with either of them.
In real life one of the accents is usually more common than others.
To tell which accent is dominant and how you should say the word,
you need to listen to native speakers and find out how they say it.

The 5th version of Shinmeikai may list two pitch accent numbers separated by a colon.
This means that only the second one tells you the pitch accent of the word in its dictionary form
and the other one you can ignore
because it tells you the pitch accent of the word when it modifies a noun.
