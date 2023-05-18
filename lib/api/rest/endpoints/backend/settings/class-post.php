<?php

namespace QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Settings;

use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Base;
use \QuadLayers\WPMI\Models\Setting;

class Post extends Base {
	protected static $route_path = 'settings';

	public function callback( \WP_REST_Request $request ) {
		$body = json_decode( $request->get_body(), true );

		if ( ! isset( $body['current_library'] ) && ! isset( $body['available_libraries'] ) && ! isset( $body['active_libraries'] ) ) {
			return $this->handle_response( false );
		}

		$setting_model = new Setting();

		$status = $setting_model->save( $body );

		return $this->handle_response( $status );
	}

	public static function get_rest_method() {
		return \WP_REST_Server::CREATABLE;
	}

	public static function get_rest_args() {
		return array();
	}
}
