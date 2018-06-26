export function stopPropagation(e) {
  if (window) {
    e.stopPropagation();
  }
}
