import { useState, useEffect } from 'react';

const MacronizedWord = ({wordList}) => {

    const [color, setColor] = useState('white'); 
    const [wordIdx, setWordIdx] = useState(0); 

    useEffect(() => {
        if (wordList.length > 1) setColor('#cffaf2');
        else setColor('white');
    }, [wordList]);

    const loopIdx = () => {
        if (wordIdx + 1 == wordList.length) {
            setWordIdx(0);
        } else {
            setWordIdx(wordIdx + 1);
        }
    };


    return (  
        <div className="macronized-word" onClick={loopIdx} style={{backgroundColor: color}} 
        onMouseEnter={() => {setColor('beige')}} onMouseLeave={() => {
            if (wordList.length == 1) setColor('white');
            else setColor('#cffaf2');
            }}>
            <p id="output">{wordList[wordIdx]}</p>
        </div>
    );
}
 
export default MacronizedWord;