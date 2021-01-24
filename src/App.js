import React, { Component } from 'react';
import styled from 'styled-components';
import GSIConfigButton from '../src/button';
import ButtonSelect from '../src/button-select';

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
        "Black",
        "Black",
        "Black",
        "Black",
        "Black",
      ],
      stickerColors: [
        "Red",
        "Red",
        "Red",
        "Red",
        "Red",
      ],
      monochrome: false,
    };
    this.setButtonColor = this.setButtonColor.bind(this);
    this.setStickerColor = this.setStickerColor.bind(this);
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
          <ButtonSelect setButtonColor={this.setButtonColor} number={0} color={this.state.buttonColors[0]} />
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
        <$ButtonsContainer>
          <img src='./images/fpe-trans-buttons-base.png' alt='button base' />
          <$LeftButtons>
            <GSIConfigButton stickerColor={this.state.stickerColors[0]} buttonColor={this.state.buttonColors[0]} row={1} side={"left"} />
            <GSIConfigButton stickerColor={this.state.stickerColors[1]} buttonColor={this.state.buttonColors[1]} row={2} side={"left"} />
            <GSIConfigButton stickerColor={this.state.stickerColors[2]} buttonColor={this.state.buttonColors[2]} row={3} side={"left"} />
            <GSIConfigButton stickerColor={this.state.stickerColors[3]} buttonColor={this.state.buttonColors[3]} row={4} side={"left"} />
            <GSIConfigButton stickerColor={this.state.stickerColors[4]} buttonColor={this.state.buttonColors[4]} row={5} side={"left"} />
          </$LeftButtons>
          <$RightButtons>
            <GSIConfigButton stickerColor={this.state.stickerColors[0]} buttonColor={this.state.buttonColors[0]} row={1} side={"right"} />
            <GSIConfigButton stickerColor={this.state.stickerColors[1]} buttonColor={this.state.buttonColors[1]} row={2} side={"right"} />
            <GSIConfigButton stickerColor={this.state.stickerColors[2]} buttonColor={this.state.buttonColors[2]} row={3} side={"right"} />
            <GSIConfigButton stickerColor={this.state.stickerColors[3]} buttonColor={this.state.buttonColors[3]} row={4} side={"right"} />
            <GSIConfigButton stickerColor={this.state.stickerColors[4]} buttonColor={this.state.buttonColors[4]} row={5} side={"right"} />
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