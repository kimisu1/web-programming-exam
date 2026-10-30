// Обчислення середнього віку осіб, доданих до таблиці
const startButton = document.getElementById('start-button');
const averageAgeCell = document.getElementById('average-age');

startButton.addEventListener('click', () => {
  // Вік беремо з рядків таблиці, тож додані рядки теж будуть враховані
  const ages = Array.from(document.querySelectorAll('#people .age'), (cell) => Number(cell.textContent));
  const total = ages.reduce((sum, age) => sum + age, 0);

  averageAgeCell.textContent = (total / ages.length).toFixed(2);
});
