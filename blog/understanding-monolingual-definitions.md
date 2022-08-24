---
title: Understanding monolingual definitions
date: 1641419148
tags: [dictionaries, epwing]
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
in Yomichan, hover over the part of speech to see what it means.

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
Each mora is given the same amount of time when pronounced.

Examples:

* `にゃ` is one mora.
* `あ` is one mora.
* `ー` (long vowel mark) and small `っ` each count as one mora.
* `東京(とうきょう)` has 4 moras: `と`, `う`, `きょ` and `う`.

The word `せいけん-ほうそう【政見放送】` has accent `[5]`
which means that the drop occurs on the 5th mora.
In other words, all moras after `ほ` should be pronounced low (セイケンホ↓ウソウ).

Sometimes a dictionary entry contains several pitch accent numbers.
It means that the word can be pronounced with either of them.

The 5th version of Shinmeikai may list two pitch accent numbers separated by a colon.
This means that only the second one tells you the pitch accent of the word in its dictionary form
and the other one you can ignore
because it tells you the pitch accent of the word when it modifies a noun.
