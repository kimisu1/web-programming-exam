import { useState } from 'react';
import './App.css';

const people = [
  { id: 1, rank: 'викладач', fullName: 'Степанов Степан Степанович', age: 33 },
  { id: 2, rank: 'викладач', fullName: 'Федоров Федір Федорович', age: 25 },
  { id: 3, rank: 'викладач', fullName: 'Антоненко Антон Антонович', age: 31 },
];

export default function App() {
  const [averageAge, setAverageAge] = useState('');

  // Обчислення середнього віку осіб, доданих до таблиці
  function handleStart() {
    const total = people.reduce((sum, person) => sum + person.age, 0);
    setAverageAge((total / people.length).toFixed(2));
  }

  return (
    <main className="page">
      <table className="people-table">
        <thead>
          <tr>
            <th>№ п/п</th>
            <th>Звання</th>
            <th>ПІБ</th>
            <th>Вік</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr key={person.id}>
              <td className="number">{index + 1}.</td>
              <td>{person.rank}</td>
              <td>{person.fullName}</td>
              <td className="age">{person.age}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td className="average-label">Середній вік:</td>
            <td className="age">{averageAge}</td>
          </tr>
        </tfoot>
      </table>
      <button type="button" className="start-button" onClick={handleStart}>
        Старт
      </button>
    </main>
  );
}
