import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

import { Spinner } from "@wpmi/components"
import { useCurrentLibrary, useLibraries } from "../../../../store/helpers"

import LibraryList from '../library-list';

export default function Sidebar() {
	const { currentLibrary, setCurrentLibraryName } = useCurrentLibrary()
    const { libraries, hasLibraries } = useLibraries()

    useEffect(() => {
        if (hasLibraries && !currentLibrary) {
            const library = libraries[0]

            setCurrentLibraryName(library.name)
        }
    }, [hasLibraries])

    if (!hasLibraries) {
        return <div class="wpmi__container-sidebar">
            <Spinner />
        </div>
    }

    return <div class="wpmi__container-sidebar">
        <div class='wpmi__container-sidebar__title'>{__('Default', 'wp-menu-icons')}</div>

        <ul>
            <LibraryList type='default' />
        </ul>

        <div class='wpmi__container-sidebar__title'>{__('Uploaded', 'wp-menu-icons')}</div>

        <ul>
            <LibraryList type='uploaded' />
        </ul>
    </div>
}
