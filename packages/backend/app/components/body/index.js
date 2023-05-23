import { useState, useEffect } from "@wordpress/element";

import { IconPreview, IconSettings, IconMap } from "../";
import { Spinner } from "../../../components/";

const test = {
    name: 'Dashicons',
    iconmap: 'dashicons dashicons-menu,dashicons dashicons-admin-site,dashicons dashicons-dashboard,dashicons dashicons-admin-post,dashicons dashicons-admin-media,dashicons dashicons-admin-links,dashicons dashicons-admin-page,dashicons dashicons-admin-comments,dashicons dashicons-admin-appearance,dashicons dashicons-admin-plugins,dashicons dashicons-admin-users,dashicons dashicons-admin-tools,dashicons dashicons-admin-settings,dashicons dashicons-admin-network,dashicons dashicons-admin-home,dashicons dashicons-admin-generic,dashicons dashicons-admin-collapse,dashicons dashicons-filter,dashicons dashicons-admin-customizer,dashicons dashicons-admin-multisite,dashicons dashicons-welcome-write-blog,dashicons dashicons-welcome-add-page,dashicons dashicons-welcome-view-site,dashicons dashicons-welcome-widgets-menus,dashicons dashicons-welcome-comments,dashicons dashicons-welcome-learn-more,dashicons dashicons-format-aside,dashicons dashicons-format-image,dashicons dashicons-format-gallery,dashicons dashicons-format-video,dashicons dashicons-format-status,dashicons dashicons-format-quote,dashicons dashicons-format-chat,dashicons dashicons-format-audio,dashicons dashicons-camera,dashicons dashicons-images-alt,dashicons dashicons-images-alt2,dashicons dashicons-video-alt,dashicons dashicons-video-alt2,dashicons dashicons-video-alt3,dashicons dashicons-media-archive,dashicons dashicons-media-audio,dashicons dashicons-media-code,dashicons dashicons-media-default,dashicons dashicons-media-document,dashicons dashicons-media-interactive,dashicons dashicons-media-spreadsheet,dashicons dashicons-media-text,dashicons dashicons-media-video,dashicons dashicons-playlist-audio,dashicons dashicons-playlist-video,dashicons dashicons-controls-play,dashicons dashicons-controls-pause,dashicons dashicons-controls-forward,dashicons dashicons-controls-skipforward,dashicons dashicons-controls-back,dashicons dashicons-controls-skipback,dashicons dashicons-controls-repeat,dashicons dashicons-controls-volumeon,dashicons dashicons-controls-volumeoff,dashicons dashicons-image-crop,dashicons dashicons-image-rotate,dashicons dashicons-image-rotate-left,dashicons dashicons-image-rotate-right,dashicons dashicons-image-flip-vertical,dashicons dashicons-image-flip-horizontal,dashicons dashicons-image-filter,dashicons dashicons-undo,dashicons dashicons-redo,dashicons dashicons-editor-bold,dashicons dashicons-editor-italic,dashicons dashicons-editor-ul,dashicons dashicons-editor-ol,dashicons dashicons-editor-quote,dashicons dashicons-editor-alignleft,dashicons dashicons-editor-aligncenter,dashicons dashicons-editor-alignright,dashicons dashicons-editor-insertmore,dashicons dashicons-editor-spellcheck,dashicons dashicons-editor-expand,dashicons dashicons-editor-contract,dashicons dashicons-editor-kitchensink,dashicons dashicons-editor-underline,dashicons dashicons-editor-justify,dashicons dashicons-editor-textcolor,dashicons dashicons-editor-paste-word,dashicons dashicons-editor-paste-text,dashicons dashicons-editor-removeformatting,dashicons dashicons-editor-video,dashicons dashicons-editor-customchar,dashicons dashicons-editor-outdent,dashicons dashicons-editor-indent,dashicons dashicons-editor-help,dashicons dashicons-editor-strikethrough,dashicons dashicons-editor-unlink,dashicons dashicons-editor-rtl,dashicons dashicons-editor-break,dashicons dashicons-editor-code,dashicons dashicons-editor-paragraph,dashicons dashicons-editor-table,dashicons dashicons-align-left,dashicons dashicons-align-right,dashicons dashicons-align-center,dashicons dashicons-align-none,dashicons dashicons-lock,dashicons dashicons-unlock,dashicons dashicons-calendar,dashicons dashicons-calendar-alt,dashicons dashicons-visibility,dashicons dashicons-hidden,dashicons dashicons-post-status,dashicons dashicons-edit,dashicons dashicons-trash,dashicons dashicons-sticky,dashicons dashicons-external,dashicons dashicons-arrow-up,dashicons dashicons-arrow-down,dashicons dashicons-arrow-right,dashicons dashicons-arrow-left,dashicons dashicons-arrow-up-alt,dashicons dashicons-arrow-down-alt,dashicons dashicons-arrow-right-alt,dashicons dashicons-arrow-left-alt,dashicons dashicons-arrow-up-alt2,dashicons dashicons-arrow-down-alt2,dashicons dashicons-arrow-right-alt2,dashicons dashicons-arrow-left-alt2,dashicons dashicons-sort,dashicons dashicons-leftright,dashicons dashicons-randomize,dashicons dashicons-list-view,dashicons dashicons-exerpt-view,dashicons dashicons-grid-view,dashicons dashicons-share,dashicons dashicons-share-alt,dashicons dashicons-share-alt2,dashicons dashicons-twitter,dashicons dashicons-rss,dashicons dashicons-email,dashicons dashicons-email-alt,dashicons dashicons-facebook,dashicons dashicons-facebook-alt,dashicons dashicons-googleplus,dashicons dashicons-networking,dashicons dashicons-hammer,dashicons dashicons-art,dashicons dashicons-migrate,dashicons dashicons-performance,dashicons dashicons-universal-access,dashicons dashicons-universal-access-alt,dashicons dashicons-tickets,dashicons dashicons-nametag,dashicons dashicons-clipboard,dashicons dashicons-heart,dashicons dashicons-megaphone,dashicons dashicons-schedule,dashicons dashicons-wordpress,dashicons dashicons-wordpress-alt,dashicons dashicons-pressthis,dashicons dashicons-update,dashicons dashicons-screenoptions,dashicons dashicons-info,dashicons dashicons-cart,dashicons dashicons-feedback,dashicons dashicons-cloud,dashicons dashicons-translation,dashicons dashicons-tag,dashicons dashicons-category,dashicons dashicons-archive,dashicons dashicons-tagcloud,dashicons dashicons-text,dashicons dashicons-yes,dashicons dashicons-no,dashicons dashicons-no-alt,dashicons dashicons-plus,dashicons dashicons-plus-alt,dashicons dashicons-minus,dashicons dashicons-dismiss,dashicons dashicons-marker,dashicons dashicons-star-filled,dashicons dashicons-star-half,dashicons dashicons-star-empty,dashicons dashicons-flag,dashicons dashicons-warning,dashicons dashicons-location,dashicons dashicons-location-alt,dashicons dashicons-vault,dashicons dashicons-shield,dashicons dashicons-shield-alt,dashicons dashicons-sos,dashicons dashicons-search,dashicons dashicons-slides,dashicons dashicons-analytics,dashicons dashicons-chart-pie,dashicons dashicons-chart-bar,dashicons dashicons-chart-line,dashicons dashicons-chart-area,dashicons dashicons-groups,dashicons dashicons-businessman,dashicons dashicons-id,dashicons dashicons-id-alt,dashicons dashicons-products,dashicons dashicons-awards,dashicons dashicons-forms,dashicons dashicons-testimonial,dashicons dashicons-portfolio,dashicons dashicons-book,dashicons dashicons-book-alt,dashicons dashicons-download,dashicons dashicons-upload,dashicons dashicons-backup,dashicons dashicons-clock,dashicons dashicons-lightbulb,dashicons dashicons-microphone,dashicons dashicons-desktop,dashicons dashicons-tablet,dashicons dashicons-smartphone,dashicons dashicons-phone,dashicons dashicons-index-card,dashicons dashicons-carrot,dashicons dashicons-building,dashicons dashicons-store,dashicons dashicons-album,dashicons dashicons-palmtree,dashicons dashicons-tickets-alt,dashicons dashicons-money,dashicons dashicons-smiley,dashicons dashicons-thumbs-up,dashicons dashicons-thumbs-down,dashicons dashicons-layout',
    ID: 'dashicons'
}

const {
    WPMI_PREFIX,
    WPMI_PLUGIN_NAME,
    WPMI_PREMIUM_SELL_URL
} = wpmi_backend

export default function Body({ idMenu, oldSettings, onClose }) {
    const [library, setLibrary] = useState({
        name: '',
        iconmap: '',
        ID: ''
    })
    const [icon, setIcon] = useState(oldSettings.icon)
    const [search, setSearch] = useState('')
    const [settings, setSettings] = useState(oldSettings)
    const [loading, setLoading] = useState(true)

    const save = e => {
        e.preventDefault()

        const li = document.getElementById('menu-item-' + idMenu)
        const settingsNode = document.getElementById('menu-item-settings-' + idMenu)

		settingsNode.querySelector('#wpmi-input-label').value = settings.label
		settingsNode.querySelector('#wpmi-input-position').value = settings.position
		settingsNode.querySelector('#wpmi-input-align').value = settings.align
		settingsNode.querySelector('#wpmi-input-size').value = settings.size
		settingsNode.querySelector('#wpmi-input-icon').value = icon
		settingsNode.querySelector('#wpmi-input-color').value = settings.color

        const iconNode = li.querySelector('.menu-item-wpmi_icon')
        const plus = li.querySelector('.menu-item-wpmi_plus')

        if (iconNode) iconNode.remove()

        const i = document.createElement('i')

        i.className = 'menu-item-wpmi_icon ' + icon

        plus.before(i)

        onClose()
    }

    const remove = e => {

        const li = document.getElementById('menu-item-' + idMenu)
        const settingsNode = document.getElementById('menu-item-settings-' + idMenu)

		settingsNode.querySelector('#wpmi-input-label').value = ''
		settingsNode.querySelector('#wpmi-input-position').value = ''
		settingsNode.querySelector('#wpmi-input-align').value = ''
		settingsNode.querySelector('#wpmi-input-size').value = ''
		settingsNode.querySelector('#wpmi-input-icon').value = ''
		settingsNode.querySelector('#wpmi-input-color').value = ''
        
        const iconNode = li.querySelector('.menu-item-wpmi_icon')

        if (iconNode) iconNode.remove()

        onClose()
    }

    useEffect(() => {
        setLoading(true)

        setTimeout(() => {
            setLibrary(test)
            setLoading(false)
        }, 500);
    }, [idMenu])

    return <div id={ WPMI_PREFIX + '_modal' } class="media-modal wp-core-ui">
        <button type="button" class="media-modal-close close">
            <span class="media-modal-icon">
                <span class="screen-reader-text">Close media panel</span>
            </span>
        </button>
        
        <div class="media-frame mode-select wp-core-ui hide-menu">
            <div class="media-frame-title">
                <h1>
                    { WPMI_PLUGIN_NAME }<span class="dashicons dashicons-arrow-down"></span>
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
                                        onChange={e => setSearch(e.target.value)}
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
                                    icon={ icon }
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