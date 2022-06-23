import './index.css';
import { useState } from 'react';
import Textfield from './Textfield';
import MacronizeButton from './MacronizeButton';
import MacronizedText from './MacronizedText';
import Header from './Header';
import { Markup } from 'interweave';

function App() {
  //const [word, setWord] = useState('dico');
  const [input, setInput] = useState(''); 
  const [output, setOutput] = useState(''); 
  const [outList, setOutList] = useState([]); 

  var temp = [];
  const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;

  const macronizeRecurse = async (inp) => {
    var enclitic = '';
    if (inp.length > 0) { 
      //console.log(inp[inp.length - 1]);
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
      var out = [];
      fetch(endpoint + params, {
        method: 'GET'
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        var page = document.createElement('html');
        page.innerHTML = data.query.pages[Object.keys(data.query.pages)].extract;
        //console.log(page.innerHTML);
        var latinElements = page.getElementsByClassName('Latn headword');
        var macronizations = [];
        for (let i = 0; i < latinElements.length; i++) {
          if (latinElements[i].lang == 'la') {
            macronizations.push(latinElements[i].innerText);
          }
        }
        macronizations = Array.from(new Set(macronizations)); //remove duplicates
        if (macronizations.length === 0) {
          out = [inp[inp.length - 1]];
        }
        else if (macronizations.length > 0) { //TODO:: multiple possibilities displayed for single word
          for (var i = 0; i < macronizations.length; i++) {
            out.push(macronizations[i] + enclitic); 
          }
          //out = macronizations[0];
        }
        temp.push(out); //reattach enclitic
        inp.pop();
        macronizeRecurse(inp);
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      temp.reverse();
      setOutList(temp);
    }
  };

  const macronize = async () => {
    setOutput('');
    temp = [];
    const inputArray = input.split(" ");
    //remove whitespace and punctuation
    for (var i = 0; i < inputArray.length; i++) {
      inputArray[i] = inputArray[i].replace(regex, '');
      if (inputArray[i].trim().length === 0) inputArray.splice(i, 1); 
    }
    macronizeRecurse(inputArray);
  }

    //TODO:: implement "copy to clipboard" button
  return (
    <div className="App">
      <Header></Header>
      <div className="align-container">
        <div className="horizontal">
          <Textfield setInput={setInput}></Textfield>
        </div>
        <div className="horizontal">
          <MacronizedText text={output} outList={outList}></MacronizedText>
        </div>
      </div>
      <MacronizeButton macronize={macronize}></MacronizeButton>
    </div>
  );
}

export default App;
