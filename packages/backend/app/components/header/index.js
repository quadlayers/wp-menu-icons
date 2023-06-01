/**
 * WordPress dependencies
 */

import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

import {
	WPMI_PLUGIN_NAME,
	WPMI_PREMIUM_SELL_URL,
	WPMI_DEMO_URL,
	WPMI_DOCUMENTATION_URL,
	getPluginURL,
} from '../../../helpers';

const Header = () => {
	return (
		<>
			<div className="wrap about-wrap full-width-layout">
				<h1>{WPMI_PLUGIN_NAME}</h1>
				<p className="about-text">
					{sprintf(
						__(
							'Thanks for using %s! We will do our best to offer you the best and improved communication experience with your users.'
						),
						WPMI_PLUGIN_NAME
					)}
				</p>
				<p className="about-text">
					<a href={WPMI_PREMIUM_SELL_URL} target="__blank">
						{__('Premium', 'wp-menu-icons')}
					</a>{' '}
					|
					<a href={WPMI_DEMO_URL} target="__blank">
						{__('Demo', 'wp-menu-icons')}
					</a>{' '}
					|
					<a href={WPMI_DOCUMENTATION_URL} target="__blank">
						{__('Documentation', 'wp-menu-icons')}
					</a>{' '}
					|
					<a
						href="https://quadlayers.com/documentation/instagram-feed-gallery/api/business/?utm_source=qligg_admin"
						target="__blank"
					>
						{__('Business', 'wp-menu-icons')}
					</a>
				</p>
				<a
					href="https://quadlayers.com/?utm_source=qligg_admin"
					target="_blank"
					rel="noreferrer"
				>
					<div
						style={{
							backgroundImage: `url(${getPluginURL(
								'/assets/backend/img/quadlayers.jpg'
							)})`,
						}}
						className="wp-badge quadlayers__logo"
					>
						QuadLayers
					</div>
				</a>
			</div>
		</>
	);
};

export default Header;
