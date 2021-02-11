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
    this.saveState = this.saveState.bind(this);
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

  saveState() {
    html2canvas(document.querySelector("#gsiConfig")).then(canvas => {
      document.body.appendChild(canvas)
    });
    const json = {
      buttons: this.state.buttons,
      rotaries: this.state.rotaries
    }
  }
  render() {
    const presetKeys = Object.entries(presets);
    return (
      <$ConfigContainer onClick={() => this.setState({ activeButtonId: -1 })}>
        <$ConfigLeft>
          <button onClick={() => this.saveState()}>Save</button>
          <select onChange={e => {
            console.log(e.target.value, presets);
            if(e.target.value !== 'none') {
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