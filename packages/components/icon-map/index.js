import classnames from 'classnames';

import { __ } from '@wordpress/i18n';
import { formatClassIcon } from '../helpers';

export default function IconMap({ iconMap, onChangeIcon, icon: currentIcon }) {

	const handleClick = (icon) => {
		if (onChangeIcon) onChangeIcon(icon);
	};

	return (
		<div class="wpmi__icon-map">
			<ul tabindex="-1">
				{iconMap.map((icon, i) => (
					<li
						key={icon}
						tabindex={i}
						role="checkbox"
						aria-label={icon}
						aria-checked="false"
						data-id={i}
						class={classnames(
							'attachment save-ready',
							'icon _' + formatClassIcon(icon),
							formatClassIcon(icon) === currentIcon && 'selected'
						)}
						onClick={() => handleClick(icon)}
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
		</div>
	);
}
