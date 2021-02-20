import React, { Component } from 'react';
import styled from 'styled-components';
import GSIButton from './button/button';
import GSIRotary from './rotary/rotary';
import * as html2canvas from 'html2canvas';
import { presets } from './config';

import { RotaryBase, RotaryDir } from './stickers';
import SaveControls from './save';

const $Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const $BottomControls = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const $SaveButton = styled.button`
  padding: 16px;
  background-color: #e61754;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: strong;
  font-size: 32px;
  color: white;
`;

const assetPath = process.env.PUBLIC_URL + '/assets/';
const $ButtonsContainer = styled.div`
  position: relative;
  & > img {
    -webkit-filter: drop-shadow(12px 12px 25px rgba(0,0,0,0.5));
    filter: url(#drop-shadow);
    -ms-filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=12, OffY=12, Color='#FFFFFF')";
    filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=12, OffY=12, Color='#FFFFFF')";
  }
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
      imageSaveName: 'my-gsi-image',
      configSaveName: 'my-gsi-config',
      dashVersion: "default",
      saveIsOpen: false,
      buttons: presets.default.buttons,
      rotaries: presets.default.rotaries
    };
    this.setColor = this.setColor.bind(this);
    this.setText = this.setText.bind(this);
    this.setRotaryColor = this.setRotaryColor.bind(this);
    this.setRotaryText = this.setRotaryText.bind(this);
    this.setActive = this.setActive.bind(this);
    this.saveImage = this.saveImage.bind(this);
    this.saveConfig = this.saveConfig.bind(this);
    this.uploadConfig = this.uploadConfig.bind(this);
    this.openSave = this.openSave.bind(this);
    this.onImageNameChange = this.onImageNameChange.bind(this);
    this.onConfigNameChange = this.onConfigNameChange.bind(this);
    this.copyButtonAll = this.copyButtonAll.bind(this);
    this.copyButtonRow = this.copyButtonRow.bind(this);
    this.copyRotaryAll = this.copyRotaryAll.bind(this);
    this.loadPreset = this.loadPreset.bind(this);

    this.loadPreset('default');
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
    if (files.length <= 0) {
      return false;
    }
    const scope = this;

    var fr = new FileReader();

    fr.onload = function (e) {
      var result = JSON.parse(e.target.result);
      var formatted = JSON.stringify(result, null, 2);
      const jsonConfig = JSON.parse(formatted);
      scope.setState({ buttons: jsonConfig.buttons, rotaries: jsonConfig.rotaries });
    };

    fr.readAsText(files.item(0));
  }

  openSave() {
    this.setState({ saveIsOpen: true });
  }

  onImageNameChange(val) {
    this.setState({ imageSaveName: val });
  }

  onConfigNameChange(val) {
    this.setState({ configSaveName: val });
  }

  copyButtonAll(index) {
    const newBtns = this.state.buttons.map(btn => {
      return { ...btn, stickerColor: this.state.buttons[index].stickerColor, buttonColor: this.state.buttons[index].buttonColor, textColor: this.state.buttons[index].textColor }
    });
    this.setState({ buttons: newBtns });
  }

  copyButtonRow(index) {
    let newButtons = [...this.state.buttons];
    let newIndex = 0;
    if (index > 4) {
      newIndex = index - 5;
    } else {
      newIndex = index + 5;
    }
    newButtons[newIndex].buttonColor = newButtons[index].buttonColor;
    newButtons[newIndex].stickerColor = newButtons[index].stickerColor;
    newButtons[newIndex].textColor = newButtons[index].textColor;
    this.setState({ buttons: newButtons });
  }

  copyRotaryAll(index) {
    const rotaryId = this.state.rotaries[0].id;
    let newRotaries = this.state.rotaries.map(rot => {
      if (rotaryId === rot.id) {
        return { ...rot, stickerColor: this.state.rotaries[index].stickerColor, textColor: this.state.rotaries[index].textColor }
      }
      return { ...rot, stickerColor: this.state.rotaries[index].stickerColor, rotaryColor: this.state.rotaries[index].rotaryColor, textColor: this.state.rotaries[index].textColor }
    });

    this.setState({ rotaries: newRotaries });
  }

  loadPreset(preset) {
    this.setState({ buttons: presets[preset].buttons, rotaries: presets[preset].rotaries });
  }

  render() {
    const presetKeys = Object.entries(presets);
    return (
      <$Container>
        <SaveControls
          saveConfig={this.saveConfig}
          saveImage={this.saveImage}
          imageSaveName={this.state.imageSaveName}
          configSaveName={this.state.configSaveName}
          onImageNameChange={this.onImageNameChange}
          onConfigNameChange={this.onConfigNameChange}
          uploadConfig={this.uploadConfig}
          active={this.state.saveIsOpen}
          saveConfig={this.saveConfig}
        />
        <$ConfigContainer onClick={() => this.setState({ activeButtonId: -1, saveIsOpen: false })}>
          <$ConfigLeft>
            <label>GSI Presets:</label>
            <select onChange={e => {
              if (e.target.value !== 'none') {
                this.setState({ buttons: presets[e.target.value].buttons, rotaries: presets[e.target.value].rotaries });
              }
            }}>
              {Object.keys(presets).map(key =>
                <option key={key} value={key}>
                  {presets[key].name}
                </option>
              )}
            </select>
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
                copyButtonAll={this.copyButtonAll}
                copyButtonRow={this.copyButtonRow}
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
                  copyRotaryAll={this.copyRotaryAll}
                />
              )}
            </$RotaryContainer>
          </$ButtonsContainer>
          <$ConfigRight>
          </$ConfigRight>
        </$ConfigContainer >

        <$BottomControls>
          <$SaveButton onClick={e => this.openSave()}>SAVE</$SaveButton>
        </$BottomControls>
      </$Container>
    );
  }
}

export default GSIButtonConfig;