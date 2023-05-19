<?php

namespace QuadLayers\WPMI\Models;

/**
 * Model Class
 */
abstract class Base {

	private $cache   = array();
	protected $table = null;

	protected function get_defaults() {
		return array();
	}

	protected function save_all( $data = null ) {
		if ( ! $this->table ) {
			error_log( 'Model can\'t be accesed directly' );
			die();
		}
		$status = update_option( $this->table, $data );
		if ( $status ) {
			$this->cache[ $this->table ] = $data;
		}
		return $status;
	}

	protected function get_all() {
		if ( ! $this->table ) {
			error_log( 'Model can\'t be accesed directly' );
			die();
		}

		if ( ! isset( $this->cache[ $this->table ] ) ) {
			$this->cache[ $this->table ] = get_option( $this->table, array() );
		}

		return $this->cache[ $this->table ];
	}

	protected function delete_all() {
		delete_option( $this->table );
	}
}
