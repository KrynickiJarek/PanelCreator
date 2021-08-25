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
![Main Menu](https://github.com/KrynickiJarek/kreatorpaneli/blob/43f585d3e7a327e6d104b3beb355e63e80a140e9/src/assets/readme/01_main_menu.png)

Each project can be edited, deleted, duplicated or saved to PDF file from the Main Menu.
The use of functionalities that cause irreversible changes is protected by alerts.
![Alert](https://github.com/KrynickiJarek/kreatorpaneli/blob/b6de404c5bca02ebb2e7343213465980144fa8d8/src/assets/readme/02_alert.png)

## Panel Editor

Panel Editor contains of an editor section and preview section. Editor section has a tab menu with the main panel configuration options which appear on 
panel in preview section. There are also top bar with panel name form, bottom bar witch shows chosen model, chosen color and has scale control panel including 
full screen view and side bar with additional with additional options for project management. Some of the sidebar options depend on the tab selected.
![Panel Editor](https://github.com/KrynickiJarek/kreatorpaneli/blob/1f33545dcc00e6110318fc368f5265ecec3e1ed0/src/assets/readme/03_panel_editor.png)

## Models tab

There are all AMPIO customisable panel models in the models tab. Each model has a short description and a link to the AMPIO page with additional information.
![Models tab](https://github.com/KrynickiJarek/kreatorpaneli/blob/1f33545dcc00e6110318fc368f5265ecec3e1ed0/src/assets/readme/04_models_tab.png)

## Colours tab

Different panel colours are available in the colours tab. It is also possible to choose a different type of glass for some models - an option with additional information in the tooltip.
![Colours tab](https://github.com/KrynickiJarek/kreatorpaneli/blob/1f33545dcc00e6110318fc368f5265ecec3e1ed0/src/assets/readme/05_colours_tab.png)

## Icons tab

The icons tab contains sorted into categories icons provided by AMPIO.
![Icons tab](https://github.com/KrynickiJarek/kreatorpaneli/blob/1f33545dcc00e6110318fc368f5265ecec3e1ed0/src/assets/readme/06_icons_tab.png)

Icons can be placed in panel by draging them and dropping in one of the specific field, which are highlighted when dragging. Each field consists of a place for an full-size icon and a illumination point above.
![Icons tab dnd](https://github.com/KrynickiJarek/kreatorpaneli/blob/1f33545dcc00e6110318fc368f5265ecec3e1ed0/src/assets/readme/07_icons_tab_dnd.png)

Fields also have a flash animation which can be turned off in the sidebar.
![Icons tab animations](https://github.com/KrynickiJarek/kreatorpaneli/blob/a39630b6c3b96778b6b37122ef3b9268995a9de9/src/assets/readme/08_icons_tab_animations.gif)

Icon can be dropped at one of four places in each field: 
* full-size icon place, 
* status icon - small icon instead of illumination point above
* two places for split icons - left top and right bottom
When mouse cursor with icon is over correct place to drop highlight turns green. Highlight of split icons places shows when mouse cursor is nearby field. 
![Icons tab locations](https://github.com/KrynickiJarek/kreatorpaneli/blob/a39630b6c3b96778b6b37122ef3b9268995a9de9/src/assets/readme/09_icons_tab_locations.gif)

Because of possible issues with illumination there is a warning window when status icon is used. Warning windows can be hide, but when warnings occur an show/hide warning button is displayed at the bottom of the sidebar.
![Icons tab status icon](https://github.com/KrynickiJarek/kreatorpaneli/blob/1f33545dcc00e6110318fc368f5265ecec3e1ed0/src/assets/readme/10_icons_tab_status_icon.png)

Durring icons tab is chosen sidebar contain functionality for all icons and only for selected one. Second category funcionality is disabled until icon is selected.
![Icons tab sidebar](https://github.com/KrynickiJarek/kreatorpaneli/blob/b1aff8a6156f0a7ca0a71b8de697914a2a8d21fc/src/assets/readme/11_icons_tab_sidebar.png)

For easier work with the editor avalible icons may be added to Favourites by cliking on them. Favourite icons are marked with a star sign and collected in tab at the top of the categories list.
![Icons tab favourites](https://github.com/KrynickiJarek/kreatorpaneli/blob/b1aff8a6156f0a7ca0a71b8de697914a2a8d21fc/src/assets/readme/12_icons_tab_favourites.png)

The Favourites tab at icon categories list also provides an overview of favourite icons from other projects open on a computer.
![Icons tab favourites2](https://github.com/KrynickiJarek/kreatorpaneli/blob/b1aff8a6156f0a7ca0a71b8de697914a2a8d21fc/src/assets/readme/13_icons_tab_favourites2.png)

The Custom tab at icon categories list provides the possibility to extend the project with personalized icons by uploading them from computer hard drive. Similar like with Favourite icons there is also an option to copy custom icons from other project  open on a computer.
![Icons tab favourites2](https://github.com/KrynickiJarek/kreatorpaneli/blob/b1aff8a6156f0a7ca0a71b8de697914a2a8d21fc/src/assets/readme/14_icons_tab_custom.png)
