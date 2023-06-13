import { isEqual } from 'lodash';

/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { usePrevious } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { useSettingsEntities, useLibraries } from '@wpmi/store';
import { Spinner } from '@wpmi/components';

import { Container } from '../../../../../components/container';
import { OptionLibrary } from '../../../../../components/option-library';
import LibraryManager from '../../../library-manager';

const Settings = () => {
	const { settings, hasResolvedSettings, saveSettings, setSettings } =
		useSettingsEntities();

	const { libraries, hasResolvedLibraries } = useLibraries()

	const [show, setShow] = useState(false)

	const [isLoading, setIsLoading] = useState(false);

	const prevSettings = usePrevious(settings);

	const isModified = !isEqual(settings, prevSettings);

	const togleActiveLibraries = (libraryName) => {
		const isIncluded = settings.active_libraries?.includes(libraryName);
		let newArray = [];

		if (isIncluded) {
			newArray = settings.active_libraries?.filter(
				(library) => library !== libraryName
			);
		} else {
			newArray = [...settings.active_libraries, libraryName];
		}

		setSettings({
			...settings,
			active_libraries: newArray,
		});
	};

	const submitSettings = e => {
		e.preventDefault();
		setIsLoading(true);

		saveSettings(settings).then(() => setIsLoading(false))
	};

	const filterLibraries = type => libraries.filter(library => library.type === type)

	const onClose = () => setShow(false)

	const isActive= library => !!settings.active_libraries?.includes(library.name)

	if (!hasResolvedSettings && !hasResolvedLibraries) {
		return <Spinner />;
	}

	return (
		<Container>
			{__('Enable Libraries', 'wp-menu-icons')}
			<form onSubmit={submitSettings}>
				{__('Default', 'wp-menu-icons')}
				{filterLibraries('default').map((library) =>
					<OptionLibrary
						key={library.name}
						label={library.label}
						disabled={!library.is_loaded}
						checked={isActive(library)}
						onChange={() =>
							togleActiveLibraries(library.name)
						}
					/>
				)}
				{filterLibraries('uploaded').length !== 0 &&
					<>
						{__('Customize', 'wp-menu-icons')}
						{filterLibraries('uploaded').map((library) =>
							<OptionLibrary
								key={library.name}
								label={library.label}
								disabled={!library.is_loaded}
								checked={isActive(library)}
								onChange={() =>
									togleActiveLibraries(library.name)
								}
							/>
						)}
					</>
				}

				<span className="spinner"></span>
				<button
					disabled={!isModified}
					type="submit"
					className="button button-primary secondary"
				>
					{__('Save', 'wp-menu-icons')}
				</button>
				{isLoading && (
					<span
						style={{ visibility: 'visible' }}
						className="spinner"
					/>
				)}
			</form>

			<button
				type="submit"
				className="button button-primary secondary"
				onClick={() => setShow(true)}
			>
				{__('Manager Libraries', 'wp-menu-icons')}
			</button>

			<LibraryManager
				show={show}
				onClose={onClose}
			/>
		</Container>
	);
};

export default Settings;
