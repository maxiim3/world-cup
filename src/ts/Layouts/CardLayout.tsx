import React, {MutableRefObject, useEffect, useRef, useState} from "react"
import ReactDOM from "react-dom/client"

export type FinalsProps = {
	label?: string
	title: string
	children: JSX.Element[] | JSX.Element
}

export function CardLayout({title, children, label = "final"}: FinalsProps) {
	const [isVisible, setIsVisible] = useState<boolean>(() => sessionStorage.getItem(`${title}`) === "true" ? true : sessionStorage.getItem(`${title}`) !== "false")
	useEffect(() => {
		sessionStorage.setItem(`${title}`, JSON.stringify(isVisible))
	}, [isVisible])

	return (
		<section
			data-visible={isVisible.toString()}
			className={"card__content card__content--" + label}
			id={label}>
			<header>
				<h3>{title}</h3>
				{label === "group" && (
					<button onClick={() => setIsVisible(!isVisible)}>{isVisible ? "Hide" : "Show"}</button>
				)}
			</header>
			<main>{children}</main>
		</section>
	)
}
