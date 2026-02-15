---
layout: visualization
title: "Biological Motion Illusion"
date: 2026-02-15
description: "A demonstration of the Johansson point-light walker phenomenon, showing how 15 moving dots creates a vivid perception of a human figure."
interactive: true
technologies: ["HTML5 Canvas", "JavaScript", "Perception"]
iframe_url: "/illusions-demos/biological-motion.html"
---

## The Phenomenon

Biological motion perception is the brain's ability to identify biological entities from their movement patterns alone. In 1973, Gunnar Johansson demonstrated that just a few points of light attached to the joints of a moving person are sufficient for observers to instantly recognize a human figure, identify its gender, and even determine its mood.

## The Demo

This interactive visualization approximates the kinematic motion of a human walker.

- **Speed**: Controls the gait cycle speed.
- **Scramble**: Randomly offsets the dots while keeping their local motion vectors, testing how spatial structure affects recognition.
- **Noise Dots**: Adds random moving dots ("masking") to test the robustness of the signal detection.
- **Invert**: Flips the walker upside down. Research shows that biological motion perception is orientation-specific; an upside-down walker is much harder to recognize.

## References

*Johansson, G. (1973). Visual perception of biological motion and a model for its analysis. Perception & Psychophysics, 14(2), 201-211.*
