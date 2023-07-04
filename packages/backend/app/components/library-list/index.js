import classnames from 'classnames';
import { useMemo } from '@wordpress/element';

import { useCurrentLibrary, useLibraries } from '@wpmi/store';

export default function LibraryList( { type } ) {
	const { currentLibrary, setCurrentLibraryName } = useCurrentLibrary();
	const { libraries, deleteLibrary } = useLibraries();

	const filteredLibraries = useMemo(
		() =>
			libraries.filter( ( library ) => library.type === type || ! type ),
		[ libraries, type ]
	);

	const isSelected = ( name ) => name === currentLibrary?.name;

	const iconAction = ( library ) =>
		library.is_loaded ? 'trash' : 'upload';

	const handleDelete = async ( e, library ) => {
		if ( library.is_loaded ) {
			e.stopPropagation();

			const response = await deleteLibrary( library.name );

			if ( response ) setCurrentLibraryName( library.name );
		}
	};

	const isUploaded = type === 'uploaded';

	return filteredLibraries.map( ( library ) => (
		<li
			key={ library.name }
			className={ classnames(
				'wpmi__container-sidebar__item',
				isSelected( library.name ) && 'is-active',
				isUploaded && 'wpmi__premium-badge'
			) }
			onClick={ () => setCurrentLibraryName( library.name ) }
			role="button" // Add a role to the div element
			tabIndex="0" // Make the div element focusable
			onKeyDown={ ( event ) => {
				// Handle keyboard events
				if ( event.key === 'Enter' || event.key === ' ' ) {
					setCurrentLibraryName( library.name );
				}
			} }
		>
			<i className="dashicons dashicons-star-filled" />
			{ library.label }
			{ type === 'uploaded' && (
				<i
					className={ `dashicons dashicons-${ iconAction(
						library
					) }` }
					onClick={ ( e ) => handleDelete( e, library ) }
				/>
			) }
		</li>
	) );
}
