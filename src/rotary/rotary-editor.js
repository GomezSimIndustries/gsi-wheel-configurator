import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import * as Stickers from '../stickers';
import * as Icons from '../icons';
import ColorSelect from '../color-select';
import TextSelect from '../text-select';
import { funkyColors, rotaryColors, rotaryStickerColors, textColors, rotaryTexts } from '../config';

const $EditorContainer = styled.div`
    position: absolute;
    display: ${props => props.active ? 'block' : 'none'};
    background-color: black;
    border: 2px solid white;
    border-radius: 6px;
    padding: 16px;
    z-index: 10;
    min-width: 100px;
    ${props => props.side === 'left' ? css`
        right: 18px;
        left: auto;
    ` : css`
        right: auto;
        left: 60px;
    `}
`;

const $ButtonSelectGroup = styled.div`
`;

class RotaryEditor extends Component {

    render() {
        const {
            rotaryColor,
            stickerColor,
            textColor,
            text,
            active,
            setColor,
            setText,
            index,
            side,
            id
        } = this.props;
        return (
            <$EditorContainer active={active} side={side} onClick={(e) => e.stopPropagation()}>
                <$ButtonSelectGroup>
                    {'Knob Color: '}
                    <ColorSelect
                    setColor={setColor}
                    index={index}
                    color={rotaryColor}
                    colors={index === 0 ? funkyColors : rotaryColors}
                    type={'rotaryColor'} />
                </$ButtonSelectGroup>
                <$ButtonSelectGroup>
                    {'Sticker Color: '}
                    <ColorSelect
                    setColor={setColor}
                    value={stickerColor}
                    index={index}
                    color={stickerColor}
                    colors={rotaryStickerColors}
                    type={'stickerColor'} />
                </$ButtonSelectGroup>
                <$ButtonSelectGroup>
                    {'Text Color: '}
                    <ColorSelect
                    setColor={setColor}
                    value={textColor}
                    index={index}
                    color={textColor}
                    colors={textColors}
                    type={'textColor'} />
                </$ButtonSelectGroup>
                <$ButtonSelectGroup>
                    {'Function: '}
                    <TextSelect setText={setText}
                    value={text}
                    index={index}
                    text={text}
                    texts={rotaryTexts} />
                </$ButtonSelectGroup>
            </$EditorContainer>
        );
    }
}

export default RotaryEditor;
