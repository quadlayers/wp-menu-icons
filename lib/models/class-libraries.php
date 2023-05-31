<?php

namespace QuadLayers\WPMI\Models;

use QuadLayers\WPMI\Models\Setting as Model_Setting;
use QuadLayers\WPMI\Backend\Icons_Library\Load;
/**
 * Models_Setting Class
 */
class Libraries {
	protected $model_settings;

	public function __construct() {
		$this->model_settings = new Model_Setting();
	}

	public function get_libraries() {

		$icons_library = Load::instance();

		$registered_libraries = $icons_library->get_libraries();

		$registered_libraries = apply_filters( 'wp_menu_icons_register_icons', $registered_libraries );

		return $registered_libraries;
	}

	public static function get_libraries_names() {
		$self      = new self();
		$libraries = $self->get_libraries();
		$names     = array();
		foreach ( $libraries as $library ) {
			$names[ $library->name ] = $library->name;
		}
		return $names;
	}

	public static function get_active_libraries() {

		$self      = new self();
		$libraries = (array) $self->get_libraries();

		$model_settings = new Model_Setting();

		$settings = $model_settings->get();

		$active_libraries_names = isset( $settings['active_libraries'] ) ? $settings['active_libraries'] : array();

		$active_libraries = array();

		// Loop through all libraries
		foreach ( $libraries as $key => $library ) {
			// Check if library keyName is in active libraries
			if ( in_array( $key, $active_libraries_names ) ) {
				$active_libraries[ $key ] = $library;
			}
		}

		return $active_libraries;

	}

	public function create_library( $library ) {
		return true;
	}

	public function delete_library( $name ) {
		return true;
	}
}
