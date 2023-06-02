<?php

namespace QuadLayers\WPMI\Controllers;

use QuadLayers\WPMI\Controllers\Libraries as Models_Libraries;

class Frontend {

	private static $instance;

	private function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue' ) );
		add_filter( 'the_title', array( $this, 'nav_menu_item_title' ), 999, 2 );
	}

	public function enqueue() {
		Models_Libraries::enqueue_style_library();
		wp_enqueue_style(
			'wpmi-frontend',
			plugins_url( '/build/frontend/css/style.css', WPMI_PLUGIN_FILE ),
			array(),
			WPMI_PLUGIN_VERSION,
			'all'
		);
	}

	public function nav_menu_item_title( $title, $menu_item_id ) {

		$classes = array();

		$wpmi  = '';
		$style = '';
		$size  = '';
		$color = '';

		$new_title = $title;

		if ( ! is_admin() && ! wp_doing_ajax() ) {

			if ( $wpmi = get_post_meta( $menu_item_id, WPMI_DB_KEY, true ) ) {

				if ( isset( $wpmi['icon'] ) && $wpmi['icon'] != '' ) {

					foreach ( $wpmi as $key => $value ) {

						if ( ! in_array( $key, array( 'icon', 'color' ) ) && $value != '' ) {
							$classes[] = "wpmi-{$key}-{$value}";
						}

						if ( $key === 'icon' ) {
							$classes[] = $value;
						}
					}

					if ( ! empty( $wpmi['label'] ) ) {
						$title = '';
					}

					if ( ! empty( $wpmi['size'] ) ) {
						$size = 'font-size:' . $wpmi['size'] . 'em;';
					}

					if ( ! empty( $wpmi['color'] ) ) {
						$color = 'color:' . $wpmi['color'];
					}

					$style = ' style="' . $size . $color . '"';

					$icon = '<i' . $style . ' class="wpmi-icon ' . join( ' ', array_map( 'esc_attr', $classes ) ) . '"></i>';

					if ( isset( $wpmi['position'] ) && $wpmi['position'] == 'after' ) {
						$new_title = $title . $icon;
					} else {
						$new_title = $icon . $title;
					}
				}
			}
		}

		return apply_filters( 'wp_menu_icons_item_title', $new_title, $menu_item_id, $wpmi, $title );
	}

	public static function instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

}
