import React, { Component } from 'react';
import styled from 'styled-components';
import GSIButton from './button/button';
import GSIRotary from './rotary/rotary';
import * as html2canvas from 'html2canvas';
import { presets } from './config';
import canvg from 'canvg';


import { RotaryBase, RotaryDir } from './stickers';

const assetPath = process.env.PUBLIC_URL + '/assets/';
const $ButtonsContainer = styled.div`
  position: relative;
`;
const $ConfigContainer = styled.div`
  position: relative;
  display: flex;
`;

const $ButtonRow = styled.div`
  height: auto;
  width: 200px;
  border-bottom: 2px solid pink;

  &:last-child {
    border-bottom: none;
  }
`;
const $ConfigLeft = styled.div`
  width: 200px;
`;


const $ConfigRight = styled.div`
  width: 200px;
`;

const $LeftButtons = styled.div`

`;
const $RightButtons = styled.div`

`;


const $ButtonSelectGroup = styled.div`

`;

const $RotaryContainer = styled.div`
  position: absolute;
  left: 315px;
  top: 251px;
  svg {
    position: absolute;
    fill: currentColor;
  }
`;

class GSIButtonConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButtonId: -1,
      activePreset: 'default',
      imageSaveName: 'my-gsi-config',
      configSaveName: 'my-gsi-config',
      dashVersion: "default",
      buttons: [
        {
          id: 0,
          stickerColor: "red",
          buttonColor: "black",
          textColor: "white",
          text: "flash",
          row: 1,
          side: "left"
        },
        {
          id: 1,
          stickerColor: "red",
          buttonColor: "black",
          textColor: "white",
          text: "enable",
          row: 2,
          side: "left"
        },
        {
          id: 2,
          stickerColor: "red",
          buttonColor: "black",
          textColor: "white",
          text: "mute",
          row: 3,
          side: "left"
        },
        {
          id: 3,
          stickerColor: "red",
          buttonColor: "black",
          textColor: "white",
          text: "volPlus",
          row: 4,
          side: "left"
        },
        {
          id: 4,
          stickerColor: "red",
          buttonColor: "black",
          textColor: "white",
          text: "prev",
          row: 5,
          side: "left"
        },
        {
          id: 5,
          stickerColor: "red",
          buttonColor: "black",
          textColor: "white",
          text: "pitLimit",
          row: 1,
          side: "right"
        },
        {
          id: 6,
          stickerColor: "red",
          buttonColor: "black",
          textColor: "white",
          text: "radio",
          row: 2,
          side: "right"
        },
        {
          id: 7,
          stickerColor: "red",
          buttonColor: "black",
          textColor: "white",
          text: "reset",
          row: 3,
          side: "right"
        },
        {
          id: 8,
          stickerColor: "red",
          buttonColor: "black",
          textColor: "white",
          text: "volPlus",
          row: 4,
          side: "right"
        },
        {
          id: 9,
          stickerColor: "red",
          buttonColor: "black",
          textColor: "white",
          text: "next",
          row: 5,
          side: "right"
        },
      ],
      rotaries: [
        {
          id: 10,
          stickerColor: "red",
          rotaryColor: "black",
          textColor: "white",
          text: "multi",
        },
        {
          id: 11,
          stickerColor: "red",
          rotaryColor: "black",
          textColor: "white",
          text: "bias",
        },
        {
          id: 12,
          stickerColor: "red",
          rotaryColor: "black",
          textColor: "white",
          text: "scroll",
        },
        {
          id: 13,
          stickerColor: "red",
          rotaryColor: "black",
          textColor: "white",
          text: "scroll",
        },
        {
          id: 14,
          stickerColor: "red",
          rotaryColor: "black",
          textColor: "white",
          text: "option",
        },
        {
          id: 15,
          stickerColor: "red",
          rotaryColor: "black",
          textColor: "white",
          text: "menu",
        },
      ]
    };
    this.setColor = this.setColor.bind(this);
    this.setText = this.setText.bind(this);
    this.setRotaryColor = this.setRotaryColor.bind(this);
    this.setRotaryText = this.setRotaryText.bind(this);
    this.setActive = this.setActive.bind(this);
    this.saveImage = this.saveImage.bind(this);
    this.saveConfig = this.saveConfig.bind(this);
    this.uploadConfig = this.uploadConfig.bind(this);
  }

  setColor(type, index, color) {
    let newButtons = [...this.state.buttons];
    newButtons[index][type] = color;
    this.setState({
      buttons: newButtons
    });
  }

  setStickerColor(index, color) {
    let newButtons = [...this.state.buttons];
    newButtons[index].stickerColor = color;
    this.setState({
      buttons: newButtons
    });
  }

  setText(index, text) {
    let newButtons = [...this.state.buttons];
    newButtons[index].text = text;
    this.setState({
      buttons: newButtons
    });
  }

  setRotaryText(index, text) {
    let newRotaries = [...this.state.rotaries];
    newRotaries[index].text = text;
    this.setState({
      rotaries: newRotaries
    });
  }

  setRotaryColor(type, index, color) {
    let newRotaries = [...this.state.rotaries];
    newRotaries[index][type] = color;
    this.setState({ rotaries: newRotaries });
  }

  setActive(id) {
    this.setState({ activeButtonId: id });
  }

  saveImage() {
    html2canvas(document.querySelector("#gsiConfig")).then(canvas => {
      document.body.appendChild(canvas).id = 'gsiPicSave';
      const picDiv = document.getElementById('gsiPicSave');
      picDiv.style.display = "none";
      picDiv.style.background = "none";
      var a = document.createElement('a');
      a.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      a.download = `${this.state.imageSaveName}.png`;
      a.click();
    });
  }

  saveConfig() {
    const json = JSON.stringify({
      buttons: this.state.buttons,
      rotaries: this.state.rotaries
    });
    var a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(json));
    a.setAttribute('download', `${this.state.configSaveName}.json`);
    a.click();
  }

  uploadConfig() {
    var files = document.getElementById('uploadConfig').files;
    console.log(files);
    if (files.length <= 0) {
      return false;
    }
    const scope = this;

    var fr = new FileReader();

    fr.onload = function (e) {
      console.log(e);
      var result = JSON.parse(e.target.result);
      var formatted = JSON.stringify(result, null, 2);
      const jsonConfig = JSON.parse(formatted);
      console.log(jsonConfig);
      // document.getElementById('result').value = formatted;
      scope.setState({ buttons: jsonConfig.buttons, rotaries: jsonConfig.rotaries });
    };

    fr.readAsText(files.item(0));
  }

  render() {
    const presetKeys = Object.entries(presets);
    return (
      <$ConfigContainer onClick={() => this.setState({ activeButtonId: -1 })}>
        <$ConfigLeft>
          <label>GSI Presets:</label>
          <select onChange={e => {
            console.log(e.target.value, presets);
            if (e.target.value !== 'none') {
              this.setState({ buttons: presets[e.target.value].buttons, rotaries: presets[e.target.value].rotaries });
            }
          }}>
            <option value={'none'}>{'None'}</option>
            {Object.keys(presets).map(key =>
              <option key={key} value={key}>
                {presets[key].name}
              </option>
            )}
          </select>
          <hr />
          <label htmlFor="imageSaveName">{"Image Name:"}</label>
          <input id="imageSaveName" type="text" name="imageSaveName" onChange={e => {
            this.setState({ imageSaveName: e.target.value });
          }} value={this.state.imageSaveName} />
          <button onClick={() => this.saveImage()}>Save Image</button>
          <hr />
          <label htmlFor="configSaveName">{"Config Name:"}</label>
          <input id="configSaveName" type="text" name="imageSaveName" onChange={e => {
            this.setState({ configSaveName: e.target.value });
          }} value={this.state.configSaveName} />
          <button onClick={() => this.saveConfig()}>Save Config</button>
          <hr />
          <label htmlFor="uploadConfig">Upload Config:</label>
          <input
            type="file"
            id="uploadConfig"
            name="config"
            accept="application/json"
            onChange={e => this.uploadConfig()}></input>
          {/* <button onClick={() => this.uploadConfig()}>Upload Config</button> */}
        </$ConfigLeft>

        <$ButtonsContainer id="gsiConfig">
          <img src={'./images/fpe-trans-buttons-base.png'} alt='button base' />
          {this.state.buttons.map((btn, idx) =>
            <GSIButton
              key={`btn-${idx}-${btn.row}-${btn.side}`}
              index={idx}
              id={btn.id}
              stickerColor={btn.stickerColor}
              buttonColor={btn.buttonColor}
              textColor={btn.textColor}
              text={btn.text}
              row={btn.row}
              side={btn.side}
              setColor={this.setColor}
              setText={this.setText}
              active={this.state.activeButtonId === btn.id}
              setActive={this.setActive}
            />
          )}
          <$RotaryContainer>
            <RotaryBase height="194px" width="303px" style={{ color: "black" }} />
            <RotaryDir width="114px" height="69px" style={{ left: "95px", top: "21px", color: "white" }} />
            {this.state.rotaries.map((rot, idx) =>
              <GSIRotary
                key={`rotary-${idx}`}
                index={idx}
                id={rot.id}
                stickerColor={rot.stickerColor}
                text={rot.text}
                textColor={rot.textColor}
                rotaryColor={rot.rotaryColor}
                active={this.state.activeButtonId === rot.id}
                setColor={this.setRotaryColor}
                setText={this.setRotaryText}
                setActive={this.setActive}
              />
            )}
          </$RotaryContainer>
        </$ButtonsContainer>
        <$ConfigRight>
        </$ConfigRight>
      </$ConfigContainer >
    );
  }
}

export default GSIButtonConfig;