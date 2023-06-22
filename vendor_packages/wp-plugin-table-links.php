<?php

if ( class_exists( 'QuadLayers\\WP_Plugin_Table_Links\\Load' ) ) {
	new \QuadLayers\WP_Plugin_Table_Links\Load(
		WPMI_PLUGIN_FILE,
		array(
			array(
				'text'   => esc_html__( 'Settings', 'wp-menu-icons' ),
				'url'    => admin_url( 'admin.php?page=wp-menu-icons' ),
				'target' => '_self',
			),
			array(
				'text' => esc_html__( 'Premium', 'wp-menu-icons' ),
				'url'  => WPMI_PREMIUM_SELL_URL,
			),
			array(
				'place' => 'row_meta',
				'text'  => esc_html__( 'Support', 'wp-menu-icons' ),
				'url'   => WPMI_SUPPORT_URL,
			),
			array(
				'place' => 'row_meta',
				'text'  => esc_html__( 'Documentation', 'wp-menu-icons' ),
				'url'   => WPMI_DOCUMENTATION_URL,
			),
		)
	);
}
