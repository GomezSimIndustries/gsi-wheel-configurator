import React from 'react';

const ColorSelect = ({ setColor, number, color, colors }) => {

    return (
        <select value={color} onChange={(e) => {
            setColor(number, e.target.value);
        }
        }>
            {colors.map((color, idx) => {
                const colorText = color.charAt(0).toUpperCase() + color.slice(1);
                return (
                    <option key={idx} value={color}>{colorText}</option>
                );
            }
            )}

        </select>
    );
}

export default ColorSelect;
