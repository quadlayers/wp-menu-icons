<?php

if ( class_exists( 'QuadLayers\\WP_Plugin_Table_Links\\Load' ) ) {
	add_action('init', function() {
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
					'url'  => 'https://quadlayers.com/products/wp-menu-icons/?utm_source=wpmi_plugin&utm_medium=plugin_table&utm_campaign=premium_upgrade&utm_content=premium_link',
					'color' => 'green',
					'target' => '_blank',
				),
				array(
					'place' => 'row_meta',
					'text'  => esc_html__( 'Support', 'wp-menu-icons' ),
					'url'   => 'https://quadlayers.com/account/support/?utm_source=wpmi_plugin&utm_medium=plugin_table&utm_campaign=support&utm_content=support_link',
				),
				array(
					'place' => 'row_meta',
					'text'  => esc_html__( 'Documentation', 'wp-menu-icons' ),
					'url'   => 'https://quadlayers.com/documentation/wp-menu-icons/?utm_source=wpmi_plugin&utm_medium=plugin_table&utm_campaign=documentation&utm_content=documentation_link',
				),
			)
		);
	});

}
