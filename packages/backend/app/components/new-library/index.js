import { __ } from '@wordpress/i18n';
import { useRef } from '@wordpress/element';
import { DropZone } from '@wordpress/components';
import { useLibraries } from '../../../../store/helpers';

const WPMI_PREFIX = '';

export default function NewLibrary({ onClose }) {
	const inputRef = useRef(null);

	const dropZoneOnClick = () => inputRef.current?.click();

	const { deleteLibrary, uploadLibrary } = useLibraries();

	const handleUpload = (files) => {
		const file = files[0];

		const body = new FormData();
		body.append('file', file);

		const headers = new Headers();
		headers.append('Content-Type', file.type);

		uploadLibrary({ body, headers });
	};

	return (
		<div id={WPMI_PREFIX + '_modal_new_library'}>
			<button
				type="button"
				class="media-modal-close close"
				onClick={onClose}
			>
				<span class="media-modal-icon">
					<span class="screen-reader-text">
						{__('Close media panel', 'wp-menu-icons')}
					</span>
				</span>
			</button>

			<div class="media-frame mode-select wp-core-ui hide-menu">
				<div class="media-frame-title">
					<h1>{__('Add New Library', 'wp-menu-icons')}</h1>
				</div>

				<div class="media-modal-content">
					<div
						class="media-frame mode-select wp-core-ui display-flex-center"
						style={{ backgroundColor: '#f5f7f9' }}
					>
						<div
							class="container-drop-zone"
							onClick={dropZoneOnClick}
						>
							<DropZone onFilesDrop={uploadLibrary} />

							<div class="options-libraries">
								<div class="display-flex-center">
									{__('Fontello', 'wp-menu-icons')}
								</div>

								<div class="display-flex-center">
									{__('Iconmoon', 'wp-menu-icons')}
								</div>
							</div>

							<div class="drop-zone display-flex-center">
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
					</div>
				</div>
			</div>
		</div>
	);
}
