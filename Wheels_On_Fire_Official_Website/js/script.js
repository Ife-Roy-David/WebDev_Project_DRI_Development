const jokes = [
  "Why did the car get promoted? It had drive.",
  "I told my car a joke once. It stalled.",
  "This car’s so smooth, it makes butter jealous."
];

function showJoke(index) {
  const jokeText = document.getElementById('jokeText');
  jokeText.textContent = `"${jokes[index]}"`;

}

document.addEventListener('DOMContentLoaded', () => {
  // Create the button once per page
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Back to top');
  btn.textContent = '↑ Top';

  document.body.appendChild(btn);

  // Toggle visibility on scroll
  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      btn.classList.add('is-visible');
    } else {
      btn.classList.remove('is-visible');
    }
  };

  toggleVisibility();
  window.addEventListener('scroll', toggleVisibility, { passive: true });

  // Smooth scroll to top
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
