import { connect } from "react-redux"
import { useDrag } from 'react-dnd';
import actions from "./duck/actions"
import "./IconEditor.scss"
import Favorite from "../../../../assets/favorite.svg"
import RemoveFavorite from "../../../../assets/removefavorite.svg"



const IconToDrag = ({
  image, isInFavorite,

  favoriteIcons, addIconToFavorite, removeIconFromFavorite,
}) => {




  const [{ opacity, border }, drag] = useDrag(() => ({
    type: "icon",
    item: { image },
    collect: (monitor) => ({
      opacity: monitor.isDragging() && 0.7,
      border: monitor.isDragging() && "3px solid rgb(236, 105, 92)",
    }),
  }), [image]);

  const handleAdd = () => {
    if (!isInFavorite) {
      addIconToFavorite(image)
    }
  }

  return (
    <>
      <div className="icon_box" style={{ border }} >
        <img src={Favorite} alt="favorite" className="favorite_icon"
          style={(favoriteIcons.indexOf(image) > -1) ? { opacity: "1" } : { opacity: "0" }} />
        {isInFavorite && <img src={RemoveFavorite} alt="favorite" className="favorite_icon" style={{ cursor: "pointer" }} onClick={() => removeIconFromFavorite(image)} />}
        <div ref={drag} className="icon_drag">
          <img src={image.default} alt="info" className="icon" width="40pt" height="40pt"
            style={{ opacity }}
            onClick={handleAdd} />
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  favoriteIcons: state.frontEndData.icon.favoriteIcons,
  favoriteIconsRender: state.frontEndData.icon.favoriteIconsRender
})

const mapDispatchToProps = dispatch => ({
  addIconToFavorite: icon => dispatch(actions.addIconToFavorite(icon)),
  removeIconFromFavorite: icon => dispatch(actions.removeIconFromFavorite(icon)),
})

export default connect(mapStateToProps, mapDispatchToProps)(IconToDrag)