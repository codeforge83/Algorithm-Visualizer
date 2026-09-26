export function bubbleSort(values) {
  const a = [...values], steps = [];
  for (let end = a.length - 1; end > 0; end--) {
    let swapped = false;
    for (let i = 0; i < end; i++) {
      steps.push({ type: 'compare', indices: [i, i + 1], line: 3, status: `Comparing ${a[i]} and ${a[i + 1]}` });
      if (a[i] > a[i + 1]) { [a[i], a[i + 1]] = [a[i + 1], a[i]]; swapped = true; steps.push({ type: 'swap', indices: [i, i + 1], line: 4, status: `Swapped adjacent values` }); }
    }
    steps.push({ type: 'sorted', indices: [end], line: 6, status: `${a[end]} is in its final position` });
    if (!swapped) break;
  }
  steps.push({ type: 'done', indices: a.map((_, i) => i), line: 7, status: 'Array sorted' }); return steps;
}
