import type { Project } from "./types";

export const airsense: Project = {
  slug: "airsense-air-quality-agent",
  title: "AirSense AI: From a PM2.5 Forecaster to a Decision Agent",
  tagline:
    "A built Delhi PM2.5 forecasting pipeline evolving into an agentic system that tells you when and where it's safe to be outside.",
  year: "2026",
  role: "Project Mentor · Society of Civil Engineers (v1) · built on my 2025 v0",
  duration: "v0: May–Aug 2025 · v1: Jun 2026 – Present",
  category: "Systems",
  status: "in-progress",
  featured: true,
  order: 3,
  tags: [
    "Spatio-temporal GNN",
    "Conformal Prediction",
    "Multi-agent",
    "LLM / RAG",
    "Forecasting",
  ],
  stack: [
    "Python",
    "scikit-learn",
    "XGBoost",
    "PyTorch",
    "PyTorch Geometric",
    "LangGraph-style agents",
    "LLM tool-use",
  ],
  links: {
    report: "/reports/AirSense.pdf",
  },
  summary:
    "v0 (built): cleaned multi-year sensor data from 31 Delhi-NCR stations, discovered three behavioural station families via PCA + K-Means on their weather-coupling, and trained 93 per-station tree models (Random Forest, XGBoost, Decision Tree) under strict out-of-time validation, best test R² ≈ 0.75, mean 0.40. v1 (design): upgrade the brain to a spatio-temporal GNN with conformal prediction intervals, wrap it in a three-agent loop (forecaster, dose-minimising route planner, learned notification threshold), and add a tool-using LLM interface with retrieval-grounded, personalised risk explanations.",
  highlights: [
    { value: "0.75", label: "Best test R²", sub: "Random Forest @ Pusa (v0)" },
    { value: "31", label: "Delhi stations", sub: "clustered by weather-coupling" },
    { value: "v0 → v1", label: "Forecaster → agent", sub: "GNN + conformal + LLM" },
  ],
  sections: [
    {
      id: "problem",
      kicker: "01 · Problem",
      heading: "A number on a dashboard doesn't tell you what to do",
      blocks: [
        {
          type: "p",
          text: "PM2.5, particulate matter under 2.5 microns, is the single most damaging routine air pollutant: small enough to cross from the lungs into the bloodstream, driving asthma, cardiovascular disease, and stroke. In Delhi it swings dramatically with the seasons and varies street to street. A person who wants to run, commute, or send a child outside faces a real decision under uncertainty.",
        },
        {
          type: "p",
          text: "A raw AQI number does not answer that decision. It is impersonal (it ignores your asthma or age), point-valued (it hides how uncertain the forecast is), and not spatial (it is one station, not your route). AirSense closes that gap in two versions: v0 is a working forecaster; v1 turns it into a decision agent.",
        },
      ],
    },
    {
      id: "challenge",
      kicker: "02 · Constraints",
      heading: "Messy sensors, coupled space and time, an honest future test",
      blocks: [
        {
          type: "list",
          items: [
            "Sensor reality: stations go offline, transmit zeros when they fail, drift, and occasionally spike, the data must be cleaned before any modelling.",
            "Spatial dependence: a plume advects downwind; nearby stations share sources. This is not a simple function of distance, wind direction and terrain matter.",
            "Temporal dependence: pollution is strongly cyclical (daily traffic, seasonal inversions and stubble burning).",
            "Honest generalisation: an i.i.d. split leaks the future into the past. The model must predict a genuinely unseen future.",
            "For a decision agent: uncertainty must be calibrated, telling someone it's safe when it isn't is a health risk; crying wolf causes alert fatigue.",
          ],
        },
      ],
    },
    {
      id: "thought-process",
      kicker: "03 · Thought Process",
      heading: "Cluster first, predict honestly, then make it an agent",
      blocks: [
        {
          type: "p",
          text: "v0, the forecaster. The guiding idea was that Delhi is a patchwork of micro-climates, so I clustered stations before modelling, but by behaviour, not geography. Each station's 'personality' is its vector of correlations between PM2.5 and seven meteorological drivers; PCA + K-Means grouped the 31 stations into three behavioural families. I deliberately excluded PM10 from the predictors (PM2.5 is a physical subset of it, so including it is leakage), preferred ensembles over a single tree, and validated out-of-time (train pre-2024, test 2024+).",
        },
        {
          type: "callout",
          tone: "insight",
          title: "The clustering predicted the predictability",
          text: "The three families ranked by how tightly their PM2.5 couples to weather (0.35 → 0.28 → 0.09). The model accuracies fell in exactly the same order (RF test R² 0.52 → 0.45 → 0.13). The unsupervised clustering and the supervised models independently told the same story, the strongest possible internal validation.",
        },
        {
          type: "p",
          text: "v1, the agent. A forecaster answers 'what will PM2.5 be?'; a decision agent answers 'what should you do about it?'. Three upgrades drive the redesign: (1) treat the monitoring network as a graph and learn spatial coupling with a spatio-temporal GNN, testing whether a learned adjacency beats a distance kernel; (2) add a probabilistic head and calibrate it with conformal prediction so intervals have a coverage guarantee; (3) wrap the model in a three-agent loop with a tool-using LLM as the natural-language interface, the LLM is the interface, never the forecaster.",
        },
      ],
    },
    {
      id: "architecture",
      kicker: "04 · Technical Architecture",
      heading: "A perceive–reason–act loop around the forecasting brain",
      blocks: [
        {
          type: "diagram",
          id: "airsense-loop",
          caption:
            "v1 architecture: a forecaster agent ingests live data and publishes a probabilistic forecast field to shared state; route-planner, notification, and LLM agents consume it to produce routes, alerts, and grounded answers.",
        },
        {
          type: "list",
          items: [
            "Forecaster agent: on a schedule, pulls live AQI + weather, runs the ST-GNN, and publishes a calibrated forecast field (median + intervals) with graceful fallback if a source is down.",
            "Route-planner agent: formulates outdoor exposure as inhaled dose, a path integral of concentration × ventilation, discretised into a time-dependent shortest-path problem on a street graph (Dijkstra / A*, valid because doses are non-negative).",
            "Notification agent: a decision-theoretic, learned threshold that alerts when it matters without spamming, personalised online from realised outcomes.",
            "LLM interface: interprets free-form questions, calls the forecaster and planner as tools, grounds statements in retrieved WHO/CPCB guidance (RAG), and returns a personalised risk explanation with medical-safety guardrails.",
          ],
        },
      ],
    },
    {
      id: "implementation",
      kicker: "05 · Implementation",
      heading: "From IQR clipping to conformal intervals",
      blocks: [
        {
          type: "p",
          text: "v0 preprocessing forced the raw feeds into a clean, temporally-consistent shape: parse and sort by time, drop dead sensors, linear-interpolate short gaps, resample to a uniform 1-hour grid, and clip outliers with the IQR rule (rather than deleting rows and punching holes in the time grid). I then engineered domain-informed features, a seasonal (monthly) weight encoding Delhi's real pollution calendar and a smooth diurnal weight, and trained Decision Tree, Random Forest, and XGBoost models per station, with a feature-selection pass keeping only features with positive importance.",
        },
        {
          type: "p",
          text: "For v1, the probabilistic head is a heteroscedastic Gaussian or quantile-regression output trained with pinball loss, then calibrated with split conformal prediction (and adaptive conformal inference online, since time series violate exchangeability). Forecasts are graded with proper scoring rules, CRPS, coverage, and sharpness, and the headline experiment ablates the graph: no-graph GRU vs distance-kernel vs learned adjacency.",
        },
      ],
    },
    {
      id: "results",
      kicker: "06 · Results",
      heading: "A robust v0, and a clear v1 experiment",
      blocks: [
        {
          type: "metrics",
          items: [
            { value: "0.75", label: "Best test R²", sub: "Pusa station (train 0.99)" },
            { value: "0.40", label: "Mean test R²", sub: "Random Forest, 31 stations" },
            { value: "2 / 31", label: "RF negative R²", sub: "vs 17/31 for a lone tree" },
          ],
        },
        {
          type: "table",
          caption:
            "v0, mean out-of-time test R² by behavioural cluster. Random Forest wins in every cluster; the lone Decision Tree overfits and often scores below zero on unseen years.",
          columns: ["Cluster", "Random Forest", "XGBoost", "Decision Tree"],
          rows: [
            ["Cluster 0 (n=13)", "0.52", "0.48", "0.13"],
            ["Cluster 1 (n=10)", "0.45", "0.38", "−0.13"],
            ["Cluster 2 (n=8)", "0.13", "0.06", "−0.47"],
            ["Overall mean", "0.40", "0.34", "−0.11"],
          ],
          highlightRows: [3],
        },
        {
          type: "p",
          text: "The train–test gap is honest, not just overfitting: the out-of-time protocol asks models to predict a genuinely unseen future across which conditions themselves shift. That the Random Forest still holds ~0.5 R² under that pressure makes its robustness credible, and the cluster map doubles as a policy tool, separating weather-driven stations (good for early-warning) from source-driven ones that no favourable weather will clear.",
        },
      ],
    },
    {
      id: "reflection",
      kicker: "07 · Reflection",
      heading: "What v1 has to prove",
      blocks: [
        {
          type: "list",
          items: [
            "The headline question: does a learned graph adjacency beat a distance kernel for PM2.5 over the Delhi/Kanpur network? Clean and publishable.",
            "Does conformal calibration hold coverage under distribution shift, monitored with reliability diagrams in deployment?",
            "Does late-fusion + the agent loop actually change user decisions for the better, measured end-to-end?",
            "Guardrails: medical-safety framing on all personalised explanations, and graceful degradation when live sources fail.",
          ],
        },
        {
          type: "callout",
          tone: "note",
          title: "Status",
          text: "v0 is built and validated. v1 is a complete design specification with runnable-style implementations for each component; it is the roadmap I am now executing as project mentor under the Society of Civil Engineers.",
        },
      ],
    },
  ],
};
