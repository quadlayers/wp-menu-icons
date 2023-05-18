<?php

namespace QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Libraries;

use QuadLayers\WPMI\Api\Rest\Endpoints\Backend\Base;
use \QuadLayers\WPMI\Models\Libraries;

class Post extends Base {
    protected static $route_path = 'libraries';

    public function callback(\WP_REST_Request $request) {
        $body = json_decode($request->get_body(), true);

        if ( ! isset( $body['name'], $body['type'] )) {
            return $this->handle_response(false);
        }

        $libraries_model = new Libraries();

        $status = $libraries_model->create_library($body);

        return $this->handle_response($status);
    }

    public static function get_rest_method() {
        return \WP_REST_Server::CREATABLE;
    }

    public static function get_rest_args() {
        return array(
            //'library' => array(
            //    'required' => true,
            //    'validate_callback' => function ($param) {
            //        return isset( $param['name'], $param['type'] );
            //    }
            //),
        ); 
    }
}