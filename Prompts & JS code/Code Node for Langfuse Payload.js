// --- pull the fields set upstream ---
const src = $input.first().json;
const requirement_Extractions = src.requirement_Extractions;
const GapAnalysis            = src.GapAnalysis;
const generatedPRD           = src.generatedPRD;
const critiqueReport         = src.critiqueReport;
const finalPrd               = src.finalPrd;
const StoryBreakdown_Epics   = src.StoryBreakdown_Epics;
const storyEvaluatorReport   = src.storyEvaluatorReport;
const finalStory             = src.finalStory;

// --- helpers ---
const hex = (bytes) =>
  Array.from({ length: bytes }, () =>
    Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
  ).join('');

// nanosecond timestamps must be strings (they exceed JS safe-integer range)
const nowMs = Date.now();
const nsOf = (ms) => (BigInt(Math.round(ms)) * 1000000n).toString();

const asStr = (v) =>
  v == null ? '' : (typeof v === 'string' ? v : JSON.stringify(v));

const traceId    = hex(16); // 32 hex chars
const rootSpanId = hex(8);  //  16 hex chars

// treat the run as ~1s long so start < end
const startMs = nowMs - 1000;
const endMs   = nowMs;

// one child span per stage, each carrying its input/output
const stages = [
  { name: 'requirement-extraction', output: requirement_Extractions },
  { name: 'gap-analysis',           output: GapAnalysis },
  { name: 'prd-generation',         output: generatedPRD },
  { name: 'critique',               output: critiqueReport },
  { name: 'final-prd',              output: finalPrd },
  { name: 'story-breakdown',        output: StoryBreakdown_Epics },
  { name: 'story-evaluation',       output: storyEvaluatorReport },
  { name: 'final-story',            output: finalStory },
];

const n = stages.length;
const stepMs = (endMs - startMs) / n;

const attr = (key, value) => ({ key, value: { stringValue: asStr(value) } });

const childSpans = stages.map((s, i) => {
  const sStart = startMs + i * stepMs;
  const sEnd   = startMs + (i + 1) * stepMs;
  return {
    traceId,
    spanId: hex(8),
    parentSpanId: rootSpanId,
    name: s.name,
    kind: 1, // SPAN_KIND_INTERNAL
    startTimeUnixNano: nsOf(sStart),
    endTimeUnixNano: nsOf(sEnd),
    attributes: [
      // Langfuse-native observation IO mapping
      attr('langfuse.observation.input', ''),
      attr('langfuse.observation.output', s.output),
    ],
  };
});

const rootSpan = {
  traceId,
  spanId: rootSpanId,
  name: 'prd-genie',
  kind: 1,
  startTimeUnixNano: nsOf(startMs),
  endTimeUnixNano: nsOf(endMs),
  attributes: [
    // Langfuse trace-level IO + name
    attr('langfuse.trace.name', 'PRD Genie'),
    attr('langfuse.trace.input', requirement_Extractions),
    attr('langfuse.trace.output', finalStory ?? finalPrd),
    attr('langfuse.trace.metadata.batch_id', src.batch_id),
    attr('langfuse.trace.metadata.expected_criteria', src.expected_criteria)
  ],
};

const payload = {
  resourceSpans: [
    {
      resource: {
        attributes: [attr('service.name', 'PRD Genie')],
      },
      scopeSpans: [
        {
          scope: { name: 'prd-genie' },
          spans: [rootSpan, ...childSpans],
        },
      ],
    },
  ],
};

return [{ json: payload }];