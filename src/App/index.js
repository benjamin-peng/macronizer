import './index.css';
import { useState } from 'react';
import Textfield from './Textfield';
import MacronizeButton from './MacronizeButton';
import MacronizedText from './MacronizedText';
import Header from './Header';

function App() {
  //const [word, setWord] = useState('dico');
  const [input, setInput] = useState(''); 
  const [output, setOutput] = useState(''); 
  var temp = [];

  const macronizeRecurse = async (inp) => {
    var enclitic = '';
    if (inp.length > 0) { 
      //check for and remove common enclitics
      if (inp[inp.length - 1].endsWith('que')) {
        inp[inp.length - 1] = inp[inp.length - 1].substring(0, inp[inp.length - 1].length - 3);
        enclitic = 'que';
      } else if (inp[inp.length - 1].endsWith('ve')) {
        inp[inp.length - 1] = inp[inp.length - 1].substring(0, inp[inp.length - 1].length - 2);
        enclitic = 've';
      } else if (inp[inp.length - 1].endsWith('ne')) {
        inp[inp.length - 1] = inp[inp.length - 1].substring(0, inp[inp.length - 1].length - 2);
        enclitic = 'ne';
      }
      
      const endpoint = 'https://en.wiktionary.org/w/api.php?';
      const params = 'action=query' + '&prop=extracts&titles=' + inp[inp.length - 1] + '&format=json&origin=*';
      var out = '';
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
        if (macronizations.length === 0) {
          out = inp[inp.length - 1];
        }
        else if (macronizations.length > 0) { //TODO:: multiple possibilities displayed for single word
          out = macronizations[0];
        }
        temp.push(out + enclitic); //reattach enclitic
        inp.pop();
        macronizeRecurse(inp);
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      temp.reverse();
      setOutput(temp.join(' '));
    }
  };

  const macronize = async () => {
    setOutput('');
    temp = [];
    const inputArray = input.split(" ");
    macronizeRecurse(inputArray);
  }

  return (
    <div className="App">
      <Header></Header>
      <div className="align-container">
        <div className="horizontal">
          <Textfield setInput={setInput}></Textfield>
        </div>
        <div className="horizontal">
          <MacronizedText text={output}></MacronizedText>
        </div>
      </div>
      <MacronizeButton macronize={macronize}></MacronizeButton>
    </div>
  );
}

export default App;
