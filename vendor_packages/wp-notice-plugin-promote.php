<?php

if ( class_exists( 'QuadLayers\\WP_Notice_Plugin_Promote\\Load' ) ) {
	add_action('init', function() {
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
		define( 'WPMI_PROMOTE_PREMIUM_INSTALL_URL', 'https://quadlayers.com/products/wp-menu-icons/?utm_source=wpmi_plugin&utm_medium=dashboard_notice&utm_campaign=premium_upgrade&utm_content=premium_install_button' );
		define( 'WPMI_PROMOTE_PREMIUM_SELL_URL', 'https://quadlayers.com/products/wp-menu-icons/?utm_source=wpmi_plugin&utm_medium=dashboard_notice&utm_campaign=premium_upgrade&utm_content=premium_link' );
		/**
		 * Notice cross sell 1
		 */
		define( 'WPMI_PROMOTE_CROSS_INSTALL_1_SLUG', 'wp-whatsapp-chat' );
		define( 'WPMI_PROMOTE_CROSS_INSTALL_1_NAME', 'Social Chat' );
		define(
			'WPMI_PROMOTE_CROSS_INSTALL_1_TITLE',
			wp_kses(
				sprintf(
					'<h3 style="margin:0">%s</h3>',
					esc_html__( 'Turn more visitors into customers.', 'wp-menu-icons' )
				),
				array(
					'h3' => array(
						'style' => array()
					)
				)
			)
		);
		define( 'WPMI_PROMOTE_CROSS_INSTALL_1_DESCRIPTION', esc_html__( 'Social Chat allows your users to start a conversation from your website directly to your WhatsApp phone number with one click.', 'wp-menu-icons' ) );
		define( 'WPMI_PROMOTE_CROSS_INSTALL_1_URL', 'https://quadlayers.com/products/whatsapp-chat/?utm_source=wpmi_plugin&utm_medium=dashboard_notice&utm_campaign=cross_sell&utm_content=social_chat_link' );
		define( 'WPMI_PROMOTE_CROSS_INSTALL_1_LOGO_SRC', plugins_url( '/assets/backend/img/wp-whatsapp-chat.jpeg', WPMI_PLUGIN_FILE ) );
		/**
		 * Notice cross sell 2
		 */
		define( 'WPMI_PROMOTE_CROSS_INSTALL_2_SLUG', 'wp-tiktok-feed' );
		define( 'WPMI_PROMOTE_CROSS_INSTALL_2_NAME', 'TikTok Feed' );
		define(
			'WPMI_PROMOTE_CROSS_INSTALL_2_TITLE',
			wp_kses(
				sprintf(
					'<h3 style="margin:0">%s</h3>',
					esc_html__( 'Add TikTok videos in minutes.', 'wp-menu-icons' )
				),
				array(
					'h3' => array(
						'style' => array()
					)
				)
			)
		);
		define( 'WPMI_PROMOTE_CROSS_INSTALL_2_DESCRIPTION', esc_html__( 'Display TikTok videos on your WordPress site with responsive galleries, custom layouts, and an engaging lightbox popup.', 'wp-menu-icons' ) );
		define( 'WPMI_PROMOTE_CROSS_INSTALL_2_URL', 'https://quadlayers.com/products/tiktok-feed/?utm_source=wpmi_plugin&utm_medium=dashboard_notice&utm_campaign=cross_sell&utm_content=tiktok_feed_link' );
		define( 'WPMI_PROMOTE_CROSS_INSTALL_2_LOGO_SRC', plugins_url( '/assets/backend/img/wp-tiktok-feed.jpg', WPMI_PLUGIN_FILE ) );

		new \QuadLayers\WP_Notice_Plugin_Promote\Load(
			WPMI_PLUGIN_FILE,
			array(
				array(
					'type'               => 'ranking',
					'notice_delay'       => 0,
					'notice_logo'        => WPMI_PROMOTE_LOGO_SRC,
					'notice_title'       => wp_kses(
						sprintf(
							'<h3 style="margin:0">%s</h3>',
							esc_html__( 'Enjoying WP Menu Icons?', 'wp-menu-icons' )
						),
						array(
							'h3' => array(
								'style' => array()
							)
						)
					),
					'notice_description' => esc_html__( 'A quick 5-star review helps us keep improving the plugin and supporting users like you. It only takes 2 seconds — thank you!', 'wp-menu-icons' ),
					'notice_link'        => WPMI_PROMOTE_REVIEW_URL,
					'notice_more_link'   => 'https://quadlayers.com/account/support/?utm_source=wpmi_plugin&utm_medium=dashboard_notice&utm_campaign=support&utm_content=report_bug_button',
					'notice_more_label'  => esc_html__(
						'Report a bug',
						'wp-menu-icons'
					),
				),
				array(
					'plugin_slug'        => WPMI_PROMOTE_PREMIUM_SELL_SLUG,
					'plugin_install_link'   => WPMI_PROMOTE_PREMIUM_INSTALL_URL,
					'plugin_install_label'  => esc_html__(
						'Purchase Now',
						'wp-menu-icons'
					),
					'notice_delay'       => WEEK_IN_SECONDS,
					'notice_logo'        => WPMI_PROMOTE_LOGO_SRC,
					'notice_title'       => wp_kses(
						sprintf(
							'<h3 style="margin:0">%s</h3>',
							esc_html__( 'Save 20% today!', 'wp-menu-icons' )
						),
						array(
							'h3' => array(
								'style' => array()
							)
						)
					),
					'notice_description' => sprintf(
						esc_html__(
							'Today we have a special gift for you. Use the coupon code %1$s within the next 48 hours to receive a %2$s discount on the premium version of the %3$s plugin.',
							'wp-menu-icons'
						),
						'ADMINPANEL20%',
						'20%',
						WPMI_PROMOTE_PREMIUM_SELL_NAME
					),
					'notice_more_link'   => WPMI_PROMOTE_PREMIUM_SELL_URL,
				),
				array(
					'plugin_slug'        => WPMI_PROMOTE_CROSS_INSTALL_1_SLUG,
					'notice_delay'       => MONTH_IN_SECONDS * 3,
					'notice_logo'        => WPMI_PROMOTE_CROSS_INSTALL_1_LOGO_SRC,
					'notice_title'       => WPMI_PROMOTE_CROSS_INSTALL_1_TITLE,
					'notice_description' => WPMI_PROMOTE_CROSS_INSTALL_1_DESCRIPTION,
					'notice_more_link'   => WPMI_PROMOTE_CROSS_INSTALL_1_URL
				),
				array(
					'plugin_slug'        => WPMI_PROMOTE_CROSS_INSTALL_2_SLUG,
					'notice_delay'       => MONTH_IN_SECONDS * 6,
					'notice_logo'        => WPMI_PROMOTE_CROSS_INSTALL_2_LOGO_SRC,
					'notice_title'       => WPMI_PROMOTE_CROSS_INSTALL_2_TITLE,
					'notice_description' => WPMI_PROMOTE_CROSS_INSTALL_2_DESCRIPTION,
					'notice_more_link'   => WPMI_PROMOTE_CROSS_INSTALL_2_URL
				),
			)
		);
	});
}
