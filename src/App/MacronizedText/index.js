import './index.css';

const MacronizedText = ({ text }) => {
    return (
        <div className="vertical">
            <p id="label2" className="label">output</p>
            <div className="macronized">
                <p id="output">{text}</p>
            </div>
        </div>
    );
}
 
export default MacronizedText;