import { useState, useEffect } from 'react';
import { connect } from "react-redux"
import { useDrag } from 'react-dnd';
import "./../IconHolderStatus.scss"



const ReDragDot = ({
  image,
  // chosenColor, 
  onResetDot,
  scale,
  onSelectDot,
  selectedDot,
  clear,
  rotateRight,
  rotateLeft,
  visual,



  chosenColor
}) => {

  let styleScale = {};
  styleScale.height = `${7.5 * scale}px`;
  styleScale.width = `${7.5 * scale}px`;

  const [turn, setTurn] = useState(0)
  let styleTurn = {};
  styleTurn.transform = `rotate(${turn}deg) scale(0.333)`

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "icon",
    item: { image },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [image]);

  useEffect(() => {
    if (isDragging) {
      onResetDot(image)
    }

  }, [isDragging, onResetDot, image]);

  useEffect(() => {
    if (clear) {
      if (selectedDot) {
        onResetDot(image)
      }
    }
  }, [selectedDot, clear, onResetDot, image]);

  useEffect(() => {
    if (selectedDot) {
      setTurn(prev => prev + 90)
    }
  }, [rotateRight, selectedDot]);

  useEffect(() => {
    if (selectedDot) {
      setTurn(prev => prev - 90)
    }
  }, [rotateLeft, selectedDot]);

  return (
    < img ref={drag} src={image.default} alt="ICON" className="status_icon"
      style={!visual ? { ...styleScale, ...styleTurn, filter: "grayscale(100%) invert(1) brightness(10) drop-shadow( 0 0 4px rgba(255, 255, 255, 1))" }
        : chosenColor.iconColor === "white" ? { ...styleScale, ...styleTurn, filter: "grayscale(100%) invert(1) brightness(10)" }
          : { ...styleScale, ...styleTurn, filter: "grayscale(100%) brightness(0)" }}
      onClick={() => onSelectDot()} />
  )
}


const mapStateToProps = state => ({
  chosenColor: state.color,
})


export default connect(mapStateToProps, {})(ReDragDot)