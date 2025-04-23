import React from 'react';

export default function SecondScreen({ onBack }) {
  return (
    <div style={{ padding: '1rem' }}>
      <h2>Second Screen</h2>
      <button onClick={onBack}>Back</button>
    </div>
  );
}