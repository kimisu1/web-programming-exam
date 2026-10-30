// Сторінку повністю будує JavaScript (DOM API): без HTML-розмітки та CSS-файлів.

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

// Поле введення з підписом
function createField(id, labelText, type) {
  const label = createElement('label', {}, labelText);
  label.htmlFor = id;

  const input = createElement('input', {
    width: '100%',
    padding: '6px 8px',
    font: 'inherit',
    border: '1px solid #333',
    boxSizing: 'border-box',
  });
  input.id = id;
  input.type = type;

  return { label, input };
}

document.title = 'Введення даних';
Object.assign(document.body.style, {
  margin: '0',
  padding: '40px 16px',
  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
  fontSize: '16px',
  lineHeight: '1.4',
  color: '#222',
  background: '#f4f4f4',
});

// Панель введення даних: заголовок, поля і кнопка «Старт» праворуч унизу
const nameField = createField('name', 'Ім’я:', 'text');
nameField.input.autocomplete = 'off';
const ageField = createField('age', 'Вік:', 'number');
ageField.input.min = '0';

const fields = createElement('div', {
  display: 'grid',
  gridTemplateColumns: 'max-content minmax(0, 260px)',
  alignItems: 'center',
  gap: '16px 24px',
  paddingLeft: 'clamp(0px, 8vw, 56px)',
});
fields.append(nameField.label, nameField.input, ageField.label, ageField.input);

const startButton = createButton('Старт');
startButton.style.marginLeft = 'auto';

const panel = createElement('main', {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-end',
  gap: '16px',
  maxWidth: '620px',
  margin: '0 auto',
  padding: '16px 20px 20px',
  background: '#fff',
  border: '1px solid #333',
  boxSizing: 'border-box',
});
panel.append(
  createElement('p', { flexBasis: '100%', margin: '0' }, 'Введіть наступні дані:'),
  fields,
  startButton,
);

// Модальне вікно з введеними даними
const nameValue = createElement('strong', { overflowWrap: 'anywhere' });
const nameLine = createElement('p', { margin: '8px 0' }, 'Ім’я: ');
nameLine.append(nameValue);

const ageValue = createElement('strong', { overflowWrap: 'anywhere' });
const ageLine = createElement('p', { margin: '8px 0' }, 'Вік: ');
ageLine.append(ageValue);

const modalTitle = createElement('h2', { margin: '0 0 16px', fontSize: '20px' }, 'Введені дані');
modalTitle.id = 'modal-title';

const closeButton = createButton('Закрити');
const actions = createElement('div', { marginTop: '20px', textAlign: 'right' });
actions.append(closeButton);

const modal = createElement('dialog', {
  width: 'min(360px, calc(100% - 32px))',
  padding: '24px',
  border: 'none',
  borderRadius: '12px',
  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.25)',
  boxSizing: 'border-box',
});
modal.setAttribute('aria-labelledby', 'modal-title');
modal.append(modalTitle, nameLine, ageLine, actions);

closeButton.addEventListener('click', () => modal.close());

startButton.addEventListener('click', () => {
  nameValue.textContent = nameField.input.value;
  ageValue.textContent = ageField.input.value;
  modal.showModal();
});

document.body.append(panel, modal);
