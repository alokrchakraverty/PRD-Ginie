const prd = $('Set finalPrd').first().json.finalPrd
 
const storyOutput = $input.first().json.output[0].content[0].text

const allFrIds = prd.functional_requirements.map(f => f.id);
const allNfrIds = prd.non_functional_requirements.map(n => n.id);

const linkedFrIds = new Set();
const allConstraintText = [];

storyOutput.epics.forEach(epic => {
  allConstraintText.push(...(epic.constraints || [])); // epic-level constraints now checked too
  epic.features.forEach(f => {
    f.linked_requirement_ids.forEach(id => linkedFrIds.add(id));
    allConstraintText.push(...(f.constraints || []));
  });
});

const missingFrs = allFrIds.filter(id => !linkedFrIds.has(id));
const missingNfrs = allNfrIds.filter(id =>
  !allConstraintText.some(c => c.includes(id))
);

return [{
  json: {
    finalPrd: prd,
    epics: storyOutput.epics,
    validation: {
      missingFrs,
      missingNfrs,
      isComplete: missingFrs.length === 0 && missingNfrs.length === 0
    }
  }
}];