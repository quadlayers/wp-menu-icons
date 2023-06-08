<?php

namespace QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Settings;

use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Base;
use QuadLayers\WPMI\Models\Models_Settings;
use QuadLayers\WPMI\Models\Models_Libraries;

class Get extends Base {
	protected static $route_path = 'settings';

	public function callback( \WP_REST_Request $request ) {
		try {
			$setting_model = new Models_Settings();

			$settings = $setting_model->get();

			$active_libraries = $settings['active_libraries'];

			$settings['active_libraries'] = array_filter(
				$active_libraries,
				function( $name ) {
					$libraries_model = Models_Libraries::instance();
					$is_loaded       = $libraries_model->get_libraries( $name )->is_loaded;

					return $is_loaded;
				}
			);

			return $this->handle_response( $settings );
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
		return array();
	}
}
