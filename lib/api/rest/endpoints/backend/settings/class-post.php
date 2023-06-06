<?php

namespace QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Settings;

use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Base;
use \QuadLayers\WPMI\Models\Setting;

class Post extends Base {
	protected static $route_path = 'settings';

	public function callback( \WP_REST_Request $request ) {
		try {

			$body = json_decode( $request->get_body(), true );

			if ( ! isset( $body['active_libraries'] ) ) {
				throw new \Exception( esc_html__( 'Body is not setted', 'wp-menu-icons-pro' ), 400 );
			}

			$setting_model = new Setting();

			$status = $setting_model->save( $body );

			return $this->handle_response( $status );
		} catch ( \Throwable $error ) {
			$response = array(
				'code'    => $error->getCode(),
				'message' => $error->getMessage(),
			);
			return $this->handle_response( $response );
		}
	}

	public static function get_rest_method() {
		return \WP_REST_Server::CREATABLE;
	}

	public static function get_rest_args() {
		return array();
	}
}
