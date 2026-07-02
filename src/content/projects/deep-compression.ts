import type { Project } from "./types";

export const deepCompression: Project = {
  slug: "deep-compression-vgg11",
  title: "Deep Compression from Scratch: 23.8× Smaller VGG-11",
  tagline:
    "A from-scratch three-stage neural-network compression pipeline, pruning, k-means quantization, and Huffman coding, with almost no accuracy loss.",
  year: "2026",
  role: "Contributor · Data & Models · EEA Group Project",
  duration: "2026",
  category: "Systems",
  status: "shipped",
  featured: true,
  order: 4,
  tags: ["Model Compression", "Pruning", "Quantization", "Huffman Coding", "PyTorch"],
  stack: ["Python", "PyTorch", "NumPy", "CIFAR-10"],
  links: {
    github: "https://github.com/SRFA07/EEA-Deep-Learning-CV-and-Compression-Final-Model",
    report: "/reports/EEA_DeepCompression.pdf",
  },
  summary:
    "Reimplemented Han et al.'s Deep Compression on a VGG-11 CIFAR-10 model: global magnitude pruning to 90% sparsity, per-layer k-means weight sharing (8-bit conv / 5-bit FC codebooks), and Huffman coding of the cluster indices. Fine-tuning after each stage kept the top-1 accuracy drop to 0.68% while shrinking the model from 37.2 MB to 1.57 MB, a 23.8× reduction, well past the 9× target.",
  highlights: [
    { value: "23.8×", label: "Compression", sub: "37.2 MB → 1.57 MB" },
    { value: "0.68%", label: "Accuracy drop", sub: "target < 1.5%" },
    { value: "89.9%", label: "Weights pruned", sub: "magnitude-based" },
  ],
  sections: [
    {
      id: "problem",
      kicker: "01 · Problem",
      heading: "The expensive part of a neural network is moving its weights",
      blocks: [
        {
          type: "p",
          text: "Modern CNNs are large, VGG-16 is over 500 MB, which makes them impractical to ship to phones, IoT devices, and embedded hardware. The deeper issue is energy: during inference, most energy goes not to arithmetic but to moving data. A 32-bit float add costs ~0.9 pJ; reading that operand from DRAM costs ~640 pJ, hundreds of times more.",
        },
        {
          type: "p",
          text: "So if a model is too big to fit in fast on-chip SRAM, it must hit DRAM constantly, and battery and latency suffer. Shrink the network enough to fit on-chip and you avoid those expensive accesses entirely. That is the whole motivation for compression.",
        },
      ],
    },
    {
      id: "challenge",
      kicker: "02 · Constraints",
      heading: "Shrink it a lot, but barely move the accuracy",
      blocks: [
        {
          type: "list",
          items: [
            "Target ≈ 9× compression on a VGG-11 CIFAR-10 model.",
            "Keep the top-1 accuracy drop under 1.5%.",
            "Build a modular, reproducible, fully-instrumented codebase, every stage measurable.",
            "Implement the whole Deep Compression pipeline from scratch, not via a library.",
          ],
        },
      ],
    },
    {
      id: "thought-process",
      kicker: "03 · Thought Process",
      heading: "Three kinds of redundancy that multiply",
      blocks: [
        {
          type: "p",
          text: "The insight behind Han et al.'s Deep Compression is that a network carries three independent kinds of redundancy, so three techniques stack multiplicatively. Pruning removes connection redundancy (most weights are near-zero and contribute little). Quantization removes precision redundancy (32 bits per weight is far more than needed). Huffman coding removes statistical redundancy (the surviving values are unevenly distributed).",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Unstructured, global magnitude pruning: collect all weights into one list, sort by magnitude, and cut at the 90th percentile, one uniform rule across the whole network, which reaches higher compression than layer-wise or structured pruning.",
            "k-means weight sharing per layer: cluster surviving weights and store a small index into a shared codebook, 8-bit (256 clusters) for conv layers, 5-bit (32 clusters) for the more redundant FC layers.",
            "Huffman coding last: it is lossless and offline, so it adds compression without touching accuracy or needing retraining.",
          ],
        },
        {
          type: "callout",
          tone: "insight",
          title: "Fine-tuning is the non-negotiable glue",
          text: "Pruning and quantization each remove information, so accuracy would collapse without recovery. Fine-tuning after each stage, re-applying the pruning mask after every gradient step, and snapping weights back to their centroids, is what preserves accuracy at high compression.",
        },
      ],
    },
    {
      id: "architecture",
      kicker: "04 · Technical Architecture",
      heading: "A modular, measurable pipeline",
      blocks: [
        {
          type: "diagram",
          id: "deep-compression-stages",
          caption:
            "The three-stage pipeline: a trained VGG-11 is pruned to 90% sparsity, quantized with k-means weight sharing, and Huffman-coded, shrinking 37.2 MB to 1.57 MB with fine-tuning restoring accuracy after the lossy stages.",
        },
        {
          type: "p",
          text: "The codebase is package-based and separated by concern: a config hub holding every hyperparameter, a data pipeline, the VGG-11 model, and a compression package with independent pruning, quantization, and huffman modules plus modified conv/linear layers that carry their own masks. A metrics module computes per-layer sparsity, the analytic compressed-size breakdown, and top-1 accuracy at every stage for full traceability. A single orchestrator runs baseline training → prune+fine-tune → quantize+fine-tune → Huffman, with a fixed seed for reproducibility.",
        },
      ],
    },
    {
      id: "implementation",
      kicker: "05 · Implementation",
      heading: "From a global threshold to a Huffman tree",
      blocks: [
        {
          type: "list",
          items: [
            "Pruning: compute a global magnitude threshold at the 90th percentile, generate a binary mask per layer, zero the sub-threshold weights, then fine-tune with the mask re-applied after every update so pruned weights stay dead.",
            "Quantization: initialise k centroids linearly across each layer's weight range, run k-means, replace each weight with its centroid, then fine-tune the centroids (gradients of weights sharing a centroid are summed) with mask enforcement and centroid-snapping each step.",
            "Huffman: count cluster-index frequencies, build a min-heap tree, and assign shorter codes to frequent indices, a purely offline, lossless final squeeze.",
            "Storage accounting: the compressed size is decomposed into Huffman-coded weight indices, sparse position indices, and codebook overhead, so every bit is attributable.",
          ],
        },
      ],
    },
    {
      id: "results",
      kicker: "06 · Results",
      heading: "23.8× smaller for a 0.68% accuracy cost",
      blocks: [
        {
          type: "metrics",
          items: [
            { value: "23.8×", label: "Compression", sub: "37.22 MB → 1.57 MB" },
            { value: "89.99%", label: "Top-1 accuracy", sub: "from 90.67% baseline" },
            { value: "0.68%", label: "Accuracy drop", sub: "well under 1.5% target" },
          ],
        },
        {
          type: "table",
          caption:
            "Stage-wise accuracy and size. Pruning does most of the compression; quantization and Huffman push it to 23.8×, all at 89.99% accuracy.",
          columns: ["Stage", "Accuracy", "Size", "Compression"],
          rows: [
            ["Baseline VGG-11", "90.67%", "37.22 MB", "1.0×"],
            ["Prune 90% + fine-tune", "89.99%", "—", "10.0×"],
            ["Quantize + fine-tune", "89.99%", "—", "—"],
            ["+ Huffman coding", "89.99%", "1.57 MB", "23.8×"],
          ],
          highlightRows: [3],
        },
        {
          type: "p",
          text: "The result comfortably exceeds the 9× target while staying under the 1.5% accuracy budget. As expected, pruning dominates the compression, the fully-connected layers prove the most compressible, and the non-uniform cluster-index distribution lets Huffman add a further 20–30%, demonstrating a production-ready path to edge deployment.",
        },
      ],
    },
    {
      id: "reflection",
      kicker: "07 · Reflection",
      heading: "Where I'd push it further",
      blocks: [
        {
          type: "list",
          items: [
            "Structured pruning that removes whole filters/channels for real speedups on standard hardware, not just storage wins.",
            "Mixed-precision quantization tuned per-layer to sensitivity.",
            "Knowledge distillation to recover more accuracy at even higher compression.",
          ],
        },
      ],
    },
  ],
};
