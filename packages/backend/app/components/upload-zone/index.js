import { __ } from '@wordpress/i18n';
import { useRef } from '@wordpress/element';
import { DropZone } from '@wordpress/components';

import { useLibraries, useCurrentLibrary } from '../../../../store/helpers';

export default function UploadZone({ selectedLibrary }) {
	const { currentLibrary } = useCurrentLibrary()
	const inputRef = useRef(null);

	const dropZoneOnClick = () => inputRef.current?.click();

	const { uploadLibrary } = useLibraries();

	const handleUpload = async (files) => {
		const file = files[0];

		const body = new FormData();
		body.append('file', file);

		const headers = new Headers();
		headers.append('Content-Type', file.type);

		await uploadLibrary({ body, headers });
	};

    return <div
        class="container-drop-zone"
        onClick={dropZoneOnClick}
    >
        <DropZone onFilesDrop={handleUpload} />

        <div class="drop-zone display-flex-center">
            <div class="display-flex-center library-title">
                {currentLibrary?.label}
            </div>

            <div class="dashicons dashicons-upload icon"></div>

            <span>
                {__(
                    'Drag & Drop to Upload File',
                    'wp-menu-icons'
                )}
            </span>

            <input
                ref={inputRef}
                type="file"
                accept="zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
                onChange={(e) =>
                    handleUpload(e.target.files)
                }
                multiple={false}
            />

            <button className="button button-primary">
                {__('Select archive', 'wp-menu-icons')}
            </button>
        </div>
    </div>
}