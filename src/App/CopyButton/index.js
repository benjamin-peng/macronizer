const CopyButton = ({ copy }) => {
    const test = () => {
        navigator.clipboard.writeText('ballsinmouth');
    }
    return (
         <div className="copy-button" onClick={copy}>
        </div>
    );
}
 
export default CopyButton;