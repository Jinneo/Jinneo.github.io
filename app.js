// Add verified profile links, your email, and asset paths here when ready.
const portfolio = {
  resume: '', github: '', linkedin: '', contact: '',
  projects: {
    authent: { name: 'Authent', description: '', stack: '', url: '', video: '', gif: './Authent.gif' },
    lifequest: { name: 'LifeQuest', description: '', stack: '', url: 'https://giaequityplay.itch.io/gia-project', video: '', gif: './EquityPlay.gif' },
    garba: { name: 'Golden Gate Garba', description: '', stack: '', url: '', video: '', gif: './GoldenGateGarba.gif' }
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
  if (project.description) article.querySelector('.project-description').textContent = project.description;
  if (project.stack) { article.querySelector('.project-meta').hidden = false; article.querySelector('.project-meta span:last-child').textContent = project.stack; }
  if (project.gif && !project.video) {
    const image = document.createElement('img');
    image.src = project.gif;
    image.alt = `${project.name} project demo`;
    image.loading = 'lazy';
    image.className = 'project-demo';
    article.querySelector('.project-preview').replaceChildren(image);
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
