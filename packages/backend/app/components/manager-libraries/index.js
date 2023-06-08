import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

import UploadZone from '../upload-zone';
import Sidebar from '../sidebar';
import { Spinner } from '../../../components/spinner';
import IconList from '../icon-list';
import { useCurrentLibrary } from '../../../../store/helpers';

const WPMI_PREFIX = '';

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '';

document.head.appendChild(link);

export default function ManagerLibraries({ onClose }) {
	const { currentLibrary, getIcons } = useCurrentLibrary()
	const [iconList, setIconList] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!currentLibrary) return

		const { stylesheet_file_url, stylesheet_file, type } = currentLibrary		

		link.href = type === 'default' ? stylesheet_file : stylesheet_file_url

		setLoading(true)

		getIcons(currentLibrary).then(icons => {
			setLoading(false)
			setIconList(icons)
		})
	}, [currentLibrary])

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
							{loading
								? <Spinner />
								: (iconList.length > 0
									? <IconList
										iconList={iconList}
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
