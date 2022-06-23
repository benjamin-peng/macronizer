import { useState, useEffect } from 'react';

const Dropup = ({word, demacronize}) => {

    return (
        <div className="dropup">
            <div id="link">
                <a href={'https://en.wiktionary.org/wiki/' + demacronize(word) + '#Latin'} target="_blank">link</a>
            </div>
        </div>
    );
}
 
export default Dropup;