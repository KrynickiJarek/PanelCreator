# AMPIO SMART HOME PANEL CREATOR

## Main technologies used:

* bootstrapped by [Create React App](https://github.com/facebook/create-react-app).
* internationalization by [react-i18next](https://github.com/i18next/react-i18next) - Polish and English available
* application state management by [react-redux](https://github.com/reduxjs/react-redux)
* persistent storage by [redux-persist](https://github.com/rt2zz/redux-persist)
* drag and drop by [react-dnd](https://github.com/react-dnd/react-dnd/)

## About

Panel Creator is an app that allows to design [AMPIO](https://ampio.pl/en/ampio-smarthome-homepage/) glass touch panel to navigate smart home finctionalities. 


## Main Menu

Panel Creatora allows the management of multiple projects. There are option to create a project from scratch or open seved project by uploading a PDF file. 
<p align="center">
  <img src="https://github.com/KrynickiJarek/kreatorpaneli/blob/43f585d3e7a327e6d104b3beb355e63e80a140e9/src/assets/readme/01_main_menu.png" alt="Main Menu"/>
</p>

Each project can be edited, deleted, duplicated or saved to PDF file from the Main Menu.
The use of functionalities that cause irreversible changes is protected by alerts.
<p align="center">
  <img src="https://github.com/KrynickiJarek/kreatorpaneli/blob/b6de404c5bca02ebb2e7343213465980144fa8d8/src/assets/readme/02_alert.png" alt="Alert"/>
</p>

## Panel Editor

Panel Editor contains of an editor section and preview section. Editor section has a tab menu with the main panel configuration options which appear on 
panel in preview section. There are also top bar with panel name form, bottom bar witch shows chosen model, chosen color and has scale control panel including 
full screen view and side bar with additional with additional options for project management. Some of the sidebar options depend on the tab selected.
<p align="center">
  <img src="https://github.com/KrynickiJarek/kreatorpaneli/blob/1f33545dcc00e6110318fc368f5265ecec3e1ed0/src/assets/readme/03_panel_editor.png" alt="Panel Editor"/>
</p>

## Models tab

There are all AMPIO customisable panel models in the models tab. Each model has a short description and a link to the AMPIO page with additional information.
<p align="center">
  <img src="https://github.com/KrynickiJarek/kreatorpaneli/blob/c3e33958a766e0dd2d3444f096d371a410d7b478/src/assets/readme/04_models_tab.gif" alt="Models tab"/>
</p>

## Colours tab

Different panel colours are available in the colours tab. It is also possible to choose a different type of glass for some models - an option with additional information in the tooltip.
<p align="center">
  <img src="https://github.com/KrynickiJarek/kreatorpaneli/blob/1f33545dcc00e6110318fc368f5265ecec3e1ed0/src/assets/readme/05_colours_tab.png" alt="Colours tab"/>
</p>

## Icons tab

The icons tab contains sorted into categories icons provided by AMPIO.
<p align="center">
  <img src="https://github.com/KrynickiJarek/kreatorpaneli/blob/1f33545dcc00e6110318fc368f5265ecec3e1ed0/src/assets/readme/06_icons_tab.png" alt="Icons tab"/>
</p>

Icons can be placed in panel by draging them and dropping in one of the specific field, which are highlighted when dragging. Each field consists of a place for an full-size icon and a illumination point above.
<p align="center">
  <img src="https://github.com/KrynickiJarek/kreatorpaneli/blob/1f33545dcc00e6110318fc368f5265ecec3e1ed0/src/assets/readme/07_icons_tab_dnd.png" alt="Icons tab dnd"/>
</p>

Fields also have a flash animation which can be turned off in the sidebar.
<p align="center">
  <img src="https://github.com/KrynickiJarek/kreatorpaneli/blob/b74781b8ad7c832645aa580e2eb994e1645063a6/src/assets/readme/08_icons_tab_animations.gif" alt="Icons tab animations"/>
</p>

Icon can be dropped at one of four places in each field: 
* full-size icon place, 
* status icon - small icon instead of illumination point above
* two places for split icons - left top and right bottom
When mouse cursor with icon is over correct place to drop highlight turns green. Highlight of split icons places shows when mouse cursor is nearby field. 

<p align="center">
  <img src="https://github.com/KrynickiJarek/kreatorpaneli/blob/a39630b6c3b96778b6b37122ef3b9268995a9de9/src/assets/readme/09_icons_tab_locations.gif" alt="Icons tab locations"/>
</p>

Because of possible issues with illumination there is a warning window when status icon is used. Warning windows can be hide, but when warnings occur an show/hide warning button is displayed at the bottom of the sidebar.
<p align="center">
  <img src="https://github.com/KrynickiJarek/kreatorpaneli/blob/d6cc6c4159c453f8852587e7a09f4c1c14cd89a2/src/assets/readme/10_icons_tab_status_icon.gif" alt="Icons tab status icon"/>
</p>

While the titles tab is selected sidebar contain functionality for all icons and only for selected one. Second category funcionality is disabled until icon is selected.
<p align="center">
  <img src="https://github.com/KrynickiJarek/kreatorpaneli/blob/b1aff8a6156f0a7ca0a71b8de697914a2a8d21fc/src/assets/readme/11_icons_tab_sidebar.png" alt="Icons tab sidebar"/>
</p>

For easier work with the editor avalible icons may be added to Favourites by cliking on them. Favourite icons are marked with a star sign and collected in tab at the top of the categories list.
<p align="center">
  <img src="https://github.com/KrynickiJarek/kreatorpaneli/blob/b1aff8a6156f0a7ca0a71b8de697914a2a8d21fc/src/assets/readme/12_icons_tab_favourites.png" alt="Icons tab favourites"/>
</p>

The Favourites tab at icon categories list also provides an overview of favourite icons from other projects open on a computer.
<p align="center">
  <img src="https://github.com/KrynickiJarek/kreatorpaneli/blob/b1aff8a6156f0a7ca0a71b8de697914a2a8d21fc/src/assets/readme/13_icons_tab_favourites2.png" alt="Icons tab favourites"/>
</p>

The Custom tab at icon categories list provides the possibility to extend the project with personalized icons by uploading them from computer hard drive. There is also an option to copy custom icons from other project open on a computer, similarly to Favourite icons.
<p align="center">
  <img src="https://github.com/KrynickiJarek/kreatorpaneli/blob/9e2b21a5cb31f98cd3efcea7c89b57e112feb448/src/assets/readme/14_icons_tab_custom.png" alt="Icons tab custom"/>
</p>

## Titles tab

There is an option to add two captions for each panel's filed - under and above the icon. Five different fonts are available. Captions can have a maximum length of 16 characters, but if they are longer than 9 characters a warning is displayed. There is also a warning about using different fonts in the particular project. 

While the titles tab is selected sidebar contain functionality of hiding borders, turning on/off captions above icons (disabled by default), deleting all icons and choosing selected font for all captions. 
<p align="center">
  <img src="" alt="Titles tab"/>
</p>

## Frames tab

Creating frames is an option that can be used to group icons added to a panel. Frames with straight and rounded corners are available. While the frames tab is selected, clickable fields are highlighted and plus signs is displayed when mouse cursor is over the field to add it to the created frame. Plus signs also appear on each field that will be added to the frame being created as a result of a click (the frame must always be rectangular and must not go through the display). Similarly for deleting fields from the created frame - minus signs show which fields will be excluded.
<p align="center">
  <img src="https://github.com/KrynickiJarek/kreatorpaneli/blob/555f0f836d716678a8ac06b6ceb0fdec521b8410/src/assets/readme/15_titles_tab.png" alt="Frames tab"/>
</p>

Created frame is green. If a single frame is created, it only covers the icon, making it smaller.  If the frame is larger, it covers the whole field, and it is possible to add a title by using the "Add a title" button. Five fonts are available, the maximum length of the title is 16 characters. The finished frame must be confirmed with "CONFIRM" button - it will appear on the panel in the icon colour. Each of confirmed frames appears also on the list at the bottom of frames editor section. List's elements contains frames parameters and button to delete.




