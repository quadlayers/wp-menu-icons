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

				$models_libraries = Model_Libraries::instance();

				$libraries = $models_libraries->get_libraries();

				foreach ( $libraries as $name => $library ) {
					wp_register_style( $name, $library->stylesheet_file );
				}
			}
		);

	}

	public static function get_active_libraries() {

		$model_libraries = Model_Libraries::instance();
		$libraries       = $model_libraries->get_libraries();

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

	public static function get_current_library( $menu_id ) {

		if ( ! $menu_id ) {
			return false;
		}

		$menu_library = get_term_meta( $menu_id, WPMI_DB_KEY, true );

		if ( ! $menu_library ) {
			return false;
		}

		$active_libraries = self::get_active_libraries();

		foreach ( $active_libraries as $key => $library ) {
			if ( $key === $menu_library ) {
				return $library;
			}
		}

		return false;
	}

	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

}
