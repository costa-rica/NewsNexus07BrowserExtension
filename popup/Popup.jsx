import {useState} from 'react';
import SecondScreen from './SecondScreen';
export default function Popup() {
  const [showSecondScreen, setShowSecondScreen] = useState(false);
  return (
    <div style={{ width: '250px', height: '150px', padding: '1rem', fontFamily: 'Arial' }}>
      {showSecondScreen ? (
        <SecondScreen onBack={() => setShowSecondScreen(false)} />
      ) : (
        <>
          <h1>NewsNexus07</h1>
          <button onClick={() => setShowSecondScreen(true)}>Go to Second Screen</button>
        </>
      )}
    </div>
  );
}