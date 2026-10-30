// Показ модального вікна з даними, введеними в поля «Ім’я» та «Вік»
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const modal = document.getElementById('result-modal');

document.getElementById('start-button').addEventListener('click', () => {
  document.getElementById('result-name').textContent = nameInput.value;
  document.getElementById('result-age').textContent = ageInput.value;
  modal.showModal();
});
