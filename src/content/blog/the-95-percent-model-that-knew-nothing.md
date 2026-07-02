---
title: "The 95%-Accurate Model That Knew Nothing"
date: "2026-06-24"
excerpt: "How data leakage quietly inflates medical-imaging results, and the two splits I use to catch it."
tags: ["Machine Learning", "Evaluation", "Medical Imaging"]
---

The most dangerous number in machine learning is a good one you didn't earn.

In medical imaging, the classic way to earn one dishonestly is **data leakage**: letting information from your test set influence training. It rarely looks like cheating. It looks like a reasonable line of code.

## Two ways the model learns the wrong thing

There are two leaks I run into constantly:

1. **Subject leakage.** A single patient has several scans. If you split scans randomly, some of a patient's scans land in training and some in test. The model can now recognise *the person* instead of *the disease*, and your accuracy soars.
2. **Site leakage.** In multi-site studies, each scanner leaves a systematic fingerprint. If different sites recruited different patient ratios, recognising the scanner is almost as good as guessing the diagnosis.

Both produce the same symptom: a number that looks like a breakthrough and generalises to nothing.

## The fix is a stricter split

The cure isn't a fancier model. It's honest validation.

- For subject leakage, use **subject-wise splitting**: every scan from a patient stays in exactly one split.
- For site leakage, use **leave-one-site-out** cross-validation: hold out an entire scanner, train on the rest, rotate.

> A model reporting 99% under a random split and 85% under a subject-wise split didn't get worse. It got honest.

## Turn the leak into a measurement

Here's the part I like. Don't just avoid the bad split, **run it on purpose** and measure the gap:

```python
gap = accuracy_kfold - accuracy_leave_one_site_out
# large gap => the headline number is mostly leakage, not biology
```

That gap is a result in its own right. It tells you, and your reviewers, exactly how much of the "state of the art" is real.

Across two of my projects (Alzheimer's staging and depression detection), enforcing these splits took models from suspiciously perfect to defensibly good. That trade is always worth making.
