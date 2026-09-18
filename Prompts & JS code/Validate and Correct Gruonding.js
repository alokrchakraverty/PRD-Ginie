const extractions = $('Requirement Aggregator').first().json.extractions; 
const prd =  $('Set finalPrd').first().json.finalPrd

// Sources with zero stated requirements — anything citing one of these
// as a source for a requirement is fabricated, by definition.
const emptySources = new Map(
  extractions
    .filter(e => (e.stated_requirements || []).length === 0)
    .map(e => [e.source_id, e])
);

const removedFrs = [];
const cleanFrs = (prd.functional_requirements || []).filter(fr => {
  if (emptySources.has(fr.source)) { removedFrs.push(fr); return false; }
  return true;
});

const removedNfrs = [];
const cleanNfrs = (prd.non_functional_requirements || []).filter(nfr => {
  if (emptySources.has(nfr.source)) { removedNfrs.push(nfr); return false; }
  return true;
});

// Make sure whatever was removed is still represented as an open question,
// pulling directly from that source's own ambiguous_items/missing_info.
const existingQuestions = new Set(prd.open_questions || []);
const newQuestions = [];
[...removedFrs, ...removedNfrs].forEach(item => {
  const source = emptySources.get(item.source);
  [...(source.ambiguous_items || []), ...(source.missing_info || [])].forEach(q => {
    if (!existingQuestions.has(q)) { existingQuestions.add(q); newQuestions.push(q); }
  });
});

const correctedPrd = {
  ...prd,
  functional_requirements: cleanFrs,
  non_functional_requirements: cleanNfrs,
  open_questions: [...(prd.open_questions || []), ...newQuestions]
};

return [{
  json: {
    finalPrd: correctedPrd,
    validation: {
      removedIds: [...removedFrs, ...removedNfrs].map(i => i.id),
      wasCorrected: removedFrs.length > 0 || removedNfrs.length > 0
    }
  }
}];