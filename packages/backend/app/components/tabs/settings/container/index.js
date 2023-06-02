import { isEqual } from 'lodash';

/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { usePrevious } from '@wordpress/compose';
import { useSettingsEntities } from '@wpmi/store';
/**
 * Internal dependencies
 */
import { Spinner } from '../../../../../components/spinner';
import { Container } from '../../../../../components/container';
// import ImageUploader from "../../../../../components/media-uploader";
import { OptionLibrary } from '../../../../../components/option-library';
import { WPMI_LIBRARIES } from '../../../../../helpers';
import { Modal } from '../../../../../../navmenu/components';
import NewLibrary from '../../../new-library'

const Settings = () => {
	const { settings, hasResolvedSettings, saveSettings, setSettings } =
		useSettingsEntities();

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

	const submitSettings = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const result = await saveSettings(settings);
		console.log('result: ', result);
		console.log('settings: ', settings);

		setIsLoading(false);
	};

	const onClose = () => setShow(false)

	if (!hasResolvedSettings) {
		return <Spinner />;
	}

	return (
		<Container>
			{__('Enable Libraries', 'wp-menu-icons')}
			<form onSubmit={submitSettings}>
				{__('Default', 'wp-menu-icons')}
				{Object.values(WPMI_LIBRARIES || []).map((library) => {
					if (library.type === 'default') {
						return (
							<OptionLibrary
								key={library.name}
								label={library.label}
								checked={
									!!settings.active_libraries?.includes(
										library.name
									)
								}
								onChange={() =>
									togleActiveLibraries(library.name)
								}
							/>
						);
					}
				})}
				{WPMI_LIBRARIES && Object.keys((WPMI_LIBRARIES || [])).length !== 0 && (
					<>
						{__('Customize', 'wp-menu-icons')}
						{Object.values(WPMI_LIBRARIES).map((library) => {
							if (library.type === 'upload') {
								return (
									<OptionLibrary
										key={library.name}
										label={library.label}
										checked={
											!!settings.active_libraries?.includes(
												library.name
											)
										}
										onChange={() =>
											togleActiveLibraries(library.name)
										}
									/>
								);
							}
						})}
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

			<button
				type="submit"
				className="button button-primary secondary"
				onClick={() => setShow(true)}
			>
				{__('Add New Library', 'wp-menu-icons')}
			</button>

			<Modal
				title='Add New Library'
				show={ show }
				onClose={ onClose }
				__experimentalHideHeader
			>
				<NewLibrary
					onClose={ onClose }
				/>
			</Modal>
		</Container>
	);
};

export default Settings;
