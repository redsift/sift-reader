export function bucketing(w){
  return Math.round(+w * 60) <= 10 ? 1
      : Math.round(+w * 60) <= 90 ? 2
      : +w <= 5 ? 3
      : 4;
}

export function tooltip(v) {
  return bucketing(v) === 1 ? '< 10 sec read'
    : bucketing(v) === 2 ? '< 1 min read'
    : `${Math.round(+v)} min read`;
}
