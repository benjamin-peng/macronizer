import React, { Fragment, useEffect } from 'react';
import './index.css';
import MacronizedWord from '../MacronizedWord';

const MacronizedText = ({ outList }) => {

    //console.log(outList);
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
            </div>
        </div>
    );
}
 
export default MacronizedText;