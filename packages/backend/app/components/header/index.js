/**
 * WordPress dependencies
 */

import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

import {
	WPMI_PLUGIN_NAME,
	getPluginURL,
} from '../../../helpers';

const Header = () => {
	return (
		<div className="wrap about-wrap full-width-layout">
			<h1>{ WPMI_PLUGIN_NAME }</h1>
			<p className="about-text">
				{ sprintf(
					__(
						'Thanks for using %s! We will do our absolute best to support you and fix all the issues.'
					),
					WPMI_PLUGIN_NAME
				) }
			</p>
			<p className="about-text">
				<a href="https://quadlayers.com/products/wp-menu-icons/?utm_source=wpmi_plugin&utm_medium=admin_header&utm_campaign=premium_upgrade&utm_content=premium_link" target="__blank">
					{ __( 'Premium', 'wp-menu-icons' ) }
				</a>
				|
				<a href="https://quadlayers.com/demo/wp-menu-icons/?utm_source=wpmi_plugin&utm_medium=admin_header&utm_campaign=demo&utm_content=demo_link" target="__blank">
					{ __( 'Demo', 'wp-menu-icons' ) }
				</a>
				|
				<a href="https://quadlayers.com/documentation/wp-menu-icons/?utm_source=wpmi_plugin&utm_medium=admin_header&utm_campaign=documentation&utm_content=documentation_link" target="__blank">
					{ __( 'Documentation', 'wp-menu-icons' ) }
				</a>
			</p>
			<a
				href="https://quadlayers.com/?utm_source=wpmi_plugin&utm_medium=admin_header&utm_campaign=branding&utm_content=header_logo"
				target="_blank"
				rel="noreferrer"
			>
				<div
					style={ {
						backgroundImage: `url(${ getPluginURL(
							'/assets/backend/img/quadlayers.jpg'
						) })`,
					} }
					className="wp-badge wpmi__quadlayers__logo"
				>
					QuadLayers
				</div>
			</a>
		</div>
	);
};

export default Header;
