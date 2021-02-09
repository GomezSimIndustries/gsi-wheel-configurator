import React from 'react';


const TextSelect = ({ setText, index, text, texts }) => {
    const entries = Object.entries(texts);
    return (
        <select value={text} onChange={(e) => {
            setText(index, e.target.value);
        }
        }>
            {entries.map(([key, txt], idx) => {
                return (
                    <option key={idx} value={key}>{txt.text}</option>
                );
            }
            )}
        </select>
    );
}

export default TextSelect;