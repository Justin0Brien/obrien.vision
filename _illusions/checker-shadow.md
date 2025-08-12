---
layout: illusion
title: "Checker–Shadow"
permalink: /illusions/checker-shadow/
difficulty: "Medium"
categories: [lightness, context]
duration: "2–3 minutes"
iframe_src: "/assets/demos/illusions/checker-shadow.html"
iframe_width: "100%"
iframe_height: "680"
description: "Interactive Checker–Shadow demo with a clear, layered explanation and reveal controls."
---

## The Checker–Shadow (Adelson) illusion — a clear, layered explainer

## What you see

In **Adelson’s Checker–Shadow illusion**, two marked squares on a chequerboard (A and B) **look very different in shade**—A appears dark, B looks light—yet they’re **physically identical** (same pixel values / print ink). A sits in the light; B sits in the shadow of a cast object. Remove or “reveal” the context and the equality becomes obvious. First published by **Edward H. Adelson** in **1995**, it’s now the go-to demonstration of how strongly **context and inferred illumination** shape perceived **lightness** (Wikipedia, n.d.; MIT Perceptual Science Group, n.d.).

---

## How to make it pop (and how to kill it)

- Keep a **high board contrast**: a light–dark chequerboard with a **soft-edged** cast shadow across it. The **soft edge** reads as illumination, not paint (MIT Perceptual Science Group, n.d.).  
- Choose the labelled tiles so that one is a **light square in shadow** and the other is a **dark square in light**; surround each with **oppositely shaded neighbours** to amplify simultaneous-contrast cues (MIT Perceptual Science Group, n.d.).  
- The illusion fades if you **harden the shadow edge** (it starts to look like paint), reduce global contrast, or remove the **3-D cues** to shadow and occlusion (MIT Perceptual Science Group, n.d.).

---

## A short history (and why it stuck)

Adelson developed the image to highlight that the visual system aims for **lightness constancy**—estimating **surface reflectance** despite changes in illumination—and that **mid-level organisation** (grouping, junctions, shadows) can dominate over simple local contrast. His 1993 **Science** paper laid the groundwork; the 1995 figure became iconic, and a widely used classroom talking point (Adelson, 1993; MIT Perceptual Science Group, n.d.).

---

## The classical ingredients

1. **Simultaneous contrast**: each tile’s apparent lightness is nudged by the **local surround** (dark neighbours make a tile look lighter, light neighbours make it look darker). This on its own is *not* enough for the full effect, but it contributes (Adelson, 1993).  
2. **Illumination discounting**: the brain treats the **soft gradient** across the shadow as a *change in lighting*, not paint, and **“divides out”** that lighting to recover surface reflectance. As a result, a **light square in shadow** is interpreted as **high-reflectance** despite its **low luminance**, so it looks light; a **dark square in light** goes the other way (Adelson, 2000; MIT Perceptual Science Group, n.d.).  
3. **Perceptual organisation**: cues such as **T-junctions / occlusion**, **shadow geometry**, and **soft edges** make a 2-D picture behave like a 3-D scene in your head. That mid-level parsing is central to the illusion’s strength (Anderson, 1997; Albert, 2007).

---

## Where “simple” accounts fall short

Purely **retinal** stories (e.g., lateral inhibition) explain simultaneous contrast, but they can’t justify why **soft shadows**, **junction structure**, and **scene interpretation** so powerfully change the percept. Adelson’s demonstrations, and later work on **transparency/occlusion**, show that **perceptual organisation** and **layered scene decomposition** are needed alongside early spatial filtering (Adelson, 1993; Anderson, 1997).

---

## The contemporary view: combining mechanisms

Most researchers now treat Checker–Shadow as a **multi-stage computation**:

- **Early spatial filtering & adaptation** provide local contrast signals (think Retinex-style normalisation) (Land & McCann, 1971; Jameson & Hurvich, 1961).  
- **Mid-level organisation** segments the image into **surfaces** and **illumination/shadow fields** using **junctions, soft edges, and 3-D cues**, then **assigns lightness** by discounting the inferred illumination (Anderson, 1997; Knill & Kersten, 1991).  
- **Anchoring frameworks** (Gilchrist) formalise how regions set **reference levels** for lightness within grouped contexts, accounting for many “errors” including Checker–Shadow (Gilchrist, 2006).

No single mechanism nails *every* lightness illusion, but **illumination-aware, organised models** explain why B “must be” light (it’s in shadow) and A “must be” dark (it’s in light), **even when their luminance is identical** (Adelson, 2000).

---

## Parameter sensitivities (practical notes)

- **Shadow edge**: **soft** = strong illusion; **hard** = looks like paint → weaker effect (MIT Perceptual Science Group, n.d.).  
- **Neighbour context**: maximise by choosing A and B so their local surrounds are **opposite polarity** (MIT Perceptual Science Group, n.d.).  
- **3-D plausibility**: add a **casting object**, consistent **direction of light**, and coherent **occlusion** cues for best results. Remove them and the illusion weakens (MIT Perceptual Science Group, n.d.).

---

## Why it still matters

Checker–Shadow is more than a parlour trick; it’s a compact testbed for **lightness constancy**, showing that the brain’s best guess about **materials** and **lighting** can trump raw luminance. It connects **low-level** normalisation, **mid-level** segmentation/anchoring, and **scene interpretation** in one image—useful both for vision science and for graphics/vision **modelling** (Adelson, 2000; Gilchrist, 2006).

---

## Further reading (selected)

- **Adelson, E. H. (1993).** *Perceptual Organization and the Judgment of Brightness.* **Science, 262**, 2042–2044. (mid-level organisation in brightness/lightness)  
- **Adelson, E. H. (2000).** *Lightness Perception and Lightness Illusions.* In **The New Cognitive Neurosciences** (Gazzaniga, ed.). (illumination discounting; layered view)  
- **MIT Perceptual Science Group:** original image, “why it works”, downloadable assets.  
- **Land & McCann (1971).** *Lightness and Retinex Theory.* **JOSA**. (foundational illumination-normalisation idea)  
- **Gilchrist, A. (2006).** *Seeing Black and White.* Oxford University Press. (anchoring theory; comprehensive review)  
- **Anderson & colleagues (1990s–2000s).** Work on **transparency/occlusion & junctions** in lightness perception.

---

## Bottom line

- Square **A** and **B** *are* the same luminance; your brain **relabels** them because it **segments** the scene into **surfaces** and **illumination** and then **discounts the shadow**—with simultaneous-contrast nudges from their different surrounds (MIT Perceptual Science Group, n.d.).  
- The illusion thrives on **soft shadow edges**, **plausible 3-D cues**, and **opposite local surrounds**; break those and it collapses (MIT Perceptual Science Group, n.d.).  
- The success of the effect shows **how good** (and occasionally **gullible**) human lightness perception is when it tries to **infer reflectance** from **context**, not just read off pixel values (Adelson, 2000).
