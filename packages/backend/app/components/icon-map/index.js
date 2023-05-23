export default function IconMap({ iconMap, search, setIcon }) {
    const filterIcons = () => iconMap.split(',').filter(icon => icon.includes(search))

    return <ul tabindex="-1" class="attachments">
        {filterIcons().map((icon, i) =>
                <li
                    tabindex="0"
                    role="checkbox"
                    aria-label={ icon }
                    aria-checked="false"
                    data-id={ i }
                    class={ "attachment save-ready icon _" + icon.trim().replace(/ /g, '_') }
                    onClick={() => setIcon(icon)}
                >
                    <div class="attachment-preview js--select-attachment type-image subtype-jpeg landscape">
                        <div class="thumbnail">
                            <i class={ icon }></i>
                        </div>
                    </div>

                    <button type="button" class="check" tabindex="-1">
                        <span class="media-modal-icon"></span>
                        <span class="screen-reader-text">Deselect</span>
                    </button>
                </li>
        )}
    </ul>
}