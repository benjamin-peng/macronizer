import { useState, useEffect } from 'react';
import Dropup from '../Dropup';

const MacronizedWord = ({wordList}) => {

    const [color, setColor] = useState('white'); 
    const [wordIdx, setWordIdx] = useState(0);
    const [hover, setHover] = useState(false); 

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
        onMouseEnter={() => {
            setColor('beige');
            setHover(true);
        }} onMouseLeave={() => {
            if (wordList.length == 1) setColor('white');
            else setColor('#cffaf2');
            setHover(false);
            }}>
            {hover && <Dropup></Dropup>}
            <p id="output">{wordList[wordIdx]}</p>
        </div>
    );
}
 
export default MacronizedWord;