<?php

namespace QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Libraries;

use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Base;
use QuadLayers\WPMI\Backend\Icons_Library\Load;

class Get extends Base {
	protected static $route_path = 'libraries';

	public function callback( \WP_REST_Request $request ) {

		try {
			$required_library = $request->get_param( 'library' );

			$libraries_controller = Load::instance();

			$response = $libraries_controller->get_libraries( $required_library );

			if ( ! $response ) {
				throw new \Exception( sprintf( esc_html__( 'Library %s not found.', 'wp-menu-icons-pro' ), $required_library ), 404 );
			}

			return $this->handle_response( (array) $response );
		} catch ( \Throwable $error ) {
			$response = array(
				'code'    => $error->getCode(),
				'message' => $error->getMessage(),
			);
			return $this->handle_response( $response );
		}
	}

	public static function get_rest_method() {
		return \WP_REST_Server::READABLE;
	}

	public static function get_rest_args() {
		return array(
			'library' => array(
				'validate_callback' => function( $param ) {
					return gettype( $param ) === 'string' && strlen( $param ) > 0;
				},
			),
		);
	}
}
