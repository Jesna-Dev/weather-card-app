import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import Weather from './weatherComponent';

function App() {
  const [date, setDate] = useState(null);
  useEffect(() => {
    async function getDate() {
      const res = await fetch('/api/date');
      const newDate = await res.text();
      setDate(newDate);
    }
    getDate();
  }, []);
  return (
    <main>
      <h1>WEATHER FORECAST</h1>
      <Weather/>
    </main>
  );
}

export default App;
