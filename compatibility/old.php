<?php

add_filter( 'pre_option_menu_icons_pro_settings', function( $value ) {
	error_log( 'value: ' . json_encode( $value, JSON_PRETTY_PRINT ) );
	//TODO: remove before create libraries model
	if(!isset($value['available_libraries'])) {
		require_once  WPMI_PLUGIN_DIR  . '/lib/class-plugin.php';
		$default_libraries = \QuadLayers\WPMI\Plugin::registered_icons_default();
		$value['available_libraries'] = $default_libraries;
	}
	if(!isset($value['active_libraries'])) {
		$default_libraries_names = \QuadLayers\WPMI\Plugin::registered_icons_names();
		$value['active_libraries'] = array_keys($default_libraries_names);
	}
	return $value;
} );

