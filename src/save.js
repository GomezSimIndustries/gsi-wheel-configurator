import React, { Component } from 'react';
import styled from 'styled-components';

import { $CloseButton } from './button/button-editor';
import 'react-responsive-combo-box/dist/index.css'

const $SaveContainer = styled.div`
    position: absolute;
    display: ${props => props.active ? 'block' : 'none'};
    background-color: #050505;
    padding: 16px;
    z-index: 10;
    min-width: 500px;
    min-height: 100px;
    left: 50%;
    bottom: 50%;
    transform: translateX(-50%) translateY(-50%);
    -webkit-box-shadow: 2px 2px 5px 2px #000000;
    box-shadow: 2px 2px 5px 2px #000000;

    input {
        margin: 10px;
    }
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
            wheel,
            setSaveClosed
        } = this.props;
        return (
            <$SaveContainer active={active} onClick={(e) => e.stopPropagation()}>
                <h3>Save your GSI {wheel.toUpperCase()} wheel design!</h3>
                <div>
                    <label htmlFor="imageSaveName">{"Image Name:"}</label>
                    <input id="imageSaveName" type="text" name="imageSaveName" onChange={e => {
                        onImageNameChange(e.target.value);
                    }} value={imageSaveName} />
                    <button onClick={() => saveImage()}>Save Image</button>
                </div>
                <div>
                    <label htmlFor="configSaveName">{"Config Name:"}</label>
                    <input id="configSaveName" type="text" name="imageSaveName" onChange={e => {
                        onConfigNameChange(e.target.value);
                    }} value={configSaveName} />
                    <button onClick={() => saveConfig()}>Save Config</button>
                </div>
                <div>
                    <label htmlFor="uploadConfig">Upload Config:</label>
                    <input
                        type="file"
                        id="uploadConfig"
                        name="config"
                        accept="application/json"
                        onChange={e => uploadConfig()} />
                </div>
                <$CloseButton onClick={e => setSaveClosed()}>x</$CloseButton>
            </$SaveContainer>
        );
    }
}

export default SaveControls;
