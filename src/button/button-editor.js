import React, { Component, useState } from 'react';
import styled, { css } from 'styled-components';
import ColorSelect from '../color-select';
import TextSelect from '../text-select';
import { buttonColors, stickerColors, textColors, stickerTexts } from '../config';
import { SketchPicker } from 'react-color';

const $EditorContainer = styled.div`
    ${p => p.row === 5 && css`
        transform: translateY(-65%);
    `}
    ${p => p.row === 4 && css`
        transform: translateY(-50%);
    `}
    ${p => p.row === 3 && css`
        transform: translateY(-35%);
    `}
    ${p => p.row === 2 && css`
        transform: translateY(-20%);
    `}
    position: absolute;
    cursor: initial;
    display: ${props => props.active ? 'block' : 'none'};
    background-color: black;
    border: 2px solid #00ffff;
    border-radius: 6px;
    padding: 10px;
    padding-bottom: 3px;
    z-index: 10;
    min-width: 100px;
    font-size: 14px;
    ${props => props.side === 'left' ? css`
        right: 18px;
        left: auto;
    ` : css`
        right: auto;
        left: 60px;
    `}
    -webkit-box-shadow: 5px 5px 15px 5px #000000;
    box-shadow: 5px 5px 15px 5px #000000;
`;

export const $ElementContainer = styled.div`
    padding: 10px;
    border: 2px solid #00ffff;
    border-radius: 6px;
    margin: 8px 0;
    display: flex;
    position: relative;

    &:first-child {
        border: 2px solid white;
    }
    &:last-child {
        border: 2px solid #c20358;
    }
    &:nth-child(2) {
        border: 2px solid #480048;
    }
    &:nth-child(3) {
        border: 2px solid #f29900;
    }

    span {
        position: absolute;
        background-color: black;
        top: -10px;
    }

`;

export const $GroupContainer = styled.div`
    padding: 10px;
    padding-bottom: 3px;
    border: 2px solid #00ffff;
    border-radius: 6px;
    margin: 5px 0;
    display: flex;
    flex-direction: column;
    position: relative;
    &:firstChild {
        margin-bottom: 5px;
    }
    &:first-child {
        border: 2px solid white;
    }
    &:last-child {
        border: 2px solid #c20358;
    }
    &:nth-child(2) {
        border: 2px solid #480048;
    }
    &:nth-child(3) {
        border: 2px solid #f29900;
    }
    & > span {
        position: absolute;
        background-color: black;
        top: -10px;
    }

    ${$ElementContainer} {
        &:first-of-type {
            margin-right: 10px;
        }
    }
`;

export const $RowContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
`;

export const $ColorSwatchButton = styled.div`
    box-sizing: border-box;
    padding: 5px;
    background-color: ${p => p.color};
    border-radius: 3px;
    border: 1px solid grey;
    box-shadow: 0 0 0 1px rgba(0,0,0,.1);
    display: inline-block;
    width: 25px;
    height: 25px;
    cursor: pointer;

    &:hover {
        border: 2px solid white;
    }
`;

export const $HexValue = styled.div`
    margin-left: 10px;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

export const $ColorPickerContainer = styled.div`
    display: ${p => p.open ? 'block' : 'none'};
    position: absolute;
    left: 55px;
    z-index: 2;
    box-shadow: 5px 5px 15px 5px #000000;
`;

export const $CloseButton = styled.div`
    box-sizing: border-box;
    width: 15px;
    height: 15px;
    border-radius: 3px;
    border: 1px solid white;
    position: absolute;
    top: 0;
    right: -20px;
    display: flex;
    justify-content: center;
    align-content: center;
    line-height: 8px;
    cursor: pointer;
    ${p => p.dark && css`
        color: black;
        border: 1px solid black;
        background-color: white;
    `}
    box-shadow: 5px 5px 15px 5px #000000;
    &:hover {
        border-width: 3px;
    }
`;

class ButtonEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pickerOpen: false,
        };
        this.togglePicker = this.togglePicker.bind(this);
    }

    togglePicker(e) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({
            pickerOpen: !this.state.pickerOpen
        });
    }

    componentDidUpdate(oldProps, oldState) {
        if (oldProps.active && !this.props.active) {
            if (this.state.pickerOpen)
                this.setState({ pickerOpen: false });
        }
    }

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
            side,
            copyButtonAll,
            copyButtonRow,
            row,
            setActive
        } = this.props;
        return (
            <$EditorContainer
                active={active}
                side={side}
                onClick={(e) => e.stopPropagation()}
                row={row}>
                <$CloseButton onClick={e => setActive(-1)}>x</$CloseButton>
                <$GroupContainer>
                    <span>Colors</span>
                    <$RowContainer>
                        <$ElementContainer>
                            <span>Button</span>
                            <ColorSelect
                                setColor={setColor}
                                index={index}
                                color={buttonColor}
                                colors={buttonColors}
                                type={'buttonColor'} />
                        </$ElementContainer>
                        <$ElementContainer>
                            <span>Text</span>
                            <ColorSelect
                                setColor={setColor}
                                value={textColor}
                                index={index}
                                color={textColor}
                                colors={textColors}
                                type={'textColor'} />
                        </$ElementContainer>
                    </$RowContainer>
                    <$ElementContainer>
                        <span>Sticker</span>
                        <$ColorSwatchButton onClick={this.togglePicker} color={stickerColor} title="Open/Close Color Picker" />
                        <$HexValue>Value: {stickerColor}</$HexValue>
                        <$ColorPickerContainer
                            open={this.state.pickerOpen}
                            id="sketchPicker">
                            <SketchPicker
                                color={stickerColor}
                                disableAlpha={true}
                                presetColors={stickerColors}
                                onClick={e => { e.stopPropagation(); }}
                                onChange={color => {
                                    setColor('stickerColor', index, color.hex);
                                }}
                                style={{ padding: "15px" }} />
                            <$CloseButton onClick={e => this.setState({ pickerOpen: false })} dark={true}>x</$CloseButton>
                        </$ColorPickerContainer>
                    </$ElementContainer>
                    <$GroupContainer>
                        <span>Apply Colors To</span>
                        <$RowContainer>
                            <button onClick={e => {
                                copyButtonAll(index);
                            }}>ALL BUTTONS</button>
                            <button onClick={e => {
                                copyButtonRow(index);
                            }}>ROW</button>
                        </$RowContainer>
                    </$GroupContainer>
                </$GroupContainer>
                <$ElementContainer>
                    <span>Function</span>
                    <TextSelect setText={setText}
                        value={text}
                        index={index}
                        text={text}
                        texts={stickerTexts} />
                </$ElementContainer>
            </$EditorContainer>
        );
    }
}

export default ButtonEditor;
