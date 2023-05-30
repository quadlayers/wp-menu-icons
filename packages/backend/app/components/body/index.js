import { useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';

import { IconPreview, IconSettings, IconMap } from '../';
import { Spinner } from '../../../components/';

import { useCurrentLibrary } from '@wpmi/store';

const { WPMI_PREFIX, WPMI_PLUGIN_NAME, WPMI_PREMIUM_SELL_URL } = wpmi_backend;

export default function Body({ oldSettings, onClose }) {
	const { currentLibrary, isResolvingCurrentLibrary } = useCurrentLibrary();

	console.log('currentLibrary: ', currentLibrary);

	const [search, setSearch] = useState('');
	const [settings, setSettings] = useState(oldSettings);
	const setIcon = (icon) => setSettings({ ...settings, icon });
	const handleSearchChange = (e) => setSearch(e.target.value);

	const save = (e) => {
		e.preventDefault();

		const li = document.getElementById('menu-item-' + settings.id);
		const settingsNode = document.getElementById(
			'menu-item-settings-' + settings.id
		);

		settingsNode
			.querySelectorAll('#wpmi-input-label')
			.forEach((node) => (node.value = settings.label));
		settingsNode
			.querySelectorAll('#wpmi-input-position')
			.forEach((node) => (node.value = settings.position));
		settingsNode
			.querySelectorAll('#wpmi-input-align')
			.forEach((node) => (node.value = settings.align));
		settingsNode
			.querySelectorAll('#wpmi-input-size')
			.forEach((node) => (node.value = settings.size));
		settingsNode
			.querySelectorAll('#wpmi-input-icon')
			.forEach((node) => (node.value = settings.icon));
		settingsNode
			.querySelectorAll('#wpmi-input-color')
			.forEach((node) => (node.value = settings.color));

		const iconNode = li.querySelector('.menu-item-wpmi_icon');
		const plus = li.querySelector('.menu-item-wpmi_plus');

		if (iconNode) iconNode.remove();

		const i = document.createElement('i');

		i.className = 'menu-item-wpmi_icon ' + settings.icon;

		plus.before(i);

		onClose();
	};

	const remove = (e) => {
		e.preventDefault();

		const li = document.getElementById('menu-item-' + settings.id);
		const settingsNode = document.getElementById(
			'menu-item-settings-' + settings.id
		);

		settingsNode
			.querySelectorAll('#wpmi-input-label')
			.forEach((node) => (node.value = ''));
		settingsNode
			.querySelectorAll('#wpmi-input-position')
			.forEach((node) => (node.value = ''));
		settingsNode
			.querySelectorAll('#wpmi-input-align')
			.forEach((node) => (node.value = ''));
		settingsNode
			.querySelectorAll('#wpmi-input-size')
			.forEach((node) => (node.value = ''));
		settingsNode
			.querySelectorAll('#wpmi-input-icon')
			.forEach((node) => (node.value = ''));
		settingsNode
			.querySelectorAll('#wpmi-input-color')
			.forEach((node) => (node.value = ''));

		const iconNode = li.querySelector('.menu-item-wpmi_icon');

		if (iconNode) iconNode.remove();

		onClose();
	};

	return (
		<div id={WPMI_PREFIX + '_modal'}>
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
					<h1>{WPMI_PLUGIN_NAME}</h1>
				</div>

				<div class="media-frame-router">
					<div class="media-router">
						<a
							href={WPMI_PREMIUM_SELL_URL}
							class="media-menu-item"
							target="_blank"
						>
							{__('Mega Menu', 'wp-menu-icons')}
						</a>
						<a href="#" class="media-menu-item active">
							{currentLibrary.label}
						</a>
					</div>
				</div>

				<div class="media-modal-content">
					<div class="media-frame mode-select wp-core-ui">
						<div class="media-frame-menu">
							<div class="media-menu">
								<a href="#" class="media-menu-item active">
									{__('Featured Image', 'wp-menu-icons')}
								</a>
							</div>
						</div>

						<div class="media-frame-content" data-columns="8">
							<div class="attachments-browser">
								<div class="media-toolbar">
									<div class="media-toolbar-secondary">
										<p>
											<em>
												{sprintf(
													__(
														'Search in %s',
														'wp-menu-icons'
													),
													currentLibrary.label
												)}
											</em>
										</p>
									</div>

									<div class="media-toolbar-primary search-form">
										<input
											type="search"
											placeholder="Search..."
											id="media-search-input"
											class="search"
											onChange={handleSearchChange}
										/>
									</div>
								</div>

								{isResolvingCurrentLibrary ? (
									<div class="attachments">
										<Spinner />
									</div>
								) : (
									<IconMap
										iconMap={currentLibrary.iconmap}
										search={search}
										setIcon={setIcon}
									/>
								)}

								<div class="media-sidebar">
									<div
										tabindex="0"
										class="attachment-details save-ready"
									>
										<h2>
											{__('Icon', 'wp-menu-icons')}
											<span class="settings-save-status">
												<span class="spinner"></span>

												<span class="saved">
													{__(
														'Saved',
														'wp-menu-icons'
													)}
												</span>
											</span>
										</h2>
									</div>

									<IconPreview
										icon={settings.icon}
										settings={oldSettings}
									/>

									<IconSettings
										settings={settings}
										setSettings={setSettings}
									/>
								</div>
							</div>
						</div>
						<div class="media-frame-toolbar">
							<div class="media-toolbar">
								<div class="media-toolbar-secondary"></div>

								<div class="media-toolbar-primary search-form">
									<button
										type="button"
										class="button media-button button-large button-primary media-button-select save"
										onClick={save}
									>
										{__('Save', 'wp-menu-icons')}
									</button>

									<button
										type="button"
										class="button media-button button-large button-secondary remove"
										onClick={remove}
									>
										{__('Remove', 'wp-menu-icons')}
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
