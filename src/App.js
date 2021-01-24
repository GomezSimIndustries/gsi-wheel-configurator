import React, { Component } from 'react';
import styled from 'styled-components';
import GSIConfigButton from '../src/button';
import ButtonSelect from '../src/button-select';
import TextSelect from '../src/text-select';

import { RotaryBase } from './stickers';

const $ButtonsContainer = styled.div`
  position: relative;
`;
const $ConfigContainer = styled.div`
  position: relative;
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
        "flash",
        "flash",
        "flash",
        "flash",
        "flash",
        "flash",
        "flash",
        "flash",
        "flash",
      ],
      monochrome: false,
    };
    this.setButtonColor = this.setButtonColor.bind(this);
    this.setStickerColor = this.setStickerColor.bind(this);
    this.setTextColor = this.setTextColor.bind(this);
    this.setText = this.setText.bind(this);
  }

  setButtonColor(number, color) {
    if (number === 0) {
      this.setState({ buttonColors: [color, color, color, color, color] });
      return;
    }
    let colors = [...this.state.buttonColors];
    colors[number - 1] = color;
    this.setState({ buttonColors: colors });
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

  render() {
    return (
      <$ConfigContainer>
        <label>All one color:</label>
        <input name="monochrome" type="checkbox" check={this.state.monochrome.toString()} onChange={(e) => {
          this.setState({ monochrome: e.target.checked });
          if (e.target.checked) {
            this.setButtonColor(0, "Black");
          }
        }} />
        {this.state.monochrome ?
          <ButtonSelect setButtonColor={this.setButtonColor} number={0} value={this.state.buttonColors[0]} color={this.state.buttonColors[0]} />
          :
          <$ButtonSelectGroup>
            {this.state.buttonColors.map((color, idx) => (
              <ButtonSelect key={idx} setButtonColor={this.setButtonColor} number={idx + 1} color={color} />
            ))}
          </$ButtonSelectGroup>

        }
        <$ButtonSelectGroup>
          {this.state.stickerColors.map((color, idx) => (
            <ButtonSelect key={idx} setButtonColor={this.setStickerColor} value={this.state.stickerColors[idx]} number={idx + 1} color={color} />
          ))}
        </$ButtonSelectGroup>
        <$ButtonSelectGroup>
          {this.state.textColors.map((color, idx) => (
            <ButtonSelect key={idx} setButtonColor={this.setTextColor} value={this.state.textColors[idx]} number={idx + 1} color={color} />
          ))}
        </$ButtonSelectGroup>
        <$ButtonSelectGroup>
          {this.state.text.map((text, idx) => (
            <TextSelect key={idx} setText={this.setText} value={this.state.text[idx]} number={idx + 1} text={text} />
          ))}
        </$ButtonSelectGroup>
        <$ButtonsContainer>
          <img src='./images/fpe-trans-buttons-base.png' alt='button base' />
          <$LeftButtons>
            <GSIConfigButton
              stickerColor={this.state.stickerColors[0]}
              buttonColor={this.state.buttonColors[0]}
              textColor={this.state.textColors[0]}
              text={this.state.text[0]}
              row={1}
              side={"left"} />
            <GSIConfigButton
              stickerColor={this.state.stickerColors[1]}
              buttonColor={this.state.buttonColors[1]}
              textColor={this.state.textColors[1]}
              text={this.state.text[1]}
              row={2}
              side={"left"} />
            <GSIConfigButton
              stickerColor={this.state.stickerColors[2]}
              buttonColor={this.state.buttonColors[2]}
              textColor={this.state.textColors[2]}
              text={this.state.text[2]}
              row={3}
              side={"left"} />
            <GSIConfigButton
              stickerColor={this.state.stickerColors[3]}
              buttonColor={this.state.buttonColors[3]}
              textColor={this.state.textColors[3]}
              text={this.state.text[3]}
              row={4}
              side={"left"} />
            <GSIConfigButton
              stickerColor={this.state.stickerColors[4]}
              buttonColor={this.state.buttonColors[4]}
              textColor={this.state.textColors[4]}
              text={this.state.text[4]}
              row={5}
              side={"left"} />
          </$LeftButtons>
          <$RightButtons>
            <GSIConfigButton
              stickerColor={this.state.stickerColors[0]}
              buttonColor={this.state.buttonColors[0]}
              textColor={this.state.textColors[0]}
              text={this.state.text[5]}
              row={1}
              side={"right"} />
            <GSIConfigButton
              stickerColor={this.state.stickerColors[1]}
              buttonColor={this.state.buttonColors[1]}
              textColor={this.state.textColors[1]}
              text={this.state.text[6]}
              row={2}
              side={"right"} />
            <GSIConfigButton
              stickerColor={this.state.stickerColors[2]}
              buttonColor={this.state.buttonColors[2]}
              textColor={this.state.textColors[2]}
              text={this.state.text[7]}
              row={3}
              side={"right"} />
            <GSIConfigButton
              stickerColor={this.state.stickerColors[3]}
              buttonColor={this.state.buttonColors[3]}
              textColor={this.state.textColors[3]}
              text={this.state.text[8]}
              row={4}
              side={"right"} />
            <GSIConfigButton
              stickerColor={this.state.stickerColors[4]}
              buttonColor={this.state.buttonColors[4]}
              textColor={this.state.textColors[4]}
              text={this.state.text[9]}
              row={5}
              side={"right"} />
          </$RightButtons>
          <$RotaryContainer>
            <RotaryBase height="194px" width="303px" />
          </$RotaryContainer>
        </$ButtonsContainer>
      </$ConfigContainer >
    );
  }
}

export default GSIButtonConfig;