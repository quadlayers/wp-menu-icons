import classnames from 'classnames';

import { __ } from '@wordpress/i18n';
import { formatClassIcon } from '../helpers';

export default function IconMap( {
	iconMap,
	onChangeIcon,
	icon: currentIcon,
} ) {
	const handleClick = ( icon ) => {
		if ( onChangeIcon ) onChangeIcon( icon );
	};

	return (
		<div className="wpmi__icon-map">
			<ul tabIndex="-1">
				{ iconMap.map( ( icon, i ) => (
					<li
						key={ icon }
						tabIndex={ i }
						role="checkbox"
						aria-label={ icon }
						aria-checked="false"
						data-id={ i }
						className={ classnames(
							'attachment save-ready',
							'icon _' + formatClassIcon( icon ),
							formatClassIcon( icon ) === currentIcon &&
								'selected'
						) }
						onClick={ () => handleClick( icon ) }
					>
						<div className="attachment-preview js--select-attachment type-image subtype-jpeg landscape">
							<div className="thumbnail">
								<i className={ icon }></i>
							</div>
						</div>

						<button type="button" className="check" tabIndex="-1">
							<span className="media-modal-icon"></span>
							<span className="screen-reader-text">
								{ __( 'Deselect', 'wp-menu-icons' ) }
							</span>
						</button>
					</li>
				) ) }
			</ul>
		</div>
	);
}
