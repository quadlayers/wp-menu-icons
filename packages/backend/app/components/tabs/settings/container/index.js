import { isEqual } from 'lodash';

/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { usePrevious } from '@wordpress/compose';
import { useActiveLibraries } from '@wpmi/store';
/**
 * Internal dependencies
 */
import { Spinner } from '../../../../../components/spinner';
import { Container } from '../../../../../components/container';
// import ImageUploader from "../../../../../components/media-uploader";
import { OptionLibrary } from '../../../../../components/option-library';
import {
	WPMI_LIBRARIES_DEFAULT,
	WPMI_LIBRARIES_CUSTOM,
} from '../../../../../helpers';

const Settings = () => {
	const {
		activelibraries,
		hasResolvedActiveLibraries,
		saveSettings,
		setActiveLibraries,
	} = useActiveLibraries();

	console.log('activelibraries: ', activelibraries);

	const [isLoading, setIsLoading] = useState(false);

	const prevSettings = usePrevious(activelibraries);

	const isModified = !isEqual(activelibraries, prevSettings);

	if (!hasResolvedActiveLibraries) {
		return <Spinner />;
	}

	const togleActiveLibraries = (libraryName) => {
		const isIncluded =
			activelibraries.active_libraries?.includes(libraryName);
		let newArray = [];

		if (isIncluded) {
			newArray = activelibraries.active_libraries?.filter(
				(library) => library !== libraryName
			);
		} else {
			newArray = [...activelibraries.active_libraries, libraryName];
		}

		setActiveLibraries({
			...activelibraries,
			active_libraries: newArray,
		});
	};

	const submitSettings = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const result = await saveSettings(activelibraries);
		console.log('result: ', result);
		console.log('activelibraries: ', activelibraries);

		setIsLoading(false);
	};

	return (
		<Container>
			{__('Enable Libraries', 'wp-menu-icons')}
			<form onSubmit={submitSettings}>
				{__('Default', 'wp-menu-icons')}
				{Object.values(WPMI_LIBRARIES_DEFAULT).map((library) => (
					<OptionLibrary
						key={library.name}
						label={library.label}
						checked={
							!!activelibraries.active_libraries?.includes(
								library.name
							)
						}
						onChange={() => togleActiveLibraries(library.name)}
					/>
				))}
				{WPMI_LIBRARIES_CUSTOM &&
					Object.keys(WPMI_LIBRARIES_CUSTOM).length !== 0 && (
						<>
							{__('Customize', 'wp-menu-icons')}
							{Object.values(WPMI_LIBRARIES_CUSTOM).map(
								(library) => {
									return (
										<OptionLibrary
											key={library.name}
											label={library.label}
											checked={
												!!activelibraries.active_libraries?.includes(
													library.name
												)
											}
											onChange={() =>
												togleActiveLibraries(
													library.name
												)
											}
										/>
									);
								}
							)}
						</>
					)}

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
		</Container>
	);
};

export default Settings;
