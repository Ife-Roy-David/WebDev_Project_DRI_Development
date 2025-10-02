const jokes = [
  "Why did the car get promoted? It had drive.",
  "I told my car a joke once. It stalled.",
  "This car’s so smooth, it makes butter jealous."
];

function showJoke(index) {
  const jokeText = document.getElementById('jokeText');
  jokeText.textContent = `"${jokes[index]}"`;
}