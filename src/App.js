
import logo from './logo.svg';
import './App.css';
import Weather from './js/Weather'



function App() {


  return (
    <div className="App">
      <header className="App-header">
        <h1 className = 'titulo'>Montevideo</h1>
        <Weather default='Montevideo'/>

      </header>
    </div>
  );
}

export default App;
