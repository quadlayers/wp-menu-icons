<?php

namespace QuadLayers\WPMI;

use QuadLayers\WPMI\Models\Libraries;
use QuadLayers\WPMI\Models\Setting;

use QuadLayers\WPMI\Api\Rest\Routes_Library;

final class Plugin {

	private static $instance;
	public static $selected_icons;
	public static $default_icons = array();

	private function __construct() {

		/**
		 * Load plugin textdomain.
		 */
		load_plugin_textdomain( 'wp-menu-icons', false, WPMI_PLUGIN_DIR . '/languages/' );

		add_action(
			'init',
			function () {
				// TODO: only register active libraries
				// TODO: create library controller
				$icons = Libraries::get_default_libraries();
				foreach ( $icons as $id => $settings ) {

					wp_register_style( $id, $settings['url'] );

					$settings['ID'] = $id;
				}
			}
		);

		Routes_Library::instance();

		Backend::instance();
		Frontend::instance();

		do_action( 'qlwpmi_init' );
	}

 
	// Library
	public static function selected_icons( $menu_id = null ) {
		$library_model    = new Libraries();
		$active_libraries = $library_model->get_active_libraries();

		if ( ! $selected_icons = get_term_meta( $menu_id, WPMI_DB_KEY, true ) ) {
			$selected_icons = 'dashicons';
		}

		if ( empty( $active_libraries[ $selected_icons ] ) ) {
			return false;
		}

		return $active_libraries[ $selected_icons ];
	}
	// se queda aca
	public static function enqueue_style_icons() {
		$menus_ids = wp_get_nav_menus();
		foreach ( $menus_ids as $id => $menu ) {
			$selected_icons = self::selected_icons( $menu->term_id );
			if ( $selected_icons ) {
				wp_enqueue_style( $selected_icons['ID'] );
			}
		}
	}

	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}
}

Plugin::instance();
