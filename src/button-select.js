import React from 'react';

const ButtonSelect = ({setButtonColor, number, color}) => {

    return (
        <select value={color} onChange={(e) =>
            {
                setButtonColor(number, e.target.value);
            }
        }>
            <option value="black">{"Black"}</option>
            <option value="red">{"Red"}</option>
            <option value="green">{"Green"}</option>
            <option value="blue">{"Blue"}</option>
            <option value="yellow">{"Yellow"}</option>
            <option value="white">{"White"}</option>
        </select>
    );
}

export default ButtonSelect;
