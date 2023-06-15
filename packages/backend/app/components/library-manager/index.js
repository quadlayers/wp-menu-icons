import { __ } from '@wordpress/i18n';
import { useState, createInterpolateElement } from '@wordpress/element';

import { IconMap, Modal } from '@wpmi/components';

import UploadZone from '../upload-zone';
import Sidebar from '../sidebar';
import { Spinner } from '@wpmi/components';
import { useCurrentLibraryIconMap, useCurrentLibrary } from '@wpmi/store';

const { WPMI_PREFIX, WPMI_PREMIUM_SELL_URL } = wpmi_backend;

export default function LibraryManager({ show, onClose }) {
	const { currentLibrary } = useCurrentLibrary();
	const { iconMap, isLoadingIconMap, filterIcons } =
		useCurrentLibraryIconMap();

	const [search, setSearch] = useState('');

	return (
		<Modal
			pluginPrefix={WPMI_PREFIX}
			show={show}
			title={__('Libraries Manager', 'wp-menu-icons')}
			onClose={onClose}
			premiumSelURL={WPMI_PREMIUM_SELL_URL}
			premiumTitle="Premium"
			tabTitle={currentLibrary?.label}
			toolbar={iconMap.length > 0}
			toolbarSearchIn={currentLibrary?.label}
			onChangeToolbar={setSearch}
			sidebarContent={<Sidebar />}
			sidebarPosition="left"
			footerContent={
				<>
					<div class="media-toolbar-secondary">
						{window?.WPMI_IS_PREMIUM === false && (
							<div
								style={{
									float: 'left',
									marginTop: 19,
								}}
							>
								{createInterpolateElement(
									__(
										'Help us to boost this plugin and <a>enjoy Premium benefits!</a>',
										'wp-menu-icons'
									),
									{
										a: (
											<a
												href={WPMI_PREMIUM_SELL_URL}
												target="_blank"
												rel="noopener noreferrer"
											/>
										),
									}
								)}
							</div>
						)}
					</div>
					<div class="media-toolbar-primary search-form">
						<button
							disabled={true}
							type="button"
							class="button media-button button-large button-primary media-button-select save"
							// onClick={save}
						>
							{__('Delete', 'wp-menu-icons')}
						</button>
					</div>
				</>
			}
		>
			{isLoadingIconMap ? (
				<Spinner />
			) : iconMap.length > 0 ? (
				<IconMap iconMap={filterIcons(search)} />
			) : (
				<UploadZone />
			)}
		</Modal>
	);
}
