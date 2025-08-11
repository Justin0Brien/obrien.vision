
# Motion Aftereffect (Waterfall) — interactive guide

This page explains the **motion aftereffect (MAE)** and how to use the interactive demo in `mae.html`. It’s written for all audiences — from a curious reader to a vision researcher — and includes APA‑style references with links.

---

## What you see

If you stare at a **moving pattern** (a downward waterfall, a drifting grating, rotating dots) for several seconds and then look at a **static** pattern, the static pattern appears to **move in the opposite direction** for a short time. That compelling drift is the **motion aftereffect**. The classic anecdote is by **Addams (1834)**, who noticed the effect after watching the **Falls of Foyers** and then glancing at nearby rocks.

- Adapt to **downward** motion → a **stationary** test looks like it drifts **upwards**.
- Adapt to **clockwise rotation** → a static test seems to **rotate anticlockwise**.
- Adapt to **expansion** → a static test **contracts** (and vice versa).

The MAE lasts from a second or two to tens of seconds depending on **adaptation time**, **contrast**, **motion speed**, **test type**, and whether you keep **fixation** steady.

---

## Quick start with the demo

1. Open `mae.html` and choose the **Classic waterfall** preset.
2. Press **Start adapting** and **fixate the +** in the centre for ~10–12 s.
3. When it switches to **Test**, the static grating should drift **upwards**.
4. Use **Top‑up 2 s** to refresh the effect without re‑setting everything.

> Tip: you can also jump straight to **No MAE (no adaptation)** to verify that without adaptation the static test looks truly stationary.

---

## Controls (what they do)

### Adapt stimulus (moving)
- **Type** — drifting **grating** (horizontal/vertical), **rotation** (dot field), or **radial** expansion/contraction.
- **Direction** — forward vs reverse (e.g., CW vs CCW).
- **Adaptation time** — longer adaptation → stronger/longer MAE (with diminishing returns).
- **Speed** — faster motion often increases the MAE up to a comfort limit.
- **Spatial frequency** — number of cycles across the display (for gratings / rings).
- **Contrast** — higher contrast adapts motion detectors more strongly.
- **Dot count** — for dot fields (rotation/radial), controls density.
- **Fixation cross** — turning it on encourages steady fixation, which strengthens the effect.

### Test stimulus (static)
- **Type** — choose a **stationary grating** (horizontal/vertical), **radial rings** (good for rotation/radial MAE), **static noise**, or a **blank grey** field.
- **Test contrast** — raises the visibility of the static pattern; a bit of texture helps the MAE grip.
- **Show during adaptation** — a faint “ghost” of the test while adapting; some labs use this to keep attention centred.

### Run panel
- **Start adapting** — begins the timed adaptation period (progress bar shows elapsed proportion).
- **Top‑up 2 s** — quick booster without re‑initialising the dots.
- **Go to test** — jump to the static test immediately.
- **Stop** — return to idle.

### Presets
- **Classic waterfall** (vertical motion → vertical grating test)
- **Strong rotation** (rotating dots → radial rings test)
- **Strong expansion** (radial dots → rings)
- **Weak (low contrast)**
- **No MAE (no adaptation)**

### Export
- **Export PNG** — saves the current canvas.

---

## Try these experiments

- **Duration curve** — fixate and vary **Adaptation time** (4, 8, 12, 20 s). Estimate the **MAE duration** each time (when it fully fades). You’ll typically see a quick rise then diminishing returns.
- **Direction & test pairing** — adapt with **rotation**, test with **rings**; adapt with **downward** motion, test with **vertical grating**; adapt with **expansion**, test with **rings**. The strongest MAE appears when **test structure matches the adapted motion axis**.
- **Fixation vs scanning** — compare with and without **Fixation cross**. Scanning the adaptor weakens the MAE for many observers.
- **Interocular transfer** (advanced) — adapt with one eye closed, then switch eyes at test. A robust MAE **transfers across eyes**, implying a **cortical** locus (beyond monocular retina).
- **Dynamic test** — choose **Static noise** as the test. You will still see a strong MAE, often called the **dynamic MAE** (a flickering/noisy test can reveal adaptation at later motion stages).

---

## How does it work? (layered explanation)

### The intuition
Motion‑sensitive neurons tuned to a direction (e.g., **down**) **adapt** or **fatigue** when they fire strongly for a while. When the motion stops, the adapted population’s response is **reduced** relative to its **opposite‑direction** neighbours, so the balance of activity **favours the opposite direction** — the static test is **read** as **up**. This simple **opponent‑like** account captures the core phenomenon.

### Evidence you can feel (and measure)
- **Strength grows with adaptor contrast, speed and duration**, saturating with time — classic hallmarks of sensory adaptation (e.g., **Wohlgemuth, 1911**; **Mather, Verstraten, & Anstis, 1998**).
- The MAE **transfers between eyes** and to **different test patterns**, pointing to **cortical** motion areas rather than the retina alone (e.g., **Tootell et al., 1995**).
- Microstimulation and single‑unit studies in **area MT/V5** show **direction‑selective** mechanisms that bias motion judgements, consistent with the MAE’s locus (**Salzman, Britten, & Newsome, 1990**).

### A modern picture
- **Multiple stages** adapt: early **V1 direction‑selective** neurons and **MT/V5** populations, with **normalisation** and **opponent interactions** shaping the percept (reviewed by **Anstis, Verstraten, & Mather, 1998**; **Kohn, 2007**).
- The **dynamic MAE** (illusory motion on a flickering/noisy test) reflects adaptation beyond strictly low‑level motion energy sensors and reveals **higher‑level** contributions (**Mather, 2008**).
- **Form‑motion interactions**: matching the **test structure** (grating vs rings) to the **adapted motion axis** increases the aftereffect — essentially a **tuning** effect (summarised in **Mather et al., 1998**).

---

## What strengthens / weakens the effect

**Stronger**
- Longer **adaptation time** (up to a plateau)
- Higher **adaptor contrast** and **speed** (within comfort)
- **Steady fixation** (use the cross)
- **Matching** test pattern (e.g., rings after rotation)

**Weaker / absent**
- Very **short** adaptation (<3–4 s)
- Very **low contrast** adaptor
- **Mismatched** adaptor/test geometry
- **Eye movements** or attention away from the adaptor

---

## Notes for teaching & data collection

- The demo’s **Top‑up** makes class demonstrations smooth: adapt once, then give brief refreshers before each test.
- For quick lab exercises, have students record MAE **duration** vs **adaptation time** and plot the saturation curve.
- For a simple **interocular** demonstration, adapt with one eye occluded and test with the other.

---

## References (APA with links)

- Addams, R. (1834). An account of a peculiar optical phenomenon seen after having looked at a moving body. *The London and Edinburgh Philosophical Magazine and Journal of Science, 5*(29), 373–374. https://en.wikipedia.org/wiki/Motion_aftereffect#History  
- Anstis, S., Verstraten, F. A. J., & Mather, G. (1998). The motion aftereffect. *Trends in Cognitive Sciences, 2*(3), 111–117. https://www.sciencedirect.com/science/article/pii/S1364661398011926  
- Kohn, A. (2007). Visual adaptation: Physiology, mechanisms, and functional benefits. *Vision Research, 47*(25), 3125–3131. https://www.sciencedirect.com/science/article/pii/S0042698907002812  
- Mather, G. (2008). Motion aftereffect. *Scholarpedia, 3*(10), 8295. http://www.scholarpedia.org/article/Motion_aftereffect  
- Mather, G., Verstraten, F. A. J., & Anstis, S. (1998). *The motion aftereffect: A modern perspective*. MIT Press. https://mitpress.mit.edu/9780262631978/the-motion-aftereffect/  
- Salzman, C. D., Britten, K. H., & Newsome, W. T. (1990). Cortical microstimulation influences perceptual judgements of motion direction. *Nature, 346*, 174–177. https://www.nature.com/articles/346174a0  
- Tootell, R. B. H., Reppas, J. B., Dale, A. M., Look, R. B., Sereno, M. I., Malach, R., Brady, T. J., & Rosen, B. R. (1995). Visual motion aftereffect in human cortical area MT+ revealed by functional magnetic resonance imaging. *Nature, 375*, 139–141. https://www.nature.com/articles/375139a0  
- Wohlgemuth, A. (1911). *On the after-effect of seen movement* (Monograph Supplement 1(3)). British Journal of Psychology. https://psychclassics.yorku.ca/Wohlgemuth/  

> Accessible summaries: 
> - **Michael Bach** — Motion aftereffect demos and notes: https://michaelbach.de/ot/mot-mae/  
> - **Wikipedia** — overview with history and variants: https://en.wikipedia.org/wiki/Motion_aftereffect

---

### Acknowledgements

The interface is designed for clear demonstrations of **classical** (static‑test) and **dynamic** MAE, with rotation and radial variants for teaching **complex motion** adaptation. If you’d like a version that alternates *adapt–test* on a fixed schedule and logs key‑press responses, say the word.