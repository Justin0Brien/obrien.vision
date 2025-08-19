---
layout: illusion
title: "Café Wall Illusion"
permalink: /illusions/cafe-wall/
difficulty: "Easy"
categories: [geometric, tilt]
thumbnail: "/assets/images/cafe-wall-256w.webp"
iframe_src: "/illusions-demos/cafe-wall.html"
iframe_width: "100%"
iframe_height: "760"
description: "Interactive Café Wall illusion demo with adjustable grid, mortar and offset parameters to explore illusion strength."
---

# The Café Wall illusion

## What you see

In the **Café Wall illusion**, rows of offset dark and light tiles are separated by thin “mortar” bands. Although the mortar bands are **perfectly parallel and straight**, they **appear to tilt** in alternating directions (a wedge-like distortion). The effect is strongest with **high tile contrast**, **thin, mid-grey mortar**, and a **half-tile row offset**. ([Gregory & Heard, 1979](https://www.richardgregory.org/papers/cafe_wall/cafe-wall.pdf); [Bach, n.d.](https://michaelbach.de/ot/ang-cafewall/); [Illusions Index, n.d.](https://www.illusionsindex.org/i/23-cafe-wall-illusion)).  [richardgregory.org](https://www.richardgregory.org/papers/cafe_wall/cafe-wall.pdf) [michaelbach.de](https://michaelbach.de/ot/ang-cafewall/) [The Illusions Index](https://www.illusionsindex.org/i/23-cafe-wall-illusion)

---

## Why it’s called the “Café Wall”

The illusion **takes its name from a tiled wall on St Michael’s Hill in Bristol**. Richard L. Gregory, a University of Bristol psychologist, reported the effect after a lab colleague (Steve Simpson) noticed it on the café frontage; Gregory and Priscilla Heard later published the scientific account. A blue plaque now marks the site. ([Gregory & Heard, 1979](https://www.richardgregory.org/papers/cafe_wall/cafe-wall.pdf); [Gregory, n.d.](https://www.richardgregory.org/papers/cafe_wall/cafe-wall_p1.htm); [University of Bristol, 2017](https://www.bristol.ac.uk/news/2017/may/richard-gregory.html)).  [richardgregory.org](https://www.richardgregory.org/papers/cafe_wall/cafe-wall.pdf) [University of Bristol](https://www.bristol.ac.uk/news/2017/may/richard-gregory.html)

> Earlier relatives exist: **Hugo Münsterberg** discussed a related “shifted chequerboard” in 1894, and **A. H. Pierce** described the **“kindergarten patterns”** in 1898. The Bristol observation *re-popularised* the effect and gave it its modern name. ([Pierce, 1898](https://zenodo.org/records/1429116/files/article.pdf)).  [Zenodo](https://zenodo.org/records/1429116/files/article.pdf) [Wikipedia](https://en.wikipedia.org/wiki/Caf%C3%A9_wall_illusion)

---

## How to make it pop (and how to kill it)

- **Tile contrast:** Larger dark–light differences strengthen the tilt; low contrast weakens it. ([Gregory & Heard, 1979](https://www.richardgregory.org/papers/cafe_wall/cafe-wall.pdf)).  [richardgregory.org](https://www.richardgregory.org/papers/cafe_wall/cafe-wall.pdf)  
- **Mortar width:** **Thin** mortar (a few per cent of tile size) is most effective; very **thick** or **vanishingly thin** mortar reduces the effect. ([Gregory & Heard, 1979](https://www.richardgregory.org/papers/cafe_wall/cafe-wall.pdf)).  [richardgregory.org](https://www.richardgregory.org/papers/cafe_wall/cafe-wall_p2.htm)  
- **Mortar luminance (“mid-grey” rule):** Mortar **near the mid-grey** between the tile luminances maximises the tilt; mortar close to the **black** or **white** tile luminance collapses it. ([Kitaoka, Pinna, & Brelstaff, 2004](https://www.psy.ritsumei.ac.jp/akitaoka/CafeWall.pdf); [Wolfram MathWorld, n.d.](https://mathworld.wolfram.com/CafeWallIllusion.html)).  [psy.ritsumei.ac.jp](https://www.psy.ritsumei.ac.jp/akitaoka/CafeWall.pdf) [MathWorld](https://mathworld.wolfram.com/CafeWallIllusion.html)  
- **Row offset:** Around **½-tile** per alternate row gives a strong illusion; **0 offset** (aligned columns) largely removes it. ([Gregory & Heard, 1979](https://www.richardgregory.org/papers/cafe_wall/cafe-wall.pdf)).  [richardgregory.org](https://www.richardgregory.org/papers/cafe_wall/cafe-wall.pdf)  
- **Regularity:** Excess **row jitter**, heavy **corner rounding**, or strong **luminance imbalance** can disrupt the global tilt. ([Lulich & Stevens, 1989](https://link.springer.com/content/pdf/10.1007/BF02414904.pdf)).  [SpringerLink](https://link.springer.com/content/pdf/10.1007/BF02414904.pdf)

---

## A short history

- **1979 — Border locking:** Gregory & Heard proposed **border locking** to explain the effect: edges from neighbouring high-contrast tiles “lock” across the **mid-grey mortar**, displacing apparent border positions and creating a wedge pattern along the mortar lines. ([Gregory & Heard, 1979](https://www.richardgregory.org/papers/cafe_wall/cafe-wall.pdf)).  [richardgregory.org](https://www.richardgregory.org/papers/cafe_wall/cafe-wall.pdf)  
- **1980s–1990s — Filtering accounts:** Work on **spatial filtering** showed that standard **centre–surround** (DoG) and **elongated (oriented)** filters produce **local “twisted-cord”** diagonals in the mortar, which integrate into the global tilt. ([Morgan & Moulden, 1986](https://www.sciencedirect.com/science/article/pii/0042698986901306); [Lulich & Stevens, 1989](https://link.springer.com/content/pdf/10.1007/BF02414904.pdf)).  [ScienceDirect](https://www.sciencedirect.com/science/article/pii/0042698986901306) [SpringerLink](https://link.springer.com/content/pdf/10.1007/BF02414904.pdf)  
- **2000s — Contrast polarity & constraints:** **Contrast polarity** determines the direction (and presence) of tilt: alternating polarity units drive opposite local tilts that can cancel. ([Kitaoka, Pinna, & Brelstaff, 2004](https://www.psy.ritsumei.ac.jp/akitaoka/CafeWall.pdf)).  [psy.ritsumei.ac.jp](https://www.psy.ritsumei.ac.jp/akitaoka/CafeWall.pdf)

---

## What’s going on under the bonnet?

### 1) Early spatial filtering + “twisted-cord” cues  
Applying standard **retinal/cortical filters** (e.g., difference-of-Gaussians, oriented receptive fields) to the pattern yields alternating **oblique energy** in the mortar (a **Fraser twisted-cord** texture). Locally tilted segments accumulate into a **global** impression of slanting bands. ([Morgan & Moulden, 1986](https://www.sciencedirect.com/science/article/pii/0042698986901306); [Lulich & Stevens, 1989](https://link.springer.com/content/pdf/10.1007/BF02414904.pdf)).  [ScienceDirect](https://www.sciencedirect.com/science/article/pii/0042698986901306) [SpringerLink](https://link.springer.com/content/pdf/10.1007/BF02414904.pdf)

### 2) Border locking across mid-grey mortar  
Where mortar sits **between** the tile luminances, **illusory shifts** of border location from neighbouring tiles **lock** across the gap, producing the wedge geometry that your visual system mistakenly reads as **tilt**. ([Gregory & Heard, 1979](https://www.richardgregory.org/papers/cafe_wall/cafe-wall.pdf)).  [richardgregory.org](https://www.richardgregory.org/papers/cafe_wall/cafe-wall.pdf)

### 3) Contrast polarity as a direction selector  
If the elementary “units” alternate in **contrast polarity** (e.g., light body with dark “tail” vs dark body with light “tail”), they **drive opposite tilts**; arranging polarities appropriately **reverses or cancels** the illusion. ([Kitaoka et al., 2004](https://www.psy.ritsumei.ac.jp/akitaoka/CafeWall.pdf)).  [psy.ritsumei.ac.jp](https://www.psy.ritsumei.ac.jp/akitaoka/CafeWall.pdf)

> **Take-home:** No exotic circuitry is required; **ordinary spatial filters + mid-level edge interactions** are sufficient, with **contrast polarity** and **mortar geometry** deciding strength and direction. (See review: [Westheimer, 2008](https://core.ac.uk/download/pdf/82057132.pdf)).  [CORE](https://core.ac.uk/download/pdf/82057132.pdf)

---

## Parameter sensitivities (practical recipes)

- **Max the tilt**:  
  High contrast tiles (e.g., ~10% vs ~90% lightness), **mortar width** ≈ **2–6%** of tile size, **mortar** near the **mid-grey** of the two tiles, **row offset** ≈ **0.5**, minimal jitter. ([Gregory & Heard, 1979](https://www.richardgregory.org/papers/cafe_wall/cafe-wall.pdf); [Kitaoka et al., 2004](https://www.psy.ritsumei.ac.jp/akitaoka/CafeWall.pdf)).  [richardgregory.org](https://www.richardgregory.org/papers/cafe_wall/cafe-wall_p2.htm) [psy.ritsumei.ac.jp](https://www.psy.ritsumei.ac.jp/akitaoka/CafeWall.pdf)  
- **Make it vanish**:  
  Set **offset = 0**; or **mortar = 0**; or set mortar very **dark**/**light** (near tile values); or **crush contrast**; or add **row jitter**/irregular spacing. ([Gregory & Heard, 1979](https://www.richardgregory.org/papers/cafe_wall/cafe-wall.pdf); [MathWorld, n.d.](https://mathworld.wolfram.com/CafeWallIllusion.html)).  [richardgregory.org](https://www.richardgregory.org/papers/cafe_wall/cafe-wall.pdf) [MathWorld](https://mathworld.wolfram.com/CafeWallIllusion.html)

---

## Why it still matters

The Café Wall is a compact showcase of how **early spatial filtering** and **mid-level organisation** (edge interactions, polarity grouping) construct perceived **orientation** and **geometry**—sometimes incorrectly. It continues to guide **computational models** of early vision and to test ideas about **contrast polarity** and **context-dependent tilt**. ([Lulich & Stevens, 1989](https://link.springer.com/content/pdf/10.1007/BF02414904.pdf); [Westheimer, 2008](https://core.ac.uk/download/pdf/82057132.pdf)).  [SpringerLink](https://link.springer.com/content/pdf/10.1007/BF02414904.pdf) [CORE](https://core.ac.uk/download/pdf/82057132.pdf)

---

## Further reading & sources (APA)

- Bach, M. (n.d.). *Café Wall illusion*. Michael Bach’s “Optical Illusions & Visual Phenomena”. https://michaelbach.de/ot/ang-cafewall/   [michaelbach.de](https://michaelbach.de/ot/ang-cafewall/)  
- Gregory, R. L., & Heard, P. (1979). **Border locking and the Café Wall illusion**. *Perception, 8*(4), 365–380. https://www.richardgregory.org/papers/cafe_wall/cafe-wall.pdf   [richardgregory.org](https://www.richardgregory.org/papers/cafe_wall/cafe-wall.pdf)  
- Gregory, R. L. (n.d.). *Border locking and the Café Wall illusion* (HTML reprint). https://www.richardgregory.org/papers/cafe_wall/cafe-wall_p1.htm   [richardgregory.org](https://www.richardgregory.org/papers/cafe_wall/cafe-wall_p1.htm)  
- Illusions Index. (n.d.). *Café Wall illusion*. https://www.illusionsindex.org/i/23-cafe-wall-illusion   [The Illusions Index](https://www.illusionsindex.org/i/23-cafe-wall-illusion)  
- Kitaoka, A., Pinna, B., & Brelstaff, G. (2004). **Contrast polarities determine the direction of Café Wall tilts**. *Perception, 33*(1), 11–20. https://www.psy.ritsumei.ac.jp/akitaoka/CafeWall.pdf   [psy.ritsumei.ac.jp](https://www.psy.ritsumei.ac.jp/akitaoka/CafeWall.pdf)  
- Lulich, D. P., & Stevens, K. A. (1989). **Differential contributions of circular and elongated spatial filters to the Café Wall illusion**. *Biological Cybernetics, 61*(6), 427–435. https://link.springer.com/content/pdf/10.1007/BF02414904.pdf   [SpringerLink](https://link.springer.com/content/pdf/10.1007/BF02414904.pdf)  
- Morgan, M. J., & Moulden, B. (1986). **The Münsterberg figure and twisted cords**. *Vision Research, 26*(11), 1793–1800. https://www.sciencedirect.com/science/article/pii/0042698986901306   [ScienceDirect](https://www.sciencedirect.com/science/article/pii/0042698986901306)  
- Pierce, A. H. (1898). **The illusion of the kindergarten patterns**. *Psychological Review, 5*(3), 233–253. https://zenodo.org/records/1429116/files/article.pdf   [Zenodo](https://zenodo.org/records/1429116/files/article.pdf)  
- University of Bristol. (2017, May). *Blue plaque honours Professor Richard Gregory*. https://www.bristol.ac.uk/news/2017/may/richard-gregory.html   [University of Bristol](https://www.bristol.ac.uk/news/2017/may/richard-gregory.html)  
- Westheimer, G. (2008). **Illusions in the spatial sense of the eye: Geometrical–optical illusions and the neural representation of space**. *Vision Research, 48*(20), 2128–2142. https://core.ac.uk/download/pdf/82057132.pdf   [CORE](https://core.ac.uk/download/pdf/82057132.pdf)

---

### Bottom line

- The “wonky mortar” is a **computed** percept: **ordinary spatial filters** generate local oblique structure (twisted cords), **border locking** across **mid-grey mortar** pulls edges, and **contrast polarity** steers direction.  
- The illusion earned its name from a **real café wall in Bristol** seen by **Gregory’s group**—and it’s still a workhorse for understanding how vision infers **orientation** from **context**, not just from pixels. ([Gregory & Heard, 1979](https://www.richardgregory.org/papers/cafe_wall/cafe-wall.pdf); [University of Bristol, 2017](https://www.bristol.ac.uk/news/2017/may/richard-gregory.html)).  [richardgregory.org](https://www.richardgregory.org/papers/cafe_wall/cafe-wall.pdf) [University of Bristol](https://www.bristol.ac.uk/news/2017/may/richard-gregory.html)
