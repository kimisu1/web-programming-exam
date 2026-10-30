// Сторінку повністю будує JavaScript (DOM API): без HTML-розмітки та CSS-файлів.

const people = [
  { rank: 'викладач', fullName: 'Степанов Степан Степанович', age: 33 },
  { rank: 'викладач', fullName: 'Федоров Федір Федорович', age: 25 },
  { rank: 'викладач', fullName: 'Антоненко Антон Антонович', age: 31 },
];

const cellStyle = {
  padding: '8px 14px',
  border: '1px solid #b5b5b5',
  textAlign: 'left',
};

const centeredCellStyle = { ...cellStyle, textAlign: 'center' };

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

function createRow(...cells) {
  const row = document.createElement('tr');
  row.append(...cells);
  return row;
}

document.title = 'Середній вік';
Object.assign(document.body.style, {
  margin: '0',
  padding: '40px 16px',
  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
  fontSize: '16px',
  lineHeight: '1.4',
  color: '#222',
  background: '#f4f4f4',
});

// Заголовок таблиці
const thead = document.createElement('thead');
thead.append(createRow(
  ...['№ п/п', 'Звання', 'ПІБ', 'Вік'].map((title) => createElement('th', { ...cellStyle, background: '#e9e9e9' }, title)),
));

// Рядки з даними осіб
const tbody = document.createElement('tbody');
people.forEach((person, index) => {
  tbody.append(createRow(
    createElement('td', centeredCellStyle, `${index + 1}.`),
    createElement('td', cellStyle, person.rank),
    createElement('td', cellStyle, person.fullName),
    createElement('td', centeredCellStyle, String(person.age)),
  ));
});

// Підсумковий рядок із полем для середнього віку
const averageAgeCell = createElement('td', centeredCellStyle);
const tfoot = document.createElement('tfoot');
tfoot.append(createRow(
  createElement('td', cellStyle),
  createElement('td', cellStyle),
  createElement('td', { ...cellStyle, fontWeight: 'bold', textAlign: 'right' }, 'Середній вік:'),
  averageAgeCell,
));

const table = createElement('table', { borderCollapse: 'collapse', background: '#fff' });
table.append(thead, tbody, tfoot);

// Обчислення середнього віку осіб, доданих до таблиці
const startButton = createButton('Старт');
startButton.addEventListener('click', () => {
  const total = people.reduce((sum, person) => sum + person.age, 0);
  averageAgeCell.textContent = (total / people.length).toFixed(2);
});

// Таблиця і кнопка «Старт» під її правим краєм
const page = createElement('main', {
  width: 'fit-content',
  maxWidth: '100%',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '16px',
});
page.append(table, startButton);
document.body.append(page);
