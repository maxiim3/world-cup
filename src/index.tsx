import React from "react"
import ReactDOM from "react-dom/client"
import App from "./ts/App"
// import reportWebVitals from "./reportWebVitals"
import "./sass/App.css"
import Header from "./ts/Views/static/Header"

/*	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
 integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
 crossOrigin="anonymous" referrerPolicy="no-referrer" />*/
const $link = document.createElement("link") as HTMLLinkElement
$link.rel = "stylesheet"
$link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css'
$link.integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
$link.crossOrigin = "anonymous"
$link.referrerPolicy = "no-referrer"

document.head.append($link)
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
	<React.StrictMode>
		{/*<Header/>*/}
		<App />
	</React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
