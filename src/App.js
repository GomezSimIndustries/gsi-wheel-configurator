import React, { Component } from 'react';
import styled from 'styled-components';
import GSIButton from '../src/button';
import GSIRotary from '../src/rotary';
import ColorSelect from './color-select';
import TextSelect from '../src/text-select';

import { RotaryBase, RotaryDir, RotaryLeft, RotaryRight, RotaryCenter, Funky } from './stickers';
import { buttonColors, funkyColors, rotaryColors, rotaryStickerColors } from './config';

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
      buttonColors: [
        "black",
        "black",
        "black",
        "black",
        "black",
      ],
      stickerColors: [
        "red",
        "red",
        "red",
        "red",
        "red",
      ],
      textColors: [
        "white",
        "white",
        "white",
        "white",
        "white",
      ],
      text: [
        "flash",
        "enable",
        "mute",
        "volMinus",
        "prev",
        "pitLimit",
        "radio",
        "reset",
        "volPlus",
        "next",
      ],
      rotaryColors: [
        "black",
        "black",
        "black",
        "black",
        "black",
        "black",
      ],
      rotaryStickerColors: [
        "red",
        "red",
        "orange",
        "green",
        "yellow",
        "blue",
      ],
      monochrome: false,
    };
    this.setColor = this.setColor.bind(this);
    this.setStickerColor = this.setStickerColor.bind(this);
    this.setTextColor = this.setTextColor.bind(this);
    this.setText = this.setText.bind(this);
    this.setRotaryColor = this.setRotaryColor.bind(this);
    this.setRotaryStickerColor = this.setRotaryStickerColor.bind(this);
  }

  setColor(number, color) {
    if (number === 0) {
      this.setState({ buttonColors: [color, color, color, color, color] });
      return;
    }
    let colors = [...this.state.buttonColors];
    colors[number - 1] = color;
    this.setState({ buttonColors: colors });
  }

  setRotaryStickerColor(number, color) {
    let colors = [...this.state.rotaryStickerColors];
    colors[number] = color;
    this.setState({ rotaryStickerColors: colors });
  }

  setStickerColor(number, color) {
    if (number === 0) {
      this.setState({ stickerColors: [color, color, color, color, color] });
      return;
    }
    let colors = [...this.state.stickerColors];
    colors[number - 1] = color;
    this.setState({ stickerColors: colors });
  }

  setTextColor(number, color) {
    if (number === 0) {
      this.setState({ textColors: [color, color, color, color, color] });
      return;
    }
    let colors = [...this.state.textColors];
    colors[number - 1] = color;
    this.setState({ textColors: colors });
  }

  setText(number, text) {
    if (number === 0) {
      this.setState({ text: [text, text, text, text, text, text, text, text, text, text] });
      return;
    }
    let texts = [...this.state.text];
    texts[number - 1] = text;
    this.setState({ text: texts });
  }

  setRotaryColor(number, color) {
    let colors = [...this.state.rotaryColors];
    colors[number] = color;
    this.setState({ rotaryColors: colors });
  }

  render() {
    return (
      <$ConfigContainer>
        <$ConfigLeft>
          <$ButtonRow>
            {'Row 1: '}
            <$ButtonSelectGroup>
              {'Button Color: '}
              <ColorSelect setColor={this.setColor} number={1} color={this.state.buttonColors[0]} colors={buttonColors} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Sticker Color: '}
              <ColorSelect setColor={this.setStickerColor} value={this.state.stickerColors[0]} number={1} color={this.state.stickerColors[0]} colors={buttonColors} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Text Color: '}
              <ColorSelect setColor={this.setTextColor} value={this.state.textColors[0]} number={1} color={this.state.textColors[0]} colors={buttonColors} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Left Function: '}
              <TextSelect setText={this.setText} value={this.state.text[0]} number={1} text={this.state.text[0]} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Right Function: '}
              <TextSelect setText={this.setText} value={this.state.text[5]} number={6} text={this.state.text[5]} />
            </$ButtonSelectGroup>
          </$ButtonRow>
          <$ButtonRow>
            {'Row 2: '}
            <$ButtonSelectGroup>
              {'Button Color: '}
              <ColorSelect setColor={this.setColor} number={2} color={this.state.buttonColors[1]} colors={buttonColors} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Sticker Color: '}
              <ColorSelect setColor={this.setStickerColor} value={this.state.stickerColors[1]} number={2} color={this.state.stickerColors[1]} colors={buttonColors} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Text Color: '}
              <ColorSelect setColor={this.setTextColor} value={this.state.textColors[1]} number={2} color={this.state.textColors[1]} colors={buttonColors} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Left Function: '}
              <TextSelect setText={this.setText} value={this.state.text[1]} number={2} text={this.state.text[1]} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Right Function: '}
              <TextSelect setText={this.setText} value={this.state.text[6]} number={7} text={this.state.text[6]} />
            </$ButtonSelectGroup>
          </$ButtonRow>
          <$ButtonRow>
            {'Row 3: '}
            <$ButtonSelectGroup>
              {'Button Color: '}
              <ColorSelect setColor={this.setColor} number={3} color={this.state.buttonColors[2]} colors={buttonColors} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Sticker Color: '}
              <ColorSelect setColor={this.setStickerColor} value={this.state.stickerColors[2]} number={3} color={this.state.stickerColors[2]} colors={buttonColors} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Text Color: '}
              <ColorSelect setColor={this.setTextColor} value={this.state.textColors[2]} number={3} color={this.state.textColors[2]} colors={buttonColors} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Left Function: '}
              <TextSelect setText={this.setText} value={this.state.text[2]} number={3} text={this.state.text[2]} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Right Function: '}
              <TextSelect setText={this.setText} value={this.state.text[7]} number={8} text={this.state.text[7]} />
            </$ButtonSelectGroup>
          </$ButtonRow>
          <$ButtonRow>
            {'Row 4: '}
            <$ButtonSelectGroup>
              {'Button Color: '}
              <ColorSelect setColor={this.setColor} number={4} color={this.state.buttonColors[3]} colors={buttonColors} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Sticker Color: '}
              <ColorSelect setColor={this.setStickerColor} value={this.state.stickerColors[3]} number={4} color={this.state.stickerColors[3]} colors={buttonColors} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Text Color: '}
              <ColorSelect setColor={this.setTextColor} value={this.state.textColors[3]} number={4} color={this.state.textColors[3]} colors={buttonColors} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Left Function: '}
              <TextSelect setText={this.setText} value={this.state.text[3]} number={4} text={this.state.text[3]} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Right Function: '}
              <TextSelect setText={this.setText} value={this.state.text[8]} number={9} text={this.state.text[8]} />
            </$ButtonSelectGroup>
          </$ButtonRow>
          <$ButtonRow>
            {'Row 5: '}
            <$ButtonSelectGroup>
              {'Button Color: '}
              <ColorSelect setColor={this.setColor} number={5} color={this.state.buttonColors[4]} colors={buttonColors} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Sticker Color: '}
              <ColorSelect setColor={this.setStickerColor} value={this.state.stickerColors[4]} number={5} color={this.state.stickerColors[4]} colors={buttonColors} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Text Color: '}
              <ColorSelect setColor={this.setTextColor} value={this.state.textColors[4]} number={5} color={this.state.textColors[4]} colors={buttonColors} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Left Function: '}
              <TextSelect setText={this.setText} value={this.state.text[4]} number={5} text={this.state.text[4]} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Right Function: '}
              <TextSelect setText={this.setText} value={this.state.text[9]} number={10} text={this.state.text[9]} />
            </$ButtonSelectGroup>
          </$ButtonRow>
        </$ConfigLeft>

        <$ButtonsContainer>
          <img src='./images/fpe-trans-buttons-base.png' alt='button base' />
          <$LeftButtons>
            <GSIButton
              stickerColor={this.state.stickerColors[0]}
              buttonColor={this.state.buttonColors[0]}
              textColor={this.state.textColors[0]}
              text={this.state.text[0]}
              row={1}
              side={"left"} />
            <GSIButton
              stickerColor={this.state.stickerColors[1]}
              buttonColor={this.state.buttonColors[1]}
              textColor={this.state.textColors[1]}
              text={this.state.text[1]}
              row={2}
              side={"left"} />
            <GSIButton
              stickerColor={this.state.stickerColors[2]}
              buttonColor={this.state.buttonColors[2]}
              textColor={this.state.textColors[2]}
              text={this.state.text[2]}
              row={3}
              side={"left"} />
            <GSIButton
              stickerColor={this.state.stickerColors[3]}
              buttonColor={this.state.buttonColors[3]}
              textColor={this.state.textColors[3]}
              text={this.state.text[3]}
              row={4}
              side={"left"} />
            <GSIButton
              stickerColor={this.state.stickerColors[4]}
              buttonColor={this.state.buttonColors[4]}
              textColor={this.state.textColors[4]}
              text={this.state.text[4]}
              row={5}
              side={"left"} />
          </$LeftButtons>
          <$RightButtons>
            <GSIButton
              stickerColor={this.state.stickerColors[0]}
              buttonColor={this.state.buttonColors[0]}
              textColor={this.state.textColors[0]}
              text={this.state.text[5]}
              row={1}
              side={"right"} />
            <GSIButton
              stickerColor={this.state.stickerColors[1]}
              buttonColor={this.state.buttonColors[1]}
              textColor={this.state.textColors[1]}
              text={this.state.text[6]}
              row={2}
              side={"right"} />
            <GSIButton
              stickerColor={this.state.stickerColors[2]}
              buttonColor={this.state.buttonColors[2]}
              textColor={this.state.textColors[2]}
              text={this.state.text[7]}
              row={3}
              side={"right"} />
            <GSIButton
              stickerColor={this.state.stickerColors[3]}
              buttonColor={this.state.buttonColors[3]}
              textColor={this.state.textColors[3]}
              text={this.state.text[8]}
              row={4}
              side={"right"} />
            <GSIButton
              stickerColor={this.state.stickerColors[4]}
              buttonColor={this.state.buttonColors[4]}
              textColor={this.state.textColors[4]}
              text={this.state.text[9]}
              row={5}
              side={"right"} />
          </$RightButtons>
          <$RotaryContainer>
            <RotaryBase height="194px" width="303px" style={{ color: "black" }} />
            <RotaryDir width="114px" height="69px" style={{ left: "95px", top: "21px", color: "white" }} />
            <RotaryRight width="114px" height="88px" style={{ left: "5px", top: "5px", color: this.state.rotaryStickerColors[1] }} />
            <RotaryCenter width="88px" height="88px" style={{ left: "108px", top: "25px", color: this.state.rotaryStickerColors[2] }} />
            <RotaryLeft width="114px" height="88px" style={{ left: "185px", top: "5px", color: this.state.rotaryStickerColors[3] }} />
            <RotaryLeft width="114px" height="88px" style={{ left: "8px", top: "101px", color: this.state.rotaryStickerColors[4] }} />
            <RotaryRight width="114px" height="88px" style={{ left: "181px", top: "101px", color: this.state.rotaryStickerColors[5] }} />
            <Funky width="44px" height="72px" style={{ left: "129px", top: "115px", color: this.state.rotaryStickerColors[0] }} />
            <GSIRotary rotaryNum={1} color={this.state.rotaryColors[1]} text={"BIAS"} />
            <GSIRotary rotaryNum={2} color={this.state.rotaryColors[2]} text={"BIAS"} />
            <GSIRotary rotaryNum={3} color={this.state.rotaryColors[3]} text={"BIAS"} />
            <GSIRotary rotaryNum={4} color={this.state.rotaryColors[4]} text={"BIAS"} />
            <GSIRotary rotaryNum={5} color={this.state.rotaryColors[5]} text={"BIAS"} />
            <GSIRotary rotaryNum={0} color={this.state.rotaryColors[0]} text={"MULTI"} isRotary={true} />
          </$RotaryContainer>

        </$ButtonsContainer>
        <$ConfigRight>
          <$ButtonRow>
            {'Funky Switch: '}
            <$ButtonSelectGroup>
              {'Color: '}
              <ColorSelect setColor={this.setRotaryColor} number={0} color={this.state.rotaryColors[0]} colors={funkyColors} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Sticker Color: '}
              <ColorSelect setColor={this.setRotaryStickerColor} number={0} color={this.state.rotaryStickerColors[0]} colors={rotaryStickerColors} />
            </$ButtonSelectGroup>
          </$ButtonRow>
          <$ButtonRow>
            {'Rotary 1: '}
            <$ButtonSelectGroup>
              {'Color: '}
              <ColorSelect setColor={this.setRotaryColor} number={1} color={this.state.rotaryColors[1]} colors={rotaryColors} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Sticker Color: '}
              <ColorSelect setColor={this.setRotaryStickerColor} number={1} color={this.state.rotaryStickerColors[1]} colors={rotaryStickerColors} />
            </$ButtonSelectGroup>
          </$ButtonRow>
          <$ButtonRow>
            {'Rotary 2: '}
            <$ButtonSelectGroup>
              {'Color: '}
              <ColorSelect setColor={this.setRotaryColor} number={2} color={this.state.rotaryColors[2]} colors={rotaryColors} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Sticker Color: '}
              <ColorSelect setColor={this.setRotaryStickerColor} number={2} color={this.state.rotaryStickerColors[2]} colors={rotaryStickerColors} />
            </$ButtonSelectGroup>
          </$ButtonRow>
          <$ButtonRow>
            {'Rotary 3: '}
            <$ButtonSelectGroup>
              {'Color: '}
              <ColorSelect setColor={this.setRotaryColor} number={3} color={this.state.rotaryColors[3]} colors={rotaryColors} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Sticker Color: '}
              <ColorSelect setColor={this.setRotaryStickerColor} number={3} color={this.state.rotaryStickerColors[3]} colors={rotaryStickerColors} />
            </$ButtonSelectGroup>
          </$ButtonRow>
          <$ButtonRow>
            {'Rotary 4: '}
            <$ButtonSelectGroup>
              {'Color: '}
              <ColorSelect setColor={this.setRotaryColor} number={4} color={this.state.rotaryColors[4]} colors={rotaryColors} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Sticker Color: '}
              <ColorSelect setColor={this.setRotaryStickerColor} number={4} color={this.state.rotaryStickerColors[4]} colors={rotaryStickerColors} />
            </$ButtonSelectGroup>
          </$ButtonRow>
          <$ButtonRow>
            {'Rotary 5: '}
            <$ButtonSelectGroup>
              {'Color: '}
              <ColorSelect setColor={this.setRotaryColor} number={5} color={this.state.rotaryColors[5]} colors={rotaryColors} />
            </$ButtonSelectGroup>
            <$ButtonSelectGroup>
              {'Sticker Color: '}
              <ColorSelect setColor={this.setRotaryStickerColor} number={5} color={this.state.rotaryStickerColors[5]} colors={rotaryStickerColors} />
            </$ButtonSelectGroup>
          </$ButtonRow>
        </$ConfigRight>
        {/* <label>All one color:</label>
        <input name="monochrome" type="checkbox" check={this.state.monochrome.toString()} onChange={(e) => {
          this.setState({ monochrome: e.target.checked });
          if (e.target.checked) {
            this.setColor(0, "Black");
          }
        }} />
        {this.state.monochrome ?
          <ColorSelect setColor={this.setColor} number={0} value={this.state.buttonColors[0]} color={this.state.buttonColors[0]} colors={buttonColors} />
          :
          <$ButtonSelectGroup>
            {this.state.buttonColors.map((color, idx) => (
              <ColorSelect key={idx} setColor={this.setColor} number={idx + 1} color={color} colors={buttonColors} />
            ))}
          </$ButtonSelectGroup>

        }
        <$ButtonSelectGroup>
          {this.state.stickerColors.map((color, idx) => (
            <ColorSelect key={idx} setColor={this.setStickerColor} value={this.state.stickerColors[idx]} number={idx + 1} color={color} colors={buttonColors} />
          ))}
        </$ButtonSelectGroup>
        <$ButtonSelectGroup>
          {this.state.textColors.map((color, idx) => (
            <ColorSelect key={idx} setColor={this.setTextColor} value={this.state.textColors[idx]} number={idx + 1} color={color} colors={buttonColors} />
          ))}
        </$ButtonSelectGroup>
        <$ButtonSelectGroup>
          {this.state.text.map((text, idx) => (
            <TextSelect key={idx} setText={this.setText} value={this.state.text[idx]} number={idx + 1} text={text} />
          ))}
        </$ButtonSelectGroup> */}
      </$ConfigContainer >
    );
  }
}

export default GSIButtonConfig;