<?php

namespace QuadLayers\WPMI\Api\Rest\Endpoints\Backend;

use QuadLayers\WPMI\Api\Rest\Endpoints\Base as Endpoints;

abstract class Base extends Endpoints {

	public function get_rest_permission() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return false;
		}

		return true;
	}
}
