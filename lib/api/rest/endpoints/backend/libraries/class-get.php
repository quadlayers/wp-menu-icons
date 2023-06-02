<?php

namespace QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Libraries;

use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Base;
use QuadLayers\WPMI\Models\Libraries;

class Get extends Base {
	protected static $route_path = 'libraries';

	public function callback( \WP_REST_Request $request ) {

		$required_library = $request->get_param( 'library' );

		$libraries_model = new Libraries();

		$libraries = $libraries_model->get_libraries();

		if ( ! $required_library ) {
			return $this->handle_response( (array) $libraries );
		}

		if ( ! isset( $libraries[ $required_library ] ) ) {
			$error = array(
				'code'    => 404,
				'message' => sprintf( esc_html__( 'Library %s not found.', 'wp-menu-icons-pro' ), $required_library ),
			);

			return $this->handle_response( $error );
		}

		return $this->handle_response( (array) get_object_vars( $libraries[ $required_library ] ) );
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
