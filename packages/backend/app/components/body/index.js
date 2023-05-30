import { useState, useEffect } from "@wordpress/element"

import { IconPreview, IconSettings, IconMap } from "../"
import { Spinner } from "../../../components/"

import { useCurrentLibrary } from "@wpmi/store"

const {
    WPMI_PREFIX,
    WPMI_PLUGIN_NAME,
    WPMI_PREMIUM_SELL_URL,
} = wpmi_backend

const {
	WPMI_LIBRARIES
} = wpmi_store

export default function Body({ idMenu, oldSettings, onClose }) {
    const [library, setLibrary] = useState({
        name: '',
        iconmap: '',
        ID: ''
    })

    const [search, setSearch] = useState('')
    const [settings, setSettings] = useState(oldSettings)
    const [loading, setLoading] = useState(true)

    const setIcon = icon => setSettings({ ...settings, icon })

    const save = e => {
        e.preventDefault()

        const li = document.getElementById('menu-item-' + idMenu)
        const settingsNode = document.getElementById('menu-item-settings-' + idMenu)

		settingsNode.querySelectorAll('#wpmi-input-label').forEach(node => node.value = settings.label)
		settingsNode.querySelectorAll('#wpmi-input-position').forEach(node => node.value = settings.position)
		settingsNode.querySelectorAll('#wpmi-input-align').forEach(node => node.value = settings.align)
		settingsNode.querySelectorAll('#wpmi-input-size').forEach(node => node.value = settings.size)
		settingsNode.querySelectorAll('#wpmi-input-icon').forEach(node => node.value = settings.icon)
		settingsNode.querySelectorAll('#wpmi-input-color').forEach(node => node.value = settings.color)

        const iconNode = li.querySelector('.menu-item-wpmi_icon')
        const plus = li.querySelector('.menu-item-wpmi_plus')

        if (iconNode) iconNode.remove()

        const i = document.createElement('i')

        i.className = 'menu-item-wpmi_icon ' + settings.icon

        plus.before(i)

        onClose()
    }

    const remove = e => {

        const li = document.getElementById('menu-item-' + idMenu)
        const settingsNode = document.getElementById('menu-item-settings-' + idMenu)

		settingsNode.querySelectorAll('#wpmi-input-label').forEach(node => node.value = '')
		settingsNode.querySelectorAll('#wpmi-input-position').forEach(node => node.value = '')
		settingsNode.querySelectorAll('#wpmi-input-align').forEach(node => node.value = '')
		settingsNode.querySelectorAll('#wpmi-input-size').forEach(node => node.value = '')
		settingsNode.querySelectorAll('#wpmi-input-icon').forEach(node => node.value = '')
		settingsNode.querySelectorAll('#wpmi-input-color').forEach(node => node.value = '')

        const iconNode = li.querySelector('.menu-item-wpmi_icon')

        if (iconNode) iconNode.remove()

        onClose()
    }

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLibrary(WPMI_LIBRARIES['eleganticons'])
            setLoading(false)
        }, 500);
    }, [])

    return <div id={ WPMI_PREFIX + '_modal' }>
        <button
            type="button"
            class="media-modal-close close"
            onClick={ onClose }
        >
            <span class="media-modal-icon">
                <span class="screen-reader-text">Close media panel</span>
            </span>
        </button>

        <div class="media-frame mode-select wp-core-ui hide-menu">
            <div class="media-frame-title">
                <h1>
                    { WPMI_PLUGIN_NAME }
                </h1>
            </div>

            <div class="media-frame-router">
                <div class="media-router">
                    <a href={ WPMI_PREMIUM_SELL_URL } class="media-menu-item" target="_blank">Mega Menu</a>
                    <a href="#" class="media-menu-item active">{ library.name }</a>
                </div>
            </div>

            <div class="media-modal-content">
                <div class="media-frame mode-select wp-core-ui">
                    <div class="media-frame-menu">
                        <div class="media-menu">
                            <a href="#" class="media-menu-item active">Featured Image</a>
                        </div>
                    </div>

                    <div class="media-frame-content" data-columns="8">
                        <div class="attachments-browser">
                            <div class="media-toolbar">
                                <div class="media-toolbar-secondary">
                                    <p><em>Search in { library.name }.</em></p>
                                </div>

                                <div class="media-toolbar-primary search-form">
                                    <input
                                        type="search"
                                        placeholder="Search..."
                                        id="media-search-input"
                                        class="search"
                                        onChange={ e => setSearch(e.target.value) }
                                    />
                                </div>
                            </div>

                            {loading
                                ? <div class="attachments">
                                    <Spinner />
                                </div>
                                : <IconMap
                                    iconMap={ library.iconmap }
                                    search={ search }
                                    setIcon={ setIcon }
                                />
                            }

                            <div class="media-sidebar">
                                <div tabindex="0" class="attachment-details save-ready">
                                    <h2>
                                        Icon
                                        <span class="settings-save-status">
                                            <span class="spinner"></span>

                                            <span class="saved">
                                                Saved
                                            </span>
                                        </span>
                                    </h2>
                                </div>

                                <IconPreview
                                    icon={ settings.icon }
                                    settings={ oldSettings }
                                />

                                <IconSettings
                                    settings={ settings }
                                    setSettings={ setSettings }
                                />
                            </div>
                        </div>
                    </div>
                    <div class="media-frame-toolbar">
                        <div class="media-toolbar">
                            <div class="media-toolbar-secondary"></div>

                            <div class="media-toolbar-primary search-form">
                                <button
                                    type="button"
                                    class="button media-button button-large button-primary media-button-select save"
                                    onClick={save}
                                >
                                    Save
                                </button>

                                <button
                                    type="button"
                                    class="button media-button button-large button-secondary remove"
                                    onClick={remove}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
