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
	const { currentLibrary } = useCurrentLibrary()
	const [iconList, setIconList] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!currentLibrary) return

		const { stylesheet_url, stylesheet_file } = currentLibrary

		link.href = (stylesheet_url && stylesheet_url.replace(/\/\//g, '/')) || stylesheet_file || '';
		console.log(link.href)

		if (currentLibrary.iconmap) {
			const icons = currentLibrary.iconmap.split(',')

			setIconList(icons)
		} else if (currentLibrary.json_url) {
			setLoading(true)

			fetch(currentLibrary.json_url)
				.then((response) => {
					if (!response.ok) {
						throw new Error('HTTP error ' + response.status);
					}
					return response.json();
				})
				.then((data) => {
					console.log('data: ', data);
					
					const { css_prefix_text } = data
					const icons = data.glyphs.map(item => css_prefix_text + item.css)
					
					setIconList(icons);
					setLoading(false)
				})
				.catch(e => {
					console.log(e)
					alert('Error!');
				});
		} else {
			setIconList([])
		}
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
