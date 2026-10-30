import { useRef, useState } from 'react';
import './App.css';

export default function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const modalRef = useRef(null);

  return (
    <>
      <main className="panel">
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
        <button type="button" className="start-button" onClick={() => modalRef.current.showModal()}>
          Старт
        </button>
      </main>

      {/* Модальне вікно з введеними даними; закривається кнопкою «Закрити» або клавішею Escape */}
      <dialog ref={modalRef} className="modal" aria-labelledby="modal-title">
        <h2 id="modal-title">Введені дані</h2>
        <p>
          Ім’я: <strong>{name}</strong>
        </p>
        <p>
          Вік: <strong>{age}</strong>
        </p>
        <form method="dialog" className="modal-actions">
          <button className="start-button">Закрити</button>
        </form>
      </dialog>
    </>
  );
}
