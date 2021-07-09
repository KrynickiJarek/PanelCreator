import React, { useState } from 'react';
import { connect } from "react-redux"
import actionsVisual from "../../PanelPreview/duck/actions"
import "./IconEditor.scss"

import Favorite from "../../../assets/favorite.svg"
import Locked from "../../../assets/preview/lock.svg"
import Unlocked from "../../../assets/preview/unlock.svg"

import IconToDrag from './IconToDrag';
import iconCategories from "./iconCategories"

import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'




export const IconEditor = ({ visual, toggleVisual, favoriteIcons }) => {

  const [unlock, setUnlock] = useState(false)







  return (<div className="scroll_container">
    <div className="visual_background" style={visual ? { opacity: "1", zIndex: "999" } : { opacity: "0", zIndex: "-1" }}>
      <div className="visual_container">
        <div className="visual_info_box">
          {unlock ?
            <img src={Unlocked} alt="unlocked" className="visual_image" />
            :
            <img src={Locked} alt="locked" className="visual_image" />
          }
          <h2 className="visual_info">Niedostępne w trybie podglądu</h2>
        </div>
        <div className="visual_button"
          onClick={() => toggleVisual(!visual)}
          onMouseOver={() => setUnlock(true)}
          onMouseLeave={() => setUnlock(false)}
        >
          Tryb edycji
          <div className="button_arrows" />
        </div>
      </div>
    </div>
    <div className="icon_container">
      <h2 className="icon_header">Ikony</h2>
      <div className="icon_content">
        <Tab.Container defaultActiveKey="ulubione" mountOnEnter>
          <div className="nav_col">
            <Nav variant="pills" className="flex-column">
              <Nav.Link eventKey="ulubione" >
                <img src={Favorite} alt="favorite" className="favorite_nav" />
                Ulubione
              </Nav.Link>
              {iconCategories.map((el, i) => (
                <Nav.Link key={i} eventKey={el.name}>{el.name}</Nav.Link>
              ))}
            </Nav>
          </div>
          <div className="content_col">
            <Tab.Content>
              <Tab.Pane eventKey="ulubione">
                <div className="icons">
                  <p className="instruction_bold">Wybierz kategorię ikon, a następie przeciągaj wybrane ikony w odpowiednie miejsce na panelu. Kliknij ikonę aby dodać ją do Ulubionych.</p>
                  {(favoriteIcons.length === 0) ?
                    <>
                      <p className="instruction">W tym miejscu pojawią się ikony zaznaczone jako Ulubione
                        <img src={Favorite} alt="favorite" className="favorite_instruction" />
                      </p>

                    </>

                    : favoriteIcons.map((image, index) =>
                      <IconToDrag key={index} image={image}
                        isInFavorite={true}
                      />)}
                </div>
              </Tab.Pane>
              {iconCategories.map((el, i) => (
                <Tab.Pane eventKey={el.name} key={i}>
                  <div className="icons">
                    {
                      el.listOfIcons.map(
                        (image, index) => <IconToDrag key={index} image={image}
                          isInFavorite={false}
                        />
                      )
                    }
                  </div>
                </Tab.Pane>
              ))}
            </Tab.Content>
          </div>
        </Tab.Container>
      </div>
    </div>
  </div>

  );
}

const mapStateToProps = state => ({
  visual: state.visual,
  favoriteIcons: state.icon.favoriteIcons,
  favoriteIconsRender: state.icon.favoriteIconsRender

})

const mapDispatchToProps = dispatch => ({
  toggleVisual: (income) => dispatch(actionsVisual.toggleVisual(income)),
})

export default connect(mapStateToProps, mapDispatchToProps)(IconEditor)