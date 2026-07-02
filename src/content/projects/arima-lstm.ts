import type { Project } from "./types";

export const arimaLstm: Project = {
  slug: "hybrid-arima-lstm-forecasting",
  title: "Hybrid ARIMA–LSTM Equity Forecasting",
  tagline:
    "A hybrid model where ARIMA extracts the linear trend and a gated LSTM learns the nonlinear residual, beating either model alone.",
  year: "2026",
  role: "Contributor · Association of Computing Activities",
  duration: "Dec 2025 – Jan 2026",
  category: "ML",
  status: "shipped",
  featured: false,
  order: 8,
  tags: ["Time Series", "ARIMA", "LSTM", "Forecasting"],
  stack: ["Python", "statsmodels", "TensorFlow / Keras", "yfinance", "pandas"],
  links: {
    github: "https://github.com/SRFA07/PredictiveMarketModeling_241079",
  },
  summary:
    "Built an end-to-end equity pipeline with yfinance (handling missing values, outliers, and stationarity), fit an ARIMA trend model via ADF testing and ACF/PACF tuning, then trained a gated LSTM in TensorFlow/Keras on the ARIMA residuals to capture nonlinear dynamics. Under strict time-aware validation, the hybrid reached 4.31% MAPE on Nifty and 6.69% on TCS, outperforming standalone ARIMA and LSTM.",
  highlights: [
    { value: "4.31%", label: "MAPE (Nifty)", sub: "beats standalone" },
    { value: "6.69%", label: "MAPE (TCS)", sub: "hybrid model" },
    { value: "ARIMA + LSTM", label: "Trend + residual", sub: "time-aware split" },
  ],
};
