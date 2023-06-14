import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

import { IconMap, Modal } from '@wpmi/components';

import UploadZone from '../upload-zone';
import Sidebar from '../sidebar';
import { Spinner } from '@wpmi/components';
import {
	useCurrentLibraryIconMap,
	useCurrentLibrary,
} from '@wpmi/store';

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
			premiumTitle="Mega Menu"
			tabTitle={currentLibrary?.label}
			toolbar={iconMap.length > 0}
			toolbarSearchIn={currentLibrary?.label}
			onChangeToolbar={setSearch}
			sidebarContent={<Sidebar />}
			sidebarPosition="left"
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
