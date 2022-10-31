import React from "react"

export type FinalsProps = {
	label?: string
	title: string
	children: JSX.Element[] | JSX.Element
}

export function CardLayout({title, children, label = "final"}: FinalsProps) {
	return (
		<section
			className={label}
			id={label}>
			<h3>{title}</h3>
			{children}
		</section>
	)
}
