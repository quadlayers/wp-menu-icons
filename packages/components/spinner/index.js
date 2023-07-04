import { __ } from '@wordpress/i18n';

export default function Spinner() {
	return (
		<p>
			<span
				style={ { visibility: 'visible' } }
				className="spinner"
			></span>
			{ __( 'Loading…', 'wp-menu-icons' ) }
		</p>
	);
}
