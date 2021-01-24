import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import * as Stickers from './stickers';
import * as Icons from './icons';

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
`;

const $IconContainer = styled.div`
    /* position: absolute; */
    color: ${p => p.color};
    ${p =>
        p.posAbsolute ?
            css`
    position: absolute;
            ` :
            css`
    position: relative;
            `}
    ${p =>
        p.dispInline ?
            css`
    display: inline-block;
            ` :
            css`
    display: block;
            `}
`;

const stickerTexts = {
    flash: {
        text: "FLASH",
        icon: "Flash",
    },
    pitLimit: {
        text: "PIT LIMIT",
        icon: "PitLimit",
    },
    enable: {
        text: "ENABLE",
        icon: "Enable",
    },
    radio: {
        text: "RADIO",
        icon: "Radio",
    },
    mute: {
        text: "MUTE",
        icon: "Mute",
    },
    volPlus: {
        text: "VOL",
        icon: "VolPlus",
    },
    volMinus: {
        text: "VOL",
        icon: "VolMinus",
    },
    prev: {
        text: "PREV",
        icon: "Prev",
    },
    next: {
        text: "NEXT",
        icon: "Next",
    },
    reset: {
        text: "RESET",
        icon: "Reset",
    },
}

const config = {
    Row1: {
        stickerHeight: "74px",
        stickerWidth: "108px",
        buttonLeft: {
            x: "125px",
            y: "26px",
        },
        buttonRight: {
            x: "770px",
            y: "27px",
        },
        stickerLeft: {
            x: "-15px",
            y: "-16px"
        },
        stickerRight: {
            x: "-52px",
            y: "-16px"
        },
        textLeft: {
            x: "51px",
            y: "3px"
        },
        textRight: {
            x: "-47px",
            y: "3px"
        },
        iconLeft: {
            x: "51px",
            y: "3px"
        },
        iconRight: {
            x: "-47px",
            y: "3px"
        }
    },
    Row2: {
        stickerHeight: "94px",
        stickerWidth: "80px",
        buttonLeft: {
            x: "234px",
            y: "121px",
        },
        buttonRight: {
            x: "663px",
            y: "121px",
        },
        stickerLeft: {
            x: "-19px",
            y: "-33px"
        },
        stickerRight: {
            x: "-19px",
            y: "-33px"
        },
        textLeft: {
            x: "3px",
            y: "-30px"
        },
        textRight: {
            x: "3px",
            y: "-30px"
        },
        iconLeft: {
            x: "51px",
            y: "3px"
        },
        iconRight: {
            x: "-47px",
            y: "3px"
        }
    },
    Row3: {
        stickerHeight: "75px",
        stickerWidth: "102px",
        buttonLeft: {
            x: "205px",
            y: "203px",
        },
        buttonRight: {
            x: "691px",
            y: "203px",
        },
        stickerLeft: {
            x: "-17px",
            y: "-16px"
        },
        stickerRight: {
            x: "-44px",
            y: "-16px"
        },
        textLeft: {
            x: "45px",
            y: "-13px"
        },
        textRight: {
            x: "-41px",
            y: "-13px"
        },
        iconLeft: {
            x: "49px",
            y: "37px"
        },
        iconRight: {
            x: "-24px",
            y: "37px"
        }
    },
    Row4: {
        stickerHeight: "75px",
        stickerWidth: "102px",
        buttonLeft: {
            x: "227px",
            y: "285px",
        },
        buttonRight: {
            x: "668px",
            y: "285px",
        },
        stickerLeft: {
            x: "-21px",
            y: "-16px"
        },
        stickerRight: {
            x: "-40px",
            y: "-16px"
        },
        textLeft: {
            x: "35px",
            y: "-14px"
        },
        textRight: {
            x: "-32px",
            y: "-14px"
        },
        iconLeft: {
            x: "49px",
            y: "37px"
        },
        iconRight: {
            x: "-24px",
            y: "37px"
        }
    },
    Row5: {
        stickerHeight: "90px",
        stickerWidth: "96",
        buttonLeft: {
            x: "256px",
            y: "366px",
        },
        buttonRight: {
            x: "637px",
            y: "366px",
        },
        stickerLeft: {
            x: "-36px",
            y: "-17px"
        },
        stickerRight: {
            x: "-18px",
            y: "-17px"
        },
        textLeft: {
            x: "-28px",
            y: "-14px"
        },
        textRight: {
            x: "36px",
            y: "-14px"
        },
        iconLeft: {
            x: "-3px",
            y: "50px"
        },
        iconRight: {
            x: "29px",
            y: "50px"
        }
    }
}

class GSIConfigButton extends Component {
    state = {}

    getSticker = () => {
        if (this.props.row === 1) {

        }
    }

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
        /* if (side === 'left') {
            offsetX = config[`Row${row}`].stickerLeft.x;
            offsetY = config[`Row${row}`].stickerLeft.y;
        }
        else {
            offsetX = config[`Row${row}`].stickerRight.x;
            offsetY = config[`Row${row}`].stickerRight.y;
        } */
        return (
            <$ButtonContainer x={buttonX} y={buttonY} side={side}>
                <Sticker style={{ color: stickerColor, top: offsetY, left: offsetX, position: "absolute" }} height={height} width={width} />
                <img className="buttonGuard" src={`./images/buttons/button-guard.png`} alt='button-guard' />
                <img src={`./images/buttons/btn-${buttonColor.toLowerCase()}-${side}.png`} alt='button sticker' />
                <$TextContainer offsetX={textOffsetX} offsetY={textOffsetY} color={textColor.toLowerCase()}>
                    {row === 1 ? (
                        <div>
                            <$IconContainer>
                                <Icon height="15px" width="15px" color={textColor} />
                            </$IconContainer>
                            <div>
                                {stickerTexts[text].text}
                            </div>
                        </div>
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
                    <$IconContainer posAbsolute={row !== 1} dispInline={row === 2} style={{ left: config[`Row${row}`][`icon${sideText}`].x, top: config[`Row${row}`][`icon${sideText}`].y }}>
                        <Icon height="15px" width="15px" color={textColor} />
                    </$IconContainer>
                }
            </$ButtonContainer>
        );
    }
}

export default GSIConfigButton;