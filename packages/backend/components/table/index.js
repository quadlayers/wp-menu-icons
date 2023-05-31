export function Table({ children, style }) {
	return (
		<table
			className="form-table widefat striped wp-menu-icons__table"
			style={style}
		>
			{children}
		</table>
	);
}
