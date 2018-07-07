let host;
export function stopPropagation(e) {
  if (window) {
    e.stopPropagation();
  }
}

export function getHost() {
  if (host) return host;
  if (window) {
    host = window.location.host;
    return host;
  }
  return '';
}
