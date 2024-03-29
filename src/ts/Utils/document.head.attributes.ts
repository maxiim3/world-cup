export const documentHeadAttributes = () => {
	const $link = document.createElement("link") as HTMLLinkElement
	$link.rel = "stylesheet"
	$link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
	$link.integrity = "sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
	$link.crossOrigin = "anonymous"
	$link.referrerPolicy = "no-referrer"
	return document.head.append($link)
}