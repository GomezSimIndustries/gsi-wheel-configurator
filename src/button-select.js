import React from 'react';



const ButtonSelect = ({setButtonColor, number, color, value}) => {

    return (
        <select value={color} onChange={(e) =>
            {
                setButtonColor(number, e.target.value);
            }
        }>
            <option value="Red">{"Red"}</option>
            <option value="Green">{"Green"}</option>
            <option value="Blue">{"Blue"}</option>
            <option value="Black">{"Black"}</option>
            <option value="Yellow">{"Yellow"}</option>
        </select>
    );
}

export default ButtonSelect;
