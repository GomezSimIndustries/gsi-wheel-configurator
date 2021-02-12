import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import ColorSelect from '../color-select';
import TextSelect from '../text-select';
import { funkyColors, rotaryColors, rotaryStickerColors, textColors, rotaryTexts } from '../config';
import { SketchPicker } from 'react-color';

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
            copyRotaryAll
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
                    <SketchPicker
                        color={stickerColor}
                        disableAlpha={true}
                        presetColors={rotaryStickerColors}
                        onChange={color => {
                            setColor('stickerColor', index, color.hex);
                        }} />
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
                <hr />
                <button onClick={e => {
                    console.log('copy clicked');
                    copyRotaryAll(index);
                }}>Apply colors to all rotaries</button>
            </$EditorContainer>
        );
    }
}

export default RotaryEditor;
