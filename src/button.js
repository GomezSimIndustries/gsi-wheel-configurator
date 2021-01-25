import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import * as Stickers from './stickers';
import * as Icons from './icons';
import { stickerTexts, config } from './config'

const $ButtonContainer = styled.div`
    position: absolute;
    top: ${props => props.y};
    left: ${props => props.x};
    fill: pink;

    img {
        position: absolute;

        &.sticker {
            height: 75px;
            color: pink;
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

    render() {
        const { side, row, buttonColor, stickerColor, textColor, text } = this.props;
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
            <$ButtonContainer x={buttonX} y={buttonY} side={side}>
                <Sticker style={{ color: stickerColor, top: offsetY, left: offsetX, position: "absolute" }} height={height} width={width} />
                <img className="buttonGuard" src={`./images/buttons/button-guard.png`} alt='button-guard' />
                <img src={`./images/buttons/btn-${buttonColor.toLowerCase()}-${side}.png`} alt='button sticker' />
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
                {row !== 1 && row !== 2 &&
                    <$IconContainer
                        row={row}
                        posAbsolute={row !== 1}
                        dispInline={row === 2}
                        style={{ left: config[`Row${row}`][`icon${sideText}`].x, top: config[`Row${row}`][`icon${sideText}`].y }}>
                        <Icon height="15px" width="15px" color={textColor} />
                    </$IconContainer>
                }
            </$ButtonContainer>
        );
    }
}

export default GSIButton;