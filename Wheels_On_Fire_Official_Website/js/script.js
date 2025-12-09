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

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", function (event) {
    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();

    let errors = [];

    // Validate name (letters only)
    if (!/^[A-Za-z\s]+$/.test(name)) {
      errors.push("Name can only letters and spaces.");
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("Please enter a valid email address.");
    }

    // Validate message length
    if (message.length < 5) {
      errors.push("Message must be at least 5 characters long.");
    }

    // Show errors and prevent submission
    if (errors.length > 0) {
      event.preventDefault();
      alert(errors.join("\n"));
    }
  });
});




