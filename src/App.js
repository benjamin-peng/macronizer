import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Textfield from './Textfield';
import MacronizeButton from './MacronizeButton';

function App() {
  const [word, setWord] = useState('dico');
  const endpoint = 'https://en.wiktionary.org/w/api.php?';
  const params = 'action=query' + '&prop=extracts&titles=' + word + '&format=json&origin=*';
  const macronize = () => {
    fetch(endpoint + params, {
      method: 'GET'
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      //console.log(data.query.pages[188276].extract);
      var page = document.createElement('html');
      page.innerHTML = data.query.pages[188276].extract;
      //console.log(page.getElementsByClassName('Latn headword'));
      for (let i = 0; i < page.getElementsByClassName('Latn headword').length; i++) {
        if (page.getElementsByClassName('Latn headword')[i].lang == 'la') {
          console.log(page.getElementsByClassName('Latn headword')[i].innerText);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };
  return (
    <div className="App">
      <p>Macronizer</p>
      <Textfield></Textfield>
      <MacronizeButton macronize={macronize}></MacronizeButton>
    </div>
  );
}

export default App;
