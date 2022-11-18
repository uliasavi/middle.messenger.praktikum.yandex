import HandleBars from "handlebars/dist/handlebars.runtime";
import './main.scss';
import "../src/settingsPage/SettingsPage.js";
/*pages*/
import loginPage from "./loginPage/LoginPage.hbs";
import registrationPage from "./registrationPage/RegictrationPage.hbs"
import error500 from "./errorPage/500error.hbs"
import error400 from "./errorPage/400error.hbs"
import settingsPage from "./settingsPage/SettingsPage.hbs"
import chatsPage from "./chatsPage/ChatsPage.hbs"
/*partials*/
import inputFile from "./chatsPage/InputFile.hbs"
import dialog from "./chatsPage/DialogMIni.hbs"
import message from "./chatsPage/Message.hbs"

const pages = {
    "login": loginPage,
    "registration": registrationPage,
    "error500":error500,
    "error400":error400,
    "settingsPage":settingsPage,
    "chats":chatsPage,
}
function renderPage(name){
    const root = document.querySelector("#app");
    const template = pages[name]
    const html = template();
    root.innerHTML = html;
}
window.renderPage = renderPage;

document.addEventListener("DOMContentLoaded",()=>{
    HandleBars.registerPartial('inputFile', inputFile)
    HandleBars.registerPartial('dialog', dialog)
    HandleBars.registerPartial('message', message)
    renderPage("chats")
})