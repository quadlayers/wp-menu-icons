import { __ } from '@wordpress/i18n';

export default function Toolbar({ searchIn, onChange, domain }) {
	const handleSearchChange = e => onChange(e.target.value)

    return <div class="media-toolbar">
        <div class="media-toolbar-secondary">
            <p>
                <em>
                    {sprintf(
                        __(
                            'Search in %s',
                            domain
                        ),
                        searchIn
                    )}
                </em>
            </p>
        </div>

        <div class="media-toolbar-primary search-form">
            <input
                type="search"
                placeholder="Search..."
                id="media-search-input"
                class="search"
                onChange={handleSearchChange}
            />
        </div>
    </div>
}