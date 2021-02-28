import React, { Component } from 'react';
import styled from 'styled-components';
import * as html2canvas from 'html2canvas';
import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
} from "react-share";

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
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    -webkit-box-shadow: 2px 2px 5px 2px #000000;
    box-shadow: 2px 2px 5px 2px #000000;
    text-align: center;

    input {
        margin: 10px;
    }
`;

const $ImagePreview = styled.div`
    position: relative;
    width: auto;
    height: 150px;
`;

class SaveControls extends Component {

    componentDidUpdate() {

        html2canvas(document.querySelector("#gsiConfig")).then(canvas => {

            const imagePrev = document.getElementById('imagePreview');
            var image = new Image();
            image.id = "pic";
            image.style.height = '100%';

            image.src = canvas.toDataURL();
            imagePrev.innerHTML = image.outerHTML;
        });
    }

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
            <div style={{
                position: 'fixed',
                width: '100%',
                height: '100%',
                display: active ? 'block' : 'none',
                zIndex: 2
            }}>
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'black',
                    opacity: '.75',
                    display: active ? 'block' : 'none',
                    zIndex: '9'
                }}></div>
                <$SaveContainer active={active} onClick={(e) => e.stopPropagation()}>
                    <p>{'Please save & send both files with your order number to '}<br /><a href="mailto:info@gomezsimindusteries.com">{'info@gomezsimindusteries.com'}</a> for proofing and approval</p>
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
                    <$ImagePreview id="imagePreview">
                    </$ImagePreview>
                    <p>{'Right click and select "Copy Image" to easily share to social media!'}</p>
                    <div>
                        <TwitterShareButton
                            title={`Check out my custom @gomezsimracing GSI ${wheel.toUpperCase()} wheel! Go customizer your own!`}
                            hashtags={['MyGSI', 'SimRacing']}
                            related={['gomezsimracing']}
                            url={'https://gomezsimindustries.github.io/gsi-wheel-configurator/'}>
                            <TwitterIcon size={32} round />
                        </TwitterShareButton>
                        <FacebookShareButton
                            quote={'Check out my custom @gomezsimracing GSI wheel! Go customizer your own! \nhttps://gomezsimindustries.github.io/gsi-wheel-configurator/'}
                            hashtag={'MyGSI'}
                            url={'https://gomezsimindustries.github.io/gsi-wheel-configurator/'}>
                            <FacebookIcon size={32} round />
                        </FacebookShareButton>
                    </div>
                </$SaveContainer>
            </div>
        );
    }
}

export default SaveControls;
