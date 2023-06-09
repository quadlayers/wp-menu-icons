export default function IconMap({ iconMap }) {
	const formatClassIcon = (icon) => icon.trim().replace(/ /g, '_');

    return <ul tabindex="-1" class="attachments icon-map">
        {iconMap.map((icon, i) => (
            <li
                tabindex={i}
                aria-label={icon}
                data-id={i}
                class={
                    'attachment save-ready icon-map__item icon _' + formatClassIcon(icon)
                }
            >
                <div class="attachment-preview type-image subtype-jpeg landscape">
                    <div class="thumbnail">
                        <i class={icon}></i>
                    </div>
                </div>
            </li>
        ))}
    </ul>
}