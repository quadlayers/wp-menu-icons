import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

import UploadZone from '../upload-zone';
import Sidebar from '../sidebar';
import { Spinner } from '../../../components/spinner';
import IconMap from '../icon-map';
import { useCurrentLibraryIconMap } from '../../../../store/helpers';

const WPMI_PREFIX = '';

export default function ManagerLibraries({ onClose }) {
	const { iconMap, isLoadingIconMap } = useCurrentLibraryIconMap()

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
					<h1>{__('Manager Libraries', 'wp-menu-icons')}</h1>
				</div>

				<div class="media-modal-content">
					<div
						class="media-frame mode-select wp-core-ui display-flex-center manager-libraries-content"
					>
						<Sidebar />

						<div class='container-icons'>
							{isLoadingIconMap
								? <Spinner />
								: (iconMap.length > 0
									? <IconMap
										iconMap={iconMap}
									/>
									: <UploadZone />
								)
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
