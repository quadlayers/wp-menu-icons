<?php

namespace QuadLayers\WPMI\Models;

use QuadLayers\WPMI\Models\Base as Models_Base;
use QuadLayers\WPMI\Plugin;
/**
 * Models_Setting Class
 */
class Setting extends Models_Base {

	/**
	 * Table name
	 *
	 * @var string
	 */
	protected $table = 'menu_icons_pro_settings';

	/* CRUD */

	/**
	 * Function to get default args
	 *
	 * @return array
	 */
	public function get_args() {
		$default_libraries       = \QuadLayers\WPMI\Plugin::registered_icons_default();
		$default_libraries_names = \QuadLayers\WPMI\Plugin::registered_icons_names();
		$default_libraries_names = array_keys( $default_libraries_names );
		return array(
			'current_library'     => '',
			'available_libraries' => $default_libraries,
			'active_libraries'    => $default_libraries_names,
		);
	}

	/**
	 * Function to get all settings
	 *
	 * @return array
	 */
	public function get() {
		$settings = wp_parse_args( $this->get_all(), $this->get_args() );
		return $settings;
	}

	/**
	 * Function to save settings
	 *
	 * @param array $settings Settings to be saved.
	 * @return boolean
	 */
	public function save( $settings = null ) {
		return $this->save_all( $settings );
	}

	/**
	 * Function to delete table
	 *
	 * @return void
	 */
	public function delete_table() {
		$this->delete_all();
	}
}
