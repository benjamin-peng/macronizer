import './index.css';

const Textfield = ({setInput}) => {

    return (
        <div className="vertical">
            <p id="label1" className="label">input</p>
            <div className="textfield">
                <textarea id="input" spellCheck="false"
                onChange={(e) => {
                    const nopunct = e.target.value
                    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
                    .replace(/\s{2,}/g," ");                    ;
                    setInput(nopunct);
                }} required></textarea>
            </div>
        </div>
    );
}
 
export default Textfield;