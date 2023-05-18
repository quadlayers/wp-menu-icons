<?php

namespace QuadLayers\WPMI\Models;

use QuadLayers\WPMI\Models\Setting as Model_Setting;
use QuadLayers\WPMI\Plugin;
/**
 * Models_Setting Class
 */
class Libraries {

	public static function get_default_libraries() {
		return Plugin::registered_icons_default();
	}

	public static function get_custom_libraries() {
		//Create mock
	}

	public static function get_active_libraries() {

		$default_libraries = self::get_default_libraries();
		$custom_libraries  = self::get_custom_libraries();

		$model_settings = new Model_Setting();

		$settings = $model_settings->get();

		$active_libraries_names = isset( $settings['active_libraries'] ) ? $settings['active_libraries'] : array();

		$all_libraries = array_merge($default_libraries, $custom_libraries);

		$active_libraries = array();

		// Loop through all libraries
		foreach ($all_libraries as $key => $library) {
			// Check if library keyName is in active libraries
			if (in_array($key, $active_libraries_names)) {
				$active_libraries[$key] = $library;
			}
		}

		return $active_libraries;

	}

}
