<?php

namespace QuadLayers\WPMI\Models;

use QuadLayers\WPMI\Models\Models_Settings;
use QuadLayers\WPMI\Controllers\Library_Builder;

/**
 * Models_Libraries Class
 */
class Models_Libraries {
	protected static $_instance;

	protected $models_settings;
	protected $libraries = array();
	/**
	 * @var Library_Builder
	 */
	public $builder;

	private function __construct() {
		$this->models_settings = new Models_Settings();
		$this->builder         = new Library_Builder();

		$this->add_library( new \QuadLayers\WPMI\Entities\Libraries\DashIcons() );
		$this->add_library( new \QuadLayers\WPMI\Entities\Libraries\Elegant_Icons() );
		$this->add_library( new \QuadLayers\WPMI\Entities\Libraries\Elusive() );
		$this->add_library( new \QuadLayers\WPMI\Entities\Libraries\Fontawesome() );
		$this->add_library( new \QuadLayers\WPMI\Entities\Libraries\Foundation() );
		$this->add_library( new \QuadLayers\WPMI\Entities\Libraries\Themify() );
	}

	public function add_library( $library ) {
		$this->builder->add_library( $library );
	}

	public function get_builder_libraries( $name = null ) {

		if ( ! $name ) {
			return $this->builder->get_libraries();
		}

		if ( isset( $this->builder->get_libraries()[ $name ] ) ) {
			return $this->builder->get_libraries()[ $name ];
		}
	}


	public function get_libraries( $library = null ) {

		$registered_libraries = $this->get_builder_libraries( $library );

		if ( isset( $registered_libraries->name ) ) {
			return $registered_libraries;
		}

		// TODO: make compatibility
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

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
}
