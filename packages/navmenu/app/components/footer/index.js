import { __ } from '@wordpress/i18n';

export default function Footer({ settings, onSave, onRemove }) {
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

		onSave();
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

		onRemove();
	};

	return (
		<>
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
		</>
	);
}
