<?php

namespace QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Libraries;

use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Base;
use \QuadLayers\WPMI\Models\Libraries;

class Get extends Base {
	protected static $route_path = 'libraries';

	public function callback( \WP_REST_Request $request ) {
		$libraries_model = new Libraries();

		$libraries = $libraries_model->get_libraries();

		return $this->handle_response( (array) $libraries );
	}

	public static function get_rest_method() {
		return \WP_REST_Server::READABLE;
	}

	public static function get_rest_args() {
		return array();
	}
}
