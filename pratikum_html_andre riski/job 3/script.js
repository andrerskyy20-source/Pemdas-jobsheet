const btn = document.getElementById('themeToggleBtn');
const body = document.body;
const mq = window.matchMedia('(prefers-color-scheme: dark)');

function effectiveTheme() {
  if (body.classList.contains('light-theme')) return 'light';
  if (body.classList.contains('dark-theme')) return 'dark';
  return mq.matches ? 'dark' : 'light';
}

function render() {
  const isDark = effectiveTheme() === 'dark';
  btn.textContent = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  btn.setAttribute('aria-pressed', String(isDark));
}

function applyTheme(theme) {
  body.classList.toggle('light-theme', theme === 'light');
  body.classList.toggle('dark-theme', theme === 'dark');
}

try {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') applyTheme(saved);
} catch {}

render();

btn.addEventListener('click', () => {
  const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch {}
  render();
});

mq.addEventListener('change', render);