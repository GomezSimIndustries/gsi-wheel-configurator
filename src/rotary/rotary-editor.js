import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import ColorSelect from '../color-select';
import TextSelect from '../text-select';
import { funkyColors, rotaryColors, rotaryStickerColors, textColors, rotaryTexts } from '../config';
import { SketchPicker } from 'react-color';
import {
    $ElementContainer,
    $GroupContainer,
    $RowContainer,
    $CloseButton,
    $ColorSwatchButton,
    $HexValue,
    $ColorPickerContainer
} from '../button/button-editor'

const $EditorContainer = styled.div`
    transform: translateY(-50%);
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

const $ButtonSelectGroup = styled.div`
    padding: 10px;
    border: 2px solid #00ffff;
    border-radius: 6px;

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
`;

class RotaryEditor extends Component {

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
            rotaryColor,
            stickerColor,
            textColor,
            text,
            active,
            setColor,
            setText,
            index,
            side,
            copyRotaryAll,
            setActive
        } = this.props;
        return (
            <$EditorContainer
                active={active}
                side={side}
                onClick={(e) => e.stopPropagation()}>
                <$CloseButton onClick={e => setActive(-1)}>x</$CloseButton>
                <$GroupContainer>
                    <span>Colors</span>
                    <$RowContainer>
                        <$ElementContainer>
                            <span>Knob</span>
                            <ColorSelect
                                setColor={setColor}
                                index={index}
                                color={rotaryColor}
                                colors={index === 0 ? funkyColors : rotaryColors}
                                type={'rotaryColor'} />
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
                                presetColors={rotaryStickerColors}
                                onChange={color => {
                                    setColor('stickerColor', index, color.hex);
                                }} />
                            <$CloseButton onClick={e => this.setState({ pickerOpen: false })} dark={true}>x</$CloseButton>
                        </$ColorPickerContainer>
                    </$ElementContainer>
                    <$GroupContainer>
                        <span>Apply Colors To</span>
                        <button onClick={e => {
                            copyRotaryAll(index);
                        }}>All Rotaries</button>
                    </$GroupContainer>
                </$GroupContainer>
                <$ElementContainer>
                    <span>Function</span>
                    <TextSelect setText={setText}
                        value={text}
                        index={index}
                        text={text}
                        texts={rotaryTexts} />
                </$ElementContainer>
            </$EditorContainer>
        );
    }
}

export default RotaryEditor;
