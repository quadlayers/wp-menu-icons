import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

import { Spinner } from '../';

import { useLibraries, useCurrentLibrary, useSettingsEntities } from '@wpmi/store';

const { WPMI_PREFIX } = wpmi_navmenu;

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '';

document.head.appendChild(link);

const inputMenuFont = document.createElement('input');
inputMenuFont.type = 'hidden';
inputMenuFont.id = 'wpmi_font';
inputMenuFont.name = 'wpmi_font';

document.querySelector('.menu-edit').append(inputMenuFont);

export default function MetaBox() {
	const {
		libraries,
		isResolvingLibraries,
		hasResolvedLibraries,
		hasLibraries,
	} = useLibraries();
	const { currentLibrary, currentLibraryName, setCurrentLibraryName } =
		useCurrentLibrary();

	const { settings, hasResolvedSettings } = useSettingsEntities();

	const handleOptionChange = (e) => setCurrentLibraryName(e.target.value);

	const activeLibraries = () => libraries.filter(library => settings.active_libraries.includes(library.name))

	useEffect(() => {
		if (currentLibrary) {
			const { stylesheet_file_url, stylesheet_file, type } = currentLibrary		

			link.href = type === 'default'
				? stylesheet_file
				: stylesheet_file_url

			inputMenuFont.value = currentLibraryName;
		}
	}, [currentLibraryName]);

	if (isResolvingLibraries && !hasResolvedLibraries && !hasResolvedSettings) {
		return <Spinner />;
	} else if (!hasLibraries) {
		return (
			<div>{__('There are no active libraries.', 'wp-menu-icons')};</div>
		);
	}

	return (
		<div
			id={`tabs-panel-${WPMI_PREFIX}-themes`}
			class="tabs-panel tabs-panel-active"
		>
			<ul
				id={WPMI_PREFIX + '-themes-checklist'}
				class="categorychecklist form-no-clear"
			>
				{activeLibraries().map((library) => (
					<li>
						<label class="menu-item-title">
							<input
								type="radio"
								class={WPMI_PREFIX + '-item-checkbox'}
								name={WPMI_PREFIX + '_font'}
								value={library.name}
								checked={library.name === currentLibraryName}
								onChange={handleOptionChange}
							/>
							{library.label}
						</label>
					</li>
				))}
			</ul>
		</div>
	);
}
