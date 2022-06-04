import './index.css';
import { useState } from 'react';
import Textfield from './Textfield';
import MacronizeButton from './MacronizeButton';
import MacronizedText from './MacronizedText';

function App() {
  //const [word, setWord] = useState('dico');
  const [input, setInput] = useState(''); 
  const [output, setOutput] = useState('asdf'); 

  const macronize = () => {
    const endpoint = 'https://en.wiktionary.org/w/api.php?';
    const params = 'action=query' + '&prop=extracts&titles=' + input + '&format=json&origin=*';
    fetch(endpoint + params, {
      method: 'GET'
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      var page = document.createElement('html');
      page.innerHTML = data.query.pages[Object.keys(data.query.pages)].extract;
      var latinElements = page.getElementsByClassName('Latn headword');
      var macronizations = [];
      for (let i = 0; i < latinElements.length; i++) {
        if (latinElements[i].lang == 'la') {
          macronizations.push(latinElements[i].innerText);
        }
      }
      if (macronizations.length > 0) {
        console.log(macronizations[0]);
        setOutput(macronizations[0]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };
  return (
    <div className="App">
      <p>Macronizer</p>
      <Textfield setInput={setInput}></Textfield>
      <MacronizeButton macronize={macronize}></MacronizeButton>
      <MacronizedText text={output}></MacronizedText>
    </div>
  );
}

export default App;
