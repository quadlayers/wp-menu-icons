import { useCurrentLibrary, useLibraries } from "../../../../store/helpers"

export default function LibraryList({ type }) {
    const { currentLibrary, setCurrentLibraryName } = useCurrentLibrary()
    const { libraries, deleteLibrary } = useLibraries()

    const filterLibraries = () => libraries.filter(library => library.type === type || !type)

    const isSelected = name => name === currentLibrary?.name

    const iconAction = library => library.is_loaded ? "trash" : 'upload'

    const handleDelete = async (e, library) => {
        if (library.is_loaded) {
            e.stopPropagation()

            const response = await deleteLibrary(library.name)

            if (response) setCurrentLibraryName(library.name)
        }
    }

    return filterLibraries().map(library =>
        <li
            class={isSelected(library.name) && 'active'}
            onClick={() => setCurrentLibraryName(library.name)}
        >
            <span class="dashicons dashicons-star-filled" /> {library.label}

            {type === 'uploaded' && <div
                class={"dashicons dashicons-" + iconAction(library)}
                onClick={e => handleDelete(e, library)}
            />}
        </li>
    )
}