document.addEventListener('DOMContentLoaded', () => {
  const livestreamInterest = document.getElementById('interes-livestream');
  const formSection = document.getElementById('formulario');
  const form = formSection?.querySelector('form');
  const success = document.getElementById('form-success');

  document.querySelector('[data-add-livestream]')?.addEventListener('click', () => {
    if (livestreamInterest) livestreamInterest.checked = true;
  });

  if (new URLSearchParams(window.location.search).get('enviado') === '1' && form && success) {
    form.hidden = true;
    success.hidden = false;
  }
});
