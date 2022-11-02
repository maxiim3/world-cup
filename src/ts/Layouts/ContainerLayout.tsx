import React, {ReactNode} from "react"


export default function ContainerLayout({
	title,
	children,
}: {
	title: string
	children: JSX.Element | JSX.Element[] | ReactNode | ReactNode[]
}) {
	return (
		<section className={"container"}>
			<header className={"container__header"}>
				<h2>{title}</h2>
			</header>
			<article className={"container__main container__main--groups"}>{children}</article>
		</section>
	)
}
