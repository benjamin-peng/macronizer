import { useState, useEffect } from 'react';
import Dropup from '../Dropup';

const MacronizedWord = ({myKey, wordList, copyList, setCopyList}) => {

    const [color, setColor] = useState('white'); 
    const [wordIdx, setWordIdx] = useState(0);
    const [hover, setHover] = useState(false);
    const [valid, setValid] = useState(false); 

    const demacronize = (word) => {
        return word.replace('ā', 'a').replace('ē', 'e').replace('ū', 'u').replace('ī', 'i').replace('ō', 'o');
    };

    const endpoint = 'https://en.wiktionary.org/w/api.php?';
    const params = 'action=query' + '&prop=extracts&titles=' + demacronize(wordList[0]) + '&format=json&origin=*';

    useEffect(() => {
        if (wordList.length > 1) setColor('#cffaf2');
        else setColor('white');
    }, [wordList]);

    useEffect(() => {
        setValid(false);
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
            for (let i = 0; i < latinElements.length; i++) {
                if (latinElements[i].lang == 'la') {
                    setValid(true);
                    break;
                }
            }
          })
          .catch((err) => {
            console.log(err);
          });
    }, [wordList]);

    useEffect(() => {
        var tempCopyList = copyList;
        tempCopyList[myKey] = wordList[wordIdx];
        setCopyList(tempCopyList);
    }, [wordIdx]);

    const loopIdx = () => {
        if (wordIdx + 1 == wordList.length) {
            setWordIdx(0);
        } else {
            setWordIdx(wordIdx + 1);
        }
    };


    return (  
        <div className="macronized-word" onClick={loopIdx} style={{backgroundColor: color}} 
        onMouseEnter={() => {
            setColor('beige');
            setHover(true);
        }} onMouseLeave={() => {
            if (wordList.length == 1) setColor('white');
            else setColor('#cffaf2');
            setHover(false);
            }}>
            {hover && valid && <Dropup word={wordList[0]} demacronize={demacronize}></Dropup>}
            <p id="output">{wordList[wordIdx]}</p>
        </div>
    );
}
 
export default MacronizedWord;