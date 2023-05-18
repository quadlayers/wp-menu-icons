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

	public function __construct() {
		// if ( class_exists( '\\QuadLayers\\WPMI\\Plugin' ) ) {
		// $registered_icons_default = \QuadLayers\WPMI\Plugin::registered_icons_default();
		// $available_libraries = $this->get_libraries();

		// foreach ( $registered_icons_default as $library ) {
		// if ( ! isset( $available_libraries[ $library->ID ] )) {
		// $available_libraries[ $library->ID ] = array(
		// 'name'   => $library->name,
		// 'type'   => 'default',
		// 'active' => true,
		// );
		// }
		// }

		// $settings = wp_parse_args( array( 'available_libraries' => $available_libraries ), $this->get_args() );

		// $this->save( $settings );
		// }
	}

	/* CRUD */

	/**
	 * Function to get default args
	 *
	 * @return array
	 */
	public function get_args() {
		return array(
			'current_library'     => '',
			'available_libraries' => array(),
			'active_libraries'    => array(),
		);
	}

	public function create_library( $library ) {
		if ( ! isset( $library['name'], $library['type'] ) ) {
			return false;
		}

		$name = $library['name'];

		$settings = $this->get_all();

		if ( isset( $settings['available_libraries'][ $name ] ) ) {
			return false;
		}

		$settings['available_libraries'][ $name ] = array(
			'name' => $name,
			'type' => $library['type'],
			'ID'   => strtolower( str_replace( ' ', '', $name ) ),
		);

		$this->save( $settings );

		return true;
	}

	//TODO: move this outside model settings
	public function get_libraries() {
		return $this->get_all()['available_libraries'];
	}

	//TODO: move this outside model settings
	public function get_active_libraries() {
		$registered_icons_default = json_decode( json_encode( Plugin::registered_icons_default() ), true );
		$libraries                = $this->get_all();

		$active_libraries = array();

		if( ! isset( $libraries['available_libraries'] ) ) {
			return $active_libraries;
		}

		foreach ( $libraries['available_libraries'] as $library ) {

			$library = (array) $library;

			if ( in_array( $library['ID'], $libraries['active_libraries'] ) ) {
				$active_libraries[ $library['ID'] ] = $library;
			}
		}

		foreach ( $registered_icons_default as $value ) {
			if ( in_array( $value['ID'], $libraries['active_libraries'] ) ) {
				$active_libraries[ $value['ID'] ] = $value;
			}
		}

		return gettype( $active_libraries ) === 'array' ? json_decode( json_encode( $active_libraries ), false ) : $active_libraries;
	}

	public function get_library( $name ) {
		if ( ! isset( $name ) ) {
			return false;
		}

		$libraries = $this->get_libraries();

		if ( isset( $libraries[ $name ] ) ) {
			return $libraries[ $name ];
		}

		return false;
	}

	public function delete_library( $name ) {
		if ( ! isset( $name ) ) {
			return false;
		}

		$settings  = $this->get_all();
		$libraries = $settings['available_libraries'];

		if ( isset( $libraries[ $name ] ) ) {
			unset( $libraries[ $name ] );

			$settings['available_libraries'] = $libraries;

			$this->save( $settings );

			return true;
		}

		return false;
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
