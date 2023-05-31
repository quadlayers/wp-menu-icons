<?php

namespace QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Menu;

use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Base;
use QuadLayers\WPMI\Models\Menu;

class Get extends Base {
	protected static $route_path = 'menu/get';

	public function callback( \WP_REST_Request $request ) {
		$menu_id = $request->get_param( 'id' );

		$menu_model = new Menu();

		$library_name = $menu_model->get( $menu_id );

		return $this->handle_response( $library_name );
	}

	public static function get_rest_method() {
		return \WP_REST_Server::READABLE;
	}

	public static function get_rest_args() {
		return array(
			'id' => array(
				'required' => true,
			),
		);
	}
}
