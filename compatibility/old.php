<?php

// add_filter(
// 'pre_option_menu_icons_pro_settings',
// function( $value ) {

// TODO: remove before create libraries model
// if ( ! isset( $value['available_libraries'] ) ) {
// require_once WPMI_PLUGIN_DIR . '/lib/class-plugin.php';
// $default_libraries            = \QuadLayers\WPMI\Plugin::registered_icons_default();
// $value['available_libraries'] = $default_libraries;
// }
// if ( ! isset( $value['active_libraries'] ) ) {
// $default_libraries_names   = \QuadLayers\WPMI\Plugin::registered_icons_names();
// $value['active_libraries'] = array_keys( $default_libraries_names );
// }
// return $value;
// }
// );




// add_filter(
// 	'default_option_menu_icons_pro_settings',
// 	function( $default ) {
// 		// Check if the default is not an array (or false, which is not an array)
// 		if ( ! is_array( $default ) ) {
// 		$default = array();  // Initialize as an empty array
// 		}

// 		// Set the default values
// 		if ( ! isset( $default['available_libraries'] ) ) {
// 		require_once WPMI_PLUGIN_DIR . '/lib/class-plugin.php';
// 		$default_libraries              = \QuadLayers\WPMI\Plugin::registered_icons_default();
// 		$default['available_libraries'] = $default_libraries;
// 		}

// 		if ( ! isset( $default['active_libraries'] ) ) {
// 		$default_libraries_names     = \QuadLayers\WPMI\Plugin::registered_icons_names();
// 		$default['active_libraries'] = array_keys( $default_libraries_names );
// 		}

// 		return $default;
// 	}
// );



// add_action(
// 	'init',
// 	function() {
// 	$menu_icons_pro_setttings = get_option( 'menu_icons_pro_settings' );
// 		if ( ! $menu_icons_pro_setttings ) {
	// add_filter(
	// 	'default_option_menu_icons_pro_settings',
	// 	function( $default ) {
	// 		// Check if the default is not an array (or false, which is not an array)
	// 		if ( ! is_array( $default ) ) {
	// 		$default = array();  // Initialize as an empty array
	// 		}

	// 		// Set the default values
	// 		if ( ! isset( $default['available_libraries'] ) ) {
	// 		require_once WPMI_PLUGIN_DIR . '/lib/class-plugin.php';
	// 		$default_libraries              = \QuadLayers\WPMI\Plugin::registered_icons_default();
	// 		$default['available_libraries'] = $default_libraries;
	// 		}

	// 		if ( ! isset( $default['active_libraries'] ) ) {
	// 		$default_libraries_names     = \QuadLayers\WPMI\Plugin::registered_icons_names();
	// 		$default['active_libraries'] = array_keys( $default_libraries_names );
	// 		}
	// 		return $default;
	// 	}
	// );
	// 		} else {
	// 			remove_filter( 'default_option_menu_icons_pro_settings' , true );
	// 		}
	// 	}
// );