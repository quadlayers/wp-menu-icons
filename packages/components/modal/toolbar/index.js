import { __, sprintf } from '@wordpress/i18n';

export default function Toolbar( { searchIn, onChange, sidebarPosition } ) {
	const handleSearchChange = ( e ) => onChange( e.target.value );

	return (
		<div
			className={ `media-toolbar wpmi__modal__sidebar--${ sidebarPosition }` }
		>
			<div className="media-toolbar-secondary">
				<p>
					<em>
						{ sprintf(
							__( 'Search in %s', 'wp-menu-icons' ),
							searchIn
						) }
					</em>
				</p>
			</div>

			<div className="media-toolbar-primary search-form">
				<input
					type="search"
					placeholder="Search..."
					id="media-search-input"
					className="search"
					onChange={ handleSearchChange }
				/>
			</div>
		</div>
	);
}
