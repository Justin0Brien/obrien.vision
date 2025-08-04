---
layout: default
title: "Visualizing Career Transitions: The Story Behind the Sankey Diagram"
date: 2025-08-01
categories: [data-visualization, employment]
tags: [sankey-diagram, d3js, career-transitions, unemployment]
author: "Justin O'Brien"
excerpt: "Exploring the design decisions and data insights behind the interactive Sankey diagram showing employment outcomes for professionals aged 50+ after redundancy."
# image: "/assets/images/posts/2025-08-01-visualizing-career-transitions/hero-sankey-flow.jpg"
---t: default
title: "Visualizing Career Transitions: The Story Behind the Sankey Diagram"
date: 2025-08-01 10:00:00 +0000
categories: [data-visualization, employment]
tags: [sankey-diagram, d3js, career-transitions, unemployment]
author: "Justin O'Brien"
excerpt: "Exploring the design decisions and data insights behind the interactive Sankey diagram showing employment outcomes for professionals aged 50+ after redundancy."
---

# Visualizing Career Transitions: The Story Behind the Sankey Diagram

When I set out to visualize employment outcomes for professionals aged 50+ following redundancy, I knew the story was complex. Unlike a simple before-and-after comparison, career transitions unfold over time, with multiple pathways and outcomes that shift as months pass.

The [interactive Sankey diagram](/sankey.html) I created tells this story through the flow of percentages across different time periods, revealing patterns that might be lost in traditional charts or tables.

## Why a Sankey Diagram?

Sankey diagrams excel at showing flow and transition. They're perfect for visualizing:

- **Proportional relationships**: The width of each flow represents the percentage of people following that path
- **Multiple outcomes**: Unlike pie charts that show a single moment, Sankey diagrams can show how outcomes evolve
- **Complex pathways**: Some people find professional jobs quickly, others cycle through different states before settling into long-term outcomes

## The Data Story

The visualization reveals several key insights:

### Early Struggles

At 3 months post-redundancy, 65% of professionals aged 50+ remain unemployed. This stark figure highlights the immediate challenge this demographic faces in the job market.

### Gradual Recovery

By 6 months, the unemployment rate drops to 38%, and by 12 months to 30%. However, this recovery isn't just about finding similar professional roles – it's about adaptation and compromise.

### The New Normal

After 24 months, the data shows a "new normal" where:

- 45% eventually return to professional roles
- 10% accept lower-paid positions
- 15% become self-employed
- 30% remain unemployed long-term

## Design Decisions

Several design choices enhance the storytelling:

### Color Coding

- **Blue**: Professional employment (positive outcome)
- **Orange**: Lower-paid employment (compromise outcome)
- **Green**: Self-employment (alternative pathway)
- **Red**: Unemployment (challenge outcome)

### Gradients

Links between nodes use gradients that blend the source and target colors, visually representing the transition between different employment states.

### Time Labels

Clear time markers help users understand the progression and see how outcomes evolve over the critical first two years.

### Responsive Design

The diagram adapts to different screen sizes while maintaining readability and impact.

## Technical Implementation

Built with D3.js and the d3-sankey plugin, the visualization processes flow data to create smooth, proportional connections between employment states across time periods.

Key technical features:

- Responsive SVG rendering
- Interactive tooltips showing exact percentages
- Hover effects to highlight specific flows
- Gradient definitions for smooth color transitions

## The Broader Context

This visualization is part of a larger investigation into age-related employment challenges. The data combines insights from multiple sources including ONS statistics, Labour Force Survey data, and research from organizations like Ageing Better and the Resolution Foundation.

The goal isn't just to present statistics, but to make the human impact of redundancy visible and understandable to policymakers, employers, and the affected individuals themselves.

## What's Next?

This Sankey diagram opens up several avenues for further exploration:

- Regional variations in outcomes
- Industry-specific transition patterns
- The role of skills in successful transitions
- Interventions that improve outcomes

I'm continuing to develop interactive tools that make employment data more accessible and actionable. Each visualization aims to bridge the gap between raw statistics and human understanding.

---

*Interested in commissioning similar visualizations or discussing employment data analysis? [Get in touch](/contact/) to explore collaboration opportunities.*
