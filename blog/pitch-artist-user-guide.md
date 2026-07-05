---
title: "Pitch Artist user guide"
date: "05 July 2026"
tags: ["guide"]
---

Pitch Artist is a tool for creating SVG pitch accent graphs from a compact text notation.
The graphs can be saved as SVG files and inserted into Anki notes.
The tool can be used from the Anki dialog for preview/export,
or as an output format when generating card fields.

Pitch Artist does not tell you what accent is correct.
It only gives you a canvas and a brush.
It's up to you to draw correct pitch graphs.

****

## Quick start

Pitch Artist comes with [AJT Japanese](anki-japanese-support.html).
Install AJT Japanese to use it.

Open the dialog from the Anki menu bar: "AJT" > "Pitch Graph Artist..."
Type a word, a semicolon, and a pitch specification:

```
せいかつ;0
ねこ;1
いぬ;2
せんせい;3
ひらめ;0
みず;0
じんせい;1
たべもの;2
たべもの;3
おとこのこ;3
```

<!-- generated with expression: "せいかつ;0" -->
<svg class="ajt__pitch_svg" style="font-family: Noto Sans, Noto Sans CJK JP, IPAexGothic, IPAPGothic, IPAGothic, Yu Gothic, Sans" viewBox="0 0 212 140" height="100px" xmlns="http://www.w3.org/2000/svg"><g class="paths"><g class="heiban"><line stroke="black" stroke-width="2.50" x1="35.100" y1="61.720" x2="76.900" y2="28.280" /><line stroke="black" stroke-width="2.50" x1="86.250" y1="25.000" x2="125.750" y2="25.000" /><line stroke="black" stroke-width="2.50" x1="136.250" y1="25.000" x2="175.750" y2="25.000" /></g></g><g class="circles"><g class="heiban"><circle fill="black" stroke="black" stroke-width="2.50" cx="31.000" cy="65.000" r="5.25" /><circle fill="black" stroke="black" stroke-width="2.50" cx="81.000" cy="25.000" r="5.25" /><circle fill="black" stroke="black" stroke-width="2.50" cx="131.000" cy="25.000" r="5.25" /><circle fill="black" stroke="black" stroke-width="2.50" cx="181.000" cy="25.000" r="5.25" /></g></g><g class="text"><g class="heiban"><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="31" y="115" dx="-12">セ</text><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="81" y="115" dx="-12">イ</text><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="131" y="115" dx="-12">カ</text><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="181" y="115" dx="-12">ツ</text></g></g></svg>

Press <kbd>Ctrl+Enter</kbd> or click "Update" to refresh the preview.

Pitch numbers use the common Tokyo pitch notation.
Here `n` means the number of morae in the word.

| Number           | Pattern                           | Name             |
|------------------|-----------------------------------|------------------|
| `0`              | starts low, rises, and stays high | heiban (平板)    |
| `1`              | starts high, then drops           | atamadaka (頭高) |
| `2` to `n-1`     | rises, then drops inside the word | nakadaka (中高)  |
| `n`              | rises, drops after the last mora  | odaka (尾高)     |
| greater than `n` | treated as heiban                 | heiban           |

Changing any setting updates the preview immediately.
The preview uses a cloned config,
so temporary dialog changes affect rendering without rewriting the global SVG graph settings.
To change settings permanently, go to "AJT" > "Japanese options..." > "SVG graphs".

## Buttons and shortcuts

| Action                              | How                                                                     |
|-------------------------------------|-------------------------------------------------------------------------|
| Update preview                      | Click "Update", or press <kbd>Ctrl</kbd>+<kbd>Enter</kbd> in the editor |
| Accept and close                    | Click "Ok"                                                              |
| Copy SVG markup                     | Click "Copy HTML to Clipboard"                                          |
| Zoom in                             | Press <kbd>Ctrl</kbd>+<kbd>=</kbd> or <kbd>Ctrl</kbd>+<kbd>+</kbd>      |
| Zoom out                            | Press <kbd>Ctrl</kbd>+<kbd>-</kbd>                                      |
| Open from selected Anki editor text | Right-click selected text in the Anki Browser and choose "Pitch artist" |

"Copy HTML to Clipboard" copies the generated SVG strings joined by the configured graph separator.

Each previewed graph has a `Save` button.
Click it, choose a filename, and the graph is written as an SVG file.
If `Inject CSS into SVG markup` is enabled, Pitch Artist embeds the pitch graph CSS
directly into the saved SVG so that it displays correctly as a standalone file.

## Syntax overview

Words are separated by spaces, like in English.
Sentences are separated by dots.
Pitch Artist parses text in this order:

1. Line breaks become sentence breaks.
2. HTML tags are stripped.
3. Text is split into sentences on dots (`.`),
   Japanese sentence punctuation (`。!?！？`),
   and newlines.
4. Each sentence is split into sections on whitespace, tabs, and full-width spaces.

```
きょう;1 は | てんき;1 が ; いい;1 です
ぼく;1 は;p せんせい;3 を して;0 います;2
わたし; は;p にほんご; を べんきょう; して; います;k2
```

<!-- generated with expression: "きょう;1 は | てんき;1 が ; いい;1 です" -->
<svg class="ajt__pitch_svg" style="font-family: Noto Sans, Noto Sans CJK JP, IPAexGothic, IPAPGothic, IPAGothic, Yu Gothic, Sans" viewBox="0 0 562 140" height="100px" xmlns="http://www.w3.org/2000/svg"><g class="paths"><g class="atamadaka"><line stroke="black" stroke-width="2.50" x1="35.100" y1="28.280" x2="76.900" y2="61.720" /></g><g class="particle"></g><g class="connector"><line stroke="black" stroke-width="2.50" x1="86.250" y1="65.000" x2="125.750" y2="65.000" /></g><g class="atamadaka"><line stroke="black" stroke-width="2.50" x1="185.100" y1="28.280" x2="226.900" y2="61.720" /><line stroke="black" stroke-width="2.50" x1="236.250" y1="65.000" x2="275.750" y2="65.000" /></g><g class="particle"></g><g class="connector"><line stroke="black" stroke-width="2.50" x1="286.250" y1="65.000" x2="325.750" y2="65.000" /></g><g class="atamadaka"><line stroke="black" stroke-width="2.50" x1="385.100" y1="28.280" x2="426.900" y2="61.720" /></g><g class="connector"><line stroke-dasharray="4" stroke="black" stroke-width="2.50" x1="335.100" y1="61.720" x2="376.900" y2="28.280" /></g><g class="particle"><line stroke="black" stroke-width="2.50" x1="486.250" y1="65.000" x2="525.750" y2="65.000" /></g><g class="connector"><line stroke="black" stroke-width="2.50" x1="436.250" y1="65.000" x2="475.750" y2="65.000" /></g></g><g class="circles"><g class="atamadaka"><circle fill="black" stroke="black" stroke-width="2.50" cx="31.000" cy="25.000" r="5.25" /><circle fill="black" stroke="black" stroke-width="2.50" cx="81.000" cy="65.000" r="5.25" /></g><g class="particle"><circle fill="none" stroke="black" stroke-width="2.50" cx="131.000" cy="65.000" r="5.25" /></g><g class="atamadaka"><circle fill="black" stroke="black" stroke-width="2.50" cx="181.000" cy="25.000" r="5.25" /><circle fill="black" stroke="black" stroke-width="2.50" cx="231.000" cy="65.000" r="5.25" /><circle fill="black" stroke="black" stroke-width="2.50" cx="281.000" cy="65.000" r="5.25" /></g><g class="particle"><circle fill="none" stroke="black" stroke-width="2.50" cx="331.000" cy="65.000" r="5.25" /></g><g class="atamadaka"><circle fill="black" stroke="black" stroke-width="2.50" cx="381.000" cy="25.000" r="5.25" /><circle fill="black" stroke="black" stroke-width="2.50" cx="431.000" cy="65.000" r="5.25" /></g><g class="particle"><circle fill="none" stroke="black" stroke-width="2.50" cx="481.000" cy="65.000" r="5.25" /><circle fill="none" stroke="black" stroke-width="2.50" cx="531.000" cy="65.000" r="5.25" /></g></g><g class="text"><g class="atamadaka"><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="31" y="115" dx="-24">きょ</text><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="81" y="115" dx="-12">う</text></g><g class="particle"><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="131" y="115" dx="-12">わ</text></g><g class="atamadaka"><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="181" y="115" dx="-12">て</text><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="231" y="115" dx="-12">ん</text><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="281" y="115" dx="-12">き</text></g><g class="particle"><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="331" y="115" dx="-12">が</text></g><g class="atamadaka"><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="381" y="115" dx="-12">い</text><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="431" y="115" dx="-12">い</text></g><g class="particle"><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="481" y="115" dx="-12">で</text><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="531" y="115" dx="-12">す</text></g></g></svg>

## Word format

Each normal section has this shape:

```
word;accent
```

Write a word, then a semicolon, then the pitch number.
The semicolon may be `;` or full-width `；`.

Examples:

```
にほんご;0
せいかつ;0
ともだち;0
ねこ;1
いぬ;2
せんせい;3
```

If a word has no separator at all,
it is treated as a particle and drawn with gray, unfilled circles.

```
は
を
まで
```

If a word has a separator but no accent, it defaults to heiban:

```
がっこう;
```

## Tokyo accent specifications

The Tokyo accent syntax supports:

```
[p][role][pitch]
```

Every word has two properties: pitch number and role.
If you do not specify role or pitch, it will be guessed.
All parts are optional, but they must appear in that order.

| Part    | Meaning                                                           |
|---------|-------------------------------------------------------------------|
| `p`     | Mark the section as a particle for styling                        |
| `role`  | One role letter such as `h`, `a`, `n`, `o`, `k`, `s`, `b`, or `w` |
| `pitch` | One optional signed digit, such as `0`, `1`, `2`, or `-1`, `-2`   |

The parser accepts one digit for the pitch number.

Role typically controls what classname will be attached to the word.
Class names are used for styling in CSS.
If you write `たんご;h`, it will receive the "heiban" class name,
which you can then style using CSS if you want.
The CSS rules that get injected by default cover most people's needs.
Special rules can be specified in your note type's CSS section.
Additionally, words with the "empty" role are hidden completely.
`ひみつ;e` won't be rendered.

## Role letters

Pitch pattern names:

| Letter | Role | Default pitch if no pitch is given |
|--------|------|------------------------------------|
| `h` | heiban | `0` |
| `a` | atamadaka | `1` |
| `n` | nakadaka | `2` |
| `o` | odaka | mora count |
| `k` | kifuku | `2` |

Extra roles:

| Letter | Role          | Default pitch if no pitch is given |
|--------|---------------|------------------------------------|
| `s`    | setsubigo     | `0`                                |
| `b`    | black         | `0`                                |
| `w`    | white         | `0`                                |
| `p`    | particle role | `None`. Contextual particle pitch  |
| `e`    | empty role    | `-1`                               |

Examples:

```
にほんご;0
にほんご;h
かんがえた;k2
ぐらい;pa
ぐらい;po1
```

If there is no explicit role, Pitch Artist guesses a role from the pitch number:

| Pitch | Guessed role |
|-------|--------------|
| none | heiban |
| `0` | heiban |
| `1` | atamadaka |
| negative | particle |
| equal to mora count | odaka |
| less than mora count | nakadaka |
| greater than mora count | heiban |

The role letter takes priority for coloring, while the pitch number determines the actual pattern.

```
にほんご;h2
```

Here the role letter `h` (heiban) is combined with pitch number `2`.

## Special pitch numbers

`-1` means "always low".
`-2` means "always high".

```
あいうえお;h-1
あいうえお;h-2
```

## Furigana and readings

Use square brackets to provide readings for kanji:

```
漢字[かんじ];0
稼[かせ]いで;k2
大物[おおもの];0
```

Pitch Artist extracts the reading from bracket notation before splitting into morae.
For simplicity, it is recommended to write everything in kana:

```
がっこう;0
つくった;2
```

## Particles

A bare word without `;` is rendered as a particle-style section.
When a word is a particle, the circles above kana have holes in them.

```
は
を
まで
```

To mark a word as a particle, add `;p` after it:

```
か;p
```

Particles receive contextual pitch:

| Previous contour state | Particle pitch |
|------------------------|----------------|
| Previous word ended low | low |
| Previous word did not end low | high |

The "particle" role can coexist with other roles.
Use `p` in the accent spec when you want a section styled
as a particle while still giving it a role.
If you write `が;pn`, for example, it will receive class names `particle nakadaka`.

```
よねん;0 ぐらい;pa
よねん;0 ぐらい;po1
```

The word ぐらい is marked as a particle in both lines.
The first uses `pa` (particle + atamadaka), the second uses `po1` (particle + odaka, pitch 1).
Particles are drawn with colored but unfilled circles.
These produce compound CSS classes such as `particle atamadaka` and `particle odaka`.

When a single-mora particle is `は` or `ハ`, it is displayed as `わ` or `ワ`:

```
は;p
ハ;p
```

## Connections and breaks

Words can be "welded" (connected),
"taped" (connected with a dotted line),
or separated (no visual connection).

By default, adjacent visible sections in a sentence are connected with a solid line:

```
がっこう;1 つくった;2
```

Use `|`, `,`, or `、` as a standalone section to break the contour and prevent a connector:

```
じんせい;1 | まで;p
つかう;0 , つかった;0
```

To **tape** words (connect with a dotted line instead of solid),
use a bare semicolon as a separator:

```
大物[おおもの];0 ; まで;p
```

The `;` between the two words creates a dotted connector line.

Summary:

| Section | Behavior |
|---------|----------|
| normal whitespace | Solid connector between adjacent words |
| `;` alone | Dotted tape connector |
| `|` alone | No connector |
| `,` alone | No connector |
| `、` alone | No connector |

## Ghost particle

You can use `-` at the end of a sentence to add one trailing empty circle.
Pitch Artist detaches a trailing `-` into its own ghost section:

```
じんせい;1-
せいかつ;0-
おとうと;4-
```

<!-- generated with expression: "せいかつ;0 -" -->
<svg class="ajt__pitch_svg" style="font-family: Noto Sans, Noto Sans CJK JP, IPAexGothic, IPAPGothic, IPAGothic, Yu Gothic, Sans" viewBox="0 0 262 140" height="100px" xmlns="http://www.w3.org/2000/svg"><g class="paths"><g class="heiban"><line stroke="black" stroke-width="2.50" x1="35.100" y1="61.720" x2="76.900" y2="28.280" /><line stroke="black" stroke-width="2.50" x1="86.250" y1="25.000" x2="125.750" y2="25.000" /><line stroke="black" stroke-width="2.50" x1="136.250" y1="25.000" x2="175.750" y2="25.000" /></g><g class="particle"></g><g class="connector"><line stroke="black" stroke-width="2.50" x1="186.250" y1="25.000" x2="225.750" y2="25.000" /></g></g><g class="circles"><g class="heiban"><circle fill="black" stroke="black" stroke-width="2.50" cx="31.000" cy="65.000" r="5.25" /><circle fill="black" stroke="black" stroke-width="2.50" cx="81.000" cy="25.000" r="5.25" /><circle fill="black" stroke="black" stroke-width="2.50" cx="131.000" cy="25.000" r="5.25" /><circle fill="black" stroke="black" stroke-width="2.50" cx="181.000" cy="25.000" r="5.25" /></g><g class="particle"><circle fill="none" stroke="black" stroke-width="2.50" cx="231.000" cy="25.000" r="5.25" /></g></g><g class="text"><g class="heiban"><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="31" y="115" dx="-12">せ</text><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="81" y="115" dx="-12">い</text><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="131" y="115" dx="-12">か</text><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="181" y="115" dx="-12">つ</text></g><g class="particle"></g></g></svg>

The ghost particle draws a circle but no text label.
The pitch of the trailing empty circle changes depending on the preceding word's accent.

This is useful for showing where a **following particle** would attach.

## Devoiced morae

Prefix a mora with lowercase `d` to mark it as devoiced:

```
わたdくし;0
```

The `d` marker is removed from displayed text.
Devoiced morae are drawn with a dashed circle
or rounded rectangle, and the text receives the `devoiced` class.

For multi-word examples:

```
dひとり;2 で dくすり;0 を のんだ;1
```

<!-- generated with expression: "dひとり;2 で dくすり;0 を のんだ;1" -->
<svg class="ajt__pitch_svg" style="font-family: Noto Sans, Noto Sans CJK JP, IPAexGothic, IPAPGothic, IPAGothic, Yu Gothic, Sans" viewBox="0 0 562 140" height="100px" xmlns="http://www.w3.org/2000/svg"><g class="paths"><g class="nakadaka"><line stroke="black" stroke-width="2.50" x1="35.100" y1="61.720" x2="76.900" y2="28.280" /><line stroke="black" stroke-width="2.50" x1="85.100" y1="28.280" x2="126.900" y2="61.720" /></g><g class="particle"></g><g class="connector"><line stroke="black" stroke-width="2.50" x1="136.250" y1="65.000" x2="175.750" y2="65.000" /></g><g class="heiban"><line stroke="black" stroke-width="2.50" x1="235.100" y1="61.720" x2="276.900" y2="28.280" /><line stroke="black" stroke-width="2.50" x1="286.250" y1="25.000" x2="325.750" y2="25.000" /></g><g class="connector"><line stroke="black" stroke-width="2.50" x1="186.250" y1="65.000" x2="225.750" y2="65.000" /></g><g class="particle"></g><g class="connector"><line stroke="black" stroke-width="2.50" x1="336.250" y1="25.000" x2="375.750" y2="25.000" /></g><g class="atamadaka"><line stroke="black" stroke-width="2.50" x1="435.100" y1="28.280" x2="476.900" y2="61.720" /><line stroke="black" stroke-width="2.50" x1="486.250" y1="65.000" x2="525.750" y2="65.000" /></g><g class="connector"><line stroke="black" stroke-width="2.50" x1="386.250" y1="25.000" x2="425.750" y2="25.000" /></g></g><g class="circles"><g class="nakadaka"><circle fill="black" stroke="black" stroke-width="2.50" cx="31.000" cy="65.000" r="5.25" /><circle fill="black" stroke="black" stroke-width="2.50" cx="81.000" cy="25.000" r="5.25" /><circle fill="black" stroke="black" stroke-width="2.50" cx="131.000" cy="65.000" r="5.25" /></g><g class="particle"><circle fill="none" stroke="black" stroke-width="2.50" cx="181.000" cy="65.000" r="5.25" /></g><g class="heiban"><circle fill="black" stroke="black" stroke-width="2.50" cx="231.000" cy="65.000" r="5.25" /><circle fill="black" stroke="black" stroke-width="2.50" cx="281.000" cy="25.000" r="5.25" /><circle fill="black" stroke="black" stroke-width="2.50" cx="331.000" cy="25.000" r="5.25" /></g><g class="particle"><circle fill="none" stroke="black" stroke-width="2.50" cx="381.000" cy="25.000" r="5.25" /></g><g class="atamadaka"><circle fill="black" stroke="black" stroke-width="2.50" cx="431.000" cy="25.000" r="5.25" /><circle fill="black" stroke="black" stroke-width="2.50" cx="481.000" cy="65.000" r="5.25" /><circle fill="black" stroke="black" stroke-width="2.50" cx="531.000" cy="65.000" r="5.25" /></g></g><g class="text"><g class="nakadaka"><circle class="devoiced" fill="none" stroke="black" cx="31" cy="106" stroke-width="1.50" r="17.00" stroke-dasharray="2 3" /><text class="devoiced" fill="black" font-size="24.0px" letter-spacing="-4.0px" x="31" y="115" dx="-12">ひ</text><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="81" y="115" dx="-12">と</text><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="131" y="115" dx="-12">り</text></g><g class="particle"><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="181" y="115" dx="-12">で</text></g><g class="heiban"><circle class="devoiced" fill="none" stroke="black" cx="231" cy="106" stroke-width="1.50" r="17.00" stroke-dasharray="2 3" /><text class="devoiced" fill="black" font-size="24.0px" letter-spacing="-4.0px" x="231" y="115" dx="-12">く</text><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="281" y="115" dx="-12">す</text><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="331" y="115" dx="-12">り</text></g><g class="particle"><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="381" y="115" dx="-12">を</text></g><g class="atamadaka"><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="431" y="115" dx="-12">の</text><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="481" y="115" dx="-12">ん</text><text fill="black" font-size="24.0px" letter-spacing="-4.0px" x="531" y="115" dx="-12">だ</text></g></g></svg>

Here `ひ` and `く` are explicitly marked as devoiced
because each mora is prefixed with `d` in the input.

## Multiple pitch notations

Separate multiple pitch numbers with a comma to generate multiple graphs from the same word.
Only the first section in a sentence is expanded
when its accent contains comma-separated alternatives:

```
にほんご;1,2,3
```

This produces three graph sequences:

```
にほんご;1
にほんご;2
にほんご;3
```

If more sections follow, they are copied into every expanded sequence:

```
にほんご;1,2,3 を べんきょう; する;
```

## Keihan dialect

For Kansai-style (京阪) pitch patterns,
specify the role as an uppercase letter and the high/low levels explicitly.

```
word;Role;levels
```

`levels` is an explicit sequence of `h` (high) and `l` (low).
If the level string is shorter than the number of morae, the last level repeats.

Low-start words may rise differently depending on region,
so adjust the explicit `h/l` sequence if you are targeting a specific local variety.

| Letter | CSS role              | Example | Pitch Artist input | Notes                                   |
|--------|-----------------------|---------|--------------------|-----------------------------------------|
| `H`    | `keihan_heiban`       | 風      | `かぜ;H;hh`        | High-start flat                         |
| `A`    | `keihan_atamadaka`    | 川      | `かわ;A;hl`        | High then low                           |
| `N`    | `keihan_nakadaka`     | 頭      | `あたま;N;hhl`     | High-high-low                           |
| `L`    | `keihan_low_heiban`   | 糸      | `いと;L;lh`        | Low-start rising, no drop               |
| `M`    | `keihan_low_nakadaka` | 薬      | `くすり;M;lhl`     | Low-high-low                            |
| `O`    | `keihan_low_odaka`    | マッチ  | `マッチ;O;lhh`     | Low-high-high; following particle drops |
| `K`    | `keihan_kifuku`       | あるく  | `あるく;K;lhh`     | Use for non-heiban verbs/i-adjectives   |

## Colored text output

Pitch Artist also supports a colored-text output mode for card generation.
Instead of SVG, it returns spans based on the parsed section roles:

```html
<span class="heiban">がっこう</span><span class="atamadaka">まで</span>
```

Hidden sections such as `|`, the ghost particle `-`,
and the bare tape `;` are omitted from colored text output.
Multiple parsed sentences are joined with the configured `pitch_artist.separator_sentences` value.

## SVG output for card generation

You can type Pitch Artist syntax into one Anki field and generate SVGs into another field.
To do so, go to "AJT" > "Japanese options..." > "Pitch accent",
and create a new Profile with "Output format" set to "Artist SVG" or "Artist colors".

When the output format is `artist_svg`, generated graphs are joined
with the configured `pitch_artist.separator_expression_graphs` value.
When the output format is `artist_colors`, colored text sentences are joined
with the configured `pitch_artist.separator_sentences` value.

Input text is stripped through Anki's media/text handling before parsing.
Empty input returns an empty string.

## CSS classes

Pitch Artist uses CSS classes to style both SVG graphs and colored text.

Tokyo roles:

```
heiban
atamadaka
nakadaka
odaka
kifuku
black
white
setsubigo
empty
particle
```

Keihan roles:

```
keihan_heiban
keihan_atamadaka
keihan_nakadaka
keihan_low_heiban
keihan_low_nakadaka
keihan_low_odaka
keihan_kifuku
```

Particle-role combinations produce multiple classes:

```
particle atamadaka
particle odaka
```

Devoiced text and devoiced markers use the `devoiced` class.

Generated SVG uses these group classes:

| Class | Meaning |
|-------|---------|
| `paths` | Pitch contour lines |
| `circles` | Mora circles |
| `text` | Kana labels |
| `connector` | Inter-word connector line |

## Examples

### Basic accent types

The word はし has three meanings, each with a different pitch pattern.
This is the most famous example in Japanese pitch accent education.

| Word | Notation | Type       | Typical meaning |
| ---- | ----     | ---------- | -----------     |
| 端   | `はし;0` | heiban     | edge            |
| 箸   | `はし;1` | atamadaka  | chopsticks      |
| 橋   | `はし;2` | odaka      | bridge          |

### Particle attachment

The pitch of the following particle changes depending on the preceding word's accent.
This is the key difference between 橋 and 箸.

```
はし;0 を
はし;1 を
はし;2 を
```

Bare `を` is a particle-style section.
Its displayed pitch depends on whether the previous word ended low.
After heiban words, the following particle stays high.
After atamadaka or odaka words, it is low.

### Tape connector with furigana

```
大物[おおもの];0 ; まで;p
```

The standalone `;` creates a dotted connector between the two words.

### Disconnected words

To **disconnect** words, insert a pipe (`|`), or a comma (`,` or `、`).

```
つかう; , つかった;-
```

Two words separated by a comma (`,`).
The comma creates a gap in the connecting line between the two words.
The second word has a ghost particle (`-`), drawing a trailing empty circle.

```
じんせい;1 | まで;p
```

The graph shows two separate, unconnected pitch patterns.

### Tape + role letter

```
じんせい;1 ; まで;a-1
```

Three features combined: tape connector (`;`),
role letter for atamadaka (`a`), and always low pitch (`-1`).

### Mixed sentence

```
あんがい;。きょう;1 は | じんせい;1 に ついて かんがえた;k3 よ
```

This demonstrates sentence punctuation, explicit pitch accents,
bare particle-style words, and a role letter with pitch number.

### Multiple alternatives

```
にほんご;1,2,3 を べんきょう;0 する;
```

This generates three graph sequences for the first word's three alternatives,
with the rest of the sentence copied into each sequence.

### Regular sentences

```
ねこ;1 と いぬ;2 が dすき;2 です
```

猫と犬が好きです。
("I like cats and dogs.")

ねこ (猫) is atamadaka, いぬ (犬) is odaka, すき (好き) is odaka with a devoiced す.
The connecting line between each word shows how pitch transitions.


```
きょう;1 は てんき;1 が いい;1 です
```

今日は天気がいいです。
("The weather is nice today.")

きょう (今日) and てんき (天気) are both atamadaka. いい is also atamadaka.
The particles は, が, and です are drawn as particles (gray, unfilled).

```
にほんご;0 の べんきょう;0 を して;0 います;2
```

日本語の勉強をしています。
("I am studying Japanese.")

Both にほんご (日本語) and べんきょう (勉強) are heiban.
After a heiban word, the following particle stays high.
ます drops after ま.

```
でんわ;0 を かける;k2
```

電話をかける。
("To make a phone call.")

でんわ (電話) is heiban. After it, the particle を stays high.
かける is marked as kifuku.

```
わたし;0 は だいがく;0 の せんせい;3 です
```

私は大学の先生です。
("I am a university teacher.")

わたし (私), だいがく (大学) are heiban.
せんせい (先生) is nakadaka.

```
くるま;0 が すき;2 です か
```

車が好きですか。
("Do you like cars?")

くるま (車) is heiban, すき (好き) is odaka.
が after the heiban word stays high.
です follows the odaka word and drops low.

## Syntax reference

### Accent specs

| Notation | Meaning | Example |
|----------|---------|---------|
| no `;` | Particle-style section | `は` |
| `;` | Heiban by default | `がっこう;` |
| `;0` | Heiban | `ともだち;0` |
| `;1` | Atamadaka | `ねこ;1` |
| `;2` | Nakadaka or odaka by mora count | `いぬ;2` |
| `;h` | Heiban role | `ともだち;h` |
| `;a` | Atamadaka role | `はる;a` |
| `;n` | Nakadaka role | `せんせい;n` |
| `;o` | Odaka role | `ふゆ;o` |
| `;k` | Kifuku role | `かんがえた;k` |
| `;s` | Setsubigo role | `たち;s` |
| `;b` | Black role | `ことば;b` |
| `;w` | White role | `ことば;w` |
| `;k3` | Role plus pitch | `かんがえた;k3` |
| `;pa` | Particle-styled atamadaka | `ぐらい;pa` |
| `;po1` | Particle-styled odaka, pitch 1 | `ぐらい;po1` |
| `;p` | Particle role | `まで;p` |
| `;1,2,3` | Multiple alternatives for the first section | `にほんご;1,2,3` |
| `;2-` | Pitch plus trailing ghost marker | `ひとり;2-` |

If the accent part is omitted, the word is treated as a particle.

### Special symbols

| Symbol           | Where                     | Meaning                                      |
|------------------|---------------------------|----------------------------------------------|
| `;`, `；`, `:`   | After word                | Separates word from accent specification     |
| `;`              | Alone between words       | Dotted tape connector                        |
| `\|`,  `,`, `、` | Alone between words       | Breaks contour and prevents connection       |
| `.`              | Between sentences         | Sentence separator                           |
| newline          | Between sentences         | Sentence separator                           |
| `。!?！？`       | In input text             | Normalized to sentence separators            |
| `-`              | Sentence-final suffix     | Ghost particle marker                        |
| `d`              | Before a mora             | Devoiced mora marker                         |
| `[reading]`      | After kanji or mixed text | Supplies the reading used for mora splitting |

### Pitch number mapping

| Pitch number | 1 mora | 2 morae | 3+ morae |
|--------------|--------|---------|----------|
| `0` | heiban | heiban | heiban |
| `1` | atamadaka | atamadaka | atamadaka |
| `2` | heiban because pitch is greater than mora count | odaka | nakadaka unless the word has exactly 2 morae |
| `3` | heiban if impossible | heiban if impossible | nakadaka or odaka by mora count |
| equal to mora count | odaka | odaka | odaka |
| greater than mora count | heiban | heiban | heiban |

### Keihan dialect format

| Notation  | Meaning                                 |
|-----------|-----------------------------------------|
| `;H;hhll` | Keihan heiban, levels high-high-low-low |
| `;A;hlll` | Keihan atamadaka                        |
| `;N;lhhl` | Keihan nakadaka                         |
| `;L;hhll` | Keihan low heiban                       |
| `;M;lhhl` | Keihan low nakadaka                     |
| `;O;lhhl` | Keihan low odaka                        |
| `;K;hhll` | Keihan kifuku                           |

Level letters: `h` = high, `l` = low. If the levels string is shorter than the number of morae, the last level repeats.
