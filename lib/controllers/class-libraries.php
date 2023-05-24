<?php

namespace QuadLayers\WPMI\Controllers;

use QuadLayers\WPMI\Models\Libraries as Model_Libraries;

class Libraries {

	private static $instance;
	public static $selected_library;

	private function __construct() {

		add_action(
			'init',
			function () {
				// TODO: only register active libraries
				$libraries = Model_Libraries::get_default_libraries();
				foreach ( $libraries as $id => $settings ) {

					wp_register_style( $id, $settings['url'] );

					$settings['ID'] = $id;
				}
			}
		);

	}

	public static function selected_library( $menu_id = null ) {
		$library_model    = new Model_Libraries();
		$active_libraries = $library_model->get_active_libraries();

		$selected_library = get_term_meta( $menu_id, WPMI_DB_KEY, true );
		if ( ! $selected_library ) {
			$selected_library = 'dashicons';
		}

		if ( empty( $active_libraries[ $selected_library ] ) ) {
			return false;
		}

		return $active_libraries[ $selected_library ];
	}

	public static function enqueue_style_library() {
		$menus_ids = wp_get_nav_menus();
		foreach ( $menus_ids as $id => $menu ) {
			$selected_library = self::selected_library( $menu->term_id );
			if ( $selected_library ) {
				wp_enqueue_style( $selected_library['ID'] );
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
