import React, { Fragment } from 'react';
import './index.css';
import MacronizedWord from '../MacronizedWord';

const MacronizedText = ({ text, outList }) => {
    console.log(outList);
    return (
        <div className="vertical">
            <p id="label2" className="label">output</p>
            <div className="macronized">
                {outList.map((word) => {
                    return (
                        <React.Fragment>
                            <MacronizedWord word={word}></MacronizedWord>
                        </React.Fragment>
                    );
                })}
                {/*
                <p id="output">{text}</p>
                */}
            </div>
        </div>
    );
}
 
export default MacronizedText;