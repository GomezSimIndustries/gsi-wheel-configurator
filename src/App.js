import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import GSIButton from './button/button';
import GSIRotary from './rotary/rotary';
import * as html2canvas from 'html2canvas';
import { presets } from './config';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { RotaryBase, RotaryDir } from './stickers';
import SaveControls from './save';

const $Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  overflow: auto;
  display: flex;
  flex-direction: row;
  /* justify-content: center;
  align-content: center; */
  padding: 10px;
  input[type=text], select {
    background-color: #181818;
    color: white;
    border: 1px solid white;
    padding: 5px;
  }

  select {
    appearance: none;
    border: none;
    background: #181818 url("data:image/svg+xml;utf8,<svg viewBox='0 0 140 140' width='24' height='24' xmlns='http://www.w3.org/2000/svg'><g><path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z' fill='white'/></g></svg>") no-repeat;
    background-position: right 5px top 50%;
    background-size: 15px 10px;
    padding-right: 30px;
  }
`;

const $ScrollContainer = styled.div`
  width: 1338px;
  height: auto;
  margin: auto;
`;

const $BottomControls = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-content: center;
  position: relative;
  z-index: 1;
  margin-top: -70px;
`;

const $SaveButton = styled.button`
  padding: 10px;
  background-color: #e61754;
  border-radius: 15px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: white;
  flex-grow: 0;
  align-self: center;
  margin: 10px;
`;

const $ButtonsContainer = styled.div`
  position: relative;
  background-color: black;
  

`;

const $AnimationContainer = styled.div`
    /* appear - on page load */
    &.wheel-appear {
      opacity: 0;
      transform: scale(0.01);
  }
  &.wheel-appear.wheel-appear-active {
    opacity: 1;
    transform: scale(1);
    transition: all 2000ms ease;
  }

  &.wheel-enter {
    opacity: 0;
    position: absolute;
    transform: scale(0.01);
  }
  &.wheel-enter.wheel-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: all 1000ms ease 1000ms;
  }
  &.wheel-exit {
    opacity: 1;
    transform: scale(1);
  }
  &.wheel-exit.wheel-exit-active {
    opacity: 0;
    transform: scale(0.01);
    transition: all 1000ms ease;
  }
  &.wheel-exit-done {
    opacity: 0;
    display: none;
  }
`;

const $ConfigContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
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
  ${p => p.isGXL && css`
    top: 191px;
  `}
  svg {
    position: absolute;
    fill: currentColor;
  }  
`;

const $GSISwitch = styled(Switch)`
  .MuiSwitch-track {
    background-color: red;
  }
`;

const $GSISelectLabel = styled(InputLabel)`
  &.MuiFormLabel-root, &.Mui-focused {
    background-color: #181818;
    color: white;
  }
`

const $GSISelect = styled(Select)`
  color: white !important;
  background-color: #181818;
  .MuiSvgIcon-root {
    color: white;
  }
  label {
    color: white;
  }
`

class GSIButtonConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wheel: 'fpe',
      lastWheel: 'fpe',
      activeButtonId: -1,
      activePreset: 'default',
      imageSaveName: 'my-gsi-fpe-wheel-image',
      configSaveName: 'my-gsi-fpe-wheel-config',
      dashVersion: "default",
      saveIsOpen: false,
      buttons: JSON.parse(JSON.stringify(presets.default.buttons)),
      rotaries: JSON.parse(JSON.stringify(presets.default.rotaries))
    };
    this.setColor = this.setColor.bind(this);
    this.setText = this.setText.bind(this);
    this.setCustomRotaryText = this.setCustomRotaryText.bind(this);
    this.clearCustomRotaryText = this.clearCustomRotaryText.bind(this);
    this.setCustomButtonText = this.setCustomButtonText.bind(this);
    this.clearCustomButtonText = this.clearCustomButtonText.bind(this);
    this.setCustomButtonIcon = this.setCustomButtonIcon.bind(this);
    this.clearCustomButtonIcon = this.clearCustomButtonIcon.bind(this);
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
    this.setSaveClosed = this.setSaveClosed.bind(this);

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activePreset !== 'custom') {
      if (prevState.buttons !== this.state.buttons || prevState.rotaries !== this.state.rotaries) {
        this.setState({
          activePreset: 'custom'
        });
      }
    }
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

  setCustomRotaryText(index, text) {
    let newRotaries = [...this.state.rotaries];
    newRotaries[index].text = 'custom';
    newRotaries[index].customText = text;
    this.setState({
      rotaries: newRotaries
    });
  }

  clearCustomRotaryText(index) {
    let newRotaries = [...this.state.rotaries];
    newRotaries[index].text = 'custom';
    newRotaries[index].customText = null;
    this.setState({
      rotaries: newRotaries
    });
  }

  setCustomButtonText(index, text) {
    let newButtons = [...this.state.buttons];
    newButtons[index].text = 'custom';
    newButtons[index].customText = text;
    this.setState({
      buttons: newButtons
    });
  }

  clearCustomButtonText(index) {
    let newButtons = [...this.state.buttons];
    newButtons[index].text = 'custom';
    newButtons[index].customText = null;
    this.setState({
      buttons: newButtons
    });
  }

  setCustomButtonIcon(index, icon) {
    let newButtons = [...this.state.buttons];
    newButtons[index].customIcon = icon;
    this.setState({
      buttons: newButtons
    });
  }

  clearCustomButtonIcon(index) {
    let newButtons = [...this.state.buttons];
    newButtons[index].customIcon = null;
    this.setState({
      buttons: newButtons
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
      canvas.style.backgroundColor = 'black';


      document.body.appendChild(canvas).id = 'gsiPicSave';
      const picDiv = document.getElementById('gsiPicSave');
      picDiv.style.display = "none";
      var a = document.createElement('a');
      a.href = canvas.toDataURL("image/jpg", 0.2).replace("image/jpg", "image/octet-stream");
      a.download = `${this.state.imageSaveName}.jpg`;
      a.click();
      document.body.removeChild(document.getElementById('gsiPicSave'));
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
    this.setState({ buttons: JSON.parse(JSON.stringify(presets[preset].buttons)), rotaries: JSON.parse(JSON.stringify(presets[preset].rotaries)) });
  }

  setSaveClosed() {
    this.setState({ saveIsOpen: false });
  }

  render() {
    const presetKeys = Object.entries(presets);
    return (
      <$Container>
        <$ScrollContainer>
          <$ConfigContainer onClick={() => this.setState({ activeButtonId: -1, saveIsOpen: false })}>
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
              wheel={this.state.wheel}
              setSaveClosed={this.setSaveClosed}
            />
            <$ConfigLeft>
            </$ConfigLeft>
            <TransitionGroup>
              <CSSTransition
                // in={this.state.wheel !== this.state.lastWheel}
                key={this.state.wheel}
                appear={true}
                timeout={2000}
                classNames="wheel"
              >
                <$AnimationContainer id="gsiConfig" style={{ padding: '30px', backgroundColor: 'black' }}>
                  <$ButtonsContainer>
                    <img src={`./images/${this.state.wheel}-trans-buttons-base.png`} alt='button base' />

                    {this.state.buttons.map((btn, idx) =>
                      <GSIButton
                        key={`btn-${idx}-${btn.row}-${btn.side}`}
                        index={idx}
                        id={btn.id}
                        stickerColor={btn.stickerColor}
                        buttonColor={btn.buttonColor}
                        textColor={btn.textColor}
                        customText={btn.customText || ''}
                        customIcon={btn.customIcon || ''}
                        text={btn.text}
                        row={btn.row}
                        side={btn.side}
                        setColor={this.setColor}
                        setText={this.setText}
                        setCustomText={this.setCustomButtonText}
                        setCustomIcon={this.setCustomButtonIcon}
                        clearCustomText={this.clearCustomButtonText}
                        clearCustomIcon={this.clearCustomButtonIcon}
                        active={this.state.activeButtonId === btn.id}
                        setActive={this.setActive}
                        copyButtonAll={this.copyButtonAll}
                        copyButtonRow={this.copyButtonRow}
                      />
                    )}
                    <$RotaryContainer isGXL={this.state.wheel === 'gxl'}>
                      <RotaryBase height="194px" width="303px" style={{ color: "black" }} />
                      <div style={{ position: 'absolute', left: "95px", top: "7px" }}>
                        <RotaryDir width="115px" height="85px" style={{ color: this.state.rotaries[2].textColor, fill: 'white !important' }} />
                      </div>
                      {this.state.rotaries.map((rot, idx) =>
                        <GSIRotary
                          key={`rotary-${idx}`}
                          index={idx}
                          id={rot.id}
                          stickerColor={rot.stickerColor}
                          text={rot.text}
                          customText={rot.customText || ''}
                          textColor={rot.textColor}
                          rotaryColor={rot.rotaryColor}
                          active={this.state.activeButtonId === rot.id}
                          setColor={this.setRotaryColor}
                          setText={this.setRotaryText}
                          setCustomText={this.setCustomRotaryText}
                          clearCustomText={this.clearCustomRotaryText}
                          setActive={this.setActive}
                          copyRotaryAll={this.copyRotaryAll}
                        />
                      )}
                    </$RotaryContainer>
                  </$ButtonsContainer>
                </$AnimationContainer>
              </CSSTransition>
            </TransitionGroup>
            <$ConfigRight>
            </$ConfigRight>
          </$ConfigContainer >

          <$BottomControls>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
              <div style={{ margin: '10px' }}>
                <label onClick={() => this.setState({ lastWheel: this.state.wheel, wheel: 'fpe' })}>FPE</label>
                <$GSISwitch
                  checked={this.state.wheel === 'gxl'}
                  onChange={e => {
                    console.log('asdf');
                    const wheelValue = e.target.checked ? 'gxl' : 'fpe';
                    this.setState({
                      lastWheel: this.state.wheel,
                      wheel: wheelValue,
                      imageSaveName: 'my-gsi-' + wheelValue + '-wheel-image',
                      configSaveName: 'my-gsi-' + wheelValue + '-wheel-config',
                    })
                  }}
                  name="gilad" />
                <label onClick={() => this.setState({ lastWheel: this.state.wheel, wheel: 'gxl' })}>GXL</label>
              </div>
              <div style={{ margin: '10px' }}>
                <select
                  style={{ marginLeft: '5px' }}
                  value={this.state.activePreset}
                  onChange={e => {
                    this.setState({
                      activePreset: e.target.value
                    });
                    this.loadPreset(e.target.value)
                  }}>
                  {Object.keys(presets).map((key, idx) =>
                    <option key={key} value={key}>
                      {`${presets[key].name}${idx === 0 ? ' Preset' : ''}`}
                    </option>
                  )}
                  <option value={'custom'}>
                    {'Custom'}
                  </option>
                </select>
              </div>
              <$SaveButton onClick={e => this.openSave()}>SAVE / LOAD</$SaveButton>
            </div>
          </$BottomControls>
        </$ScrollContainer>
      </$Container>
    );
  }
}

export default GSIButtonConfig;