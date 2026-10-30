import { useState } from 'react';
import './App.css';

// Модальне вікно з даними, введеними у форму
function ResultModal({ name, age, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="modal-title">Введені дані</h2>
        <p>
          Ім’я: <strong>{name}</strong>
        </p>
        <p>
          Вік: <strong>{age}</strong>
        </p>
        <div className="modal-actions">
          <button type="button" className="start-button" onClick={onClose} autoFocus>
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <main className="panel" inert={isModalOpen}>
        <p className="panel-title">Введіть наступні дані:</p>
        <div className="fields">
          <label htmlFor="name">Ім’я:</label>
          <input
            id="name"
            type="text"
            autoComplete="off"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label htmlFor="age">Вік:</label>
          <input
            id="age"
            type="number"
            min="0"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </div>
        <button type="button" className="start-button" onClick={() => setIsModalOpen(true)}>
          Старт
        </button>
      </main>

      {isModalOpen && (
        <ResultModal name={name} age={age} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
