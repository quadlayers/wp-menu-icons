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

import { Wrap } from '../../../../../components/wrap';
import { OptionLibrary } from '../../../../../components/option-library';
import LibraryManager from '../../../library-manager';

const Settings = () => {
	const { settings, hasResolvedSettings, saveSettings, setSettings } =
		useSettingsEntities();

	const { libraries, hasResolvedLibraries } = useLibraries();

	const [show, setShow] = useState(false);

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

	const submitSettings = (e) => {
		e.preventDefault();
		setIsLoading(true);

		saveSettings(settings).then(() => setIsLoading(false));
	};

	const onClose = () => setShow(false);

	const isActive = (library) =>
		!!settings.active_libraries?.includes(library.name);

	if (!hasResolvedSettings && !hasResolvedLibraries) {
		return <Spinner />;
	}

	return (
		<Wrap>
			<form onSubmit={submitSettings}>
				<table class="form-table widefat striped">
					<tbody>
						<tr>
							<td colSpan={100}>
								<table>
									<th>
										{__(
											'Activate Libraries',
											'wp-menu-icons'
										)}
									</th>
									<td>
										{libraries.map((library) => (
											<OptionLibrary
												key={library.name}
												label={library.label}
												type={library.type}
												disabled={!library.is_loaded}
												checked={isActive(library)}
												onChange={() =>
													togleActiveLibraries(
														library.name
													)
												}
											/>
										))}
										<span class="description">
											{__(
												'Uncheck to disable libraries in navigation menu.',
												'wp-menu-icons'
											)}
										</span>
									</td>
								</table>
							</td>
						</tr>
						<tr colSpan={3}>
							<td>
								<button
									disabled={!isModified}
									type="submit"
									className="button button-primary secondary"
								>
									{__('Save', 'wp-menu-icons')}
								</button>

								<button
									style={{ marginLeft: '10px' }}
									className="button button-primary secondary"
									onClick={(e) => {
										e.preventDefault();
										setShow(true);
									}}
								>
									{__('Libraries Manager', 'wp-menu-icons')}
								</button>
								{isLoading && (
									<span
										style={{ visibility: 'visible' }}
										className="spinner"
									/>
								)}
							</td>
						</tr>
					</tbody>
				</table>
			</form>
			<LibraryManager show={show} onClose={onClose} />
		</Wrap>
	);
};

export default Settings;
