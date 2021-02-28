
import logo from './logo.svg';
import './App.css';
import Weather from './js/Weather'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Weather default='Montevideo'/>
        Montevideo 
      </header>
    </div>
  );
}

export default App;
