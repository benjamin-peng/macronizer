const Textfield = ({setInput}) => {

    return (
        <div className="textfield">
            <p>Put text to be macronized below</p>
            <textarea id="input "rows="4" cols="50" spellCheck="false"
                onChange={(e) => {
                    setInput(e.target.value);
                }} required></textarea>
        </div>
    );
}
 
export default Textfield;