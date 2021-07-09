import { useState, useEffect } from 'react';
import { connect } from "react-redux"
import { useDrag } from 'react-dnd';
import "./../IconHolder.scss"

export const ReDrag = ({
  image,
  // chosenColor, 
  onReset,
  scale,
  onSelect,
  selected,
  clear,
  rotateRight,
  rotateLeft,
  visual,

  chosenColor,
}) => {

  let styleScale = {};
  styleScale.height = `${7.5 * scale}px`;
  styleScale.width = `${7.5 * scale}px`;

  const [turn, setTurn] = useState(0)
  let styleTurn = {};
  styleTurn.transform = `rotate(${turn}deg)`


  const [{ isDragging }, drag] = useDrag(() => ({
    type: "icon",
    item: { image },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [image]);


  useEffect(() => {
    if (isDragging) {
      onReset(image)
    }
  }, [isDragging, onReset, image]);

  useEffect(() => {
    if (clear) {
      if (selected) {
        onReset(image)
      }
    }
  }, [selected, clear, onReset, image]);

  useEffect(() => {
    if (selected) {
      setTurn(prev => prev + 90)
    }
  }, [rotateRight, selected]);

  useEffect(() => {
    if (selected) {
      setTurn(prev => prev - 90)
    }
  }, [rotateLeft, selected]);



  return (
    < img ref={drag} src={image.default} alt="ICON" className="icon"
      style={!visual ? { ...styleScale, ...styleTurn, filter: "grayscale(100%) invert(1) brightness(10) drop-shadow( 0 0 4px rgba(255, 255, 255, 1))" }
        : chosenColor.iconColor === "white" ? { ...styleScale, ...styleTurn, filter: "grayscale(100%) invert(1) brightness(10)" }
          : { ...styleScale, ...styleTurn, filter: "grayscale(100%) brightness(0)" }}
      onClick={() => onSelect()} />
  )
}

const mapStateToProps = state => ({
  chosenColor: state.color,
})


export default connect(mapStateToProps, {})(ReDrag)
