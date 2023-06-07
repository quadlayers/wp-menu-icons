import { useEffect, useState } from '@wordpress/element';

import { useCurrentLibrary, useLibraries } from "../../../../store/helpers"

export default function LibraryList({ type }) {
    const [uploadedLibraries, setUploadedLibraries] =useState([])

	const { currentLibrary, setCurrentLibraryName } = useCurrentLibrary()
    const { libraries, deleteLibrary } = useLibraries()

    const filterLibraries = () => libraries.filter(library => library.type === type || !type)

    const isSelected = name => name === currentLibrary?.name

    const iconAction = name => uploadedLibraries.includes(name) ? "trash" : 'upload'

    const handleDelete = async (e, name) => {
        if (uploadedLibraries.includes(name)) {
            e.stopPropagation()

            const response = await deleteLibrary(name)

            if (response) setCurrentLibraryName(name)
        }
    }

    const fetchUploadedLibraries = async () => {
        const responses = await Promise.all(filterLibraries().map(library => fetch(new Request(library.json_file_url, { cache: 'no-store' }))));
        let array = []

        responses.forEach(response => {
            if (response.ok) {
                const libraryName = libraries.find(library => library.json_file_url === response.url).name

                array.push(libraryName)
            }
        })

        setUploadedLibraries(array)
    }

    useEffect(() => {
        if (type === 'uploaded') fetchUploadedLibraries()
    }, [libraries])

    return filterLibraries().map(library =>
        <li
            class={isSelected(library.name) && 'active'}
            onClick={() => setCurrentLibraryName(library.name)}
        >
            <span class="dashicons dashicons-star-filled" /> {library.label}

            {type === 'uploaded' && <div
                class={"dashicons dashicons-" + iconAction(library.name)}
                onClick={e => handleDelete(e, library.name)}
            />}
        </li>
    )
}