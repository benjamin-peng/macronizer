import React, { Fragment, useEffect, useState } from 'react';
import './index.css';
import MacronizedWord from '../MacronizedWord';
import CopyButton from '../CopyButton';

const MacronizedText = ({ outList, copyList, setCopyList }) => {
    
    const copy = () => {
        navigator.clipboard.writeText(copyList.join(' '));
    }

    return (
        <div className="vertical">
            <p id="label2" className="label">output</p>
            <div className="macronized">
                {outList.map((wordList, index) => {
                    return (
                        <React.Fragment key={index}>
                            <MacronizedWord 
                            key={index} myKey={index} wordList={wordList} copyList={copyList} setCopyList={setCopyList}
                            ></MacronizedWord>
                        </React.Fragment>
                    );
                })}
                <CopyButton copy={copy}></CopyButton>
            </div>
        </div>
    );
}
 
export default MacronizedText;