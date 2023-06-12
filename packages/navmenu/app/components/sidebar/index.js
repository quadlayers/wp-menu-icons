import { __ } from '@wordpress/i18n';

import IconPreview from "./icon-preview";
import IconSettings from "./icon-settings";

export default function Sidebar({ settings, onChangeSettings }) {
	const oldSettings = { ...settings }

    return <>
        <div
            tabindex="0"
            class="attachment-details save-ready"
        >
            <h2>
                {__('Icon', 'wp-menu-icons')}
                <span class="settings-save-status">
                    <span class="spinner"></span>

                    <span class="saved">
                        {__(
                            'Saved',
                            'wp-menu-icons'
                        )}
                    </span>
                </span>
            </h2>
        </div>

        <IconPreview
            icon={settings.icon}
            settings={oldSettings}
        />

        <IconSettings
            settings={settings}
            onChangeSettings={onChangeSettings}
        />
    </>
}