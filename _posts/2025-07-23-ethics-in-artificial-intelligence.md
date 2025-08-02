---
layout: default
title: "Ethics in Artificial Intelligence: Yes, There Is a Problem"
date: 2025-07-23
categories: [artificial-intelligence, ethics, technology]
tags: [ai-ethics, machine-learning, bias, surveillance, automation, regulation, environmental-impact, copyright]
excerpt: "Artificial intelligence has catapulted from the plaything of graduate students to the digital weather system that now soaks every corner of the economy. The upsides are dazzling; the downsides, well, they're the reason you're reading this article instead of a holiday brochure."
author: Justin O'Brien
image: "/assets/images/posts/2025-07-23-ethics-in-artificial-intelligence/hero-ai-ethics.jpg"
thumbnail: "/assets/images/posts/2025-07-23-ethics-in-artificial-intelligence/ai-ethics.jpg"
---

![Abstract visualization of AI neural networks with ethical scales and human silhouettes](/assets/images/posts/2025-07-23-ethics-in-artificial-intelligence/ai-ethics.jpg)

## A Clear and Candid Guide to AI Ethics

Artificial intelligence (AI) has catapulted from the plaything of graduate students to the digital weather system that now soaks every corner of the economy. The upsides are dazzling; the downsides, well, they're the reason you're reading this article instead of a holiday brochure.

This paper peers—torch in hand—into the trickier nooks of AI from a global vantage point. We'll rummage through its resource guzzling, copyright snacking, bias-soaked data diet, the Silicon Valley swagger that births it, and the many honourable (and not-so-honourable) uses already on parade.

## Energy and Human Resource Consumption

### The Environmental Footprint of AI

Training large AI models requires enormous computational power, translating into heavy energy usage and a substantial carbon footprint. For example, the training of OpenAI's GPT-3 model is estimated to have consumed **1,287 MWh of electricity**, emitting over **550 metric tons of CO₂** – on par with hundreds of transatlantic flights[^1]. This process also used more than 700,000 liters of water for cooling data centre servers[^2].

Globally, data centres (which host AI workloads among other tasks) account for about **1.5% of electricity consumption** (around 415 TWh in 2024), a share expected to roughly double by 2030 due to AI growth[^3][^4]. In practical terms, that means data centres could soon draw nearly 945 TWh annually – about as much power as the entire country of Japan uses in a year[^5].

Major tech hubs like the US, Europe and China currently consume 85% of data centre energy[^6][^7], highlighting a global disparity. Even after models are trained, the energy for running AI ("inference") at scale can eclipse training costs – one study noted that inference could comprise 90% of an AI model's total energy lifecycle as millions of users prompt these models daily[^8].

### The Human Labour Behind "Automated" AI

Less visible but equally critical is the human labour powering AI development. Behind every "smart" AI system are often thousands of human workers who label data, moderate content, and train AI models – tasks that can be repetitive, grueling, or psychologically taxing.

In 2021, OpenAI quietly outsourced the job of filtering toxic and harmful content (to make ChatGPT safer) to contractors in Kenya, **paying them less than $2 per hour**. These workers had to read and label tens of thousands of disturbing text snippets – including descriptions of child sexual abuse, torture, and violence – so that the AI could learn to recognise and avoid producing such content[^9].

The psychological toll was enormous: moderators reported trauma, anxiety and lasting mental health damage from constant exposure to graphic material[^10][^11]. Several have since filed petitions and lawsuits (for instance, in Kenya) over exploitative conditions – citing low pay (around $1.50–$3 an hour), inadequate counseling support, and even abrupt dismissals after the projects ended[^12][^13].

This "ghost work" underpins not just ChatGPT but many AI services – from social media moderation to self-driving car vision – often outsourced to developing countries where labour is cheap.

## Copyright and Creator Rights

AI's voracious appetite for data has it nibbling at every creative buffet—books, art, code, music—often without so much as a "may I?". Contemporary AI models learn from vast datasets scraped from the internet – encompassing books, articles, code, images, music and more – much of which is copyrighted material obtained without explicit consent from the authors or artists.

### Unconsented Training Data

Writers, visual artists, musicians and other creators have grown alarmed at AI models being trained on their work. In mid-2023, a group of prominent authors – including **Michael Chabon, Jodi Picoult and George R.R. Martin** – sued OpenAI, alleging that their novels and essays were used to train ChatGPT without consent[^14][^15].

They pointed out that the chatbot could accurately summarise their books or imitate their writing styles, implying it had effectively ingested and learned from their copyrighted texts[^16]. This lawsuit is one of several class actions by authors and publishers against AI firms, and it followed similar cases by visual artists against generative AI image companies[^17][^18].

In a landmark example, a class-action suit **Andersen v. Stability AI** was filed in 2023 by a group of artists after they discovered the AI image generator Stable Diffusion had been trained on 5 billion images scraped from the web (LAION dataset), including their own artworks, without any permission[^19][^20].

### Legal and Ethical Tensions

Legally, the question of whether using copyrighted data for AI training is "fair use" or infringement is still being decided. In a February 2025 decision, a U.S. court (**Thomson Reuters v. ROSS**) held that wholesale copying of a competitor's copyrighted material (legal case summaries from Westlaw) to train an AI research tool was not fair use[^21][^22].

The judge noted that the AI in that case wasn't even a generative model, but a search tool that repackaged the original texts, directly harming the copyright owner's market[^23][^24]. While generative AI may muddy the waters (since outputs aren't verbatim copies, but can be derivative in style or content), the legal trend suggests courts are wary of unfettered, unlicensed use of copyrighted datasets.

### Toward Solutions – Consent and Transparency

Policymakers are starting to respond. The draft **EU AI Act** includes provisions that AI developers must disclose any copyrighted material used in training their models[^25][^26]. European lawmakers explicitly added a requirement that generative AI systems like ChatGPT publish summaries of the copyrighted data they were trained on, aiming to introduce transparency and enable rightsholders to claim misuse[^27].

## Training Data and Bias

The ancient maxim "garbage in, garbage out" gets a silicon makeover here. Feed an AI dodgy data and you'll get dodgy decisions—only faster and at scale.

### Opaque Datasets and Hidden Biases

Many advanced AI models are trained on colossal datasets that are not fully disclosed to the public or regulators. For instance, when OpenAI released GPT-4 in 2023, it notably provided **no details** about the model's architecture, training methods, or dataset composition, citing competition and safety concerns[^28][^29].

While trade secrecy is understandable, this opacity has a direct ethical impact: without knowing what data an AI was trained on, it's "impossible to evaluate" what biases or blind spots might be built into it[^30].

### Bias in, Bias Out – Examples

When biased data goes in, discriminatory outcomes come out. A notorious example was **Amazon's AI recruiting tool**, an algorithm developed to screen resumes. It was trained on ten years of past hiring data – which were skewed toward male candidates (reflecting the tech industry's male dominance)[^31][^32].

The AI "taught itself" that male applicants were preferable and began penalising resumes that mentioned "women's" (as in "women's chess club"), and downgrading graduates of women's colleges[^33][^34]. In effect, the system became sexist, systematically filtering out qualified women. Amazon's engineers tried to correct the specific flags, but they couldn't guarantee the AI wouldn't find new ways to discriminate, so the project was eventually scrapped[^35][^36].

Another well-documented case is in criminal justice: risk assessment algorithms used by courts to predict reoffending have exhibited racial bias. ProPublica's famous 2016 investigation into the **COMPAS system** found that black defendants were falsely labeled "high risk" at nearly twice the rate of white defendants, while white defendants were more frequently mislabeled as low risk[^37].

## The Silicon Valley Ethos and the Drive to Innovate

Silicon Valley's original mantra—"move fast and break things"—is all fun and games until the "things" include society.

### From Motto to Liability

In the startup heyday, "move fast and break things" was celebrated as a recipe for disrupting incumbents and achieving technological leaps. However, when it comes to AI systems that can affect millions of lives, this approach can be dangerously reckless. A recent poll found that **72% of Americans prefer AI development to slow down** with more guardrails, versus only 8% who want it to speed up[^38][^39].

High-profile mishaps have validated these fears: from chatbots that went awry spouting misinformation or hate, to social networks unleashing algorithms that amplified societal divisions. The "launch now, fix later" mentality is being increasingly questioned.

### Profit-Driven Innovation and Moral Hazard

Silicon Valley's ecosystem runs on venture capital and the promise of massive profits. This can incentivise a single-minded focus on growth metrics and market capture, potentially overshadowing ethical considerations. AI has become a competitive arms race among tech giants and startups, with enormous financial stakes – which can lead to corners being cut.

Gary Marcus observed a "moral descent" in Big Tech: as companies grew more powerful and profitable, "the desire to do good decreases… in the quest for growth"[^40]. He argues that many firms talk about altruistic missions, but in recent years have prioritised profit maximisation at the expense of users and society[^41].

## Uses and Misuses of AI

AI is a dual-use tool: the same algorithms that power beneficial applications can be misappropriated for malicious or harmful ends.

### AI in Social Media: Deepfakes and Algorithmic Amplification

#### Deepfakes and Misinformation

Deepfakes are hyper-realistic fake videos or audio generated by AI, often depicting someone saying or doing things they never did. In the wrong hands, deepfakes can be a potent weapon for misinformation, political propaganda, or personal harassment.

A striking statistic: an analysis in 2023 found that **98% of deepfake videos online were pornographic**, targeting women in 99% of cases[^42]. In other words, the vast majority of deepfakes globally consist of non-consensual sexual images – typically a woman's face superimposed on explicit content – effectively a high-tech form of revenge porn or voyeurism.

#### Algorithmic Amplification of Harmful Content

Social media algorithms – the content recommendation AIs on Facebook, YouTube, TikTok, etc. – determine what billions of people see in their feeds. Their optimisation for engagement can lead to the amplification of extreme or harmful content, creating echo chambers and fueling polarisation.

Facebook's own algorithm changes were found to preferentially boost content that sparked anger or intense reactions, which tended to be divisive posts or misinformation, thus contributing to a more toxic discourse[^43][^44].

### Fraud and Scams: Voice Cloning and Phishing Automation

#### Voice Cloning and "Imposter" Scams

Scammers have begun exploiting trust by using AI to clone voices from just a short recording. In one chilling case, an Arizona mother received a call that mimicked her 15-year-old daughter's voice perfectly, sobbing that she'd been kidnapped and begging for help[^45][^46]. The voice and cries were so convincing that the mother was certain it was her child – the scammers demanded a ransom, threatening violence. It turned out the daughter was safe; the entire call was a hoax using an AI-generated voice.

A survey by security firm McAfee found **70% of people said they might not distinguish a cloned voice from the real thing**, and alarmingly, today's AI needs only about **3 seconds of audio sample** to reproduce a person's voice with high fidelity[^47].

#### AI-Generated Phishing and Fraudulent Content

Phishing emails – those fraudulent messages that try to trick you into giving passwords or money – have been around for decades, but AI is supercharging their quality and quantity. With AI language models, a scammer can now generate tailored, grammatically perfect, and context-specific messages by the hundreds.

Europol (the EU's police agency) warned in 2023 that ChatGPT's ability to produce highly realistic text with ease makes it a powerful tool for criminals[^48].

## Surveillance and Policing

AI technologies are increasingly employed in surveillance and law enforcement, raising profound ethical issues around privacy, civil liberties, accuracy, and potential abuse of power.

### Mass Surveillance and Privacy Erosion

In authoritarian contexts especially, AI-powered surveillance has been used to oppress and control populations. The starkest example is **Xinjiang, China**, where an estimated million-plus Uyghur Muslims have been subjected to high-tech repression. The Chinese government has deployed a "high-tech network of surveillance" in the region, including ubiquitous cameras with facial recognition, mandatory biometric data collection (DNA, iris scans), and phone/computer data monitoring – all fed into AI systems that flag "suspicious" behaviour[^49].

Even outside such extreme cases, the spread of facial recognition in public spaces is blurring the line between security and privacy. There have been at least three known wrongful arrests of Black individuals in the US due to faulty face recognition matches[^50][^51]. One case was **Robert Williams in Detroit**: facial recognition misidentified him as a suspect, leading to his arrest and jailing for a crime he didn't commit. Detroit later settled his lawsuit with a $300k payment and agreed to change its policies[^52][^53].

### Predictive Policing and Bias

Another use of AI in law enforcement is predictive analytics – algorithms that analyse crime data to predict where crimes might occur or who might be involved. While it might sound objective, these systems can perpetuate existing biases in policing data. "Bias in, bias out" applies strongly here.

Simply put, if your AI might ruin someone's life, double-check it.

## Employment, Hiring, and Workplace Monitoring

### AI in Hiring – Fairness and Transparency

Companies are increasingly using AI tools to screen job applicants, parse resumes, or even conduct video interviews with algorithmic analysis of facial expressions and tone. The promise is efficiency and objectivity; the peril is encoding bias and opacity in how employment decisions are made.

This lack of transparency and potential for discrimination has prompted regulatory attention. The **EU AI Act** will treat AI in employment as "high-risk," requiring that such systems be proven non-discriminatory, transparent, and subject to human oversight[^54][^55].

### Workplace Monitoring and "Algorithmic Management"

Employers have always monitored performance, but AI takes it to new levels of intrusiveness and automation. **Amazon** is the poster child of this trend: in its warehouses, an AI-driven system tracks each worker's productivity in real time – items scanned, packing speed, "time off task" down to the minute[^56][^57].

If a worker's metrics fall below a target, the system will automatically generate warnings and even termination notices without a manager's input[^58][^59]. Documents revealed that over a little more than a year, a single Amazon warehouse fired about **300 employees (10% of staff)** purely for productivity shortfalls as decided by this automated system[^60][^61].

## Military and Geopolitical Applications

Perhaps the most grave domain of AI ethics is its use in warfare and geopolitical power struggles. AI is becoming integral to military systems, intelligence analysis, and autonomous weapons – raising existential questions about lethal decision-making by machines and the stability of global peace.

### Autonomous Weapons ("Killer Robots")

One of the biggest debates is over **Lethal Autonomous Weapons Systems (LAWS)** – weapons that can select and engage targets without human intervention. The ethical issues here are immense. First, there's the question of human control: delegating life-and-death decisions to algorithms arguably crosses a moral line, as machines lack human judgment, empathy, and accountability[^62][^63].

Because of these issues, over 30 countries and numerous NGOs have called for a preemptive ban on killer robots (through campaigns like "Stop Killer Robots"), akin to bans on chemical or biological weapons. In 2015, thousands of AI researchers signed an open letter warning that autonomous weapons could be "the third revolution in warfare" (after gunpowder and nuclear arms)[^64].

### AI Arms Race and Geopolitical Tensions

We are witnessing an AI arms race in a broader sense: countries pouring resources into military AI for intelligence, cyber warfare, and autonomous systems. This race raises geopolitical ethical questions: will AI make wars more likely by giving some nations confidence in quick, decisive tech-driven victory?

## Regulatory Outlook

The ethical implications of AI span the environmental to the existential. A few clear themes emerge:

### Transparency and Accountability

Whether it's training data composition, model decision-making, or AI usage in hiring/policing, openness is critical. We've seen that when AI operates as a black box, trust erodes and harms go unmitigated. The **EU's AI Act** is a significant step in this direction, introducing traceability and oversight requirements[^65][^66].

### Fairness and Human-Centric Design

AI must be designed and deployed to augment human capabilities and decision-making, not to entrench inequalities or replace human values. The concept of **AI ethics by design** is gaining traction – similar to privacy by design – where equity and fairness checks are baked into the development process from the start.

### Empowerment vs. Control

There is a fundamental tension between AI's use to empower users/workers/citizens and its use to control or manipulate them. Ethical AI development leans towards empowerment – using AI to help rather than surveil; giving users more control rather than covertly nudging their behaviour.

### Global Collaboration and Norms

AI's challenges are global – carbon emitted in one country warms the whole planet; a deepfake in one language can influence another country's politics; an arms race benefits no nation in the end. Thus, global governance and cooperation are key.

### Continuous Oversight and Adaptation

AI technology evolves quickly. Ethical and regulatory approaches must be agile and updated regularly. One innovative idea is the creation of **AI oversight bodies** – national or regional "AI Agencies" that specialise in monitoring AI developments and advising on policy.

## Conclusion

Finally, it's worth emphasising the human element. AI, for all the talk of autonomy, ultimately reflects human choices – in what objectives we set, what data we feed it, and where we apply it. As AI becomes more powerful, those choices have ever greater impact.

It falls on us – developers, policymakers, business leaders, and society at large – to wield AI in service of human dignity, equity, and prosperity. As the saying goes, with great power comes great responsibility. AI is indeed great power. This article has highlighted some of the responsibilities that come with it.

Navigating the ethical challenges will not be easy, but with informed, global and multidisciplinary engagement, we can ensure AI remains a tool for good – amplifying the best of human ingenuity, not the worst of our biases or greed.

**In the end, AI is merely a mirror for human choices—albeit a gigantic, turbo-charged one. With vigilance and humility, we might just keep the mirror cracked but functional rather than shattered.**

---

## References

[^1]: Training GPT-3 used 1,287 MWh, 550 tons CO₂
[^2]: Data centers water usage for cooling servers
[^3]: Data centers 1.5% of global electricity in 2024
[^4]: Doubling by 2030 due to AI growth
[^5]: Japan annual electricity consumption comparison
[^6]: AI servers ~15% of data center energy
[^7]: Major tech hubs 85% consumption
[^8]: Inference 90% of AI model lifecycle energy
[^9]: OpenAI's Kenyan moderators paid <$2/hour for toxic content labeling
[^10]: Psychological trauma reported by moderators
[^11]: Mental health damage from graphic content exposure
[^12]: Lawsuits over exploitative conditions
[^13]: Low pay and inadequate support documentation
[^14]: Authors sued OpenAI over books used in training without permission
[^15]: Michael Chabon, Jodi Picoult and George R.R. Martin lawsuit
[^16]: ChatGPT summarizing and imitating writing styles
[^17]: Class actions by authors and publishers
[^18]: Visual artists against generative AI companies
[^19]: Artists' class action against Stability AI
[^20]: 5 billion scraped images in LAION dataset
[^21]: Thomson Reuters v ROSS court decision 2025
[^22]: AI training use not fair use ruling
[^23]: Search tool repackaging original texts
[^24]: Harm to copyright owner's market
[^25]: EU AI Act copyrighted material disclosure
[^26]: AI developers transparency requirements
[^27]: ChatGPT training data summaries requirement
[^28]: OpenAI's GPT-4 report gave no info on data or training
[^29]: Competition and safety concerns cited
[^30]: Impossible to evaluate biases without data knowledge
[^31]: Amazon's AI hiring tool penalised "women's" in resumes
[^32]: Tech industry male dominance in training data
[^33]: Discrimination against women's organizations
[^34]: Downgrading women's college graduates
[^35]: Amazon engineers unable to guarantee no discrimination
[^36]: Project eventually scrapped due to bias issues
[^37]: ProPublica COMPAS system investigation findings
[^38]: 72% Americans prefer AI development slowdown
[^39]: Only 8% want AI development to speed up
[^40]: Gary Marcus on Big Tech "moral descent"
[^41]: Profit over society prioritization
[^42]: 98% of deepfakes online are pornographic, targeting women
[^43]: Facebook's engagement algorithm boosts divisive content
[^44]: Algorithm changes preferentially boost anger reactions
[^45]: Arizona mother AI voice cloning scam
[^46]: Daughter's voice perfectly mimicked for kidnapping hoax
[^47]: McAfee survey on voice cloning detection
[^48]: Europol warning about ChatGPT enabling realistic phishing
[^49]: China's AI surveillance of Uyghurs with facial recognition
[^50]: Three wrongful arrests via face recognition in US
[^51]: Facial recognition accuracy issues for people of colour
[^52]: Robert Williams Detroit wrongful arrest case
[^53]: $300k settlement and policy changes
[^54]: EU AI Act high-risk employment classification
[^55]: Non-discriminatory and transparent requirements
[^56]: Amazon's automated warehouse productivity system
[^57]: Real-time worker tracking and metrics
[^58]: Automatic warnings and termination notices
[^59]: No manager input required for disciplinary action
[^60]: 300+ employees fired in single warehouse
[^61]: 10% of staff terminated by automated system
[^62]: Autonomous weapons dehumanise decision-making
[^63]: Machines lack human judgment and accountability
[^64]: 2015 open letter warning about autonomous weapons
[^65]: EU AI Act traceability requirements
[^66]: Oversight and transparency mandates
