import React, {MutableRefObject, useEffect, useRef, useState} from "react"
import ReactDOM from "react-dom/client"

export type FinalsProps = {
	label?: string
	title: string
	children: JSX.Element[] | JSX.Element
}

export function CardLayout({title, children, label = "final"}: FinalsProps) {
	return (
		<section
			className={"card__content card__content--" + label}
			id={label}>
			<header>
				<h3>{title}</h3>
			</header>
			<main>{children}</main>
		</section>
	)
}
