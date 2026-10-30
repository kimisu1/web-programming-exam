import { useState } from 'react';
import './App.css';

const LABELS = { green: 'Зелений', red: 'Червоний' };

export default function App() {
  // Кольори квадратів: спочатку перший зелений, другий червоний
  const [colors, setColors] = useState(['green', 'red']);

  // Кожен квадрат змінює колір: зелений стає червоним, червоний — зеленим
  function handleStart() {
    setColors((current) => current.map((color) => (color === 'green' ? 'red' : 'green')));
  }

  return (
    <main className="page">
      {colors.map((color, index) => (
        <div key={index} className="square" data-color={color}>
          {LABELS[color]}
        </div>
      ))}
      <button type="button" className="start-button" onClick={handleStart}>
        Старт
      </button>
    </main>
  );
}
