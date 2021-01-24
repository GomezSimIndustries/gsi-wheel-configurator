import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import * as Stickers from './stickers';

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
            `
    }
        }
    }

    svg {
        position: absolute;
        fill: currentColor;
        
        /* top: -15px;
            left: -13px; */
    }
`;

const config = {
    Row1: {
        height: "74px",
        width: "108px",
        buttonLeft: {
            x: "125px",
            y: "26px",
        },
        buttonRight: {
            x: "770px",
            y: "27px",
        },
        stickerLeft: {
            x: "-17px",
            y: "-15px"
        },
        stickerRight: {
            x: "-52px",
            y: "-16px"
        }
    },
    Row2: {
        height: "94px",
        width: "80px",
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
        }
    },
    Row3: {
        height: "75px",
        width: "102px",
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
        }
    },
    Row4: {
        height: "75px",
        width: "102px",
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
        }
    },
    Row5: {
        height: "90px",
        width: "96",
        buttonLeft: {
            x: "256px",
            y: "366px",
        },
        buttonRight: {
            x: "637px",
            y: "366px",
        },
        stickerLeft: {
            x: "-33px",
            y: "-17px"
        },
        stickerRight: {
            x: "-18px",
            y: "-17px"
        }
    }
}

class GSIConfigButton extends Component {
    state = {}

    getSticker = () => {
        if (this.props.row == 1) {

        }
    }

    render() {
        const { x, y, side, row, buttonColor, stickerColor } = this.props;
        const sideText = side.charAt(0).toUpperCase() + side.slice(1);
        const Sticker = Stickers[`Row${row}${sideText}`];
        const height = config[`Row${row}`].height;
        const width = config[`Row${row}`].width;
        let offsetX;
        let offsetY;
        const buttonX = config[`Row${row}`][`button${sideText}`].x;
        const buttonY = config[`Row${row}`][`button${sideText}`].y;
        console.log(`./images/buttons/btn-${buttonColor.toLowerCase()}-${side}.png`);
        console.log("buttonY", buttonY);

        offsetX = config[`Row${row}`].[`sticker${sideText}`].x;
        offsetY = config[`Row${row}`].[`sticker${sideText}`].y;
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
                <Sticker style={{ color: stickerColor, top: offsetY, left: offsetX }} height={height} width={width} />
                <img className="buttonGuard" src={`./images/buttons/button-guard.png`} alt='button-guard' />
                <img src={`./images/buttons/btn-${buttonColor.toLowerCase()}-${side}.png`} alt='button sticker' />
            </$ButtonContainer>
        );
    }
}

export default GSIConfigButton;