import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

import { Spinner } from '@wpmi/components';
import { useCurrentLibrary, useLibraries } from '@wpmi/store';

import LibraryList from '../library-list';

export default function Sidebar() {
	const { currentLibrary, setCurrentLibraryName } = useCurrentLibrary();
	const { libraries, hasLibraries } = useLibraries();
	useEffect(() => {
		if (hasLibraries && !currentLibrary) {
			const library = libraries[0];
			setCurrentLibraryName(library.name);
		}
	}, [hasLibraries]);

	if (!hasLibraries) {
		return (
			<div class="wpmi__container-sidebar">
				<Spinner />
			</div>
		);
	}

	return (
		<div class="wpmi__container-sidebar">
			<h3>{__('Default', 'wp-menu-icons')}</h3>
			<ul>
				<LibraryList type="default" />
			</ul>
			<h3>{__('Upload', 'wp-menu-icons')}</h3>
			<ul>
				<LibraryList type="uploaded" />
			</ul>
		</div>
	);
}
