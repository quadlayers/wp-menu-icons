import { useState, useEffect } from '@wordpress/element';

import { Modal } from '../components/';
import { Body } from './components/';

const { WPMI_PLUGIN_NAME } = wpmi_backend;

const App = () => {
	alert('test')
	/*
	const [show, setShow] = useState(false);
	const [idMenu, setIdMenu] = useState(null);
	const [oldSettings, setOldSettings] = useState({});

	const onClose = () => setShow(false);

	useEffect(() => {
		const nodes = document.querySelectorAll('.menu-item-wpmi_open');

		nodes.forEach((node) =>
			node.addEventListener('click', (e) => {
				e.preventDefault();

				const li = e.target.closest('li');

				if (li) {
					const id = li.id.split('-')[2];

					const settingsNode = document.getElementById(
						'menu-item-settings-' + id
					);

					const label =
						settingsNode.querySelector('#wpmi-input-label').value;
					const position = settingsNode.querySelector(
						'#wpmi-input-position'
					).value;
					const align =
						settingsNode.querySelector('#wpmi-input-align').value;
					const size =
						settingsNode.querySelector('#wpmi-input-size').value;
					const icon =
						settingsNode.querySelector('#wpmi-input-icon').value;
					const color =
						settingsNode.querySelector('#wpmi-input-color').value;

					setOldSettings({
						label,
						position,
						align,
						size,
						icon,
						color,
					});
					setIdMenu(id);
					setShow(true);
				}
			})
		);
	}, []);
*/

	//return (
	//	<Modal
	//		title={WPMI_PLUGIN_NAME}
	//		show={show}
	//		onClose={onClose}
	//		__experimentalHideHeader
	//	>
	//		<Body idMenu={idMenu} oldSettings={oldSettings} onClose={onClose} />
	//	</Modal>
	//);
};

export default App;
