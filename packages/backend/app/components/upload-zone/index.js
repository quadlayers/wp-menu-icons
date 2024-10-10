import { __ } from '@wordpress/i18n';
import { useRef } from '@wordpress/element';
import { DropZone } from '@wordpress/components';

import { useLibraries } from '@wpmi/store';

export default function UploadZone() {
	const inputRef = useRef( null );

	const dropZoneOnClick = () => inputRef.current?.click();

	const { uploadLibrary } = useLibraries();

	const uploadFile = async ( files ) => {
		const file = files[ 0 ];

		const body = new FormData();
		body.append( 'file', file );

		const headers = new Headers();
		headers.append( 'Content-Type', file.type );

		await uploadLibrary( { body, headers } );
	};

	const handleChange = ( e ) => {
		const { files } = e.target;

		uploadFile( files );
	};

	return (
		<div
			className="attachments wpmi__upload-zone wpmi__premium-field"
			onClick={ dropZoneOnClick }
			role="button" // Add a role to the div element
			tabIndex="0" // Make the div element focusable
			onKeyDown={ ( event ) => {
				// Handle keyboard events
				if ( event.key === 'Enter' || event.key === ' ' ) {
					dropZoneOnClick();
				}
			} }
		>
			<DropZone onFilesDrop={ uploadFile } />

			<div className="wpmi__upload-zone__drop-zone">
				<i className="dashicons dashicons-upload wpmi__upload-zone__icon" />

				<span className="wpmi__upload-zone__info">
					{ __( 'Drag & Drop to Upload File', 'wp-menu-icons' ) }
				</span>

				<input
					ref={ inputRef }
					type="file"
					accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
					onChange={ handleChange }
					multiple={ false }
					className="wpmi__upload-zone__input"
				/>

				<button className="button button-primary wpmi__upload-zone__button">
					{ __( 'Select archive', 'wp-menu-icons' ) }
				</button>
			</div>
		</div>
	);
}
