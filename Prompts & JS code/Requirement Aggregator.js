// Get all incoming items from the three extraction sources
const items = $input.all();

const aggregatedExtractions = [];

// Extract and combine the "extractions" array from every incoming item
for (const item of items) {
  const extractions =
    item.json?.output?.[0]?.content?.[0]?.text?.extractions;

  if (Array.isArray(extractions)) {
    aggregatedExtractions.push(...extractions);
  }
}

// Return one item containing the single consolidated extractions array
return [
  {
    json: {
      extractions: aggregatedExtractions
    }
  }
];