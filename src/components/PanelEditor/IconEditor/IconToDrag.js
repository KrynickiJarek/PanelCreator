import { memo, useState} from 'react';
import { useDrag } from 'react-dnd';
import "./IconEditor.scss"
import Favorite from "../../../assets/favorite.svg"



export const IconToDrag = memo(function IconToDrag({ image }) {


    const [favorite, setFavorite] = useState(false)



    const [{ opacity, border }, drag] = useDrag(() => ({
        type: "icon",
        item: { image },
        collect: (monitor) => ({
            opacity: monitor.isDragging() && 0.7,
            border: monitor.isDragging() && "3px solid rgb(236, 105, 92)",
        }),
    }), [image]);

    const handleClick = () => {
        setFavorite(prev=>!prev)
    }

    return (
        <>
            <div className="icon_box" style={{ border }} >
                {/* {favorite && <img src={Favorite} alt="favorite" className="favorite_icon" />} */}
                <img src={Favorite} alt="favorite" className="favorite_icon" style={favorite?{opacity: "1"}:{opacity: "0"}} />
                <div ref={drag} className="icon_drag">
                    <img src={image.default} alt="info" className="icon" width="40pt" height="40pt"
                        style={{ opacity }}
                        onClick={handleClick}/>
                </div>
            </div>
        </>
    )
})