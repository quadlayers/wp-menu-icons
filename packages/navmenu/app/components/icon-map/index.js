import { __ } from '@wordpress/i18n';

export default function IconMap({ iconMap, search, setIcon }) {
	const filterIcons = () => iconMap.filter((icon) => icon.includes(search));

	const formatClassIcon = (icon) => icon.trim().replace(/ /g, '_');

	return (
		<ul tabindex="-1" class="attachments">
			{filterIcons()?.map((icon, i) => (
				<li
					tabindex={i}
					role="checkbox"
					aria-label={icon}
					aria-checked="false"
					data-id={i}
					class={
						'attachment save-ready icon _' + formatClassIcon(icon)
					}
					onClick={() => setIcon(icon)}
				>
					<div class="attachment-preview js--select-attachment type-image subtype-jpeg landscape">
						<div class="thumbnail">
							<i class={icon}></i>
						</div>
					</div>

					<button type="button" class="check" tabindex="-1">
						<span class="media-modal-icon"></span>
						<span class="screen-reader-text">
							{__('Deselect', 'wp-menu-icons')}
						</span>
					</button>
				</li>
			))}
		</ul>
	);
}
