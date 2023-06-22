<?php

namespace QuadLayers\WPMI\Api\Rest\Endpoints;

use QuadLayers\WPMI\Api\Rest\Endpoints\Route as Route_Interface;
use QuadLayers\WPMI\Api\Rest\Routes_Library;

abstract class Base implements Route_Interface {
	protected static $route_path = null;

	public function __construct() {

		add_action(
			'rest_api_init',
			function() {
				register_rest_route(
					Routes_Library::get_namespace(),
					static::get_rest_route(),
					array(
						'args'                => static::get_rest_args(),
						'methods'             => static::get_rest_method(),
						'callback'            => array( $this, 'callback' ),
						'permission_callback' => array( $this, 'get_rest_permission' ),
					)
				);
			}
		);

		Routes_Library::instance()->register( $this );
	}

	public static function get_rest_route() {
		return static::$route_path;
	}

	public static function get_name() {
		$path   = static::get_rest_path();
		$method = strtolower( static::get_rest_method() );
		return "$path/$method";
	}

	public static function get_rest_path() {
		$rest_namespace = Routes_Library::get_namespace();
		$rest_route     = self::get_rest_route();

		return "{$rest_namespace}/{$rest_route}";
	}

	public static function get_rest_args() {
		return array();
	}

	private static function get_error( $code, $message ) {
		return array(
			'code'    => $code,
			'message' => $message,
		);
	}

	public function handle_response( $response ) {

		if ( isset( $response['code'], $response['message'] ) ) {
			return rest_ensure_response(
				self::get_error(
					$response['code'],
					$response['message']
				)
			);
		}

		return $response;
	}

	public static function get_rest_url() {

		$blog_id   = get_current_blog_id();
		$rest_path = self::get_rest_path();

		return get_rest_url( $blog_id, $rest_path );

	}
}
