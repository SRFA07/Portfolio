---
title: "A Forecast Owes You a Confidence Interval"
date: "2026-06-15"
excerpt: "A point prediction hides the one thing a decision-maker needs: how sure the model is. Notes on calibrated uncertainty and conformal prediction."
tags: ["Forecasting", "Uncertainty", "Systems"]
---

"PM2.5 will be 78 µg/m³ this evening."

That sentence sounds helpful and is nearly useless for making a decision. It hides the only thing that matters when a health threshold is nearby: **how sure is the model?**

## Point forecasts fail two ways

A system that only emits point predictions has two failure modes it can't avoid:

- It tells you it's **safe when it might not be**, a real risk.
- It **cries wolf**, and you stop listening, alert fatigue.

Both come from the same root cause: the model never expressed its own uncertainty.

## Say what you don't know

The fix is to output a distribution, not a number, for example a predictive interval:

> "78 µg/m³, and I'm 90% sure it's between 61 and 99."

If that interval straddles a threshold, the honest answer is *"uncertain, consider waiting,"* which only a probabilistic model can give.

But neural nets are often miscalibrated: a "90% interval" might cover the truth 70% of the time. **Conformal prediction** fixes this with a finite-sample coverage guarantee. The core idea (split conformal) is almost embarrassingly simple:

```python
# residuals on a held-out calibration set
scores = np.abs(y_cal - model.predict(X_cal))
q = np.quantile(scores, 0.90, method="higher")
interval = (model.predict(x) - q, model.predict(x) + q)
```

Under exchangeability, that interval covers the truth at least 90% of the time, regardless of the model.

## Grade the distribution, not the point

If your model predicts distributions, your metrics should too. I lean on **CRPS** (a generalisation of MAE to distributions), plus **coverage** (does the 90% interval contain the truth ~90% of the time?) and **sharpness** (narrower is better, *given* calibration). A reliability diagram is the plot I actually trust.

Uncertainty isn't a nice-to-have bolted onto a forecaster. It's the interface between a prediction and a good decision.
