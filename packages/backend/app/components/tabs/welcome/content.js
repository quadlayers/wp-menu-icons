/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import Button from '../../../../components/button';

/**
 * Internal dependencies
 */

import {
	getPluginURL,
	WPMI_DEMO_URL,
	WPMI_GROUP_URL,
	WPMI_PLUGIN_NAME,
	WPMI_PLUGIN_VERSION,
	WPMI_PREMIUM_SELL_URL,
	WPMI_SUPPORT_URL,
} from '../../../../helpers';

const Content = () => {
	return (
		<div className="wrap about-wrap full-width-layout">
			<div className="has-2-columns wpmi__is-wider-left">
				<div className="column">
					<div className="welcome-header">
						<h1>
							{WPMI_PLUGIN_NAME}
							<span style={{ fontSize: '24px', color: '#555' }}>
								{' '}
								v{WPMI_PLUGIN_VERSION}
							</span>
						</h1>
						<div className="about-description">
							<p>
								{sprintf(
									__(
										"Hello! We are Quadlayers, and we're currently enhancing our WP Menu Icons product. We're expanding its features to provide you with an even better experience. Stay tuned for the updates!",
										'wp-menu-icons'
									),
									WPMI_PLUGIN_NAME
								)}
							</p>
						</div>
					</div>
					<hr />
					<div className="feature-section">
						<h3>{__('Premium', 'wp-menu-icons')}</h3>
						<p>
							{sprintf(
								__(
									'Thank you for choosing our %s plugin for WordPress! Here you can see our demo and test the features we offer in the premium version.',
									'wp-menu-icons'
								),
								WPMI_PLUGIN_NAME
							)}
						</p>
						<Button href={WPMI_PREMIUM_SELL_URL} target="_blank">
							{__('Purchase Now', 'wp-menu-icons')}
						</Button>
					</div>
					<div className="feature-section">
						<h3>{__('Demo', 'wp-menu-icons')}</h3>
						<p>
							{sprintf(
								__(
									'Thank you for choosing our %s plugin for WordPress! Here you can see our demo and test the features we offer in the premium version.',
									'wp-menu-icons'
								),
								WPMI_PLUGIN_NAME
							)}
						</p>
						<Button
							isSecondary
							href={WPMI_DEMO_URL}
							target="_blank"
						>
							{__('View demo', 'wp-menu-icons')}
						</Button>
					</div>
					<div className="feature-section">
						<h3>{__('Support', 'wp-menu-icons')}</h3>
						<p>
							{sprintf(
								__(
									"If you have any doubt or you find any issue don't hesitate to contact us through our ticket system or join our community to meet other %s users.",
									'wp-menu-icons'
								),
								WPMI_PLUGIN_NAME
							)}
						</p>
						<Button
							isSecondary
							href={WPMI_SUPPORT_URL}
							target="_blank"
						>
							{__('Submit ticket', 'wp-menu-icons')}
						</Button>
					</div>
					<div className="feature-section">
						<h3>{__('Comunnity', 'wp-menu-icons')}</h3>
						<p>
							{sprintf(
								__(
									'If you want to get in touch with other %s users or be aware of our promotional discounts join our community now.',
									'wp-menu-icons'
								),
								WPMI_PLUGIN_NAME
							)}
						</p>
						<Button
							isSecondary
							href={WPMI_GROUP_URL}
							target="_blank"
						>
							{__('Join our community', 'wp-menu-icons')}
						</Button>
					</div>
				</div>
				<div className="column">
					<img
						src={getPluginURL(
							'/assets/backend/img/wp-menu-icons-1.jpeg'
						)}
					/>
				</div>
			</div>
		</div>
	);
};

export default Content;
