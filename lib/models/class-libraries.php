<?php

namespace QuadLayers\WPMI\Models;

use QuadLayers\WPMI\Controllers\Library_Builder;
use QuadLayers\WPMI\Entities\Libraries\Library as Library_Interface;

/**
 * Models_Libraries Class
 */
class Libraries {
	protected static $instance;
	protected $libraries = array();
	/**
	 * @var Library_Builder
	 */
	public $builder;

	private function __construct() {
		add_filter( 'upload_mimes', [ $this, 'upload_mimes' ] );
		$this->add_library( new \QuadLayers\WPMI\Entities\Libraries\Dashicons() );
		$this->add_library( new \QuadLayers\WPMI\Entities\Libraries\Elegant_Icons() );
		$this->add_library( new \QuadLayers\WPMI\Entities\Libraries\Elusive() );
		$this->add_library( new \QuadLayers\WPMI\Entities\Libraries\Fontawesome() );
		$this->add_library( new \QuadLayers\WPMI\Entities\Libraries\Foundation() );
		$this->add_library( new \QuadLayers\WPMI\Entities\Libraries\Themify() );
		$this->add_library( new \QuadLayers\WPMI\Entities\Libraries\Icomoon() );
		$this->add_library( new \QuadLayers\WPMI\Entities\Libraries\Fontello() );
	}

	public function upload_mimes( $mimes = array() ) {
		if ( current_user_can( 'edit_theme_options' ) ) {
			$mimes['zip'] = 'application/zip';
			$mimes['gz']  = 'application/x-gzip';
		}
		return $mimes;
	}

	public function add_library( Library_Interface $library ) {
		$this->libraries[ $library->name ] = $library;
		return $this;
	}

	public function get_libraries( $name = null ) {

		$libraries = apply_filters( 'wp_menu_icons_register_libraries', $this->libraries );

		if ( has_filter( 'wp_menu_icons_register_icons' ) ) {
			_deprecated_hook( 'wp_menu_icons_register_icons', '4.0.0', 'wp_menu_icons_register_libraries' );
		}

		if ( ! $name ) {
			return $libraries;
		}

		if ( isset( $libraries[ $name ] ) ) {
			return $libraries[ $name ];
		}

		return $libraries;
	}

	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}
}
