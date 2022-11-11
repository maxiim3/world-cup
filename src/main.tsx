import React from "react"
import {resetLocalStorage} from "./ts/Utils/resetLocalStorage"
import {App} from "./ts/Classes/App"
import {documentHeadAttributes} from "./ts/Utils/document.head.attributes"
import "./sass/App.css"

documentHeadAttributes()
resetLocalStorage()

const app = new App()
app.init()
