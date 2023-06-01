export function Container({ children, style }) {
	return (
		<div
			className="container wrap about-wrap full-width-layout"
			style={style}
		>
			{children}
		</div>
	);
}