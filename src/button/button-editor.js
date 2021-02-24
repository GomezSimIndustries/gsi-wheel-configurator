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
    background-color: #050505;
    padding: 15px;
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
    -webkit-box-shadow: 2px 2px 5px 2px #000000;
    box-shadow: 2px 2px 5px 2px #000000;

    button {
        font-size: 13px;
    }
`;

export const $GroupContainer = styled.div`
    padding: 10px;
    border: 1px solid white;
    border-radius: 6px;
    margin: 5px 0;
    display: flex;
    flex-direction: column;
    position: relative;
    &:firstChild {
        margin-bottom: 5px;
    }
    & > span {
        position: absolute;
        background-color: #050505;
        top: -10px;
    }
    &:nth-of-type(2) {
        margin-bottom: 10px;
    }
`;

export const $RowContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  margin-bottom: 10px;
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
        border: 1px solid white;
    }
`;

export const $HexValue = styled.div`
    margin-left: 10px;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: row;
`;

export const $ColorPickerContainer = styled.div`
    display: ${p => p.open ? 'block' : 'none'};
    background-color: #050505;
    padding: 5px;
    position: absolute;
    left: 55px;
    z-index: 2;
    box-shadow: 2px 2px 5px 2px #000000;
    & > div:first-of-type {
        background-color: #050505 !important;
        color: white !important;
    }
`;

export const $CloseButton = styled.div`
    box-sizing: border-box;
    width: 10px;
    height: 10px;
    position: absolute;
    top: 2px;
    right: 2px;
    display: flex;
    justify-content: center;
    align-content: center;
    line-height: 8px;
    cursor: pointer;
    &:hover {
        font-weight: 700;
    }
`;

class ButtonEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pickerOpen: false,
            pickerElement: ''
        };
        this.togglePicker = this.togglePicker.bind(this);
    }

    togglePicker(e, text) {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({
            pickerOpen: !this.state.pickerOpen,
            pickerElement: this.state.picerOpen ? '' : text
        });
    }

    componentDidUpdate(oldProps, oldState) {
        if (oldProps.active && !this.props.active) {
            if (this.state.pickerOpen)
                this.setState({ pickerOpen: false, pickerElement: '' });
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
                    <div>
                        <span>Button</span>
                        <div>
                            <ColorSelect
                                setColor={setColor}
                                index={index}
                                color={buttonColor}
                                colors={buttonColors}
                                type={'buttonColor'} />
                        </div>
                    </div>
                    <div>
                        <span>Text</span>
                        <$RowContainer>
                            <$ColorSwatchButton onClick={e => this.togglePicker(e, 'text')} color={textColor} title="Open/Close Color Picker" />
                            <$HexValue>Value:</$HexValue>
                            <$ColorPickerContainer
                                open={this.state.pickerOpen && this.state.pickerElement === 'text'}
                                id="sketchPicker">
                                <SketchPicker
                                    color={textColor}
                                    disableAlpha={true}
                                    presetColors={textColors}
                                    onClick={e => { e.stopPropagation(); }}
                                    onChange={color => {
                                        setColor('textColor', index, color.hex);
                                    }}
                                    style={{ padding: "15px" }} />
                                <$CloseButton onClick={e => this.setState({ pickerOpen: false })} dark={true}>x</$CloseButton>
                            </$ColorPickerContainer>
                            <input type="text"
                                value={textColor}
                                style={{ width: '65px', marginLeft: '10px' }}
                                onChange={e => setColor('textColor', index, e.target.value)}
                                title="Enter Color Hex Value or HTML Color Name" />
                        </$RowContainer>
                    </div>
                    <div>
                        <div>
                            <span>Sticker</span>
                        </div>
                        <$RowContainer>
                            <$ColorSwatchButton onClick={e => this.togglePicker(e, 'sticker')} color={stickerColor} title="Open/Close Color Picker" />
                            <$HexValue>Value:</$HexValue>
                            <input type="text"
                                value={stickerColor}
                                style={{ width: '65px', marginLeft: '10px' }}
                                onChange={e => setColor('stickerColor', index, e.target.value)}
                                title="Enter Color Hex Value or HTML Color Name"/>
                            <$ColorPickerContainer
                                open={this.state.pickerOpen && this.state.pickerElement === 'sticker'}
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
                        </$RowContainer>
                    </div>
                    <div>
                        <span>Apply Colors To</span>
                        <$RowContainer>
                            <button onClick={e => {
                                copyButtonAll(index);
                            }}>ALL BUTTONS</button>
                            <button onClick={e => {
                                copyButtonRow(index);
                            }}>ROW</button>
                        </$RowContainer>
                    </div>
                </$GroupContainer>
                <$GroupContainer>
                    <span>Function</span>
                    <TextSelect setText={setText}
                        value={text}
                        index={index}
                        text={text}
                        texts={stickerTexts} />
                </$GroupContainer>
            </$EditorContainer>
        );
    }
}

export default ButtonEditor;
