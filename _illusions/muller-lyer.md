
---
layout: illusion
title: "Müller–Lyer Illusion"
permalink: /illusions/muller-lyer/
difficulty: "Medium"
categories: [geometric, size-contrast]
iframe_src: "/illusions-demos/muller-lyer.html"
iframe_width: "100%"
iframe_height: "760"
description: "Interactive Müller–Lyer illusion lab: adjust wing angle/length, feathering, context and perspective underlays; includes psychophysics mode."
---

# Müller–Lyer illusion — interactive guide

This page explains the **Müller–Lyer illusion** and how to use the interactive demo in `muller-lyer.html` to explore it. Everything is written for a general audience, but includes pointers and references for professional readers.

---

## What you see

Two horizontal line segments of **equal physical length** are shown with different **end configurations**. With **arrowheads pointing inwards** (wings‑in), the line **looks shorter**; with **tails pointing outwards** (wings‑out), it **looks longer**. Swapping or neutralising the ends (e.g., with **T‑caps**, **circular end‑caps**, or **no ends at all**) weakens or abolishes the effect. The illusion scales with **wing angle**, **wing length**, **shaft thickness**, and with *context*.

The interactive lets you:

- Compare any two configurations (top vs bottom figure)
- Run **“psychophysics mode”** to estimate your own **PSE** (point of subjective equality)
- Add a **3‑D underlay** (inside room corner / outside building corner) to test **Richard Gregory’s** perspective hypothesis
- Add **background stripes** to probe **assimilation** accounts
- Export **PNG**/**SVG** for teaching or papers

---

## Quick start

1. Open `muller-lyer.html` in a modern browser.
2. Click **Classic (in vs out, equal length)**. You should see the usual effect: the **wings‑out** line appears longer.
3. Tick **Lock lengths equal**, then move **Length offset (top − bottom)** until the lines *look* equal. The offset you dial in is your approximate **PSE**.
4. Try **Gregory: inside room corner** and **Gregory: outside building corner** and notice whether the **3‑D interpretation** changes the strength for you.
5. Switch to **T‑caps (near neutral)** or **Plain lines** to see the effect collapse.

---

## Controls (what they do)

### Pair presets
Preset buttons configure *both* figures to demonstrate strong, weak, and neutral conditions (e.g., **Classic**, **Extreme**, **Feathered**, **T‑caps**, **Plain lines**, **Gregory inside/outside**).

### Global
- **Canvas margin**: padding around the drawn figures.
- **Line colour**: aesthetic only.
- **Background stripes (assimilation)** and **Stripes contrast**: adds parallel/orthogonal high‑frequency context to test **luminance/position assimilation** accounts (can nudge perceived length).

### Underlay (Gregory test)
- **Underlay type**: **Inside room corner** vs **Outside building corner**, or **None**.
- **Underlay strength (opacity)**, **Perspective amount**: set the salience of the 3‑D cue. These test whether a **depth interpretation** modulates your percept (as proposed by **Gregory**).

### Top / Bottom figure
Each figure has independent settings:
- **Configuration**: **wings‑in**, **wings‑out**, **T‑caps (90°)**, **circular end‑caps**, **none**, or **feathered** (multiple fins along the shaft).
- **Shaft length / thickness**: physical length and stroke weight of the line.
- **Wing angle**: 15°–165°. Farther from 90° usually increases the effect.
- **Wing length / thickness**: longer, finer wings generally increase the effect.
- **Feather fins / spacing**: for the “feathered” variant (often strong).

### Psychophysics mode
- **Lock lengths equal**: keeps the two **shafts physically equal** unless you deliberately offset one.
- **Length offset (top − bottom)**: when locked, this adds/subtracts length to the **top** figure only. Adjust until the pair *looks* equal → that offset is your **PSE** (how far your perception is displaced by the illusion under current settings).

### Overlays & export
- **Measuring ticks** and **central bisection marks**: metrology aids.
- **Export PNG / Export SVG**: grabs the current scene for reuse.

---

## Try these experiments

- **Wing geometry sweep**: Fix the bottom figure (wings‑out). Vary **wing angle** and **length** on the top figure (wings‑in). Note how the **perceived difference** changes; measure the **PSE** for each.
- **Context assimilation**: Turn on **background stripes** and swap between **parallel** and **orthogonal**. Does one setting **pull** the apparent length more?
- **Gregory’s 3‑D hypothesis**: Toggle **inside** vs **outside** corner underlays and vary **perspective amount**. Some observers report larger effects when the configuration aligns with familiar **3‑D corners**.
- **Neutralise the illusion**: Switch both to **T‑caps**, **circular caps**, or **plain lines**. Increase **shaft thickness**. Bring **wing angle** near **90°** and shorten the wings. The effect should fade.

---

## How does it work?

There isn’t a single, universally accepted mechanism. Several complementary ideas explain different slices of the phenomenon:

1. **Size constancy / 3‑D interpretation**  
   The wings resemble **projective corners** (like the edges of a room or building). On this view, observers apply **size‑constancy** scaling as if interpreting a 3‑D scene: *wings‑out* suggests an **outside** corner (edges receding), biasing the line to seem **longer**; *wings‑in* suggests an **inside** corner, biasing it **shorter**. The demo’s **underlay** lets you test this idea interactively. (Gregory, 1966, 1970).

2. **Depth‑processing variants**  
   Formal depth accounts show that adding **perspective cues** can change apparent length, and that **contradictory depth signals** (e.g., fins suggesting different depth orientations) alter the effect. (Gillam, 1971).

3. **Assimilation / spatial integration**  
   The fins add **flanking structure**. Under some viewing conditions, edge and luminance signals from the fins **assimilate** with the shaft, displacing apparent **end‑points** and hence perceived length. Related manipulations (e.g., adding **background stripes**) can tilt the balance between **contrast** and **assimilation**. (Pressey, 1971, 1972; Day, 1989).

4. **Empirical / natural‑scene statistics**  
   In an **empirical ranking** framework, illusions arise because the visual system maps images to likely **real‑world sources** based on accumulated experience; the Müller–Lyer configuration often corresponds to 3‑D arrangements where the central span really **differs** in extent. Statistical models predict the observed biases without requiring explicit 3‑D parsing on each trial. (Howe & Purves, 2005; Yang & Purves, 2003).

5. **Cultural / ecological modulation**  
   Classic cross‑cultural work found that susceptibility varies with exposure to **“carpentered” environments** rich in rectilinear corners; groups with less such exposure showed **weaker** Müller–Lyer effects. (Segall, Campbell, & Herskovits, 1963).

> **Bottom line:** The illusion likely reflects **multiple stages**—from early spatial integration through **mid‑level grouping** and **depth inference**, up to **empirical priors** from the natural environment. Different tweaks in the demo emphasise different mechanisms.

---

## What strengthens / weakens the illusion

**Stronger**
- Wings **far from 90°** and **longer** fins
- **Finer** shafts and fins (up to legibility limits)
- **Feathered** ends (multiple fins)
- **Background context** that encourages assimilation
- **3‑D underlays** consistent with corner interpretations

**Weaker / absent**
- **T‑caps**, **circular end‑caps**, or **plain lines**
- **Wing angle** near **90°** and **short** fins
- **Very thick** shafts (ends become negligible)
- Incongruent or no **3‑D cues**; removal of flanking structure

---

## Notes for teaching & measurement

- Use **psychophysics mode** to obtain class PSEs under different settings; plot PSE vs **wing angle** or **wing length**.  
- The **SVG export** provides vector figures suitable for print; keep **shaft thickness** and **wing angles** consistent between conditions.

---

## References

- Coren, S., & Girgus, J. S. (1978). *Seeing is deceiving: The psychology of visual illusions*. Lawrence Erlbaum. https://www.routledge.com/Seeing-is-Deceiving-The-Psychology-of-Visual-Illusions/Coren-Girgus/p/book/9780898590067
- Day, R. H. (1989). Visual illusions and constancies: A reply to Bressan and Kramer. *Perception & Psychophysics, 45*(5), 405–406. https://link.springer.com/article/10.3758/BF03210716
- Gillam, B. (1971). A depth processing theory of the Müller–Lyer illusion. *Perception & Psychophysics, 10*(3), 211–216. https://link.springer.com/article/10.3758/BF03212819
- Gregory, R. L. (1966). *Eye and Brain: The psychology of seeing* (1st ed.). Weidenfeld & Nicolson. (See later OUP editions.) https://global.oup.com/academic/product/eye-and-brain-9780691119545
- Gregory, R. L. (1970). The intelligent eye. Weidenfeld & Nicolson. https://www.penguin.co.uk/books/415774/the-intelligent-eye-by-gregory-richard/9780297765561
- Howe, C. Q., & Purves, D. (2005). Natural‑scene statistics predict how we perceive length and width. *Proceedings of the National Academy of Sciences, 102*(4), 1234–1239. https://www.pnas.org/doi/10.1073/pnas.0409509102
- Michael Bach. (n.d.). *Müller–Lyer illusion*. Optical Illusions & Visual Phenomena. https://michaelbach.de/ot/sze-ml/
- Müller‑Lyer, F. C. (1889). Optische Urteilstäuschungen. *Archiv für Physiologie Supplementband*, 263–270. (Overview and links: https://en.wikipedia.org/wiki/M%C3%BCller%E2%80%93Lyer_illusion )
- Pressey, A. W. (1971). An assimilation theory of the Müller‑Lyer illusion. *Perception & Psychophysics, 9*(5), 322–325. https://link.springer.com/article/10.3758/BF03212660
- Pressey, A. W. (1972). The assimilation theory of the Müller‑Lyer illusion: An additional demonstration. *Perception & Psychophysics, 11*(5), 329–331. https://link.springer.com/article/10.3758/BF03210354
- Segall, M. H., Campbell, D. T., & Herskovits, M. J. (1963). Cultural differences in the perception of geometric illusions. *Science, 139*(3556), 769–771. https://www.science.org/doi/10.1126/science.139.3556.769
- Yang, Z., & Purves, D. (2003). Image/source statistics of surfaces in natural scenes. *Network: Computation in Neural Systems, 14*(3), 371–390. https://www.tandfonline.com/doi/abs/10.1088/0954-898X_14_3_302

> Accessible summaries: 
> - *Illusions Index* — Müller–Lyer: https://www.illusionsindex.org/i/mueller-lyer-illusion  
> - *Scholarpedia* entry on geometrical illusions (overview): http://www.scholarpedia.org/article/Geometrical-optical_illusions

---

