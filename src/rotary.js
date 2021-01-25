import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { rotaryConfig } from './config';

const $RotaryContainer = styled.div`
    position: absolute;
    left: ${p => p.x};
    top: ${p => p.y};
    ${p => p.rotaryNum === 0 && css`
        img {
            height: 42px;
            width: 42px;
        }
    `}
`;

const $IconContainer = styled.div`
`;

const $TextContainer = styled.div`
`;

class GSIRotary extends Component {

    render() {
        const { rotaryNum, color, text } = this.props;
        let x = rotaryConfig[rotaryNum].x;
        let y = rotaryConfig[rotaryNum].y;
        let image = `./images/buttons/rotary-${color.toLowerCase()}.png`;
        if (rotaryNum === 0) {
            image = `./images/buttons/funky-${color.toLowerCase()}.png`;
        }
        return (
            <$RotaryContainer x={x} y={y} rotaryNum={rotaryNum}>
                <img src={image} alt='rotary dial' />
            </$RotaryContainer>
        );
    }
}

export default GSIRotary;