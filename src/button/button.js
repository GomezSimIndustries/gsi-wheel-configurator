import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import * as Stickers from '../stickers';
import * as Icons from '../icons';
import { stickerTexts, config } from '../config'
import ButtonEditor from './button-editor';

const $StickerContainer = styled.div`
    color: ${p => p.color};
    top: ${p => p.y}px;
    left: ${p => p.x}px;
    position: absolute;
`;

const $ButtonContainer = styled.div`
    cursor: pointer;
    position: absolute;
    top: ${props => props.y};
    left: ${props => props.x};

    img {
        position: absolute;

        &.sticker {
            height: 75px;
        }

        &.buttonGuard {
            ${p =>
        p.side === 'right' ?
            css`
                top: -9px;
                left: -10px;
            ` :
            css`
                top: -9px;
                left: -9px;
            `}
        }
    }

    svg {
        fill: currentColor;
        overflow: visible;
    }

    &:hover {
        ${$StickerContainer} > svg {
            stroke: white !important;
            stroke-width: 3px;
            stroke-linejoin: round;
        }
    }
`;

const $IconContainer = styled.div`
    /* position: absolute; */
    color: ${p => p.color};
    ${p =>
        p.row > 2 ?
            css`
    position: absolute;
            ` :
            css`
    position: relative;
            `}
    ${p =>
        p.row === 2 ?
            css`
    display: inline-block;
            ` :
            css`
    display: block;
            `}
`;

const $TextContainer = styled.div`
    position: absolute;
    font-weight: 500;
    text-transform: uppercase;
    left: ${p => p.offsetX};
    top: ${p => p.offsetY};
    font-size: 12px;
    text-align: center;
    overflow: hidden;
    color: ${p => p.color};
    line-height: 11px;
    width: ${p => p.width};
    height: ${p => p.height};
    display: flex;
    align-items: center;
    justify-content: center;
    ${p => p.row === 2 &&
        css`
            line-height: 14px;
            justify-content: center;
            ${$IconContainer} {
                margin-left: 5px;
            }
    `}
    ${p => p.row === 1 &&
        css`
            flex-direction: column;
            ${p => p.stickerText !== 'pitLimit' &&
                css`
            `
            }
            `}
`;

class GSIButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }

    render() {
        const {
            side,
            row,
            buttonColor,
            stickerColor,
            textColor,
            text,
            setColor,
            setText,
            index,
            id,
            active,
            setActive
        } = this.props;
        const sideText = side.charAt(0).toUpperCase() + side.slice(1);
        const Sticker = Stickers[`Row${row}${sideText}`];
        const Icon = Icons[stickerTexts[text].icon];
        const height = config[`Row${row}`].stickerHeight;
        const width = config[`Row${row}`].stickerWidth;
        let offsetX;
        let offsetY;
        const buttonX = config[`Row${row}`][`button${sideText}`].x;
        const buttonY = config[`Row${row}`][`button${sideText}`].y;

        offsetX = config[`Row${row}`][`sticker${sideText}`].x;
        offsetY = config[`Row${row}`][`sticker${sideText}`].y;

        const textOffsetX = config[`Row${row}`][`text${sideText}`].x;
        const textOffsetY = config[`Row${row}`][`text${sideText}`].y;

        return (
            <$ButtonContainer
                x={buttonX}
                y={buttonY}
                side={side}
                onClick={(e) => {
                    !active ? setActive(id) : setActive(-1);
                    e.stopPropagation();
                }}
                textColor={textColor
                }>
                <$StickerContainer
                    color={stickerColor}
                    x={offsetX}
                    y={offsetY}>
                    <Sticker
                        height={height}
                        width={width} />
                </$StickerContainer>
                <img className="buttonGuard" src={`./images/buttons/button-guard.png`} alt='button-guard' />
                <img src={`./images/buttons/button_${buttonColor.toLowerCase()}.png`} alt='button sticker'
                style={{ width: '41px', height: '41px'}} />
                <$TextContainer
                    offsetX={textOffsetX}
                    offsetY={textOffsetY}
                    color={textColor.toLowerCase()}
                    row={row}
                    stickerText={text}
                    width={config[`Row${row}`][`text${sideText}`].width}
                    height={config[`Row${row}`][`text${sideText}`].height}>
                    {row === 1 ? (
                        <>
                            <$IconContainer>
                                <Icon height="15px" width="15px" color={textColor} />
                            </$IconContainer>
                            <div>
                                {stickerTexts[text].text}
                            </div>
                        </>
                    ) : (
                            <>
                                {row === 2 ? (
                                    <>
                                        <div>
                                            {stickerTexts[text].text}
                                        </div>
                                        <$IconContainer>
                                            <Icon height="15px" width="15px" color={textColor} />
                                        </$IconContainer>
                                    </>
                                ) : (
                                        <div>
                                            {stickerTexts[text].text}
                                        </div>
                                    )}
                            </>
                        )
                    }
                </$TextContainer>
                {
                    row !== 1 && row !== 2 &&
                    <$IconContainer
                        row={row}
                        posAbsolute={row !== 1}
                        dispInline={row === 2}
                        style={{ left: config[`Row${row}`][`icon${sideText}`].x, top: config[`Row${row}`][`icon${sideText}`].y }}>
                        <Icon height="15px" width="15px" color={textColor} />
                    </$IconContainer>
                }
                <ButtonEditor
                    active={active}
                    buttonColor={buttonColor}
                    stickerColor={stickerColor}
                    textColor={textColor}
                    text={text}
                    setColor={setColor}
                    setText={setText}
                    index={index}
                    side={side} />
            </$ButtonContainer >
        );
    }
}

export default GSIButton;