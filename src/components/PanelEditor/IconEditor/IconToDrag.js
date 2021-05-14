import { memo, useState, useEffect} from 'react';
import { useDrag } from 'react-dnd';
import "./IconEditor.scss"
import Favorite from "../../../assets/favorite.svg"
import RemoveFavorite from "../../../assets/removefavorite.svg"



export const IconToDrag = memo(function IconToDrag({ image, addToFavorite, removeFavorite, isInFavorite, favoriteIcons }) {


    const [rerender, setRerender] = useState(false)



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
            setRerender(prev => !prev)
            addToFavorite(image)
        }
    }

    const handleRemove = () => {
        removeFavorite(image)
    }

    useEffect(() => {
    }, [rerender])

    return (
        <>
            <div className="icon_box" style={{ border }} >
                <img src={Favorite} alt="favorite" className="favorite_icon"
                    style={(favoriteIcons.indexOf(image) > -1) ? { opacity: "1" } : { opacity: "0" }} />
                {isInFavorite && <img src={RemoveFavorite} alt="favorite" className="favorite_icon" style={{ cursor: "pointer" }} onClick={handleRemove} />}
                <div ref={drag} className="icon_drag">
                    <img src={image.default} alt="info" className="icon" width="40pt" height="40pt"
                        style={{ opacity }}
                        onClick={handleAdd} />
                </div>
            </div>
        </>
    )
})