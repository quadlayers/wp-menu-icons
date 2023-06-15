<?php

namespace QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Libraries;

use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Base;
use QuadLayers\WPMI\Models\Libraries as Models_Libraries;

class Get extends Base {
	protected static $route_path = 'libraries';

	public function callback( \WP_REST_Request $request ) {

		try {
			$name = $request->get_param( 'library' );

			$models_libraries = Models_Libraries::instance();

			if ( ! $name ) {
				$libraries = $models_libraries->get_libraries();
				if ( ! $libraries ) {
					throw new \Exception( esc_html__( 'Libraries not found.', 'wp-menu-icons' ), 404 );
				}
				return $this->handle_response( (array) $libraries );
			}

			$library = $models_libraries->get_libraries( $name );
			if ( ! $library ) {
				throw new \Exception( sprintf( esc_html__( 'Library %s not found.', 'wp-menu-icons' ), $name ), 404 );
			}
			return $this->handle_response( get_object_vars( $library ) );
		} catch ( \Throwable $error ) {
			$libraries = array(
				'code'    => $error->getCode(),
				'message' => $error->getMessage(),
			);
			return $this->handle_response( $libraries );
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
