import { useMemo } from "@wordpress/element"

import { useCurrentLibrary, useLibraries } from "../../../../store/helpers"

export default function LibraryList({ type }) {
    const { currentLibrary, setCurrentLibraryName } = useCurrentLibrary()
    const { libraries, deleteLibrary } = useLibraries()

    const filteredLibraries = useMemo(() => libraries.filter(library => library.type === type || !type), [libraries, type])

    const isSelected = name => name === currentLibrary?.name

    const iconAction = library => library.is_loaded ? "trash" : 'upload'

    const handleDelete = async (e, library) => {
        if (library.is_loaded) {
            e.stopPropagation()

            const response = await deleteLibrary(library.name)

            if (response) setCurrentLibraryName(library.name)
        }
    }

    return filteredLibraries.map(library =>
        <li
            key={library.name}
            class={`wpmi__container-sidebar__item ${isSelected(library.name) && 'wpmi__container-sidebar__item--active'}`}
            onClick={() => setCurrentLibraryName(library.name)}
        >
            <span class="dashicons dashicons-star-filled" /> {library.label}

            {type === 'uploaded' && <div
                class={`dashicons dashicons-${iconAction(library)}`}
                onClick={e => handleDelete(e, library)}
            />}
        </li>
    )
}