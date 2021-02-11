import React, { Component } from 'react';
import styled from 'styled-components';

import ComboBox from 'react-responsive-combo-box'
import 'react-responsive-combo-box/dist/index.css'

const $SaveContainer = styled.div`
    position: absolute;
    display: ${props => props.active ? 'block' : 'none'};
    background-color: black;
    border: 2px solid white;
    border-radius: 6px;
    padding: 16px;
    z-index: 10;
    min-width: 500px;
    min-height: 500px;
`;

class SaveControls extends Component {

    render() {
        const {
            saveConfig,
            saveImage,
            imageSaveName,
            configSaveName,
            onImageNameChange,
            onConfigNameChange,
            uploadConfig,
            active,
        } = this.props;
        const data = [
            'America',
            'India',
            'Australia',
            'Argentina',
            'Ireland',
            'Indonesia',
            'Iceland',
            'Japan'
        ];
        return (
            <$SaveContainer active={active} onClick={(e) => e.stopPropagation()}>
                <hr />
                <label htmlFor="imageSaveName">{"Image Name:"}</label>
                <input id="imageSaveName" type="text" name="imageSaveName" onChange={e => {
                    onImageNameChange(e.target.value);
                }} value={imageSaveName} />
                <button onClick={() => saveImage()}>Save Image</button>
                <hr />
                <label htmlFor="configSaveName">{"Config Name:"}</label>
                <input id="configSaveName" type="text" name="imageSaveName" onChange={e => {
                    onConfigNameChange(e.target.value);
                }} value={configSaveName} />
                <button onClick={() => saveConfig()}>Save Config</button>
                <hr />
                <label htmlFor="uploadConfig">Upload Config:</label>
                <input
                    type="file"
                    id="uploadConfig"
                    name="config"
                    accept="application/json"
                    onChange={e => uploadConfig()} />
                <hr />
                <ComboBox options={data} enableAutocomplete />
            </$SaveContainer>
        );
    }
}

export default SaveControls;
