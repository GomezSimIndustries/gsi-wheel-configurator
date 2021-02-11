import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import ColorSelect from '../color-select';
import TextSelect from '../text-select';
import { buttonColors, stickerColors, textColors, stickerTexts } from '../config';
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

class ButtonEditor extends Component {

    render() {
        const {
            buttonColor,
            stickerColor,
            textColor,
            text,
            active,
            setColor,
            setText,
            index,
            side
        } = this.props;
        return (
            <$EditorContainer active={active} side={side} onClick={(e) => e.stopPropagation()}>
                <$ButtonSelectGroup>
                    {'Button Color: '}
                    <ColorSelect
                        setColor={setColor}
                        index={index}
                        color={buttonColor}
                        colors={buttonColors}
                        type={'buttonColor'} />
                </$ButtonSelectGroup>
                <$ButtonSelectGroup>
                    {'Sticker Color: '}
                    <SketchPicker
                        color={stickerColor}
                        disableAlpha={true}
                        presetColors={stickerColors}
                        onChange={e => {
                            console.log(e);
                            setColor('stickerColor', index, e.hex);
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
                        texts={stickerTexts} />
                </$ButtonSelectGroup>
            </$EditorContainer>
        );
    }
}

export default ButtonEditor;
