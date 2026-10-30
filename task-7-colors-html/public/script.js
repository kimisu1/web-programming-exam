// Зміна кольору фону квадратів: зелений стає червоним, червоний — зеленим
const LABELS = { green: 'Зелений', red: 'Червоний' };

document.getElementById('start-button').addEventListener('click', () => {
  document.querySelectorAll('.square').forEach((square) => {
    const color = square.dataset.color === 'green' ? 'red' : 'green';
    square.dataset.color = color;
    square.textContent = LABELS[color];
  });
});
