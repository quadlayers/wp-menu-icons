<?php

if ( class_exists( 'QuadLayers\\WP_Notice_Plugin_Promote\\Load' ) ) {
	/**
	 *  Promote constants
	 */
	define( 'WPMI_PROMOTE_LOGO_SRC', plugins_url( '/assets/backend/img/logo.png', WPMI_PLUGIN_FILE ) );
	/**
	 * Notice review
	 */
	define( 'WPMI_PROMOTE_REVIEW_URL', 'https://wordpress.org/support/plugin/wp-menu-icons/reviews/?filter=5#new-post' );
	/**
	 * Notice premium sell
	 */
	define( 'WPMI_PROMOTE_PREMIUM_SELL_SLUG', 'wp-menu-cions-pro' );
	define( 'WPMI_PROMOTE_PREMIUM_SELL_NAME', 'WP Menu Icons PRO' );
	define( 'WPMI_PROMOTE_PREMIUM_INSTALL_URL', WPMI_PREMIUM_SELL_URL );
	define( 'WPMI_PROMOTE_PREMIUM_SELL_URL', WPMI_PREMIUM_SELL_URL );
	/**
	 * Notice cross sell 1
	 */
	define( 'WPMI_PROMOTE_CROSS_INSTALL_1_SLUG', 'quadmenu' );
	define( 'WPMI_PROMOTE_CROSS_INSTALL_1_NAME', 'QuadMenu' );
	define( 'WPMI_PROMOTE_CROSS_INSTALL_1_DESCRIPTION', esc_html__( 'The best responsive mega menu is designed for developers, offering customizable menu layouts and drag & drop fields for creating megamenus.', 'wp-menu-icons' ) );
	define( 'WPMI_PROMOTE_CROSS_INSTALL_1_URL', 'https://quadmenu.com/?utm_source=wpmi_admin' );
	/**
	 * Notice cross sell 2
	 */
	define( 'WPMI_PROMOTE_CROSS_INSTALL_2_SLUG', 'insta-gallery' );
	define( 'WPMI_PROMOTE_CROSS_INSTALL_2_NAME', 'Instagram Feed Gallery' );
	define( 'WPMI_PROMOTE_CROSS_INSTALL_2_DESCRIPTION', esc_html__( 'Instagram Feed Gallery is the most user-friendly Instagram plugin for WordPress. It was built to simplify the integration, to reduce time to have sites updated and to be on track with social media that shows best growing indicators.', 'wp-menu-icons' ) );
	define( 'WPMI_PROMOTE_CROSS_INSTALL_2_URL', 'https://quadlayers.com/products/instagram-feed-gallery/?utm_source=wpmi_admin' );

	new \QuadLayers\WP_Notice_Plugin_Promote\Load(
		WPMI_PLUGIN_FILE,
		array(
			array(
				'type'               => 'ranking',
				'notice_delay'       => MONTH_IN_SECONDS,
				'notice_logo'        => WPMI_PROMOTE_LOGO_SRC,
				'notice_title'       => sprintf(
					esc_html__(
						'Hello! Thank you for choosing the %s plugin!',
						'wp-menu-icons'
					),
					WPMI_PLUGIN_NAME
				),
				'notice_description' => esc_html__( 'Could you please give it a 5-star rating on WordPress? Your feedback boosts our motivation, helps us promote, and continues to improve this product. Your support matters!', 'wp-menu-icons' ),
				'notice_link'        => WPMI_PROMOTE_REVIEW_URL,
				'notice_link_label'  => esc_html__(
					'Yes, of course!',
					'wp-menu-icons'
				),
				'notice_more_link'   => WPMI_SUPPORT_URL,
				'notice_more_label'  => esc_html__(
					'Report a bug',
					'wp-menu-icons'
				),
			),
			array(
				'plugin_slug'          => WPMI_PROMOTE_PREMIUM_SELL_SLUG,
				'plugin_install_link'  => WPMI_PROMOTE_PREMIUM_INSTALL_URL,
				'plugin_install_label' => esc_html__(
					'Purchase Now',
					'wp-menu-icons'
				),
				'notice_delay'         => MONTH_IN_SECONDS,
				'notice_logo'          => WPMI_PROMOTE_LOGO_SRC,
				'notice_title'         => esc_html__(
					'Hello! We have a special gift!',
					'wp-menu-icons'
				),
				'notice_description'   => sprintf(
					esc_html__(
						'Today we want to make you a special gift. Using the coupon code %1$s before the next 48 hours you can get a 20 percent discount on the premium version of the %2$s plugin.',
						'wp-menu-icons'
					),
					'ADMINPANEL20%',
					WPMI_PROMOTE_PREMIUM_SELL_NAME
				),
				'notice_more_link'     => WPMI_PROMOTE_PREMIUM_SELL_URL,
				'notice_more_label'    => esc_html__(
					'More info!',
					'wp-menu-icons'
				),
			),
			array(
				'plugin_slug'        => WPMI_PROMOTE_CROSS_INSTALL_1_SLUG,
				'notice_delay'       => MONTH_IN_SECONDS * 4,
				'notice_logo'        => WPMI_PROMOTE_LOGO_SRC,
				'notice_title'       => sprintf(
					esc_html__(
						'Hello! We want to invite you to try our %s plugin!',
						'wp-menu-icons'
					),
					WPMI_PROMOTE_CROSS_INSTALL_1_NAME
				),
				'notice_description' => WPMI_PROMOTE_CROSS_INSTALL_1_DESCRIPTION,
				'notice_more_link'   => WPMI_PROMOTE_CROSS_INSTALL_1_URL,
				'notice_more_label'  => esc_html__(
					'More info!',
					'wp-menu-icons'
				),
			),
			array(
				'plugin_slug'        => WPMI_PROMOTE_CROSS_INSTALL_2_SLUG,
				'notice_delay'       => MONTH_IN_SECONDS * 6,
				'notice_logo'        => WPMI_PROMOTE_LOGO_SRC,
				'notice_title'       => sprintf(
					esc_html__(
						'Hello! We want to invite you to try our %s plugin!',
						'wp-menu-icons'
					),
					WPMI_PROMOTE_CROSS_INSTALL_2_NAME
				),
				'notice_description' => WPMI_PROMOTE_CROSS_INSTALL_2_DESCRIPTION,
				'notice_more_link'   => WPMI_PROMOTE_CROSS_INSTALL_2_URL,
				'notice_more_label'  => esc_html__(
					'More info!',
					'wp-menu-icons'
				),
			),
		)
	);
}
