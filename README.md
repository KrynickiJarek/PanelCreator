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
![Alert](https://github.com/KrynickiJarek/kreatorpaneli/blob/43f585d3e7a327e6d104b3beb355e63e80a140e9/src/assets/readme/02_alert.png)

## Panel Editor

Panel Editor contains of an editor section and preview section. Editor section has a tab menu with the main panel configuration options which appear on 
panel in preview section. There are also top bar with panel name form, bottom bar witch shows chosen model, chosen color and has scale control panel including 
full screen view and side bar with additional with additional options for project management. Some of the sidebar options depend on the tab selected.
![Panel Editor](https://github.com/KrynickiJarek/kreatorpaneli/blob/43f585d3e7a327e6d104b3beb355e63e80a140e9/src/assets/readme/01_main_menu.png)

## Models tab

There are all AMPIO customisable panel models in the models tab. Each model has a short description and a link to the AMPIO page with additional information.
![Models tab](https://github.com/KrynickiJarek/kreatorpaneli/blob/43f585d3e7a327e6d104b3beb355e63e80a140e9/src/assets/readme/01_main_menu.png)

## Colours tab

Different panel colours are available in the colours tab. There is also option of different glass type for certain models - an option with additional information in the tooltip.
![Colours tab](https://github.com/KrynickiJarek/kreatorpaneli/blob/43f585d3e7a327e6d104b3beb355e63e80a140e9/src/assets/readme/01_main_menu.png)

## Icons tab

The icons tab contains icons provided by AMPIO sorted into categories.
![Colours tab](https://github.com/KrynickiJarek/kreatorpaneli/blob/43f585d3e7a327e6d104b3beb355e63e80a140e9/src/assets/readme/01_main_menu.png)