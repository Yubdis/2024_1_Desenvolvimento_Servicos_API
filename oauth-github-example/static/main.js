const URL_PARAMS = new URLSearchParams(window.location.search);
const USERNAME = URL_PARAMS.get('username');

// Show an element
const show = (selector) => {
  document.querySelector(selector).style.display = 'block';
};

// Hide an element
const hide = (selector) => {
  document.querySelector(selector).style.display = 'none';
};

if (USERNAME) {
  hide('.content.unauthorized');
  show('.content.authorized');
  document.querySelector('.user-name').textContent = USERNAME; // Display username
}
