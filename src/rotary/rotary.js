import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { rotaryConfig, rotaryTexts } from '../config';
import * as Stickers from '../stickers';
import RotaryEditor from './rotary-editor';

const $StickerContainer = styled.div`
    position: absolute;
    left: ${p => p.x}px;
    top: ${p => p.y}px;
    color: ${p => p.color};
`;

const $RotaryContainer = styled.div`
    position: absolute;
    cursor: pointer;
    left: ${p => p.x}px;
    top: ${p => p.y}px;
    ${p => p.index === 0 && css`
        img {
            height: 42px;
            width: 42px;
        }
    `}
    svg, img {
        position: absolute;
    }

    
   svg {
        overflow: visible;
    }

    &:hover {
        svg {
            stroke: white;
            stroke-width: 3px;
            stroke-linejoin: round;
        }
    }
`;

const $IconContainer = styled.div`
`;

const $TextContainer = styled.div`
    color: ${p => p.color};
    font-weight: 500;
    text-transform: uppercase;
    font-size: 12px;
    text-align: center;
    overflow: hidden;
    line-height: 11px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 15px;
    left: ${p => p.x}px;
    top: ${p => p.y}px;
`;

class GSIRotary extends Component {

    render() {
        const {
            index,
            id,
            rotaryColor,
            stickerColor,
            textColor,
            text,
            setText,
            active,
            setActive,
            setColor
        } = this.props;
        let RotarySticker = Stickers.RotaryRight;
        let direction = rotaryConfig[index].dir;
        if (direction === 'funky') {
            RotarySticker = Stickers.Funky;
        } else {
            direction = direction.charAt(0).toUpperCase() + direction.slice(1);
            RotarySticker = Stickers[`Rotary${direction}`];
        }
        let x = rotaryConfig[index].x;
        let y = rotaryConfig[index].y;
        let image = `./images/buttons/rotary_${rotaryColor.toLowerCase()}.png`;
        if (index === 0) {
            image = `./images/buttons/funky_${rotaryColor.toLowerCase()}.png`;
        }
        let side = 'right';
        if (index === 0 || index === 1 || index === 2 || index === 4) {
            side = 'left';
        }
        console.log(rotaryTexts);
        console.log(text);
        return (
            <$RotaryContainer
                x={x}
                y={y}
                index={index}
                color={textColor}
                onClick={(e) => {
                    !active ? setActive(id) : setActive(-1);
                    e.stopPropagation();
                }}>
                <$StickerContainer
                    x={rotaryConfig[index].sticker.x}
                    y={rotaryConfig[index].sticker.y}
                    color={stickerColor}
                >
                    <RotarySticker
                        width={rotaryConfig[index].sticker.width}
                        height={rotaryConfig[index].sticker.height}
                    />
                </$StickerContainer>
                <img src={image} alt='rotary dial' style={{ height: direction.toLowerCase() === 'funky' ? "42px" : "73px", width: direction.toLowerCase() === 'funky' ? "42px" : "73px" }}/>
                {index !== 2 && (
                    <$TextContainer
                    x={rotaryConfig[index].text.x}
                    y={rotaryConfig[index].text.y}
                    color={textColor}>
                        {rotaryTexts[text].text}
                    </$TextContainer>
                )}
                <RotaryEditor
                    active={active}
                    id={id}
                    rotaryColor={rotaryColor}
                    stickerColor={stickerColor}
                    textColor={textColor}
                    text={rotaryTexts[text].text}
                    setColor={setColor}
                    setText={setText}
                    index={index}
                    side={side} />
            </$RotaryContainer>
        );
    }
}

export default GSIRotary;