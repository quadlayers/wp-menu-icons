<?php

namespace QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Navmenu;

use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Base;
use QuadLayers\WPMI\Models\Models_Navmenu;

class Get extends Base {
	protected static $route_path = 'navmenu';

	public function callback( \WP_REST_Request $request ) {
		$menu_id = $request->get_param( 'id' );

		$menu_model = new Models_Navmenu();

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
