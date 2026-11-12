// Add verified profile links, your email, and asset paths here when ready.
const portfolio = {
  resume: '', github: '', linkedin: '', contact: '',
  projects: {
    authent: { name: 'Authent', description: '', stack: '', url: '', video: '', gif: './Authent.gif' },
    lifequest: { name: 'LifeQuest', description: '', stack: '', url: 'https://giaequityplay.itch.io/gia-project', video: '', gif: './EquityPlay.gif' },
    garba: { name: 'Golden Gate Garba', description: '', stack: '', url: 'https://goldengategarba.org/', video: '', gif: './GoldenGateGarba.gif' }
  }
};

const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let reducedMotion = motionPreference.matches;
document.querySelectorAll('[data-resource]').forEach(button => {
  const url = portfolio[button.dataset.resource];
  if (!url) return;
  const link = document.createElement('a');
  link.className = button.className;
  link.innerHTML = button.innerHTML;
  link.href = url;
  button.replaceWith(link);
});
const videoObserver = new IntersectionObserver(entries => entries.forEach(({ target, isIntersecting }) => {
  if (isIntersecting && !reducedMotion) target.play().catch(() => {}); else target.pause();
}), { threshold: 0.35 });
Object.entries(portfolio.projects).forEach(([key, project]) => {
  const article = document.querySelector(`[data-project="${key}"]`);
  if (!article) return;
  if (project.description) article.querySelector('.project-description').textContent = project.description;
  if (project.stack) { article.querySelector('.project-meta').hidden = false; article.querySelector('.project-meta span:last-child').textContent = project.stack; }
  if (project.gif && !project.video) {
    const preview = article.querySelector('.project-preview');
    const image = document.createElement('img');
    image.alt = `${project.name} project demo`;
    image.className = 'project-demo';
    image.id = `demo-${key}`;
    image.src = project.gif;
    image.loading = 'lazy';
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'demo-toggle';
    toggle.setAttribute('aria-pressed', 'false');
    toggle.setAttribute('aria-controls', image.id);
    toggle.setAttribute('aria-label', `Keep ${project.name} demo clear`);
    toggle.innerHTML = '<span class="demo-hint" aria-hidden="true"><span class="hover-hint">Hover to bring into focus</span><span class="touch-hint">Tap to bring into focus</span></span>';
    preview.replaceChildren(image, toggle);
    function setClear(value) {
      article.classList.toggle('demo-pinned', value);
      toggle.setAttribute('aria-pressed', String(value));
      toggle.setAttribute('aria-label', `${value ? 'Blur' : 'Keep'} ${project.name} demo${value ? '' : ' clear'}`);
    }
    toggle.addEventListener('click', () => setClear(!article.classList.contains('demo-pinned')));
    article.addEventListener('keydown', event => {
      if (event.key === 'Escape') setClear(false);
    });
    image.addEventListener('error', () => {
      toggle.querySelector('.demo-hint').textContent = 'Demo unavailable';
      toggle.disabled = true;
    });
  }
  if (project.video) {
    const video = document.createElement('video');
    video.src = project.video; video.muted = true; video.loop = true; video.playsInline = true; video.controls = true; video.preload = 'metadata';
    video.style.cssText = 'width:100%;height:100%;object-fit:contain;background:#000';
    video.setAttribute('aria-label', `${project.name} product demo`);
    article.querySelector('.project-preview').replaceChildren(video);
    videoObserver.observe(video);
  }
});

motionPreference.addEventListener('change', event => {
  reducedMotion = event.matches;
  document.querySelectorAll('video').forEach(video => {
    if (reducedMotion) video.pause();
    else if (video.getBoundingClientRect().top < innerHeight && video.getBoundingClientRect().bottom > 0) video.play().catch(() => {});
  });
});
document.querySelector('#year').textContent = new Date().getFullYear();
