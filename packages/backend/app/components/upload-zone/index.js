import { __ } from '@wordpress/i18n';
import { useRef } from '@wordpress/element';
import { DropZone } from '@wordpress/components';

import { useLibraries } from '../../../../store/helpers';

export default function UploadZone() {
	const inputRef = useRef(null);

	const dropZoneOnClick = () => inputRef.current?.click();

	const { uploadLibrary } = useLibraries();

	const handleUpload = async (e) => {
        const { files } = e.target
		const file = files[0];

		const body = new FormData();
		body.append('file', file);

		const headers = new Headers();
		headers.append('Content-Type', file.type);

		await uploadLibrary({ body, headers });        
	};

    return <div
        class="wpmi__upload-zone attachments"
        onClick={dropZoneOnClick}
    >
        <DropZone onFilesDrop={handleUpload} />

        <div class="wpmi__upload-zone__drop-zone">
            <div class="dashicons dashicons-upload wpmi__upload-zone__icon"></div>

            <span class="wpmi__upload-zone__info">
                {__(
                    'Drag & Drop to Upload File',
                    'wp-menu-icons'
                )}
            </span>

            <input
                ref={inputRef}
                type="file"
                accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
                onChange={handleUpload}
                multiple={false}
                class="wpmi__upload-zone__input"
            />

            <button className="button button-primary wpmi__upload-zone__button">
                {__('Select archive', 'wp-menu-icons')}
            </button>
        </div>
    </div>
}