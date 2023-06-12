import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

import { Spinner } from '@wpmi/components';

import { useLibraries, useCurrentLibrary, useSettingsEntities } from '@wpmi/store';

const { WPMI_PREFIX } = wpmi_navmenu

const menuEdit = document.querySelector('.menu-edit')

const inputMenuFont = document.createElement('input');
inputMenuFont.type = 'hidden';
inputMenuFont.id = 'wpmi_font';
inputMenuFont.name = 'wpmi_font';

if (menuEdit) menuEdit.append(inputMenuFont)

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
		if (currentLibrary) inputMenuFont.value = currentLibraryName;
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
								disabled={!library.is_loaded}
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
