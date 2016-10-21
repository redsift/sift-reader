export function bucketing(v){
  return v <= 0.025 ? 1
      : v <= 1.5 ? 2
      : v <= 5 ? 3
      : 4;
}

export function tooltip(v) {
  return bucketing(v) === 1 ? '< 10 sec read'
    : bucketing(v) === 2 ? '< 1 min read'
    : `${Math.round(v)} min read`;
}
