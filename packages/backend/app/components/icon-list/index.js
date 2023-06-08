export default function IconList({ iconList }) {
	const formatClassIcon = (icon) => icon.trim().replace(/ /g, '_');

    return <ul tabindex="-1" class="attachments icon-list">
        {iconList.map((icon, i) => (
            <li
                tabindex={i}
                aria-label={icon}
                data-id={i}
                class={
                    'attachment save-ready icon _' + formatClassIcon(icon)
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