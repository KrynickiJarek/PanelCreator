import { useState, useEffect, useCallback, memo } from 'react';
import update from 'immutability-helper';
import moment from 'moment';

import "./PanelPreview.scss"

// import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
// import Tooltip from 'react-bootstrap/Tooltip'

import LogoPure from "../../assets/preview/logopure.svg"

import Resize from "../../assets/scale/resize.svg"
import Zoomin from "../../assets/scale/zoomin.svg"
import Zoomout from "../../assets/scale/zoomout.svg"


import Alert from "../../assets/side/alert.svg"

import Visual from "../../assets/side/visual.svg"
import Clearall from "../../assets/side/clearall.svg"
import Clearallicons from "../../assets/side/clearallicons.svg"
import Clear from "../../assets/side/clear.svg"
import Anim from "../../assets/side/anim.svg"
import Animoff from "../../assets/side/animoff.svg"
import Rotateright from "../../assets/side/rotateright.svg"
import Rotateleft from "../../assets/side/rotateleft.svg"
import Textborder from "../../assets/side/textborder.svg"
import Textupoff from "../../assets/side/textupoff.svg"
import Textupon from "../../assets/side/textupon.svg"
import Clearalltext from "../../assets/side/clearalltext.svg"
import Setonefont from "../../assets/side/setonefont.svg"
import Submitinput from "../../assets/preview/submitinput.svg"
// import Remove from "../../assets/preview/remove.svg"
import Submitinputdark from "../../assets/preview/submitinputdark.svg"

import Addframe from "../../assets/frame/addframe.svg"
import Addframedark from "../../assets/frame/addframedark.svg"
import Removeframe from "../../assets/frame/removeframe.svg"
import Removeframehorizontal from "../../assets/frame/removeframehorizontal.svg"


import LCDPause from "../../assets/lcd/pause.svg"
import LCDPlay from "../../assets/lcd/play.svg"
import LCDPlus from "../../assets/lcd/plus.svg"
import LCDMinus from "../../assets/lcd/minus.svg"
import Minusuni from "../../assets/lcd/minusuni.svg"
import Leftuni from "../../assets/lcd/leftuni.svg"
import Rightuni from "../../assets/lcd/rightuni.svg"





import { IconHolder } from './IconHolder/IconHolder';

export const PanelPreview = memo(function MainCreator({ chosenModel, chosenColor, chosenTab, chosenFont, chosenFrameFont, chosenFrameShape }) {

    const [sc, setSc] = useState(5);

    const [visual, setVisual] = useState(true)
    const [visualChange, setVisualChange] = useState(true)
    const [animations, setAnimations] = useState(true)
    const [isAnySelected, setIsAnySelected] = useState(false)
    const [clear, setClear] = useState(false)
    const [rotateRight, setRotateRight] = useState(false)
    const [rotateLeft, setRotateLeft] = useState(false)

    const [showTextBorder, setShowTextBorder] = useState(true)
    const [textUpOff, setTextUpOff] = useState(true)


    const [newFrame, setNewFrame] = useState([]) //----------------------------------------------------------------FRAME
    const [newFrameChange, setNewFrameChange] = useState([]) //----------------------------------------------------------------FRAME
    const [tempFrame, setTempFrame] = useState([]) //----------------------------------------------------------------FRAME
    // const [newFrameMemo, setNewFrameMemo] = useState([]) //----------------------------------------------------------------FRAME

    const [rerender, setRerender] = useState(false)

    useEffect(() => {
    }, [rerender])


    let frameCellStyle = {}//----------------------------------------------------------------FRAME
    frameCellStyle.height = `${19.5 * sc}px`;
    frameCellStyle.width = "98%";
    frameCellStyle.top = `${0.7 * sc}px`;
    frameCellStyle.left = "1%";
    frameCellStyle.position = "absolute";
    frameCellStyle.borderRadius = `${3 * sc}px`;
    frameCellStyle.transition = "400ms ease";
    frameCellStyle.backgroundColor = "rgba(236, 105, 92, 0.75)";
    frameCellStyle.opacity = "0";


    if ((chosenTab === "frame")) {
        frameCellStyle.opacity = "1";
    }


    let frameClickStyle = {}
    frameClickStyle.height = "100%";
    frameClickStyle.width = "100%";
    frameClickStyle.position = "absolute";
    if ((chosenTab === "frame")) {
        frameClickStyle.cursor = "pointer";
        frameClickStyle.zIndex = "999";
    }

    let frameTempStyle = {}
    frameTempStyle.height = "100%";
    frameTempStyle.width = "100%";
    frameTempStyle.position = "absolute";
    frameTempStyle.transition = "width 400ms ease, height 400ms ease, border-color 400ms ease, border-width 0s";

    // if (chosenColor.iconColor){
    //     frameTempStyle.borderColor = chosenColor.iconColor;
    // } 

    // // frameTempStyle.border = "2px solid transparent";







    const handleFrameOver = ((index) => {
        const copyArr = newFrame;
        const copyArrChange = newFrameChange;

        if (copyArr[index] === 1) {
            copyArrChange[index] = "a";

            //poziomo: automatyczne zaznaczenie środkowego kiedy lewy był zaznaczony i zaznacza się prawy
            if (((index % 3) === 2) && copyArr[index - 2] === "s" && copyArr[index - 1] !== 0) {
                copyArrChange[index - 1] = "a";
            }
            //poziomo: automatyczne zaznaczenie środkowego kiedy prawy był zaznaczony i zaznacza się lewy
            if ((index % 3 === 0) && copyArr[index + 2] === "s" && copyArr[index + 1] !== 0) {
                copyArrChange[index + 1] = "a";
            }
            //pionowo: automatyczne zaznaczenie pośrednich kiedy wyżej był zaznaczony i zaznacza się nizszy
            for (let i = 0; i < index; i++) {
                if (i % 3 === index % 3 && copyArr[i] === "s" && i + 3 < index) {
                    for (let j = i; j < index; j++) {
                        if (j % 3 === index % 3) {
                            copyArrChange[j] = "a"
                        }
                    }
                }
            }
            //pionowo: automatyczne zaznaczenie pośrednich kiedy niżej był zaznaczony i zaznacza się wyższy
            for (let i = copyArr.length; i > index; i--) {
                if (i % 3 === index % 3 && copyArr[i] === "s" && i - 3 > index) {
                    for (let j = i; j > index; j--) {
                        if (j % 3 === index % 3) {
                            copyArrChange[j] = "a"
                        }
                    }
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, skrajne prawe
            for (let i = 0; i < index; i++) {
                if (copyArr[i] === "s" && i % 3 === 0 && index % 3 === 2) {
                    for (let j = i; j < index; j++) {
                        copyArrChange[j] = "a"
                    }
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, skrajne prawe ------------------------------xxxx
            for (let i = copyArr.length; i > index; i--) {
                if (copyArr[i] === "s" && i % 3 === 0 && index % 3 === 2) {
                    for (let j = i + 2; j >= index - 2; j--) {
                        copyArrChange[j] = "a"
                    }
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, skrajne lewe, tylko prawy zaznaczony
            for (let i = 2; i < index; i++) {
                if (copyArr[i] === "s" && i % 3 === 2 && index % 3 === 0) {
                    for (let j = i - 2; j < index + 2; j++) {
                        copyArrChange[j] = "a"
                    }
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, skrajne lewe, prawy i środkowy zaznaczony  
            for (let i = 0; i < index; i++) {
                if (copyArr[i] === "s" && copyArr[i + 1] === "s" && i % 3 === 1 && index % 3 === 0) {
                    for (let j = i - 1; j < index + 2; j++) {
                        copyArrChange[j] = "a"
                    }
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, skrajne lewe, zaznaczony tylko środkowy rząd ---przeanalizowane
            for (let i = 0; i < index; i++) {
                if (copyArr[i] === "s" && copyArr[i + 1] !== "s" && i % 3 === 1 && index % 3 === 0) {
                    for (let j = i - 1; j < index + 2; j++) {
                        if (j % 3 !== 2) {
                            copyArrChange[j] = "a"
                        }
                    }
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, środek, zaznaczony tylko prawy rząd
            for (let i = 0; i < index; i++) {
                if (copyArr[i] === "s" && copyArr[i - 1] !== "s" && i % 3 === 2 && index % 3 === 1) {
                    for (let j = i - 1; j < index + 1; j++) {
                        if (j % 3 !== 0) {
                            copyArrChange[j] = "a"
                        }
                    }
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, środek, zaznaczony tylko lewy rząd
            for (let i = copyArr.length; i > index; i--) {
                if (copyArr[i] === "s" && i % 3 === 0 && index % 3 === 1) {
                    for (let j = i + 1; j >= index - 1; j--) {
                        if (j % 3 !== 2) {
                            copyArrChange[j] = "a"
                        }
                    }
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, skrajne lewe
            for (let i = copyArr.length; i > index; i--) {
                if (copyArr[i] === "s" && i % 3 - 2 === index % 3) {
                    for (let j = i; j > index; j--) {
                        copyArrChange[j] = "a"
                    }
                }
            }

            //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, skrajne prawe----
            for (let i = copyArr.length - 1; i > index; i--) {
                if (copyArr[i] === "s" && copyArr[i - 1] === "s" && i % 3 === 1 && index % 3 === 2) {
                    for (let j = i + 1; j > index - 2; j--) {
                        copyArrChange[j] = "a"
                    }
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, zaznaczony tylko środkowy rząd
            for (let i = copyArr.length - 1; i > index; i--) {
                if (copyArr[i] === "s" && copyArr[i - 1] !== "s" && i % 3 === 1 && index % 3 === 2) {
                    for (let j = i + 1; j > index - 2; j--) {
                        if (j % 3 !== 0) {
                            copyArrChange[j] = "a"
                        }
                    }
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się niższy, sąsiednie lewe
            for (let i = 0; i < index; i++) {
                if (copyArr[i] === "s" && i % 3 === 0 && index % 3 === 1) {
                    for (let j = i; j < index; j++) {
                        if (j % 3 !== 2)
                            copyArrChange[j] = "a"
                    }
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, sąsiednie lewe
            for (let i = copyArr.length; i > index; i--) {
                if (copyArr[i] === "s" && i % 3 === 1 && index % 3 === 0) {
                    for (let j = i; j > index; j--)
                        if (j % 3 !== 2)
                            copyArrChange[j] = "a"
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, sąsiednie prawe
            for (let i = 0; i < index; i++) {
                if (copyArr[i] === "s" && i % 3 === 1 && index % 3 === 2) {
                    for (let j = i; j < index; j++)
                        if (j % 3 !== 0)
                            copyArrChange[j] = "a"
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, sąsiednie prawe
            for (let i = copyArr.length; i > index; i--) {
                if (copyArr[i] === "s" && i % 3 === 2 && index % 3 === 1) {
                    for (let j = i; j > index; j--)
                        if (j % 3 !== 0)
                            copyArrChange[j] = "a"
                }
            }
            //dodawanie rzędu na 3: automatyczne zaznaczenie całego rzędu kiedy niższy był zaznaczony i zaznacza się wyższy,
            for (let i = 0; i < index; i++) {
                if (copyArr[i] === "s" && i % 3 === 0 && copyArr[i + 1] === "s" && copyArr[i + 2] === "s") {
                    for (let j = i + 3; j < index; j++) {
                        copyArrChange[j] = "a"
                    }
                    if (index % 3 === 0) {
                        copyArrChange[index + 1] = "a"
                        copyArrChange[index + 2] = "a"
                    }
                    if (index % 3 === 1) {
                        copyArrChange[index + 1] = "a"
                    }
                }
            }
            //dodawanie rzędu na 3: automatyczne zaznaczenie całego rzędu kiedy wyższy był zaznaczony i zaznacza się niższy ,
            for (let i = copyArr.length; i > index; i--) {
                if (copyArr[i] === "s" && i % 3 === 2 && copyArr[i - 1] === "s" && copyArr[i - 2] === "s") {
                    for (let j = i - 3; j > index; j--) {
                        copyArrChange[j] = "a"
                    }
                    if (index % 3 === 2) {
                        copyArrChange[index - 1] = "a"
                        copyArrChange[index - 2] = "a"
                    }
                    if (index % 3 === 1) {
                        copyArrChange[index - 1] = "a"
                    }
                }
            }
            //dodawanie rzędu na 2 lewego: automatyczne zaznaczenie całego rzędu kiedy niższy był zaznaczony i zaznacza się wyższy,
            for (let i = 0; i < index; i++) {
                if (copyArr[i] === "s" && i % 3 === 0 && copyArr[i + 1] === "s") {
                    for (let j = i + 3; j < index; j++) {
                        if (j % 3 !== 2) {
                            copyArrChange[j] = "a"
                        }
                    }
                    if (index % 3 === 0) {
                        copyArrChange[index + 1] = "a"
                    }
                }
            }
            //dodawanie rzędu na 2 lewego: automatyczne zaznaczenie całego rzędu kiedy wyższy  był zaznaczony i zaznacza się niższy,
            for (let i = copyArr.length; i > index; i--) {
                if (copyArr[i] === "s" && i % 3 === 1 && copyArr[i - 1] === "s") {
                    for (let j = i - 3; j > index; j--) {
                        if (j % 3 !== 2) {
                            copyArrChange[j] = "a"
                        }
                    }
                    if (index % 3 === 1) {
                        copyArrChange[index - 1] = "a"
                    }
                }
            }
            //dodawanie rzędu na 2 prawego: automatyczne zaznaczenie całego rzędu kiedy niższy był zaznaczony i zaznacza się wyższy,
            for (let i = 0; i < index; i++) {
                if (copyArr[i] === "s" && i % 3 === 1 && copyArr[i + 1] === "s") {
                    for (let j = i + 3; j < index; j++) {
                        if (j % 3 !== 0) {
                            copyArrChange[j] = "a"
                        }
                    }
                    if (index % 3 === 1) {
                        copyArrChange[index + 1] = "a"
                    }
                }
            }
            //dodawanie rzędu na 2 prawego: automatyczne zaznaczenie całego rzędu kiedy wyższy był zaznaczony i zaznacza się niższy,
            for (let i = copyArr.length; i > index; i--) {
                if (copyArr[i] === "s" && i % 3 === 2 && copyArr[i - 1] === "s") {
                    for (let j = i - 3; j > index; j--) {
                        if (j % 3 !== 0) {
                            copyArrChange[j] = "a"
                        }
                    }
                    if (index % 3 === 2) {
                        copyArrChange[index - 1] = "a"
                    }
                }
            }
            // dodawanie prawej kolumny, dwie lewe zaznaczone, środek zaznaczony: 
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 0 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 3] === "s" && copyArr[i + 4] === "s" && index % 3 === 2) {
                    for (let j = copyArr.length - 1; j > i; j--) {
                        if (j % 3 === 1 && copyArr[j] === "s" && index <= j + 1 && index >= i + 2) {
                            for (let k = j + 1; k > i + 2; k--) {
                                if (k % 3 === 2) {
                                    copyArrChange[k] = "a"
                                }
                            }
                        }
                    }
                }
            }
            // dodawanie środkowej kolumny, lewa zaznaczona: 
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 0 && copyArr[i] === "s" && copyArr[i + 3] === "s" && index % 3 === 1) {
                    for (let j = copyArr.length - 2; j > i; j--) {
                        if (j % 3 === 0 && copyArr[j] === "s" && index <= j + 1 && index >= i + 1) {
                            for (let k = j + 1; k > i + 1; k--) {
                                if (k % 3 === 1) {
                                    copyArrChange[k] = "a"
                                }
                            }
                        }
                    }
                }
            }
            // dodawanie środkowej i prawej kolumny, lewa zaznaczona: 
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 0 && copyArr[i] === "s" && copyArr[i + 3] === "s" && index % 3 === 2) {
                    for (let j = copyArr.length; j > i; j--) {
                        if (j % 3 === 0 && copyArr[j] === "s" && index <= j + 2 && index >= i + 2) {
                            for (let k = j + 2; k > i + 1; k--) {
                                copyArrChange[k] = "a"
                            }
                        }
                    }
                }
            }
            // dodawanie środkowej kolumny, prawa zaznaczona: 
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 2 && copyArr[i] === "s" && copyArr[i + 3] === "s" && index % 3 === 1) {
                    for (let j = copyArr.length; j > i; j--) {
                        if (j % 3 === 2 && copyArr[j] === "s" && index <= j - 1 && index >= i - 1) {
                            for (let k = j - 1; k >= i - 1; k--) {
                                if (k % 3 === 1) {
                                    copyArrChange[k] = "a"
                                }
                            }
                        }
                    }
                }
            }
            // dodawanie lewej i środkowej kolumny, prawa zaznaczona: 
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 2 && copyArr[i] === "s" && copyArr[i + 3] === "s" && index % 3 === 0) {
                    for (let j = copyArr.length; j > i; j--) {
                        if (j % 3 === 2 && copyArr[j] === "s" && index <= j - 2 && index >= i - 2) {
                            for (let k = j - 1; k >= i - 2; k--) {
                                copyArrChange[k] = "a"
                            }
                        }
                    }
                }
            }

            for (let i = 0; i < copyArr.length; i++) {
                if (copyArr[i] === "s") {
                    copyArrChange[i] = 0
                }
            }




        } else if (copyArr[index] === "s") {
            copyArrChange[index] = "r";

            //automatyczne usuwanie dolnego rzędu - naciśnięcie na dół, cała góra zaznaczona
            for (let i = 0; i < index; i++) {
                if (i % 3 === 0 && i < index - 2 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] === "s") {
                    if (copyArr[index + 3] !== "s" && index % 3 === 0) {
                        for (let j = index; j < copyArr.length; j++) {
                            copyArrChange[j] = "r"
                        }
                    }
                    if (copyArr[index + 3] !== "s" && index % 3 === 2) {
                        for (let j = index - 2; j < copyArr.length; j++) {
                            copyArrChange[j] = "r"
                        }
                    }
                    if (index % 3 === 1) {
                        for (let j = index - 1; j < copyArr.length; j++) {
                            copyArrChange[j] = "r"
                        }
                    }
                }
            }
            //automatyczne usuwanie górnego rzędu - naciśnięcie na góre, cała szerokość zaznaczona
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 0 && copyArr[index - 3] !== "s" && copyArr[i] === "s" && copyArr[i + 5] === "s") {
                    if (index % 3 === 0) {
                        for (let j = index; j < index + 3; j++) {
                            copyArrChange[j] = "r"
                        }
                    }
                    if (index % 3 === 1) {
                        for (let j = index - 1; j < index + 2; j++) {
                            copyArrChange[j] = "r"
                        }
                    }
                    if (index % 3 === 2) {
                        for (let j = index - 2; j < index + 1; j++) {
                            copyArrChange[j] = "r"
                        }
                    }
                }
            }
            //automatyczne usuwanie prawej kolumny - naciśnięcie na prawą, lewa i środek zaznaczona
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 0 && index % 3 === 2 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] === "s") {
                    for (let j = i; j < copyArr.length; j++) {
                        if (j % 3 === 2) {
                            copyArrChange[j] = "r"
                        }
                    }
                }
            }
            //automatyczne usuwanie lewej kolumny - naciśnięcie na lewą, prawa i środek zaznaczona
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 0 && index % 3 === 0 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] === "s") {
                    for (let j = i; j < copyArr.length; j++) {
                        if (j % 3 === 0) {
                            copyArrChange[j] = "r"
                        }
                    }
                }
            }



            //dwa lewe zaznaczone
            //automatyczne usuwanie dolnego rzędu - naciśnięcie na dół, dwa lewe zaznaczone
            for (let i = 0; i < index; i++) {
                if (i % 3 === 0 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] !== "s") {
                    if (copyArr[index + 3] !== "s" && index % 3 === 0) {
                        for (let j = index; j < copyArr.length; j++) {
                            copyArrChange[j] = "r"
                        }
                    }
                    if (copyArr[index + 3] !== "s" && index % 3 === 1) {
                        for (let j = index - 1; j < copyArr.length; j++) {
                            copyArrChange[j] = "r"
                        }
                    }
                }
            }
            //automatyczne usuwanie dolnego rzędu - naciśnięcie na dół, dwa prawe zaznaczone
            for (let i = 0; i < index; i++) {
                if (i % 3 === 1 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i - 1] !== "s") {
                    if (copyArr[index + 3] !== "s" && index % 3 === 1) {
                        for (let j = index; j < copyArr.length; j++) {
                            copyArrChange[j] = "r"
                        }
                    }
                    if (copyArr[index + 3] !== "s" && index % 3 === 2) {
                        for (let j = index - 1; j < copyArr.length; j++) {
                            copyArrChange[j] = "r"
                        }
                    }
                }
            }
            //automatyczne usuwanie górnego rzędu - naciśnięcie na góre, dwa lewe zaznaczone
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 0 && copyArr[i + 2] !== "s" && copyArr[index - 3] !== "s" && copyArr[i] === "s" && copyArr[i + 4] === "s") {
                    if (index % 3 === 0) {
                        for (let j = index; j < index + 2; j++) {
                            copyArrChange[j] = "r"
                        }
                    }
                    if (index % 3 === 1) {
                        for (let j = index - 1; j < index + 1; j++) {
                            copyArrChange[j] = "r"
                        }
                    }
                }
            }
            //automatyczne usuwanie górnego rzędu - naciśnięcie na góre, dwa prawe zaznaczone
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 1 && copyArr[i - 1] !== "s" && copyArr[index - 3] !== "s" && copyArr[i] === "s" && copyArr[i + 4] === "s") {
                    if (index % 3 === 1) {
                        for (let j = index; j < index + 2; j++) {
                            copyArrChange[j] = "r"
                        }
                    }
                    if (index % 3 === 2) {
                        for (let j = index - 1; j < index + 1; j++) {
                            copyArrChange[j] = "r"
                        }
                    }
                }
            }

            //automatyczne usuwanie prawej kolumny - naciśnięcie na środek, lewa zaznaczona
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 0 && index % 3 === 1 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] !== "s") {
                    for (let j = i; j < copyArr.length; j++) {
                        if (j % 3 === 1) {
                            copyArrChange[j] = "r"
                        }
                    }
                }
            }
            //automatyczne usuwanie prawej kolumny - naciśnięcie na prawą, środkowa zaznaczona
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 1 && index % 3 === 2 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i - 1] !== "s") {
                    for (let j = i; j < copyArr.length; j++) {
                        if (j % 3 === 2) {
                            copyArrChange[j] = "r"
                        }
                    }
                }
            }
            //automatyczne usuwanie lewej kolumny - naciśnięcie na lewą, środek zaznaczona
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 0 && index % 3 === 0 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] !== "s") {
                    for (let j = i; j < copyArr.length; j++) {
                        if (j % 3 === 0) {
                            copyArrChange[j] = "r"
                        }
                    }
                }
            }
            // automatyczne usuwanie lewej kolumny - naciśnięcie na środkową, prawa zaznaczona
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 1 && index % 3 === 1 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i - 1] !== "s") {
                    for (let j = i; j < copyArr.length; j++) {
                        if (j % 3 === 1) {
                            copyArrChange[j] = "r"
                        }
                    }
                }
            }



            // automatyczne usuwanie prawej komórki - zaznaczony jeden rząd
            if ((index % 3 === 1) && copyArr[index - 1] === "s" && copyArr[index + 1] === "s" && copyArr[index + 3] !== "s" && copyArr[index - 3] !== "s") {
                copyArrChange[index + 1] = "r"
            }



            // automatyczne usuwanie dolnych komórek - zaznaczona lewa kolumna
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 0 && index % 3 === 0 && i < index && copyArr[i] === "s" && copyArr[i + 1] !== "s") {
                    for (let j = copyArr.length - 1; j > index; j--) {
                        if (j % 3 === 0) {
                            copyArrChange[j] = "r"
                        }
                    }
                }
            }
            // automatyczne usuwanie dolnych komórek - zaznaczona środkowa kolumna
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 1 && index % 3 === 1 && i < index && copyArr[i] === "s" && copyArr[i - 1] !== "s" && copyArr[i + 1] !== "s") {
                    for (let j = copyArr.length - 1; j > index; j--) {
                        if (j % 3 === 1) {
                            copyArrChange[j] = "r"
                        }
                    }
                }
            }
            // automatyczne usuwanie dolnych komórek - zaznaczona prawa kolumna
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 2 && index % 3 === 2 && i < index && copyArr[i] === "s" && copyArr[i - 1] !== "s") {
                    for (let j = copyArr.length - 1; j > index; j--) {
                        if (j % 3 === 2) {
                            copyArrChange[j] = "r"
                        }
                    }
                }
            }


            for (let i = 0; i < copyArr.length; i++) {
                if (copyArr[i] !== "s") {
                    copyArrChange[i] = 0
                }
            }
        }



        setNewFrameChange(copyArrChange);
        setRerender(prev => !prev)
    });

    const handleFrameLeave = ((index) => {
        const arrNewFrameChange = [];
        chosenModel.dotLocation.forEach(element => {
            arrNewFrameChange.push(element)
        });
        setNewFrameChange(arrNewFrameChange);
        setRerender(prev => !prev)
    });
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    const handleFrameClick = ((index) => {
        const copyArr = newFrame;
        const copyTempArr = tempFrame;
        if (copyArr[index] === 1) {
            copyArr[index] = "s";

            //poziomo: automatyczne zaznaczenie środkowego kiedy lewy był zaznaczony i zaznacza się prawy
            if (((index % 3) === 2) && copyArr[index - 2] === "s" && copyArr[index - 1] !== 0) {
                copyArr[index - 1] = "s";
            }
            //poziomo: automatyczne zaznaczenie środkowego kiedy prawy był zaznaczony i zaznacza się lewy
            if ((index % 3 === 0) && copyArr[index + 2] === "s" && copyArr[index + 1] !== 0) {
                copyArr[index + 1] = "s";
            }
            //pionowo: automatyczne zaznaczenie pośrednich kiedy wyżej był zaznaczony i zaznacza się nizszy
            for (let i = 0; i < index; i++) {
                if (i % 3 === index % 3 && copyArr[i] === "s" && i + 3 < index) {
                    copyArr[i + 3] = "s"
                }
            }
            //pionowo: automatyczne zaznaczenie pośrednich kiedy niżej był zaznaczony i zaznacza się wyższy -----------------------------------------analiza
            for (let i = copyArr.length; i > index; i--) {
                if (i % 3 === index % 3 && copyArr[i] === "s" && i - 3 > index) {
                    copyArr[i - 3] = "s"
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, skrajne prawe
            for (let i = 0; i < index; i++) {
                if (copyArr[i] === "s" && i % 3 === 0 && index % 3 === 2) {
                    for (let j = i; j < index; j++) {
                        copyArr[j] = "s"
                    }
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, skrajne prawe ------------------------------xxxx
            for (let i = copyArr.length; i > index; i--) {
                if (copyArr[i] === "s" && i % 3 === 0 && index % 3 === 2) {
                    for (let j = i + 2; j > index - 2; j--) {
                        copyArr[j] = "s"
                    }
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, skrajne lewe, tylko prawy zaznaczony
            for (let i = 2; i < index; i++) {
                if (copyArr[i] === "s" && i % 3 === 2 && index % 3 === 0) {
                    for (let j = i - 2; j < index + 2; j++) {
                        copyArr[j] = "s"
                    }
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, skrajne lewe, prawy i środkowy zaznaczony  
            for (let i = 0; i < index; i++) {
                if (copyArr[i] === "s" && copyArr[i + 1] === "s" && i % 3 === 1 && index % 3 === 0) {
                    for (let j = i - 1; j < index + 2; j++) {
                        copyArr[j] = "s"
                    }
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, skrajne lewe, zaznaczony tylko środkowy rząd
            for (let i = 0; i < index; i++) {
                if (copyArr[i] === "s" && copyArr[i + 1] !== "s" && i % 3 === 1 && index % 3 === 0) {
                    for (let j = i - 1; j < index + 2; j++) {
                        if (j % 3 !== 2) {
                            copyArr[j] = "s"
                        }
                    }
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, środek, zaznaczony tylko prawy rząd
            for (let i = 0; i < index; i++) {
                if (copyArr[i] === "s" && copyArr[i - 1] !== "s" && i % 3 === 2 && index % 3 === 1) {
                    for (let j = i - 1; j < index + 1; j++) {
                        if (j % 3 !== 0) {
                            copyArr[j] = "s"
                        }
                    }
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, środek, zaznaczony tylko lewy rząd
            for (let i = copyArr.length; i > index; i--) {
                if (copyArr[i] === "s" && i % 3 === 0 && index % 3 === 1) {
                    for (let j = i + 1; j > index - 1; j--) {
                        if (j % 3 !== 2) {
                            copyArr[j] = "s"
                        }
                    }
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, skrajne lewe
            for (let i = copyArr.length; i > index; i--) {
                if (copyArr[i] === "s" && i % 3 - 2 === index % 3) {
                    for (let j = i; j > index; j--) {
                        copyArr[j] = "s"
                    }
                }
            }

            //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, skrajne prawe----
            for (let i = copyArr.length - 1; i > index; i--) {
                if (copyArr[i] === "s" && copyArr[i - 1] === "s" && i % 3 === 1 && index % 3 === 2) {
                    for (let j = i + 1; j > index - 2; j--) {
                        copyArr[j] = "s"
                    }
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, zaznaczony tylko środkowy rząd
            for (let i = copyArr.length - 1; i > index; i--) {
                if (copyArr[i] === "s" && copyArr[i - 1] !== "s" && i % 3 === 1 && index % 3 === 2) {
                    for (let j = i + 1; j > index - 2; j--) {
                        if (j % 3 !== 0) {
                            copyArr[j] = "s"
                        }
                    }
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się niższy, sąsiednie lewe
            for (let i = 0; i < index; i++) {
                if (copyArr[i] === "s" && i % 3 === 0 && index % 3 === 1) {
                    for (let j = i; j < index; j++) {
                        if (j % 3 !== 2)
                            copyArr[j] = "s"
                    }
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, sąsiednie lewe
            for (let i = copyArr.length; i > index; i--) {
                if (copyArr[i] === "s" && i % 3 === 1 && index % 3 === 0) {
                    for (let j = i; j > index; j--)
                        if (j % 3 !== 2)
                            copyArr[j] = "s"
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy niższy był zaznaczony i zaznacza się wyższy, sąsiednie prawe
            for (let i = 0; i < index; i++) {
                if (copyArr[i] === "s" && i % 3 === 1 && index % 3 === 2) {
                    for (let j = i; j < index; j++)
                        if (j % 3 !== 0)
                            copyArr[j] = "s"
                }
            }
            //3d: automatyczne zaznaczenie pośrednich kiedy wyższy był zaznaczony i zaznacza się niższy, sąsiednie prawe
            for (let i = copyArr.length; i > index; i--) {
                if (copyArr[i] === "s" && i % 3 === 2 && index % 3 === 1) {
                    for (let j = i; j > index; j--)
                        if (j % 3 !== 0)
                            copyArr[j] = "s"
                }
            }
            //dodawanie rzędu na 3: automatyczne zaznaczenie całego rzędu kiedy niższy był zaznaczony i zaznacza się wyższy,
            for (let i = 0; i < index; i++) {
                if (copyArr[i] === "s" && i % 3 === 0 && copyArr[i + 1] === "s" && copyArr[i + 2] === "s") {
                    for (let j = i + 3; j < index; j++) {
                        copyArr[j] = "s"
                    }
                    if (index % 3 === 0) {
                        copyArr[index + 1] = "s"
                        copyArr[index + 2] = "s"
                    }
                    if (index % 3 === 1) {
                        copyArr[index + 1] = "s"
                    }
                }
            }
            //dodawanie rzędu na 3: automatyczne zaznaczenie całego rzędu kiedy wyższy był zaznaczony i zaznacza się niższy ,
            for (let i = copyArr.length; i > index; i--) {
                if (copyArr[i] === "s" && i % 3 === 2 && copyArr[i - 1] === "s" && copyArr[i - 2] === "s") {
                    for (let j = i - 3; j > index; j--) {
                        copyArr[j] = "s"
                    }
                    if (index % 3 === 2) {
                        copyArr[index - 1] = "s"
                        copyArr[index - 2] = "s"
                    }
                    if (index % 3 === 1) {
                        copyArr[index - 1] = "s"
                    }
                }
            }
            //dodawanie rzędu na 2 lewego: automatyczne zaznaczenie całego rzędu kiedy niższy był zaznaczony i zaznacza się wyższy,
            for (let i = 0; i < index; i++) {
                if (copyArr[i] === "s" && i % 3 === 0 && copyArr[i + 1] === "s") {
                    for (let j = i + 3; j < index; j++) {
                        if (j % 3 !== 2) {
                            copyArr[j] = "s"
                        }
                    }
                    if (index % 3 === 0) {
                        copyArr[index + 1] = "s"
                    }
                }
            }
            //dodawanie rzędu na 2 lewego: automatyczne zaznaczenie całego rzędu kiedy wyższy  był zaznaczony i zaznacza się niższy,
            for (let i = copyArr.length; i > index; i--) {
                if (copyArr[i] === "s" && i % 3 === 1 && copyArr[i - 1] === "s") {
                    for (let j = i - 3; j > index; j--) {
                        if (j % 3 !== 2) {
                            copyArr[j] = "s"
                        }
                    }
                    if (index % 3 === 1) {
                        copyArr[index - 1] = "s"
                    }
                }
            }
            //dodawanie rzędu na 2 prawego: automatyczne zaznaczenie całego rzędu kiedy niższy był zaznaczony i zaznacza się wyższy,
            for (let i = 0; i < index; i++) {
                if (copyArr[i] === "s" && i % 3 === 1 && copyArr[i + 1] === "s") {
                    for (let j = i + 3; j < index; j++) {
                        if (j % 3 !== 0) {
                            copyArr[j] = "s"
                        }
                    }
                    if (index % 3 === 1) {
                        copyArr[index + 1] = "s"
                    }
                }
            }
            //dodawanie rzędu na 2 prawego: automatyczne zaznaczenie całego rzędu kiedy wyższy był zaznaczony i zaznacza się niższy,
            for (let i = copyArr.length; i > index; i--) {
                if (copyArr[i] === "s" && i % 3 === 2 && copyArr[i - 1] === "s") {
                    for (let j = i - 3; j > index; j--) {
                        if (j % 3 !== 0) {
                            copyArr[j] = "s"
                        }
                    }
                    if (index % 3 === 2) {
                        copyArr[index - 1] = "s"
                    }
                }
            }
            // dodawanie prawej kolumny, dwie lewe zaznaczone, środek zaznaczony: 
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 0 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 3] === "s" && copyArr[i + 4] === "s" && index % 3 === 2) {
                    for (let j = copyArr.length - 1; j > i; j--) {
                        if (j % 3 === 1 && copyArr[j] === "s" && index <= j + 1 && index >= i + 2) {
                            for (let k = j + 1; k > i + 2; k--) {
                                if (k % 3 === 2) {
                                    copyArr[k] = "s"
                                }
                            }
                        }
                    }
                }
            }
            // dodawanie środkowej kolumny, lewa zaznaczona: 
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 0 && copyArr[i] === "s" && copyArr[i + 3] === "s" && index % 3 === 1) {
                    for (let j = copyArr.length - 2; j > i; j--) {
                        if (j % 3 === 0 && copyArr[j] === "s" && index <= j + 1 && index >= i + 1) {
                            for (let k = j + 1; k > i + 1; k--) {
                                if (k % 3 === 1) {
                                    copyArr[k] = "s"
                                }
                            }
                        }
                    }
                }
            }
            // dodawanie środkowej i prawej kolumny, lewa zaznaczona: 
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 0 && copyArr[i] === "s" && copyArr[i + 3] === "s" && index % 3 === 2) {
                    for (let j = copyArr.length; j > i; j--) {
                        if (j % 3 === 0 && copyArr[j] === "s" && index <= j + 2 && index >= i + 2) {
                            for (let k = j + 2; k > i + 1; k--) {
                                copyArr[k] = "s"
                            }
                        }
                    }
                }
            }
            // dodawanie środkowej kolumny, prawa zaznaczona: 
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 2 && copyArr[i] === "s" && copyArr[i + 3] === "s" && index % 3 === 1) {
                    for (let j = copyArr.length; j > i; j--) {
                        if (j % 3 === 2 && copyArr[j] === "s" && index <= j - 1 && index >= i - 1) {
                            for (let k = j - 1; k >= i - 1; k--) {
                                if (k % 3 === 1) {
                                    copyArr[k] = "s"
                                }
                            }
                        }
                    }
                }
            }
            // dodawanie lewej i środkowej kolumny, prawa zaznaczona: 
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 2 && copyArr[i] === "s" && copyArr[i + 3] === "s" && index % 3 === 0) {
                    for (let j = copyArr.length; j > i; j--) {
                        if (j % 3 === 2 && copyArr[j] === "s" && index <= j - 2 && index >= i - 2) {
                            for (let k = j - 1; k >= i - 2; k--) {
                                copyArr[k] = "s"
                            }
                        }
                    }
                }
            }






        } else if (copyArr[index] === "s") {
            copyArr[index] = 1;

            //automatyczne usuwanie dolnego rzędu - naciśnięcie na dół, cała góra zaznaczona
            for (let i = 0; i < index; i++) {
                if (i % 3 === 0 && i < index - 2 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] === "s") {
                    if (copyArr[index + 3] !== "s" && index % 3 === 0) {
                        for (let j = index; j < copyArr.length; j++) {
                            copyArr[j] = 1
                        }
                    }
                    if (copyArr[index + 3] !== "s" && index % 3 === 2) {
                        for (let j = index - 2; j < copyArr.length; j++) {
                            copyArr[j] = 1
                        }
                    }
                    if (index % 3 === 1) {
                        for (let j = index - 1; j < copyArr.length; j++) {
                            copyArr[j] = 1
                        }
                    }
                }
            }
            //automatyczne usuwanie górnego rzędu - naciśnięcie na góre, cała szerokość zaznaczona
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 0 && copyArr[index - 3] !== "s" && copyArr[i] === "s" && copyArr[i + 5] === "s") {
                    if (index % 3 === 0) {
                        for (let j = index; j < index + 3; j++) {
                            copyArr[j] = 1
                        }
                    }
                    if (index % 3 === 1) {
                        for (let j = index - 1; j < index + 2; j++) {
                            copyArr[j] = 1
                        }
                    }
                    if (index % 3 === 2) {
                        for (let j = index - 2; j < index + 1; j++) {
                            copyArr[j] = 1
                        }
                    }
                }
            }
            //automatyczne usuwanie prawej kolumny - naciśnięcie na prawą, lewa i środek zaznaczona
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 0 && index % 3 === 2 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] === "s") {
                    for (let j = i; j < copyArr.length; j++) {
                        if (j % 3 === 2) {
                            copyArr[j] = 1
                        }
                    }
                }
            }
            //automatyczne usuwanie lewej kolumny - naciśnięcie na lewą, prawa i środek zaznaczona
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 0 && index % 3 === 0 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] === "s") {
                    for (let j = i; j < copyArr.length; j++) {
                        if (j % 3 === 0) {
                            copyArr[j] = 1
                        }
                    }
                }
            }



            //dwa lewe zaznaczone
            //automatyczne usuwanie dolnego rzędu - naciśnięcie na dół, dwa lewe zaznaczone
            for (let i = 0; i < index; i++) {
                if (i % 3 === 0 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] !== "s") {
                    if (copyArr[index + 3] !== "s" && index % 3 === 0) {
                        for (let j = index; j < copyArr.length; j++) {
                            copyArr[j] = 1
                        }
                    }
                    if (copyArr[index + 3] !== "s" && index % 3 === 1) {
                        for (let j = index - 1; j < copyArr.length; j++) {
                            copyArr[j] = 1
                        }
                    }
                }
            }
            //automatyczne usuwanie dolnego rzędu - naciśnięcie na dół, dwa prawe zaznaczone
            for (let i = 0; i < index; i++) {
                if (i % 3 === 1 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i - 1] !== "s") {
                    if (copyArr[index + 3] !== "s" && index % 3 === 1) {
                        for (let j = index; j < copyArr.length; j++) {
                            copyArr[j] = 1
                        }
                    }
                    if (copyArr[index + 3] !== "s" && index % 3 === 2) {
                        for (let j = index - 1; j < copyArr.length; j++) {
                            copyArr[j] = 1
                        }
                    }
                }
            }
            //automatyczne usuwanie górnego rzędu - naciśnięcie na góre, dwa lewe zaznaczone
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 0 && copyArr[i + 2] !== "s" && copyArr[index - 3] !== "s" && copyArr[i] === "s" && copyArr[i + 4] === "s") {
                    if (index % 3 === 0) {
                        for (let j = index; j < index + 2; j++) {
                            copyArr[j] = 1
                        }
                    }
                    if (index % 3 === 1) {
                        for (let j = index - 1; j < index + 1; j++) {
                            copyArr[j] = 1
                        }
                    }
                }
            }
            //automatyczne usuwanie górnego rzędu - naciśnięcie na góre, dwa prawe zaznaczone
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 1 && copyArr[i - 1] !== "s" && copyArr[index - 3] !== "s" && copyArr[i] === "s" && copyArr[i + 4] === "s") {
                    if (index % 3 === 1) {
                        for (let j = index; j < index + 2; j++) {
                            copyArr[j] = 1
                        }
                    }
                    if (index % 3 === 2) {
                        for (let j = index - 1; j < index + 1; j++) {
                            copyArr[j] = 1
                        }
                    }
                }
            }

            //automatyczne usuwanie prawej kolumny - naciśnięcie na środek, lewa zaznaczona
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 0 && index % 3 === 1 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] !== "s") {
                    for (let j = i; j < copyArr.length; j++) {
                        if (j % 3 === 1) {
                            copyArr[j] = 1
                        }
                    }
                }
            }
            //automatyczne usuwanie prawej kolumny - naciśnięcie na prawą, środkowa zaznaczona
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 1 && index % 3 === 2 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i - 1] !== "s") {
                    for (let j = i; j < copyArr.length; j++) {
                        if (j % 3 === 2) {
                            copyArr[j] = 1
                        }
                    }
                }
            }
            //automatyczne usuwanie lewej kolumny - naciśnięcie na lewą, środek zaznaczona
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 0 && index % 3 === 0 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i + 2] !== "s") {
                    for (let j = i; j < copyArr.length; j++) {
                        if (j % 3 === 0) {
                            copyArr[j] = 1
                        }
                    }
                }
            }
            // automatyczne usuwanie lewej kolumny - naciśnięcie na środkową, prawa zaznaczona
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 1 && index % 3 === 1 && copyArr[i] === "s" && copyArr[i + 1] === "s" && copyArr[i - 1] !== "s") {
                    for (let j = i; j < copyArr.length; j++) {
                        if (j % 3 === 1) {
                            copyArr[j] = 1
                        }
                    }
                }
            }



            // automatyczne usuwanie prawej komórki - zaznaczony jeden rząd
            if ((index % 3 === 1) && copyArr[index - 1] === "s" && copyArr[index + 1] === "s" && copyArr[index + 3] !== "s" && copyArr[index - 3] !== "s") {
                copyArr[index + 1] = 1
            }



            // automatyczne usuwanie dolnych komórek - zaznaczona lewa kolumna
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 0 && index % 3 === 0 && i < index && copyArr[i] === "s" && copyArr[i + 1] !== "s") {
                    for (let j = copyArr.length - 1; j > index; j--) {
                        if (j % 3 === 0) {
                            copyArr[j] = 1
                        }
                    }
                }
            }
            // automatyczne usuwanie dolnych komórek - zaznaczona środkowa kolumna
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 1 && index % 3 === 1 && i < index && copyArr[i] === "s" && copyArr[i - 1] !== "s" && copyArr[i + 1] !== "s") {
                    for (let j = copyArr.length - 1; j > index; j--) {
                        if (j % 3 === 1) {
                            copyArr[j] = 1
                        }
                    }
                }
            }
            // automatyczne usuwanie dolnych komórek - zaznaczona prawa kolumna
            for (let i = 0; i < copyArr.length; i++) {
                if (i % 3 === 2 && index % 3 === 2 && i < index && copyArr[i] === "s" && copyArr[i - 1] !== "s") {
                    for (let j = copyArr.length - 1; j > index; j--) {
                        if (j % 3 === 2) {
                            copyArr[j] = 1
                        }
                    }
                }
            }
        }

        for (let i = 0; i < copyArr.length; i++) {
            if (copyArr[i] !== "s") {
                copyTempArr[i].t = 0
                copyTempArr[i].r = 0
                copyTempArr[i].b = 0
                copyTempArr[i].l = 0
            }

            if (copyArr[i] === "s" && copyArr[i - 3] !== "s") {
                copyTempArr[i].t = 1
            }
            if (copyArr[i] === "s" && copyArr[i - 3] === "s") {
                copyTempArr[i].t = 0
            }
            if (copyArr[i] === "s" && copyArr[i + 3] !== "s") {
                copyTempArr[i].b = 1
            }
            if (copyArr[i] === "s" && copyArr[i + 3] === "s") {
                copyTempArr[i].b = 0
            }


            if (copyArr[i] === "s" && copyArr[i - 1] !== "s" && i % 3 !== 0) {
                copyTempArr[i].l = 1
            } else if (copyArr[i] === "s" && i % 3 === 0) {
                copyTempArr[i].l = 1
            }
            if (copyArr[i] === "s" && copyArr[i - 1] === "s" && i % 3 !== 0) {
                copyTempArr[i].l = 0
            }

            if (copyArr[i] === "s" && copyArr[i + 1] !== "s" && i % 3 !== 2) {
                copyTempArr[i].r = 1
            } else if (copyArr[i] === "s" && i % 3 === 2) {
                copyTempArr[i].r = 1
            }
            if (copyArr[i] === "s" && copyArr[i + 1] === "s" && i % 3 !== 2) {
                copyTempArr[i].r = 0
            }





            if (copyTempArr[i].t === 1 && copyTempArr[i].l === 1) {
                copyTempArr[i].rtl = 3
            }
            if (copyTempArr[i].t === 1 && copyTempArr[i].r === 1) {
                copyTempArr[i].rtr = 3
            }
            if (copyTempArr[i].b === 1 && copyTempArr[i].r === 1) {
                copyTempArr[i].rbr = 3
            }
            if (copyTempArr[i].b === 1 && copyTempArr[i].l === 1) {
                copyTempArr[i].rbl = 3
            }

            if (copyTempArr[i].t === 1 && copyTempArr[i].l !== 1) {
                copyTempArr[i].rtl = 0
            }
            if (copyTempArr[i].t !== 1 && copyTempArr[i].l === 1) {
                copyTempArr[i].rtl = 0
            }
            if (copyTempArr[i].t === 1 && copyTempArr[i].r !== 1) {
                copyTempArr[i].rtr = 0
            }
            if (copyTempArr[i].t !== 1 && copyTempArr[i].r === 1) {
                copyTempArr[i].rtr = 0
            }
            if (copyTempArr[i].b === 1 && copyTempArr[i].r !== 1) {
                copyTempArr[i].rbr = 0
            }
            if (copyTempArr[i].b !== 1 && copyTempArr[i].r === 1) {
                copyTempArr[i].rbr = 0
            }
            if (copyTempArr[i].b === 1 && copyTempArr[i].l !== 1) {
                copyTempArr[i].rbl = 0
            }
            if (copyTempArr[i].b !== 1 && copyTempArr[i].l === 1) {
                copyTempArr[i].rbl = 0
            }


        }


        const arrNewFrameChange = [];
        chosenModel.dotLocation.forEach(element => {
            arrNewFrameChange.push(element)
        });
        setNewFrameChange(arrNewFrameChange);


        setNewFrame(copyArr);
        setTempFrame(copyTempArr);
        // setNewFrameMemo(copyArr);
        setRerender(prev => !prev)
    });



















    const handleZoomOut = () => {
        (sc > 4) && setSc(prev => prev - 0.5)
    }
    const handleResize = () => {
        setSc(5)
    }

    const handleZoomIn = () => {
        (sc < 8) && setSc(prev => prev + 0.5)
    }


    let panelPreviewStyle = {};
    panelPreviewStyle.width = `${(chosenModel.width * 5) + 280}px`;
    if (chosenModel.type === "MDOT-18 poziomy") {
        panelPreviewStyle.width = `${(chosenModel.height * 5) + 450}px`;
    }


    let chosenModelStyle = {};
    chosenModelStyle.backgroundColor = chosenColor.hex;
    chosenModelStyle.height = `${chosenModel.height * sc}px`;
    chosenModelStyle.width = `${chosenModel.width * sc}px`;
    chosenModelStyle.transition = "background-color 400ms ease,height 400ms ease, width 400ms ease, transform 800ms ease-in-out";
    if (chosenModel.type === "MDOT-18 poziomy") {
        chosenModelStyle.transform = "rotate(-90deg)"
    }


    let contentStyle = {};
    contentStyle.height = `${chosenModel.height * sc - ((chosenModel.marginTop * sc) + (chosenModel.marginBottom * sc))}px`;
    contentStyle.width = `${chosenModel.width * sc - (chosenModel.marginSide * 2 * sc)}px`;
    contentStyle.margin = `${chosenModel.marginTop * sc}px ${chosenModel.marginSide * sc}px ${chosenModel.marginBottom * sc}px`
    contentStyle.transition = "400ms ease";

    let cellStyle = {};
    cellStyle.position = "relative";
    cellStyle.transition = "400ms ease";

    let resizeStyle = {};
    resizeStyle.transition = "400ms ease";


    let universalIconBoxStyle = {};
    universalIconBoxStyle.height = `${60 * sc}px`;
    universalIconBoxStyle.width = `${70.4 * sc}px`;
    universalIconBoxStyle.transition = "400ms ease";

    let universalIconStyle = {};
    universalIconStyle.height = `${7.5 * sc}px`;
    universalIconStyle.width = `${7.5 * sc}px`;
    universalIconStyle.transition = "400ms ease";

    let vusialStyle = {}
    vusialStyle.width = `${chosenModel.width * sc}px`;
    vusialStyle.height = `${chosenModel.height * sc}px`;
    if (chosenModel.type === "MDOT-18 poziomy") {
        vusialStyle.width = `${chosenModel.height * sc}px`;
        vusialStyle.height = `${chosenModel.width * sc}px`;
        vusialStyle.transform = "rotate(90deg)";
        vusialStyle.transformOrigin = `${chosenModel.width * 0.5 * sc}px ${chosenModel.width * 0.5 * sc}px`;
    }

    if (!visual) {
        universalIconStyle.filter = "grayscale(100%) invert(1) brightness(10) drop-shadow( 0 0 4px rgba(255, 255, 255, 1))";
    } else if (chosenColor.iconColor === "white") {
        universalIconStyle.filter = "grayscale(100%) invert(1) brightness(10)";
    } else {
        universalIconStyle.filter = "grayscale(100%) brightness(0)";
    }

    const [panelContainerHeight, setPanelContainerHeight] = useState("100%")
    const [panelContainerWidth, setPanelContainerWidth] = useState("100%")

    useEffect(() => {
        setPanelContainerHeight(document.querySelector(".panel_container").clientHeight)
        setPanelContainerWidth(document.querySelector(".panel_container").clientWidth)
    }, [panelContainerHeight, panelContainerWidth]);

    if ((chosenModel.type !== "MDOT-18 poziomy") && (panelContainerHeight < (chosenModel.height * sc))) {
        resizeStyle.height = `${(chosenModel.height * sc) + 50}px`;
    } else if ((chosenModel.type === "MDOT-18 poziomy") && (panelContainerHeight < (chosenModel.width * sc))) {
        resizeStyle.height = `${(chosenModel.width * sc) + 50}px`;
    }
    else {
        resizeStyle.height = "100%";
    }

    if ((chosenModel.type !== "MDOT-18 poziomy") && (panelContainerWidth < (chosenModel.width * sc))) {
        resizeStyle.width = `${(chosenModel.width * sc) + 50}px`;
    } else if ((chosenModel.type === "MDOT-18 poziomy") && (panelContainerWidth < (chosenModel.height * sc))) {
        resizeStyle.width = `${(chosenModel.height * sc) + 50}px`;
    }
    else {
        resizeStyle.width = "100%";
    }

    // const [panelContainerHeight, setPanelContainerHeight] = useState("100%") // ----------- stara wersja, przed MDOT-18 poziomy
    // const [panelContainerWidth, setPanelContainerWidth] = useState("100%")
    // if (!panelContainerHeight || (panelContainerHeight < (chosenModel.height * sc))) {
    //     resizeStyle.height = `${(chosenModel.height * sc) + 50}px`;
    // } else {
    //     resizeStyle.height = "100%";
    // }

    // if (!panelContainerWidth || (panelContainerWidth < (chosenModel.width * sc))) {
    //     resizeStyle.width = `${(chosenModel.width * sc) + 50}px`;
    // } else {
    //     resizeStyle.width = "100%";
    // }

    // window.addEventListener('resize', handleResize)


    const logoStyle = {};
    logoStyle.height = `${3.9 * sc}px`;
    logoStyle.width = `${15.9 * sc}px`;
    logoStyle.filter = "invert(79%) sepia(5%) saturate(8%) hue-rotate(322deg) brightness(84%) contrast(83%)";
    logoStyle.bottom = `${5 * sc}px`;
    logoStyle.right = `${5 * sc}px`;

    if (chosenModel.type === "MDOT-18 poziomy") {
        logoStyle.bottom = `${5 * sc}px`;
        logoStyle.left = `${5 * sc}px`;
        logoStyle.transform = "translate(-100%,0) rotate(90deg)  ";
        logoStyle.transformOrigin = "bottom right";
    }

    const lcdStyle = {};
    lcdStyle.transition = "400ms ease";
    if (chosenModel.lcdScreen) {
        lcdStyle.height = `${chosenModel.lcdScreen.lcdHeight * sc}px`;
        lcdStyle.width = `${chosenModel.lcdScreen.lcdWidth * sc}px`;
        lcdStyle.top = `${chosenModel.lcdScreen.lcdTop * sc}px`;
        lcdStyle.left = `${chosenModel.lcdScreen.lcdLeft * sc}px`;
    }

    const lcdIconStyle = {};
    lcdIconStyle.height = `${7 * sc}px`;
    lcdIconStyle.width = `${7 * sc}px`;


    const autoResizeInputStyle = {};
    autoResizeInputStyle.fontSize = `${2 * sc}px`;
    autoResizeInputStyle.lineHeight = `${2 * sc}px`;
    autoResizeInputStyle.height = `${3.6 * sc}px`;
    autoResizeInputStyle.width = `${10 * sc}px`;
    autoResizeInputStyle.transition = "400ms ease";
    autoResizeInputStyle.position = "absolute";
    autoResizeInputStyle.display = "inline-grid";
    autoResizeInputStyle.alignItems = "center";
    autoResizeInputStyle.justifyItems = "center";

    const textStyle = {};
    textStyle.backgroundColor = "transparent";
    textStyle.color = chosenColor.iconColor;
    textStyle.border = "2px solid transparent"
    textStyle.borderRadius = `${0.9 * sc}px`;
    textStyle.fontSize = `${2 * sc}px`
    textStyle.lineHeight = `${2 * sc}px`;
    textStyle.height = `${3.6 * sc}px`;
    textStyle.gridArea = "1 / 1 / 2 / 2";
    textStyle.width = "100%";
    textStyle.transition = "400ms ease";


    const [isFocusedInputIndex, setIsFocusedInputIndex] = useState(null)
    const [isFocusedInputSide, setIsFocusedInputSide] = useState(null)

    if ((chosenTab === "text") && showTextBorder) {
        textStyle.border = "2px solid rgb(236, 105, 92)"
    }

    if (!visual) {
        textStyle.color = "white";
        textStyle.textShadow = "0 0 5px rgba(255, 255, 255, 1)";
    }



    function showBorder(e) {
        if ((chosenTab === "text") && !showTextBorder && !isFocusedInputIndex) {
            e.target.style.border = "2px solid rgb(236, 105, 92)"
        }
    }

    // function showActiveBorder(e) {
    //     if (chosenTab === "text" ){
    //         e.target.style.border = "2px solid rgb(32, 114, 30)"
    //     }
    // }

    function hideBorder(e) {
        if ((chosenTab === "text") && !showTextBorder && !isFocusedInputIndex) {
            e.target.style.border = "2px solid transparent"
        }
    }


    const [time, setTime] = useState(moment().format('HH:mm'));
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(moment().format('HH:mm'));
            setDate(moment().format('YYYY-MM-DD'));
        }, 5000)
        return () => clearInterval(intervalID);
    }, [time])

    const [iconHolders, setIconHolders] = useState([])
    const [lcdShow, setLcdShow] = useState(chosenModel.lcdScreen ? true : false)
    const [lcdNew, setLcdNew] = useState((chosenModel.lcdScreen && chosenModel.lcdScreen.lcdType === "slide") ? true : false)
    // const [showUniversalIcons, setShowUniversalIcons] = useState(chosenModel.type === "MDOT-M18 uniwersalny" ? true : false)
    const [hideAll, setHideAll] = useState(true)

    useEffect(() => {
        setVisualChange(true)
        const arrIconHolders = [];
        const arrNewFrame = [];
        const arrNewFrameChange = [];
        const arrTempFrame = [];
        setHideAll(false)
        const modeltimeout = setTimeout(() => {
            setHideAll(true)
            chosenModel.dotLocation.forEach(element => {
                arrIconHolders.push({
                    flag: element, lastDroppedDot: null, lastDroppedIcon: null, lastDroppedSlashUp: null, lastDroppedSlashDown: null,
                    selectedDot: false, selected: false, selectedUp: false, selectedDown: false,
                    textUp: "", fontUp: null, textDown: "", fontDown: null,
                })
            });
            chosenModel.dotLocation.forEach(element => {
                arrNewFrame.push(element)
            });
            chosenModel.dotLocation.forEach(element => {
                arrNewFrameChange.push(element)
            });
            chosenModel.dotLocation.forEach(element => {
                arrTempFrame.push({
                    flag: element,
                    rtl: 0, rtr: 0, rbr: 0, rbl: 0,
                    t: 0, r: 0, b: 0, l: 0,
                    textUp: "", frameFont: null,
                })
            });
            setNewFrame(arrNewFrame)//----------------------------------------------------------------FRAME
            setNewFrameChange(arrNewFrameChange)//----------------------------------------------------------------FRAME???
            setTempFrame(arrTempFrame)//----------------------------------------------------------------FRAME
            setIconHolders(arrIconHolders);
            chosenModel.lcdScreen ? setLcdShow(true) : setLcdShow(false);
            (chosenModel.lcdScreen && chosenModel.lcdScreen.lcdType === "slide") ? setLcdNew(true) : setLcdNew(false);
            setVisualChange(false)
        }, 300);
        return () => clearTimeout(modeltimeout);
    }, [chosenModel]);



    // const handleDrag = () => { //---zacina mdot 9 i mdot 15
    //     const copyArr = iconHolders;
    //     copyArr.forEach((el) => {
    //         el.selectedDot = false;
    //         el.selected = false;
    //         el.selectedUp = false;
    //         el.selectedDown = false;
    //     })
    //     setIconHolders(copyArr)
    //     // setRerender(prev => !prev)
    //     console.log("NOW")//------------------------powoduje częste przeładowanie
    // }

    const handleDrag = useCallback((index, item) => {
        // console.log("NOW")//------------------------powoduje częste przeładowanie
        setIconHolders(update(iconHolders, {
            [index]: {
                selectedDot: {
                    $set: false,
                },
                selected: {
                    $set: false,
                },
                selectedUp: {
                    $set: false,
                },
                selectedDown: {
                    $set: false,
                }
            },
        }));
    }, [iconHolders]);

    const handleDropDot = useCallback((index, item) => {
        const copyArr = iconHolders;
        copyArr.forEach((el) => {
            el.selectedDot = false;
            el.selected = false;
            el.selectedUp = false;
            el.selectedDown = false;
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                lastDroppedDot: {
                    $set: item,
                }
            },
        }));
    }, [iconHolders]);

    const handleResetDot = useCallback((index, item) => {
        setClear(false)
        const copyArr = iconHolders;
        copyArr.forEach((el) => {
            el.selectedDot = false;
            el.selected = false;
            el.selectedUp = false;
            el.selectedDown = false;
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                lastDroppedDot: {
                    $set: null,
                }
            },
        }));
    }, [iconHolders]);

    const handleDropIcon = useCallback((index, item) => {
        const copyArr = iconHolders;
        copyArr.forEach((el) => {
            el.selectedDot = false;
            el.selected = false;
            el.selectedUp = false;
            el.selectedDown = false;
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                lastDroppedIcon: {
                    $set: item,
                },
                lastDroppedSlashUp: {
                    $set: null,
                },
                lastDroppedSlashDown: {
                    $set: null,
                },
            },
        }));
    }, [iconHolders]);


    const handleReset = useCallback((index, item) => {
        setClear(false)
        const copyArr = iconHolders;
        copyArr.forEach((el) => {
            el.selectedDot = false;
            el.selected = false;
            el.selectedUp = false;
            el.selectedDown = false;
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                lastDroppedIcon: {
                    $set: null,
                }
            },
        }));
    }, [iconHolders]);



    const handleDropSlashUp = useCallback((index, item) => {
        const copyArr = iconHolders;
        copyArr.forEach((el) => {
            el.selectedDot = false;
            el.selected = false;
            el.selectedUp = false;
            el.selectedDown = false;
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                lastDroppedSlashUp: {
                    $set: item,
                },
                lastDroppedIcon: {
                    $set: null,
                }
            },
        }));
    }, [iconHolders]);

    const handleResetUp = useCallback((index, item) => {
        setClear(false)
        const copyArr = iconHolders;
        copyArr.forEach((el) => {
            el.selectedDot = false;
            el.selected = false;
            el.selectedUp = false;
            el.selectedDown = false;
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                lastDroppedSlashUp: {
                    $set: null,
                }
            },
        }));
    }, [iconHolders]);


    const handleDropSlashDown = useCallback((index, item) => {
        const copyArr = iconHolders;
        copyArr.forEach((el) => {
            el.selectedDot = false;
            el.selected = false;
            el.selectedUp = false;
            el.selectedDown = false;
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                lastDroppedSlashDown: {
                    $set: item,
                },
                lastDroppedIcon: {
                    $set: null,
                }
            },
        }));
    }, [iconHolders]);

    const handleResetDown = useCallback((index, item) => {
        setClear(false)
        const copyArr = iconHolders;
        copyArr.forEach((el) => {
            el.selectedDot = false;
            el.selected = false;
            el.selectedUp = false;
            el.selectedDown = false;
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                lastDroppedSlashDown: {
                    $set: null,
                }
            },
        }));
    }, [iconHolders]);


    //--------------------------------------------------------------------------------------SELECTY+

    useEffect(() => {
        if (chosenTab !== "icons") {
            const copyArr = iconHolders;
            copyArr.forEach((el) => {
                el.selectedDot = false;
                el.selected = false;
                el.selectedUp = false;
                el.selectedDown = false;
            })
            setIconHolders(copyArr)
            setIsAnySelected(false)
            setRerender(prev => !prev)
        }
    }, [chosenTab, iconHolders]);


    const handleSelect = useCallback((index, item) => {
        const copyArr = iconHolders;
        copyArr.forEach((el, i) => {
            if (i === index) {
                el.selectedDot = false;
                el.selectedUp = false;
                el.selectedDown = false;
            } else {
                el.selectedDot = false;
                el.selected = false;
                el.selectedUp = false;
                el.selectedDown = false;
            }
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                selected: {
                    $set: !iconHolders[index].selected,
                }
            },
        }));
    }, [iconHolders]);



    const handleSelectDot = useCallback((index, item) => {
        const copyArr = iconHolders;
        copyArr.forEach((el, i) => {
            if (i === index) {
                el.selected = false;
                el.selectedUp = false;
                el.selectedDown = false;
            } else {
                el.selectedDot = false;
                el.selected = false;
                el.selectedUp = false;
                el.selectedDown = false;
            }
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                selectedDot: {
                    $set: !iconHolders[index].selectedDot,
                }
            },
        }));
    }, [iconHolders]);


    const handleSelectDown = useCallback((index, item) => {
        const copyArr = iconHolders;
        copyArr.forEach((el, i) => {
            if (i === index) {
                el.selectedDot = false;
                el.selected = false;
                el.selectedUp = false;
            } else {
                el.selectedDot = false;
                el.selected = false;
                el.selectedUp = false;
                el.selectedDown = false;
            }
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                selectedDown: {
                    $set: !iconHolders[index].selectedDown,
                }
            },
        }));
    }, [iconHolders]);


    const handleSelectUp = useCallback((index, item) => {
        const copyArr = iconHolders;
        copyArr.forEach((el, i) => {
            if (i === index) {
                el.selectedDot = false;
                el.selected = false;
                el.selectedDown = false;
            } else {
                el.selectedDot = false;
                el.selected = false;
                el.selectedUp = false;
                el.selectedDown = false;
            }
        })
        setIconHolders(copyArr)
        setIconHolders(update(iconHolders, {
            [index]: {
                selectedUp: {
                    $set: !iconHolders[index].selectedUp,
                }
            },
        }));
    }, [iconHolders]);


    const handleVisual = () => {
        setVisual(prev => !prev)
    }

    const handleClearAll = () => {
        const tempArr = [];
        setHideAll(false)
        const modeltimeout = setTimeout(() => {
            setHideAll(true)
            chosenModel.dotLocation.forEach(element => {
                tempArr.push({
                    flag: element, lastDroppedDot: null, lastDroppedIcon: null, lastDroppedSlashUp: null, lastDroppedSlashDown: null,
                    selectedDot: false, selected: false, selectedUp: false, selectedDown: false,
                    textUp: "", fontUp: null, textDown: "", fontDown: null,
                })
            });
            setIconHolders(tempArr);
            chosenModel.lcdScreen ? setLcdShow(true) : setLcdShow(false)
        }, 300);
        return () => clearTimeout(modeltimeout);
    }

    const handleClearAllIcons = () => {
        const copyArr = iconHolders;
        copyArr.forEach((el) => {
            el.lastDroppedDot = null;
            el.lastDroppedIcon = null;
            el.lastDroppedSlashUp = null;
            el.lastDroppedSlashDown = null;
            el.selectedDot = false;
            el.selected = false;
            el.selectedUp = false;
            el.selectedDown = false;
        })
        setIconHolders(copyArr)
        setRerender(prev => !prev)
    }

    const [showRemoveIcons, setShowRemoveIcons] = useState(false)

    const handleShowClearAllIcons = () => {
        setShowRemoveIcons(true)
    }
    const handleHideClearAllIcons = () => {
        setShowRemoveIcons(false)
    }

    const [showRemoveIcon, setShowRemoveIcon] = useState(false)

    const handleShowClearIcon = () => {
        setShowRemoveIcon(true)
    }
    const handleHideClearIcon = () => {
        setShowRemoveIcon(false)
    }

    useEffect(() => {
        setIsAnySelected(false)
        iconHolders.forEach((el) => {
            if (el.selectedDot || el.selected || el.selectedUp || el.selectedDown || el.selectedDot) {
                setIsAnySelected(true)
            }
        })
    }, [iconHolders, isAnySelected]);


    const handleClearIcon = () => {
        if (isAnySelected) {
            setClear(true)
        }
        setIsAnySelected(false)
    }

    const handleAnimation = () => {
        setAnimations(prev => !prev)
    }

    const handleRotateRight = () => {
        setRotateRight(prev => !prev)
    }

    const handleRotateLeft = () => {
        setRotateLeft(prev => !prev)
    }

    const handleTextBorder = () => {
        setShowTextBorder(prev => !prev)
    }

    const handleTextUpOff = () => {
        setTextUpOff(prev => !prev)
        const copyArr = iconHolders;
        copyArr.forEach((el) => {
            el.textUp = "";
            el.fontUp = null;
        })
        setIconHolders(copyArr)
    }

    const handleClearAllText = () => {
        const copyArr = iconHolders;
        copyArr.forEach((el) => {
            el.textUp = "";
            el.fontUp = null;
            el.textDown = "";
            el.fontDown = null;
        })
        setIconHolders(copyArr)
        setRerender(prev => !prev)
    }



    // const renderTooltip = (props) => (
    //     <Tooltip id="button-tooltip" {...props}>
    //         Simple tooltip
    //     </Tooltip>
    // );

    const handleChangeTextUp = useCallback((index, text) => {
        setIconHolders(update(iconHolders, {
            [index]: {
                textUp: {
                    $set: text.target.value.toUpperCase(),
                }
            },
        }));
    }, [iconHolders]);


    const handleChangeTextDown = useCallback((index, text) => {
        setIconHolders(update(iconHolders, {
            [index]: {
                textDown: {
                    $set: text.target.value.toUpperCase(),
                }
            },
        }));
    }, [iconHolders]);

    const handleChangeFontDown = useCallback((index) => {
        setIconHolders(update(iconHolders, {
            [index]: {
                fontDown: {
                    $set: chosenFont,
                }
            },
        }));
    }, [iconHolders, chosenFont]);

    const handleChangeFontUp = useCallback((index) => {
        setIconHolders(update(iconHolders, {
            [index]: {
                fontUp: {
                    $set: chosenFont,
                }
            },
        }));
    }, [iconHolders, chosenFont]);



    const handleSetOneFont = () => {
        const copyArr = iconHolders;
        copyArr.forEach((el) => {
            el.fontUp = chosenFont;
            el.fontDown = chosenFont;
        })
        setIconHolders(copyArr)
        setDifferentFont(false)
        setRerender(prev => !prev)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleFocusInput = (index, side) => {
        setIsFocusedInputIndex(index)
        setIsFocusedInputSide(side)
    }

    const handleBlurInput = (index, side) => {
        setIsFocusedInputIndex(null)
        setIsFocusedInputSide(null)
    }


    const [differentFont, setDifferentFont] = useState(false)
    useEffect(() => {
        const copyArr = iconHolders;
        const checkArr = []
        copyArr.forEach((el) => {
            if (el.fontDown && el.textDown && !checkArr.includes(el.fontDown)) {
                checkArr.push(el.fontDown)
            }
            if (el.fontUp && el.textUp && !checkArr.includes(el.fontUp)) {
                checkArr.push(el.fontUp)
            }
        })
        if (checkArr.length > 1) {
            setDifferentFont(true)
        } else {
            setDifferentFont(false)
        }
    }, [iconHolders]);



    return (
        <div className="panelpreview_container" style={panelPreviewStyle}>
            <div className="preview_container">
                <div className="preview_top">
                    <h2>PODGLĄD PANELU</h2>
                </div>
                <div className="panel_container">
                    <div className="resize_container" style={resizeStyle}>
                        <div className="panel_box" style={chosenModelStyle}>

                            {/* <> ----Backup
                                    <div className="visualization_frame" style={!visual ? { border: `4px groove ${chosenColor.hex}`, opacity: "1", boxShadow: "rgba(0, 0, 0, 0.55) 10px 5px 20px" } : { opacity: "0" }} />
                                    <div className="visualization_frame" style={!visual ? { border: `4px groove white`, opacity: "0.2" } : { opacity: "0" }} />
                                    {(lcdShow && !visual) && <div style={{ ...lcdStyle, position: "absolute", backgroundColor: "#141414" }} />}
                                    <div className="visualization_glass" style={!visual ? { opacity: "1" } : { opacity: "0" }} />
                                    <div className="visualization_glass_bis" style={!visual ? { opacity: "1" } : { opacity: "0" }} />
                                    <div className="visualization_glass_white" style={(!visual && chosenColor.RAL === "9003") ? { opacity: "1" } : { opacity: "0" }} />
                                    <div className="visualization_frame" style={!visual ? { border: "2px outset #d4d4d4", opacity: "0.8" } : { opacity: "0" }} />
                                    <img src={LogoPure} alt="logo" className="logo_pure" style={!visual ? { ...logoStyle, opacity: "1" } : { ...logoStyle, opacity: "0" }} />
                                </> */}

                            {!visualChange &&
                                <>
                                    <div className="visualization_frame" style={!visual ? { ...vusialStyle, border: `4px groove ${chosenColor.hex}`, opacity: "1", boxShadow: "rgba(0, 0, 0, 0.55) 10px 5px 20px" } : { ...vusialStyle, opacity: "0" }} />
                                    <div className="visualization_frame" style={!visual ? { ...vusialStyle, border: `4px groove white`, opacity: "0.2" } : { ...vusialStyle, opacity: "0" }} />
                                    {(lcdShow && !visual) && <div style={{ ...lcdStyle, position: "absolute", backgroundColor: "#141414" }} />}
                                    <div className="visualization_glass" style={!visual ? { ...vusialStyle, opacity: "1" } : { ...vusialStyle, opacity: "0" }} />
                                    <div className="visualization_glass_bis" style={!visual ? { ...vusialStyle, opacity: "1" } : { ...vusialStyle, opacity: "0" }} />
                                    <div className="visualization_glass_white" style={(!visual && chosenColor.RAL === "9003") ? { ...vusialStyle, opacity: "1" } : { ...vusialStyle, opacity: "0" }} />
                                    <div className="visualization_frame" style={!visual ? { ...vusialStyle, border: "2px outset #d4d4d4", opacity: "0.8" } : { ...vusialStyle, opacity: "0" }} />
                                    <img src={LogoPure} alt="logo" className="logo_pure" style={!visual ? { ...logoStyle, opacity: "1" } : { ...logoStyle, opacity: "0" }} />
                                </>}






                            <div className="panel_content" style={{ ...contentStyle, position: "absolute" }}>
                                {hideAll &&
                                    <>
                                        {newFrame.map((el, index) =>
                                            <div key={index}
                                                style={
                                                    ((index + 2) % 3 === 0) ?
                                                        (
                                                            ((index > iconHolders.length - 4) ? { ...cellStyle, width: `${chosenModel.centerCellWidth * sc}px`, height: `${chosenModel.lastRowHeight * sc}px` }
                                                                : { ...cellStyle, width: `${chosenModel.centerCellWidth * sc}px`, height: `${chosenModel.rowHeight * sc}px` })
                                                        )
                                                        : (
                                                            ((index > iconHolders.length - 4) ? { ...cellStyle, width: `${chosenModel.sideCellWidth * sc}px`, height: `${chosenModel.lastRowHeight * sc}px` }
                                                                : { ...cellStyle, width: `${chosenModel.sideCellWidth * sc}px`, height: `${chosenModel.rowHeight * sc}px` })
                                                        )} >

                                                {el !== 0 &&

                                                    <div style={el === 1 ? { ...frameCellStyle } : 
                                                    chosenColor.hex !== "#2fa32c"?
                                                    { ...frameCellStyle, backgroundColor: "rgba(40, 167, 69, 0.75)" }
                                                    :{ ...frameCellStyle, backgroundColor: "rgba(32, 114, 30, 0.75)" }} >
                                                        <div style={frameClickStyle}
                                                            onClick={() => handleFrameClick(index)}
                                                            onMouseOver={() => handleFrameOver(index)}
                                                            onMouseLeave={() => handleFrameLeave(index)}
                                                        />
                                                    </div>
                                                }
                                            </div>
                                        )
                                        }
                                    </>}
                            </div>


                            <div className="panel_content" style={{ ...contentStyle, position: "absolute" }}>
                                {hideAll &&
                                    <>
                                        {newFrameChange.map((el, index) =>
                                            <div key={index}
                                                style={
                                                    ((index + 2) % 3 === 0) ?
                                                        (
                                                            ((index > iconHolders.length - 4) ? { ...cellStyle, width: `${chosenModel.centerCellWidth * sc}px`, height: `${chosenModel.lastRowHeight * sc}px` }
                                                                : { ...cellStyle, width: `${chosenModel.centerCellWidth * sc}px`, height: `${chosenModel.rowHeight * sc}px` })
                                                        )
                                                        : (
                                                            ((index > iconHolders.length - 4) ? { ...cellStyle, width: `${chosenModel.sideCellWidth * sc}px`, height: `${chosenModel.lastRowHeight * sc}px` }
                                                                : { ...cellStyle, width: `${chosenModel.sideCellWidth * sc}px`, height: `${chosenModel.rowHeight * sc}px` })
                                                        )} >

                                                <div style={{ ...frameCellStyle, backgroundColor: "none"}} >
                                                    < img src={chosenColor.hex !== "#2fa32c"? Addframe : Addframedark} alt="addframe" className="frame_change" style={el === "a" ? { opacity: "1"}: {opacity: "0"}} />
                                                    < img src={chosenModel.type !== "MDOT-18 poziomy" ? Removeframe : Removeframehorizontal} alt="removeframe" className="frame_change" style={el === "r" ? { opacity: "1"}: {opacity: "0"}} />
                                                </div>
                                            </div>
                                        )
                                        }
                                    </>}
                            </div>

                            <div className="panel_content" style={{ ...contentStyle, position: "absolute" }}>
                                {hideAll &&
                                    <>
                                        {tempFrame.map((el, index) =>
                                            <div key={index}
                                                style={
                                                    ((index + 2) % 3 === 0) ?
                                                        (
                                                            ((index > iconHolders.length - 4) ? { ...cellStyle, width: `${chosenModel.centerCellWidth * sc}px`, height: `${chosenModel.lastRowHeight * sc}px` }
                                                                : { ...cellStyle, width: `${chosenModel.centerCellWidth * sc}px`, height: `${chosenModel.rowHeight * sc}px` })
                                                        )
                                                        : (
                                                            ((index > iconHolders.length - 4) ? { ...cellStyle, width: `${chosenModel.sideCellWidth * sc}px`, height: `${chosenModel.lastRowHeight * sc}px` }
                                                                : { ...cellStyle, width: `${chosenModel.sideCellWidth * sc}px`, height: `${chosenModel.rowHeight * sc}px` })
                                                        )} >

                                                {el !== 0 &&
                                                    <div style={chosenFrameShape === "sharp" ? { ...frameTempStyle, borderColor: `${chosenColor.iconColor}`, borderRadius: "0" } :
                                                        { ...frameTempStyle, borderColor: `${chosenColor.iconColor}`, borderRadius: `${el.rtl * sc}px ${el.rtr * sc}px ${el.rbr * sc}px ${el.rbl * sc}px` }}
                                                        className={`border_top${el.t} border_right${el.r} border_bottom${el.b} border_left${el.l}`}
                                                    />
                                                }
                                            </div>
                                        )}
                                    </>}
                            </div>















                            <div className="panel_content" style={contentStyle}>

                                {hideAll &&
                                    <>
                                        {iconHolders.map(({ flag, lastDroppedIcon, lastDroppedDot, lastDroppedSlashUp, lastDroppedSlashDown, selected, selectedDot, selectedUp, selectedDown,
                                            textUp, fontUp, textDown, fontDown,
                                        }, index) =>
                                            <div key={index}
                                                style={
                                                    ((index + 2) % 3 === 0) ?
                                                        (
                                                            ((index > iconHolders.length - 4) ? { ...cellStyle, width: `${chosenModel.centerCellWidth * sc}px`, height: `${chosenModel.lastRowHeight * sc}px` }
                                                                : { ...cellStyle, width: `${chosenModel.centerCellWidth * sc}px`, height: `${chosenModel.rowHeight * sc}px` })
                                                        )
                                                        : (
                                                            ((index > iconHolders.length - 4) ? { ...cellStyle, width: `${chosenModel.sideCellWidth * sc}px`, height: `${chosenModel.lastRowHeight * sc}px` }
                                                                : { ...cellStyle, width: `${chosenModel.sideCellWidth * sc}px`, height: `${chosenModel.rowHeight * sc}px` })
                                                        )}>
                                                {flag === 1 &&
                                                    <>
                                                        <div className="text_box" style={chosenTab === "text" ? { zIndex: "999" } : { zIndex: "0" }}>
                                                            <div className="text_box" style={chosenModel.type !== "MDOT-18 poziomy" ? { transition: "0.4s ease" } : { transform: "rotate(90deg)", transformOrigin: `center ${10.4 * sc}px`, transition: "0.4s ease" }}>
                                                                {textUpOff &&
                                                                    <form onSubmit={handleSubmit}>
                                                                        <div style={chosenModel.type !== "MDOT-18 poziomy" ?
                                                                            { ...autoResizeInputStyle, top: `${-1.5 * sc}px`, fontFamily: fontUp }
                                                                            :
                                                                            { ...autoResizeInputStyle, top: `${2.85 * sc}px`, fontFamily: fontUp }}>
                                                                            <input className="text_input"
                                                                                type="text"
                                                                                maxLength="25"
                                                                                style={(isFocusedInputIndex === index && isFocusedInputSide === "up") ?
                                                                                    (
                                                                                        (chosenColor.hex !== "#2fa32c") ? {
                                                                                            ...textStyle,
                                                                                            fontFamily: fontUp,
                                                                                            border: "2px solid rgb(40, 167, 69)"
                                                                                        } :
                                                                                            {
                                                                                                ...textStyle,
                                                                                                fontFamily: fontUp,
                                                                                                border: "2px solid rgb(32, 114, 30)",
                                                                                            }
                                                                                    )
                                                                                    : {
                                                                                        ...textStyle,
                                                                                        fontFamily: fontUp,
                                                                                    }}
                                                                                disabled={chosenTab !== "text" && true}
                                                                                onMouseOver={showBorder}
                                                                                onMouseLeave={hideBorder}
                                                                                value={textUp}
                                                                                onChange={(text) => handleChangeTextUp(index, text)}
                                                                                onClick={() => handleChangeFontUp(index)}
                                                                                onFocus={() => { handleFocusInput(index, "up") }}
                                                                                onBlur={handleBlurInput}
                                                                            />
                                                                            <span style={{ gridArea: '1 / 1 / 2 / 2', visibility: 'hidden', padding: "0 5px", whiteSpace: "pre" }}>
                                                                                {textUp}
                                                                            </span>
                                                                            {(isFocusedInputIndex === index && isFocusedInputSide === "up" && chosenColor.hex !== "#2fa32c") &&
                                                                                <input type="image" src={Submitinput} alt="submitinput"
                                                                                    style={{
                                                                                        height: `${3.6 * sc}px`,
                                                                                        width: `${3.6 * sc}px`,
                                                                                        transform: "translateX(75%)",
                                                                                        gridArea: '1 / 1 / 2 / 2'
                                                                                    }}
                                                                                />
                                                                            }
                                                                            {(isFocusedInputIndex === index && isFocusedInputSide === "up" && chosenColor.hex === "#2fa32c") &&
                                                                                <input type="image" src={Submitinputdark} alt="submitinput"
                                                                                    style={{
                                                                                        height: `${3.6 * sc}px`,
                                                                                        width: `${3.6 * sc}px`,
                                                                                        transform: "translateX(75%)",
                                                                                        gridArea: '1 / 1 / 2 / 2'
                                                                                    }}
                                                                                />
                                                                            }
                                                                        </div>
                                                                    </form>
                                                                }
                                                                <form onSubmit={handleSubmit}>
                                                                    <div style={{ ...autoResizeInputStyle, top: `${14.35 * sc}px`, fontFamily: fontDown }}>
                                                                        <input className="text_input"
                                                                            type="text"
                                                                            maxLength="25"
                                                                            style={(isFocusedInputIndex === index && isFocusedInputSide === "down") ?
                                                                                (
                                                                                    (chosenColor.hex !== "#2fa32c") ? {
                                                                                        ...textStyle,
                                                                                        fontFamily: fontDown,
                                                                                        border: "2px solid rgb(40, 167, 69)"
                                                                                    } :
                                                                                        {
                                                                                            ...textStyle,
                                                                                            fontFamily: fontDown,
                                                                                            border: "2px solid rgb(32, 114, 30)"
                                                                                        }
                                                                                )
                                                                                : {
                                                                                    ...textStyle,
                                                                                    fontFamily: fontDown
                                                                                }}
                                                                            disabled={chosenTab !== "text" && true}
                                                                            onMouseOver={showBorder}
                                                                            onMouseLeave={hideBorder}
                                                                            value={textDown}
                                                                            onChange={(text) => handleChangeTextDown(index, text)}
                                                                            onClick={() => handleChangeFontDown(index)}
                                                                            onFocus={() => { handleFocusInput(index, "down") }}
                                                                            onBlur={handleBlurInput}
                                                                        />
                                                                        <span style={{ gridArea: '1 / 1 / 2 / 2', visibility: 'hidden', padding: "0 5px", whiteSpace: "pre" }}>
                                                                            {textDown}
                                                                        </span>
                                                                        {(isFocusedInputIndex === index && isFocusedInputSide === "down" && chosenColor.hex !== "#2fa32c") &&
                                                                            <input type="image" src={Submitinput} alt="submitinput"
                                                                                style={{
                                                                                    height: `${3.6 * sc}px`,
                                                                                    width: `${3.6 * sc}px`,
                                                                                    transform: "translateX(75%)",
                                                                                    gridArea: '1 / 1 / 2 / 2'
                                                                                }}
                                                                            />
                                                                        }
                                                                        {(isFocusedInputIndex === index && isFocusedInputSide === "down" && chosenColor.hex === "#2fa32c") &&
                                                                            <input type="image" src={Submitinputdark} alt="submitinput"
                                                                                style={{
                                                                                    height: `${3.6 * sc}px`,
                                                                                    width: `${3.6 * sc}px`,
                                                                                    transform: "translateX(75%)",
                                                                                    gridArea: '1 / 1 / 2 / 2'
                                                                                }}
                                                                            />
                                                                        }
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>


                                                        <IconHolder
                                                            chosenColor={chosenColor}
                                                            lastDroppedDot={lastDroppedDot} onDropDot={(item) => handleDropDot(index, item)}
                                                            lastDroppedIcon={lastDroppedIcon} onDrop={(item) => handleDropIcon(index, item)}
                                                            lastDroppedSlashUp={lastDroppedSlashUp} onDropSlashUp={(item) => handleDropSlashUp(index, item)}
                                                            lastDroppedSlashDown={lastDroppedSlashDown} onDropSlashDown={(item) => handleDropSlashDown(index, item)}
                                                            onReset={(item) => handleReset(index, item)}
                                                            onResetDot={(item) => handleResetDot(index, item)}
                                                            onResetUp={(item) => handleResetUp(index, item)}
                                                            onResetDown={(item) => handleResetDown(index, item)}
                                                            scale={sc}
                                                            onSelect={(item) => handleSelect(index, item)}
                                                            onSelectDot={(item) => handleSelectDot(index, item)}
                                                            onSelectUp={(item) => handleSelectUp(index, item)}
                                                            onSelectDown={(item) => handleSelectDown(index, item)}
                                                            selectedDot={selectedDot}
                                                            selected={selected}
                                                            selectedUp={selectedUp}
                                                            selectedDown={selectedDown}
                                                            onDrag={(item) => handleDrag(index, item)}
                                                            // onDrag={handleDrag}
                                                            animations={animations}
                                                            clear={clear}
                                                            rotateRight={rotateRight}
                                                            rotateLeft={rotateLeft}
                                                            visual={visual}
                                                            chosenTab={chosenTab}
                                                            showRemoveIcon={showRemoveIcon}
                                                            showRemoveIcons={showRemoveIcons}
                                                            chosenModel={chosenModel}
                                                        />
                                                    </>}
                                            </div>
                                        )}























                                        {(lcdShow && visual) && <div className="lcd" style={{ ...lcdStyle, borderColor: chosenColor.iconColor }} />}
                                        {(lcdShow && !visual && lcdNew) &&
                                            <div className="lcd_visual" style={{ ...lcdStyle, padding: `${2 * sc}px ${1 * sc}px` }}>
                                                <div className="lcd_icon_box">
                                                    < img src={LCDPause} alt="pause" className="lcd_icon" style={lcdIconStyle} />
                                                    < img src={LCDPlay} alt="play" className="lcd_icon" style={lcdIconStyle} />
                                                </div>

                                                <div>
                                                    <p className="lcd_clock" style={{ fontSize: `${3 * sc}px`, lineHeight: `${3.3 * sc}px` }}>{date}</p>
                                                    <p className="lcd_clock" style={{ fontSize: `${5 * sc}px`, lineHeight: `${5.5 * sc}px` }}>{time}</p>
                                                </div>

                                                <div className="lcd_icon_box">
                                                    < img src={LCDMinus} alt="minus" className="lcd_icon" style={lcdIconStyle} />
                                                    < img src={LCDPlus} alt="plus" className="lcd_icon" style={lcdIconStyle} />
                                                </div>
                                            </div>
                                        }
                                        {(lcdShow && !visual && !lcdNew) &&
                                            <div className="lcd_visual" style={{ ...lcdStyle, padding: `${2 * sc}px ${1 * sc}px`, justifyContent: "center" }}>
                                                <p className="lcd_clock" style={{ fontSize: `${3 * sc}px`, lineHeight: `${3.3 * sc}px` }}>{date}</p>
                                                <p className="lcd_clock" style={{ fontSize: `${5 * sc}px`, lineHeight: `${5.5 * sc}px` }}>{time}</p>
                                            </div>
                                        }
                                        {(lcdShow && !visual && lcdNew) &&
                                            <div className="lcd_visual" style={{ ...lcdStyle, padding: `${2 * sc}px ${1 * sc}px` }}>
                                                <div className="lcd_icon_box">
                                                    < img src={LCDPause} alt="pause" className="lcd_icon" style={lcdIconStyle} />
                                                    < img src={LCDPlay} alt="play" className="lcd_icon" style={lcdIconStyle} />
                                                </div>

                                                <div>
                                                    <p className="lcd_clock" style={{ fontSize: `${3 * sc}px`, lineHeight: `${3.3 * sc}px` }}>{date}</p>
                                                    <p className="lcd_clock" style={{ fontSize: `${5 * sc}px`, lineHeight: `${5.5 * sc}px` }}>{time}</p>
                                                </div>

                                                <div className="lcd_icon_box">
                                                    < img src={LCDMinus} alt="minus" className="lcd_icon" style={lcdIconStyle} />
                                                    < img src={LCDPlus} alt="plus" className="lcd_icon" style={lcdIconStyle} />
                                                </div>
                                            </div>
                                        }
                                        {lcdNew &&
                                            <div className="universal_icons" style={universalIconBoxStyle}>
                                                < img src={Minusuni} alt="minusuni" className="universal_icon"
                                                    style={{ ...universalIconStyle, top: `${6.65 * sc}px`, left: `${7.45 * sc}px` }} />
                                                < img src={Minusuni} alt="minusuni" className="universal_icon"
                                                    style={{ ...universalIconStyle, top: `${6.65 * sc}px`, left: `${55.45 * sc}px` }} />
                                                < img src={Leftuni} alt="leftuni" className="universal_icon"
                                                    style={{ ...universalIconStyle, top: `${26.65 * sc}px`, left: `${7.45 * sc}px` }} />
                                                < img src={Rightuni} alt="rightuni" className="universal_icon"
                                                    style={{ ...universalIconStyle, top: `${26.65 * sc}px`, left: `${55.45 * sc}px` }} />
                                                < img src={Minusuni} alt="minusuni" className="universal_icon"
                                                    style={{ ...universalIconStyle, top: `${46.65 * sc}px`, left: `${7.45 * sc}px` }} />
                                                < img src={Minusuni} alt="minusuni" className="universal_icon"
                                                    style={{ ...universalIconStyle, top: `${46.65 * sc}px`, left: `${55.45 * sc}px` }} />
                                            </div>
                                        }
                                    </>
                                }
                            </div>







                        </div>
                    </div>
                </div>
                <div className="preview_bottom">
                    <div className="bottom_info_model">
                        <span>{chosenModel.type}</span>
                    </div>
                    <div className="scale_container">
                        <div className="scale_box">
                            <img src={Zoomout} alt="zoomout" className="scale_icon" onClick={handleZoomOut}
                                style={sc === 4 ? { filter: "invert(53%) sepia(6%) saturate(18%) hue-rotate(343deg) brightness(94%) contrast(84%)", cursor: "not-allowed" } : {}} />
                        </div>
                        <div className="scale_box">
                            <img src={Resize} alt="resize" className="scale_icon" onClick={handleResize} />
                        </div>
                        <div className="scale_box">
                            <img src={Zoomin} alt="zoomin" className="scale_icon" onClick={handleZoomIn}
                                style={sc === 8 ? { filter: "invert(53%) sepia(6%) saturate(18%) hue-rotate(343deg) brightness(94%) contrast(84%)", cursor: "not-allowed" } : {}} />
                        </div>
                    </div>
                    <div className="bottom_info_ral">
                        <span>RAL: {chosenColor.RAL}</span>
                    </div>
                </div>
            </div>
            <div className="preview_side">

                <div className="side_box">
                    <img src={Visual} alt="visualization" className="side_icon" onClick={handleVisual} />
                    {visual ? <span>Widok wizuali-<br />zacji</span> : <span>Widok schematy-<br />czny</span>}
                </div>

                <div className="side_box">
                    <img src={Clearall} alt="clearall" className="side_icon" onClick={handleClearAll} />
                    <span>Zresetuj wszystko</span>
                </div>
                {chosenTab === "icons" &&
                    <>
                        <div className="side_box">
                            {animations ?
                                <img src={Animoff} alt="animationoff" className="side_icon" onClick={handleAnimation} />
                                : <img src={Anim} alt="animation" className="side_icon" onClick={handleAnimation} />
                            }
                            {animations ? <span>Wyłącz animacje</span> : <span>Włącz animacje</span>}
                        </div>
                        <div className="side_box">
                            <img src={Clearallicons} alt="clearallicons" className="side_icon" onClick={handleClearAllIcons}
                                onMouseOver={handleShowClearAllIcons} onMouseLeave={handleHideClearAllIcons} />
                            <span>Usuń wszystkie ikony</span>
                        </div>
                        <div className="side_box" style={!isAnySelected ? { filter: "grayscale(100%)", cursor: "not-allowed" } : {}}>
                            <img src={Clear} alt="clear" className="side_icon" onClick={handleClearIcon}
                                onMouseOver={handleShowClearIcon} onMouseLeave={handleHideClearIcon} />
                            <span>Usuń zaznaczoną ikonę</span>
                        </div>
                        <div className="side_box" style={!isAnySelected ? { filter: "grayscale(100%)", cursor: "not-allowed" } : {}}>
                            <img src={Rotateright} alt="rotateright" className="side_icon" onClick={handleRotateRight} />
                            <span>Obróć o 90° w prawo</span>
                        </div>
                        <div className="side_box" style={!isAnySelected ? { filter: "grayscale(100%)", cursor: "not-allowed" } : {}}>
                            <img src={Rotateleft} alt="rotateleft" className="side_icon" onClick={handleRotateLeft} />
                            <span >Obróć o 90° w lewo</span>
                        </div>
                    </>
                }
                {chosenTab === "text" &&
                    <>
                        <div className="side_box">
                            <img src={Textborder} alt="textborder" className="side_icon" onClick={handleTextBorder} />
                            <span>Pokaż granice</span>
                        </div>

                        <div className="side_box">
                            {textUpOff ?
                                <img src={Textupoff} alt="textupoff" className="side_icon" onClick={handleTextUpOff} />
                                :
                                <img src={Textupon} alt="textupon" className="side_icon" onClick={handleTextUpOff} />}
                            {textUpOff ? <span>Wyłącz i usuń opisy nad ikonami</span> : <span>Włącz opisy nad ikonami</span>}
                        </div>

                        <div className="side_box">
                            <img src={Clearalltext} alt="clearalltext" className="side_icon" onClick={handleClearAllText} />
                            <span>Usuń wszystkie opisy</span>
                        </div>

                        <div className="side_box">
                            <img src={Setonefont} alt="setonefont" className="side_icon" onClick={handleSetOneFont} />
                            <span>Wybrany font dla wszystkich opisów</span>
                        </div>

                        {differentFont &&
                            <div className="side_box" style={{ marginTop: "auto", cursor: "default" }}>
                                <img src={Alert} alt="Alert" className="side_icon" />
                                <span style={{ color: "red" }}>Zastosowano różne fonty</span>
                            </div>
                        }

                    </>
                }
                {/* <OverlayTrigger
                    arrowProps
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                >
                    <div className="side_box" style={!isAnySelected ? { filter: "grayscale(100%)", cursor: "not-allowed" } : {}}>
                        <img src={Rotateleft} alt="rotateleft" className="side_icon" onClick={handleRotateLeft} />
                        <span >Obróć o 90° w lewo</span>
                    </div>
                </OverlayTrigger> */}

            </div>



        </div>
    );
});

export default PanelPreview;


// import { useState, useEffect, useCallback, memo } from 'react';
// import "./PanelPreview.scss"

// import { StatusIconHolder } from './StatusIconHolder';
// import { IconHolder } from './IconHolder';

// import update from 'immutability-helper';

// export const PanelPreview = memo(function MainCreator({ chosenModel, chosenColor }) {

//     const sc = 5;

//     const chosenModelStyle = {};
//     chosenModelStyle.backgroundColor = chosenColor.hex;
//     chosenModelStyle.height = `${parseInt(chosenModel.height) * sc}px`;
//     chosenModelStyle.width = `${parseInt(chosenModel.width) * sc}px`;

//     const contentStyle = {};
//     contentStyle.height = `${parseInt(chosenModel.height) * sc - (chosenModel.marginTopBotton * 2 * sc)}px`;
//     contentStyle.width = `${parseInt(chosenModel.width) * sc - (chosenModel.marginLeftRight * 2 * sc)}px`;
//     contentStyle.margin = `${chosenModel.marginTopBotton * sc}px ${chosenModel.marginLeftRight * sc}px`

//     const [iconHolders, setIconHolders] = useState([])

//     useEffect(() => {
//         const tempArr = [];
//         chosenModel.dotLocation.forEach(element => {
//             tempArr.push({ flag: element, lastDroppedDot: null, lastDroppedIcon: null, lastDroppedSlashUp: null, lastDroppedSlashDown: null })
//         });
//         setIconHolders(tempArr);
//     }, [chosenModel]);


//     // const [droppedIcons, setDroppedIcons] = useState([]);
//     // function isDropped(icon) { //feedback dla ikony, że już jest dropnięta. Zbędne? 
//     // return droppedIcons.indexOf(icon) > -1;
//     // }
//     const handleDropDot = useCallback((index, item) => {
//         // const { image } = item;
//         // setDroppedIcons(update(droppedIcons, image ? { $push: [image] } : { $push: [] }));
//         setIconHolders(update(iconHolders, {
//             [index]: {
//                 lastDroppedDot: {
//                     $set: item,
//                 }
//             },
//         }));
//         // }, [droppedIcons, iconHolders]);
//     }, [iconHolders]);


//     const handleDropIcon = useCallback((index, item) => {
//         // const { image } = item;
//         // setDroppedIcons(update(droppedIcons, image ? { $push: [image] } : { $push: [] }));
//         setIconHolders(update(iconHolders, {
//             [index]: {
//                 lastDroppedIcon: {
//                     $set: item,
//                 },
//                 lastDroppedSlashUp: {
//                     $set: null,
//                 },
//                 lastDroppedSlashDown: {
//                     $set: null,
//                 }
//             },
//         }));
//         // }, [droppedIcons, iconHolders]);
//     }, [iconHolders]);


//     // const handleDropIcon = useCallback((index, item) => {
//     //     const { image } = item;
//     //     setDroppedIcons(update(droppedIcons, image ? { $push: [image] } : { $push: [] }));
//     //     setIconHolders(update(iconHolders, {
//     //         [index]: {
//     //             lastDroppedIcon: {
//     //                 $set: item,
//     //             },
//     //             lastDroppedSlashUp: {
//     //                 $set: null,
//     //             },
//     //             lastDroppedSlashDown: {
//     //                 $set: null,
//     //             }
//     //         },
//     //     }));
//     // }, [droppedIcons, iconHolders]);



//     const handleDropSlashUp = useCallback((index, item) => {
//         // const { image } = item;
//         // setDroppedIcons(update(droppedIcons, image ? { $push: [image] } : { $push: [] }));
//         setIconHolders(update(iconHolders, {
//             [index]: {
//                 lastDroppedSlashUp: {
//                     $set: item,
//                 },
//                 lastDroppedIcon: {
//                     $set: null,
//                 }
//             },
//         }));
//         // }, [droppedIcons, iconHolders]);
//     }, [iconHolders]);


//     const handleDropSlashDown = useCallback((index, item) => {
//         // const { image } = item;
//         // setDroppedIcons(update(droppedIcons, image ? { $push: [image] } : { $push: [] }));
//         setIconHolders(update(iconHolders, {
//             [index]: {
//                 lastDroppedSlashDown: {
//                     $set: item,
//                 },
//                 lastDroppedIcon: {
//                     $set: null,
//                 }
//             },
//         }));
//         // }, [droppedIcons, iconHolders]);
//     }, [iconHolders]);




//     const handleResetIcon = useCallback((index, item) => {
//         // const { image } = item;
//         // setDroppedIcons(update(droppedIcons, image ? { $push: [image] } : { $push: [] }));
//         setIconHolders(update(iconHolders, {
//             [index]: {
//                 lastDroppedIcon: {
//                     $set: null,
//                 }
//             },
//         }));
//         // }, [droppedIcons, iconHolders]);
//     }, [iconHolders]);



//     return (
//         <>
//             <div className="preview_container">
//                 <h2>Podgląd panelu</h2>
//                 <div className="panel_box"
//                     style={chosenModelStyle}>
//                     <div className="panel_content" style={contentStyle}>
//                         {iconHolders.map(({ flag, lastDroppedIcon, lastDroppedDot, lastDroppedSlashUp, lastDroppedSlashDown }, index) =>
//                             <div key={index}
//                                 className={(iconHolders.length <= 9) ? "cell cell_dot9" : "cell cell_dot18"}>
//                                 {flag === 1 &&
//                                     <>
//                                         <StatusIconHolder lastDroppedDot={lastDroppedDot} onDrop={(item) => handleDropDot(index, item)} chosenColor={chosenColor} />
//                                         <IconHolder
//                                             chosenColor={chosenColor}
//                                             lastDroppedIcon={lastDroppedIcon} onDrop={(item) => handleDropIcon(index, item)}
//                                             lastDroppedSlashUp={lastDroppedSlashUp} onDropSlashUp={(item) => handleDropSlashUp(index, item)}
//                                             lastDroppedSlashDown={lastDroppedSlashDown} onDropSlashDown={(item) => handleDropSlashDown(index, item)}


//                                             onReset={(item) => handleResetIcon(index, item)}
//                                         // onReset={handleResetIcon}
//                                         />
//                                     </>}
//                             </div>
//                         )}
//                     </div>
//                     {chosenModel.lcdScreen && <div className="lcd" style={{ borderColor: chosenColor.iconColor }} />}
//                 </div>

//                 <div className="panel_info" style={{ width: parseInt(chosenModel.width) * sc }}>
//                     <span>{chosenModel.type}</span>
//                     <span>RAL: {chosenColor.RAL}</span>
//                 </div>
//             </div>
//         </>
//     );
// });

// export default PanelPreview;
