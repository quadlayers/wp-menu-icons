export function Wrap( { children, style } ) {
	return (
		<div className="wrap about-wrap full-width-layout" style={ style }>
			{ children }
		</div>
	);
}
