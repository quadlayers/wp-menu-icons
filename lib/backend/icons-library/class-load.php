<?php

namespace QuadLayers\WPMI\Backend\Icons_Library;

use QuadLayers\WPMI\Controllers\Library_Builder;
class Load {

	protected static $_instance;

	protected $libraries = array();
	public Library_Builder $builder;

	public function __construct() {

		$this->builder = new Library_Builder();

		$this->add_library( new \QuadLayers\WPMI\Entities\DashIcons() );
		$this->add_library( new \QuadLayers\WPMI\Entities\Elegant_Icons() );
		$this->add_library( new \QuadLayers\WPMI\Entities\Fontawesome_Icons() );
		$this->add_library( new \QuadLayers\WPMI\Entities\Foundation_Icons() );
		$this->add_library( new \QuadLayers\WPMI\Entities\Themify_Icons() );

		add_filter( 'upload_mimes', array( $this, 'upload_mimes' ), 99 );
	}

	public function add_library( $library ) {
		$this->builder->add_library( $library );
	}

	/*
	Allow SVG file upload
	*/
	function upload_mimes( $mimes = array() ) {
		if ( current_user_can( 'edit_theme_options' ) ) {
			$mimes['zip'] = 'application/zip';
			$mimes['gz']  = 'application/x-gzip';
		}

		return $mimes;
	}

	public function get_libraries( $name = null ) {

		if ( ! $name ) {
			return $this->builder->get_libraries();
		}

		if ( isset( $this->builder->get_libraries()[ $name ] ) ) {
			return get_object_vars( $this->builder->get_libraries()[ $name ] );
		}
	}

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
}
