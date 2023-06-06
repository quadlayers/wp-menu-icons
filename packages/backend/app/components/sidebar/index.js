import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

import { useCurrentLibrary, useLibraries } from "../../../../store/helpers"
import { Spinner } from "../../../components/spinner"

export default function Sidebar() {
	const { currentLibrary, setCurrentLibraryName } = useCurrentLibrary()
    const { libraries, hasLibraries, deleteLibrary } = useLibraries()

    const filterLibraries = type => libraries.filter(library => library.type === type)

    const isSelected = name => name === currentLibrary?.name

    const handleDelete = async (e, libraryName) => {
        e.stopPropagation()

        const response = await deleteLibrary(libraryName)

        if (response) setCurrentLibraryName(libraryName)
    }

    const libraryList = type => filterLibraries(type).map(library =>
        <li
            class={isSelected(library.name) && 'active'}
            onClick={() => setCurrentLibraryName(library.name)}
        >
            <span class="dashicons dashicons-star-filled" /> {library.label}

            {type === 'uploaded' && <div
                class="dashicons dashicons-trash"
                onClick={e => handleDelete(e, library.name)}
            />}
        </li>
    )

    useEffect(() => {
        if (hasLibraries) {
            const library = filterLibraries('default')[0]

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
            {libraryList('default')}
        </ul>

        <div class='title'>{__('Uploaded', 'wp-menu-icons')}</div>

        <ul>
            {libraryList('uploaded')}
        </ul>
    </div>
}
