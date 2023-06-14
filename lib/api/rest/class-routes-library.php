<?php

namespace QuadLayers\WPMI\Api\Rest;

use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Navmenu\Get as Navmenu_Get;

use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Settings\Get as Settings_Get;
use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Settings\Post as Settings_Post;
use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Settings\Delete as Settings_Delete;

use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Libraries\Get as Libraries_Get;

use QuadLayers\WPMI\Api\Rest\Endpoints\Route as Route_Interface;

class Routes_Library {
	protected $routes                = array();
	protected static $rest_namespace = 'quadlayers/menu-icons';
	protected static $instance;

	private function __construct() {
		add_action( 'init', array( $this, '_rest_init' ) );
	}

	public static function get_namespace() {
		return self::$rest_namespace;
	}

	public function get_routes( $route_path = null ) {
		if ( ! $route_path ) {
			return $this->routes;
		}

		if ( isset( $this->routes[ $route_path ] ) ) {
			return $this->routes[ $route_path ];
		}
	}

	public function register( Route_Interface $instance ) {
		$this->routes[ $instance::get_name() ] = $instance;
	}

	public function _rest_init() {
		new Settings_Get();
		new Settings_Post();
		new Settings_Delete();
		new Libraries_Get();
		new Navmenu_Get();
	}

	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}
}
