<?php

namespace QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Libraries;

use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Base;
use \QuadLayers\WPMI\Models\Libraries;

class Delete extends Base {
    protected static $route_path = 'libraries';

    public function callback(\WP_REST_Request $request) {
        $name = $request->get_param('name');

        $libraries_model = new Libraries();

        $status = $libraries_model->delete_library($name);

        return $this->handle_response($status);
    }

    public static function get_rest_method() {
        return \WP_REST_Server::DELETABLE;
    }

    public static function get_rest_args() {
        return array(
            'name' => array(
                'required' => true,
                'validate_callback' => function ($param) {
                    return isset( $param ) && gettype( $param ) === 'string';
                }
            )
        );
    }
}