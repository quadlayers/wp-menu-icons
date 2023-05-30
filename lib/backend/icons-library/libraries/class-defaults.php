<?php

namespace QuadLayers\WPMI\Backend\Icons_Library\Libraries;

use QuadLayers\WPMI\Backend\Icons_Library\Libraries\Base;

class Defaults extends Base {

	protected static $_instance;

	public $name            = 'defaults';
	public $label           = 'Default';
	public $prefix          = 'wowmall-icon-';
	public $json_file       = 'selection.json';
	public $stylesheet_file = 'style.css';
	public $version         = '1.0.0';

	public function is_library_loaded() {
		return true;
	}

	public function get_folder_path() {
		return WPMI_PLUGIN_DIR . '/assets/icon-library/defaults';
	}

	public function get_folder_url() {
		return WPMI_PLUGIN_DIR . '/assets/icon-library/defaults';
	}

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
}
