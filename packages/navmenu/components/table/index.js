export function Table({ children, style }) {
	return (
		<table
			className="form-table widefat striped insta-gallery__table"
			style={style}
		>
			{children}
		</table>
	);
}
