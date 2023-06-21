<?php

namespace QuadLayers\WPMI\Controllers;

use QuadLayers\WPMI\Models\Libraries as Model_Libraries;
use QuadLayers\WPMI\Models\Settings as Models_Settings;
use QuadLayers\WPMI\Models\Navmenu as Models_Navmenu;

class Libraries {

	private static $instance;
	public static $selected_library;

	private function __construct() {

		add_action(
			'init',
			function () {

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
		foreach ( $libraries as $name => $library ) {

			$library = $model_libraries->get_libraries( $name );

			$is_loaded = $library->is_loaded;

			// Check if library keyName is in active libraries
			if ( in_array( $name, $active_libraries_names ) && $is_loaded ) {
				$active_libraries[ $name ] = $library;
			}
		}

		return $active_libraries;
	}

	public static function get_current_library( $menu_id ) {

		if ( ! $menu_id ) {
			return false;
		}

		$models_navmenu = Models_Navmenu::instance();

		$library_name = $models_navmenu->get( $menu_id );

		if ( ! $library_name ) {
			return false;
		}

		$active_libraries = self::get_active_libraries();

		foreach ( $active_libraries as $name => $library ) {
			if ( $name === $library_name ) {
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
