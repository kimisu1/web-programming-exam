// Сторінку повністю будує JavaScript (DOM API): без HTML-розмітки та CSS-файлів.

// Кольори квадратів та їхні підписи
const COLORS = {
  green: { label: 'Зелений', background: '#2e7d32' },
  red: { label: 'Червоний', background: '#c62828' },
};

// Створює елемент із заданими стилями та текстом
function createElement(tag, style = {}, text = '') {
  const element = document.createElement(tag);
  Object.assign(element.style, style);
  element.textContent = text;
  return element;
}

// Кнопка в стилі макета; при наведенні трохи темнішає
function createButton(text) {
  const button = createElement('button', {
    padding: '10px 28px',
    font: 'inherit',
    color: '#000',
    background: '#a5a5a5',
    border: '1px solid #7f7f7f',
    borderRadius: '8px',
    cursor: 'pointer',
  }, text);
  button.type = 'button';
  button.addEventListener('mouseenter', () => {
    button.style.background = '#959595';
  });
  button.addEventListener('mouseleave', () => {
    button.style.background = '#a5a5a5';
  });
  return button;
}

// Встановлює квадрату колір фону та відповідний підпис
function paintSquare(square, color) {
  square.dataset.color = color;
  square.style.backgroundColor = COLORS[color].background;
  square.textContent = COLORS[color].label;
}

document.title = 'Зміна кольорів';
Object.assign(document.body.style, {
  margin: '0',
  padding: '40px 16px',
  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
  fontSize: '16px',
  lineHeight: '1.4',
  color: '#222',
  background: '#f4f4f4',
});

// Квадрати: спочатку перший зелений, другий червоний
const squares = ['green', 'red'].map((color) => {
  const square = createElement('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '130px',
    height: '130px',
    border: '1px solid #333',
    boxSizing: 'border-box',
    fontWeight: 'bold',
    color: '#fff',
    transition: 'background-color 0.3s',
  });
  paintSquare(square, color);
  return square;
});

// Кожен квадрат змінює колір: зелений стає червоним, червоний — зеленим
const startButton = createButton('Старт');
startButton.addEventListener('click', () => {
  squares.forEach((square) => {
    paintSquare(square, square.dataset.color === 'green' ? 'red' : 'green');
  });
});

// Два квадрати і кнопка «Старт» в один ряд
const page = createElement('main', {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '40px',
});
page.append(...squares, startButton);
document.body.append(page);
