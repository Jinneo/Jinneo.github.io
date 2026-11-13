(() => {
  const endpoint = window.PORTFOLIO_TRACKING_ENDPOINT;
  if (!endpoint) return;
  try { if (new URL(endpoint).protocol !== 'https:') return; } catch { return; }
  const notice = document.querySelector('[data-tracking-notice]');
  if (notice) notice.hidden = false;
  const track = event => {
    if (!event.isTrusted || (event.type === 'auxclick' && event.button !== 1)) return;
    try {
      // Do not delay or cancel navigation, and do not send IPs from browser input.
      fetch(endpoint, { method: 'POST', body: 'view_projects', keepalive: true, credentials: 'omit', referrerPolicy: 'no-referrer' }).catch(() => {});
    } catch {}
  };
  document.querySelectorAll('a[href="work.html"]').forEach(link => {
    link.addEventListener('click', track);
    link.addEventListener('auxclick', track);
  });
})();
