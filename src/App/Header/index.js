import './index.css';

const Header = () => {
    return (  
        <div className="header">
            <h1 id="title">Macronizer</h1>
            <p id="subtext">Put Latin text to be macronized below.</p>
            <p className="smalltext">All punctuation will be stripped.</p>
        </div>
    );
}
 
export default Header;