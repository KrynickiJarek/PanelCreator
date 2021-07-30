import { connect } from "react-redux"
import { useDrag } from 'react-dnd';
import actions from "./duck/actions"
import "./IconEditor.scss"
import Favorite from "../../../../assets/favorite.svg"
import RemoveFavorite from "../../../../assets/removefavorite.svg"



const IconToDrag = ({
  image, isInFavorite,

  favoriteIcons, addIconToFavorite, removeIconFromFavorite, ownIcons, isInOwn, ownIconIndex, updateOwnIcons, updateFavorite, isInOtherOwn, isInOtherFavorite
}) => {




  const [{ opacity, border }, drag] = useDrag(() => ({
    type: "icon",
    item: { image },
    collect: (monitor) => ({
      opacity: monitor.isDragging() && 0.7,
      border: monitor.isDragging() && "3px solid rgb(236, 105, 92)",
    }),
  }), [image]);

  const handleAdd = (image) => {
    if (!isInFavorite && !isInOtherOwn && !isInOtherFavorite) {
      addIconToFavorite(image)
    }
    if (isInOtherOwn) {
      let copyOwnIcons = ownIcons
      copyOwnIcons.push(image)
      updateOwnIcons(copyOwnIcons)
    }
    if (isInOtherFavorite) {
      addIconToFavorite(image)
    }
  }
  const removeIconFromOwn = (index) => {
    let copyOwnIcons = ownIcons
    copyOwnIcons.splice(index, 1)
    updateOwnIcons(copyOwnIcons)
  }


  return (
    <>
      {!(isInOtherFavorite && (favoriteIcons.indexOf(image) > -1)) &&

        <div className="icon_box" style={{ border }} >
          <img src={Favorite} alt="favorite" className="favorite_icon"
            // style={(favoriteIcons.indexOf(image) > -1) || (ownIcons.indexOf(image.default) > -1) ? { opacity: "1" } : { opacity: "0" }} /> // po co to było?
            style={(favoriteIcons.indexOf(image) > -1) ? { opacity: "1" } : { opacity: "0" }} />
          {isInFavorite && <img src={RemoveFavorite} alt="removefavorite" className="favorite_icon" style={{ cursor: "pointer" }} onClick={() => removeIconFromFavorite(image)} />}
          {isInOwn && <img src={RemoveFavorite} alt="removefavorite" className="favorite_icon" style={{ cursor: "pointer" }} onClick={() => removeIconFromOwn(ownIconIndex)} />}

          <div ref={drag} className="icon_drag">
            <img src={image.default} alt="icon" className="icon" width="40pt" height="40pt"
              style={{ opacity }}
              onClick={() => handleAdd(image)} />


          </div>
        </div>
      }
    </>
  )
}

const mapStateToProps = state => ({
  favoriteIcons: state.frontEndData.icon.favoriteIcons,
  ownIcons: state.frontEndData.icon.ownIcons,
  favoriteIconsRender: state.frontEndData.icon.favoriteIconsRender
})

const mapDispatchToProps = dispatch => ({
  addIconToFavorite: icon => dispatch(actions.addIconToFavorite(icon)),
  removeIconFromFavorite: icon => dispatch(actions.removeIconFromFavorite(icon)),
  updateFavorite: icon => dispatch(actions.updateFavorite(icon)),
  updateOwnIcons: icon => dispatch(actions.updateOwnIcons(icon)),
})

export default connect(mapStateToProps, mapDispatchToProps)(IconToDrag)