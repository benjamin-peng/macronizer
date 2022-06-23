import React, { Fragment, useEffect } from 'react';
import './index.css';
import MacronizedWord from '../MacronizedWord';
import CopyButton from '../CopyButton';

const MacronizedText = ({ outList }) => {

    const copy = () => {
        var text = [];
        for (var i = 0; i < outList.length; i++) {
            text.push(outList[i][0]);
        }
        navigator.clipboard.writeText(text.join(' '));
    }

    return (
        <div className="vertical">
            <p id="label2" className="label">output</p>
            <div className="macronized">
                {outList.map((wordList) => {
                    return (
                        <React.Fragment>
                            <MacronizedWord wordList={wordList}></MacronizedWord>
                        </React.Fragment>
                    );
                })}
                <CopyButton copy={copy}></CopyButton>
            </div>
        </div>
    );
}
 
export default MacronizedText;