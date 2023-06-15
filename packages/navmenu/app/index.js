import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useCurrentLibrary, useCurrentLibraryIconMap } from '@wpmi/store';
import { Modal, IconMap } from '@wpmi/components';
import Sidebar from './components/sidebar';
import Footer from './components/footer';

const { WPMI_PLUGIN_NAME, WPMI_PREFIX, WPMI_PREMIUM_SELL_URL } = wpmi_navmenu;

const App = () => {
	const { currentLibrary, isResolvingCurrentLibrary } = useCurrentLibrary();
	const { iconMap, isLoadingIconMap, filterIcons } =
		useCurrentLibraryIconMap();

	const [show, setShow] = useState(false);
	const [search, setSearch] = useState('');
	const [settings, setSettings] = useState({});

	const setup = () => {
		const nodes = document.querySelectorAll('.menu-item-wpmi_open');

		nodes.forEach((node) =>
			node.addEventListener('click', (e) => {
				e.preventDefault();

				const li = e.target.closest('li');

				if (li) openModal(li);
			})
		);

		const ul = document.getElementById('menu-to-edit');

		if (ul) {
			const observer = new MutationObserver((mutationsList, observer) => {
				for (let mutation of mutationsList) {
					if (mutation.type === 'childList') {
						for (let node of mutation.addedNodes) {
							const iconNode = node.querySelector(
								'.menu-item-wpmi_open'
							);

							iconNode.addEventListener('click', (e) => {
								e.preventDefault();

								openModal(node);
							});
						}
					}
				}
			});

			observer.observe(ul, { childList: true });
		}
	};

	const setIcon = (icon) => setSettings({ ...settings, icon });

	const onClose = () => setShow(false);

	const openModal = (node) => {
		const id = node.id.split('-')[2];

		const settingsNode = document.getElementById(
			'menu-item-settings-' + id
		);

		const label = settingsNode.querySelector('#wpmi-input-label').value;
		const position = settingsNode.querySelector(
			'#wpmi-input-position'
		).value;
		const align = settingsNode.querySelector('#wpmi-input-align').value;
		const size = settingsNode.querySelector('#wpmi-input-size').value;
		const icon = settingsNode.querySelector('#wpmi-input-icon').value;
		const color = settingsNode.querySelector('#wpmi-input-color').value;

		const _settings = {
			label,
			position,
			align,
			size,
			icon,
			color,
			id,
		};

		setSettings(_settings);
		setShow(true);
	};

	const sidebarProps = {
		settings,
		onChangeSettings: setSettings,
	};

	const footerProps = {
		settings,
		onSave: onClose,
		onRemove: onClose,
	};

	useEffect(setup, []);

	return (
		<Modal
			title={WPMI_PLUGIN_NAME}
			pluginPrefix={WPMI_PREFIX}
			show={show}
			onClose={onClose}
			premiumSelURL={WPMI_PREMIUM_SELL_URL}
			premiumTitle="Premium"
			tabTitle={currentLibrary?.label}
			toolbar
			toolbarSearchIn={currentLibrary?.label}
			onChangeToolbar={setSearch}
			sidebarContent={<Sidebar {...sidebarProps} />}
			footerContent={<Footer {...footerProps} />}
		>
			{isResolvingCurrentLibrary && isLoadingIconMap ? (
				<Spinner />
			) : iconMap.length > 0 ? (
				<IconMap iconMap={filterIcons(search)} onChangeIcon={setIcon} />
			) : (
				__('The library does not contain icons', 'wp-menu-icons')
			)}
		</Modal>
	);
};

export default App;
