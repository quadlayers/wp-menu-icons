<?php

namespace QuadLayers\WPMI\Models;

/**
 * Models_Navmenu Class
 */
class Navmenu {
	protected static $instance;

	/**
	 * Table name
	 *
	 * @var string
	 */
	protected $table = WPMI_DB_KEY;

	/* CRUD */

	/**
	 * Function to get default args
	 *
	 * @return array
	 */
	public function get_args() {
		return 'dashicons';
	}

	/**
	 * Function to get all settings
	 *
	 * @return array
	 */
	public function get( $menu_id ) {
		$data = get_term_meta( $menu_id, $this->table, true );

		if ( ! $data ) {
			return $this->get_args();
		}

		return $data;
	}

	/**
	 * Function to save settings
	 *
	 * @param array $settings Settings to be saved.
	 * @return boolean
	 */
	public function save( $menu_id, $menu_font ) {
		return update_term_meta( $menu_id, $this->table, $menu_font, false );
	}

	/**
	 * Function to delete table
	 *
	 * @return void
	 */
	public function delete_table( $menu_id ) {
		return delete_term_meta( $menu_id, $this->table );
	}

	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}
}
