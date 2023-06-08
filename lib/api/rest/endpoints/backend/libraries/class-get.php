<?php

namespace QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Libraries;

use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Base;
use QuadLayers\WPMI\Models\Models_Libraries as Models_Libraries;

class Get extends Base {
	protected static $route_path = 'libraries';

	public function callback( \WP_REST_Request $request ) {

		try {
			$required_library = $request->get_param( 'library' );

			$models_libraries = Models_Libraries::instance();

			$response = $models_libraries->get_libraries( $required_library );

			if ( ! $response ) {
				throw new \Exception( sprintf( esc_html__( 'Library %s not found.', 'wp-menu-icons' ), $required_library ), 404 );
			}

			return $this->handle_response( isset( $response->name ) ? (array) get_object_vars( $response ) : (array) $response );
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
