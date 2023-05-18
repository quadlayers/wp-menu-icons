<?php

add_filter( 'pre_option_menu_icons_pro_settings', function( $value ) {
	//TODO: remove before create libraries model
	if(!isset($value['available_libraries'])) {
		require_once  WPMI_PLUGIN_DIR  . '/lib/class-plugin.php';
		$defualt_libraries = \QuadLayers\WPMI\Plugin::registered_icons_default();
		$value['available_libraries'] = $defualt_libraries;
	}
	if(!isset($value['active_libraries'])) {
		$defualt_libraries_names = \QuadLayers\WPMI\Plugin::registered_icons_names();
		$value['active_libraries'] = array_keys($defualt_libraries_names);
	}
	return $value;
} );

