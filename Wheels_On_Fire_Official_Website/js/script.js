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

function showAgePrompt() {
  let age = prompt("Please enter your age:");
  
  if (age === null || age.trim() === "") {
    document.getElementById("age-message").textContent = "Age is required to proceed.";
    return;
  }

  age = parseInt(age);

  if (isNaN(age)) {
    document.getElementById("age-message").textContent = "Please enter a valid number.";
    return;
  }

  if (age >= 16) {
    // Hide the prompt section and allow access
    document.getElementById("age-check").style.display = "none";
    alert("Welcome! You are eligible to browse and buy from our website.");
    // Optionally redirect to homepage or unlock content
    window.location.href = "index.html"; 
  } else {
    document.getElementById("age-message").textContent = "You must be 16 or older to buy from our website.";
  }
}
