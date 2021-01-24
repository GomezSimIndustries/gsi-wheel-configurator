import React from 'react';

const TextSelect = ({setText, number, text}) => {

    return (
        <select value={text} onChange={(e) =>
            {
                setText(number, e.target.value);
            }
        }>
            <option value="flash">{"FLASH"}</option>
            <option value="pitLimit">{"PIT LIMIT"}</option>
            <option value="enable">{"ENABLE"}</option>
            <option value="radio">{"RADIO"}</option>
            <option value="mute">{"MUTE"}</option>
            <option value="volPlus">{"VOL+"}</option>
            <option value="volMinus">{"VOL-"}</option>
            <option value="prev">{"PREV"}</option>
            <option value="next">{"NEXT"}</option>
            <option value="reset">{"RESET"}</option>
        </select>
    );
}

export default TextSelect;