import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import ColorSelect from '../color-select';
import TextSelect from '../text-select';
import { funkyColors, rotaryColors, rotaryStickerColors, textColors, rotaryTexts } from '../config';
import { SketchPicker } from 'react-color';
import {
    $GroupContainer,
    $RowContainer,
    $CloseButton,
    $ColorSwatchButton,
    $HexValue,
    $ColorPickerContainer
} from '../button/button-editor';

const $EditorContainer = styled.div`
    transform: translateY(-50%);
    position: absolute;
    cursor: initial;
    display: ${props => props.active ? 'block' : 'none'};
    background-color: #050505;
    padding: 15px;
    padding-bottom: 3px;
    z-index: 10;
    min-width: 100px;
    font-size: 14px;
    ${props => props.side === 'left' ? css`
        right: ${p => p.top ? '20px' : '45px'};
        left: auto;
    ` : css`
        right: auto;
        left: ${p => p.top ? '85px' : '110px'};
    `}
    -webkit-box-shadow: 2px 2px 5px 2px #000000;
    box-shadow: 2px 2px 5px 2px #000000;
`;

const $ButtonSelectGroup = styled.div`
    padding: 10px;
    border: 2px solid white;
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
            setActive,
            top
        } = this.props;
        return (
            <$EditorContainer
                active={active}
                side={side}
                top={top}
                onClick={(e) => e.stopPropagation()}>
                <$CloseButton onClick={e => setActive(-1)}>x</$CloseButton>
                <$GroupContainer>
                    <span>Colors</span>
                    <div>
                        <span>Knob</span>
                        <ColorSelect
                            setColor={setColor}
                            index={index}
                            color={rotaryColor}
                            colors={index === 0 ? funkyColors : rotaryColors}
                            type={'rotaryColor'} />
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
                                onChange={e => setColor('textColor', index, e.target.value)} />
                        </$RowContainer>
                    </div>
                    <div>
                        <div>
                            <span>Sticker</span>
                        </div>
                        <$RowContainer>
                            <$ColorSwatchButton onClick={e => this.togglePicker(e, 'sticker')} color={stickerColor} title="Open/Close Color Picker" />
                            <$HexValue>Value:
                        <input type="text"
                                    value={stickerColor}
                                    style={{ width: '65px', marginLeft: '10px' }}
                                    onChange={e => setColor('stickerColor', index, e.target.value)} />
                            </$HexValue>
                            <$ColorPickerContainer
                                open={this.state.pickerOpen && this.state.pickerElement === 'sticker'}
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
                        </$RowContainer>
                    </div>
                    <div>
                        <span>Apply Colors To</span>
                        <button onClick={e => {
                            copyRotaryAll(index);
                        }}>All Rotaries</button>
                    </div>
                </$GroupContainer>
                <$GroupContainer>
                    <span>Function</span>
                    <TextSelect setText={setText}
                        value={text}
                        index={index}
                        text={text}
                        texts={rotaryTexts} />
                </$GroupContainer>
            </$EditorContainer>
        );
    }
}

export default RotaryEditor;
