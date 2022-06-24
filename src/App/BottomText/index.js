const BottomText = () => {
    return (  
        <div className="bottom-text">
            <h3>How do I use this?</h3>
            <p>Type Latin text to be macronized in the input field and click macronize. 
                Macronized words with more than one possible macronization are highlighted
                in <span id="cyan-text">cyan</span>; the macronization shown initially is the
                most common one, but you can click these words to cycle through other
                possible macronizations. Additionally, hover over a word to see a dropdown
                link to the Wiktionary page for it (if one can be found). Click the clipboard
                icon at the bottom of the output field to copy the macronized text.</p>
            <h3>How was this made?</h3>
            <p>All macronizations come from Wiktionary's Latin dictionary; as far as I 
                could tell, this is the only comprehensive online Latin dictionary with 
                macrons marked. Since the call to Wiktionary's API takes time, you might
                see a slight delay between when you click the macronize button and when
                macronized text appears.
            </p>
            <h3>Why was this made?</h3>
            <p>Other online macronizers exist but none of them are able to show multiple
                alternate macronizations. Additionally, Wiktionary's interface can be clunky
                to navigate—all languages are shown, so if you're only interested in the
                Latin, you'll have to scroll past every other language to get to it. The
                dropdown link directly links to the Latin section of Wiktionary to circumvent
                this problem.
            </p>
        </div>
    );
}
 
export default BottomText;