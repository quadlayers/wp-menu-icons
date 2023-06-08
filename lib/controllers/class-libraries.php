<?php

namespace QuadLayers\WPMI\Controllers;

use QuadLayers\WPMI\Models\Models_Libraries as Model_Libraries;
use QuadLayers\WPMI\Models\Models_Settings;

class Libraries {

	private static $instance;
	public static $selected_library;

	private function __construct() {

		add_action(
			'init',
			function () {
				// TODO: only register active libraries

				$libraries_model = new Model_Libraries();

				$libraries = $libraries_model->get_libraries();

				foreach ( $libraries as $name => $library ) {
					wp_register_style( $name, $library->stylesheet_file );
				}
			}
		);

	}

	public static function get_active_libraries() {

		$model_libraries = Model_Libraries::instance();
		$libraries = (array) $model_libraries->get_libraries();

		$model_settings = new Models_Settings();

		$settings = $model_settings->get();

		$active_libraries_names = isset( $settings['active_libraries'] ) ? $settings['active_libraries'] : array();

		$active_libraries = array();

		// Loop through all libraries
		foreach ( $libraries as $key => $library ) {
			$is_loaded = $model_libraries->get_libraries( $key )->is_library_loaded();

			// Check if library keyName is in active libraries
			if ( in_array( $key, $active_libraries_names ) && $is_loaded ) {
				$active_libraries[ $key ] = $library;
			}
		}

		return $active_libraries;
	}

	public static function get_current_library() {

		$menus_ids = wp_get_nav_menus();

		foreach ( $menus_ids as $id => $menu ) {
			$active_libraries = self::get_active_libraries();
			$selected_library = get_term_meta( $menu->term_id, WPMI_DB_KEY, true );
			if ( ! $selected_library ) {
				$selected_library = 'dashicons';
			}

			if ( empty( $active_libraries[ $selected_library ] ) ) {
				return false;
			}
		}

		// $menus_ids = wp_get_nav_menus();
		// foreach ( $menus_ids as $id => $menu ) {

		// }

		return $active_libraries[ $selected_library ];
	}

	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

}
