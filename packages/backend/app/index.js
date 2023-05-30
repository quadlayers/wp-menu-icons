import { useState, useEffect } from '@wordpress/element';

import { Modal } from '../components/';
import { Body } from './components/';

const { WPMI_PLUGIN_NAME } = wpmi_backend;

const App = () => {
	const [show, setShow] = useState(false);
	const [oldSettings, setOldSettings] = useState({});

	const onClose = () => setShow(false);

	const openModal = node => {
		const id = node.id.split('-')[2];

		const settingsNode = document.getElementById('menu-item-settings-' + id);

		const label = settingsNode.querySelector('#wpmi-input-label').value;
		const position = settingsNode.querySelector('#wpmi-input-position').value;
		const align = settingsNode.querySelector('#wpmi-input-align').value;
		const size = settingsNode.querySelector('#wpmi-input-size').value;
		const icon = settingsNode.querySelector('#wpmi-input-icon').value;
		const color = settingsNode.querySelector('#wpmi-input-color').value;

		setOldSettings({
			label,
			position,
			align,
			size,
			icon,
			color,
			id
		});
		setShow(true);
	}

	useEffect(() => {
		const nodes = document.querySelectorAll('.menu-item-wpmi_open');

		nodes.forEach((node) =>
			node.addEventListener('click', (e) => {
				e.preventDefault();

				const li = e.target.closest('li');

				if (li) openModal(li)
			})
		);

		const ul = document.getElementById('menu-to-edit');

		if (ul) {
			const observer = new MutationObserver((mutationsList, observer) => {
				for (let mutation of mutationsList) {
					if (mutation.type === 'childList') {
						for (let node of mutation.addedNodes) {
							const iconNode = node.querySelector('.menu-item-wpmi_open')

							iconNode.addEventListener('click', e => {
								e.preventDefault();

								openModal(node)
							})
						}
					}
				}
			});

			observer.observe(ul, { childList: true });
		}
	}, []);

	return (
		<Modal
			title={ WPMI_PLUGIN_NAME }
			show={ show }
			onClose={ onClose }
			__experimentalHideHeader
		>
			<Body
				oldSettings={ oldSettings }
				onClose={ onClose }
			/>
		</Modal>
	);
};

export default App;
