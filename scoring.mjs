export function applicable(item, age) {
  return Number.isInteger(age) && age >= 0 && age <= 18 && age >= (item.minAge ?? 0) && age <= (item.maxAge ?? 18);
}
export function anchorsFor(item, age) {
  return (item.anchors || []).filter(a => age >= (a.minAge ?? 0) && age <= (a.maxAge ?? 18));
}
export function canScore(item, age) {
  const anchors = anchorsFor(item, age);
  const distinct = [...new Set(anchors.map(a => a.score))];
  const ageVerified = !item.verifiedAgeRanges || item.verifiedAgeRanges.some(r => age >= r.minAge && age <= r.maxAge);
  return [6,12].includes(age) && applicable(item, age) && item.verified === true && ageVerified && distinct.length >= 2 && distinct.includes(5) && distinct.every(s => [1,3,5].includes(s));
}
export function summarize(items, scores, age) {
  const required = items.filter(i => applicable(i, age));
  const scored = required.filter(i => canScore(i, age) && anchorsFor(i, age).some(a => a.score === scores[i.id]));
  const sum = scored.reduce((n,i) => n + scores[i.id], 0);
  return {required:required.length, scored:scored.length, sum, complete:required.length > 0 && scored.length === required.length};
}
export function classify(summary, age) {
  if (!summary.complete) return null;
  if (age === 6 && summary.required === 17) return summary.sum <= 54 ? '異常範圍' : summary.sum <= 71 ? '過渡範圍' : '正常範圍';
  if (age === 12 && summary.required === 20) return summary.sum <= 68 ? '異常範圍' : summary.sum <= 82 ? '過渡範圍' : '正常範圍';
  return null;
}
