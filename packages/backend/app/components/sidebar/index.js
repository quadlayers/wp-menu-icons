import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

import { useCurrentLibrary, useLibraries } from "../../../../store/helpers"
import { Spinner } from "../../../components/spinner"

import LibraryList from '../library-list';

export default function Sidebar() {
	const { setCurrentLibraryName } = useCurrentLibrary()
    const { libraries, hasLibraries } = useLibraries()

    useEffect(() => {
        if (hasLibraries) {
            const library = libraries[0]

            setCurrentLibraryName(library.name)
        }
    }, [hasLibraries])

    if (!hasLibraries) {
        return <div class="container-sidebar">
            <Spinner />
        </div>
    }

    return <div class="container-sidebar">
        <div class='title'>{__('Default', 'wp-menu-icons')}</div>

        <ul>
            <LibraryList type='default' />
        </ul>

        <div class='title'>{__('Uploaded', 'wp-menu-icons')}</div>

        <ul>
            <LibraryList type='uploaded' />
        </ul>
    </div>
}