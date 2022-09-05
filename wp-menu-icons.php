<?php

/**
 * Plugin Name: WP Menu Icons
 * Plugin URI: https://quadlayers.com/portfolio/wp-menu-icons/
 * Description: Add icons to your menu items.
 * Version: 2.2.3
 * Author: QuadLayers
 * Author URI: https://quadlayers.com
 * License: GPLv3
 */
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

define( 'WPMI_PLUGIN_NAME', 'WP Menu Icons' );
define( 'WPMI_PLUGIN_VERSION', '2.2.3' );
define( 'WPMI_PLUGIN_FILE', __FILE__ );
define( 'WPMI_PLUGIN_DIR', __DIR__ . DIRECTORY_SEPARATOR );
define( 'WPMI_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );
define( 'WPMI_PREFIX', 'wpmi' );
define( 'WPMI_DB_KEY', '_menu_item_wpmi' );
define( 'WPMI_WORDPRESS_URL', 'https://wordpress.org/plugins/wp-menu-icons/' );
define( 'WPMI_REVIEW_URL', 'https://wordpress.org/support/plugin/wp-menu-icons/reviews/?filter=5#new-post' );
define( 'WPMI_DEMO_URL', 'https://quadlayers.com/portfolio/wp-menu-icons/?utm_source=wpmi_admin' );
define( 'WPMI_PURCHASE_URL', WPMI_DEMO_URL );
define( 'WPMI_SUPPORT_URL', 'https://quadlayers.com/account/support/?utm_source=wpmi_admin' );
define( 'WPMI_GROUP_URL', 'https://www.facebook.com/groups/quadlayers' );
define( 'WPMI_QUADMENU_URL', 'https://quadmenu.com/?utm_source=wpmi_admin' );

define( 'WPMI_PREMIUM_SELL_SLUG', 'quadmenu-pro' );
define( 'WPMI_PREMIUM_SELL_NAME', 'QuadMenu' );
define( 'WPMI_PREMIUM_SELL_URL', 'https://quadlayers.com/portfolio/quadmenu/?utm_source=wpmi_admin' );

define( 'WPMI_CROSS_INSTALL_SLUG', 'quadmenu' );
define( 'WPMI_CROSS_INSTALL_NAME', 'QuadMenu' );
define( 'WPMI_CROSS_INSTALL_DESCRIPTION', esc_html__( 'QuadMenu is the best responsive mega menu designed for theme developers with customizable menu layouts and megamenu drag & drop fields.', 'wp-menu-icons' ) );
define( 'WPMI_CROSS_INSTALL_URL', 'https://quadlayers.com/portfolio/quadmenu/?utm_source=wpmi_admin' );

require_once WPMI_PLUGIN_DIR . 'includes/quadlayers/widget.php';
require_once WPMI_PLUGIN_DIR . 'includes/quadlayers/notices.php';
require_once WPMI_PLUGIN_DIR . 'includes/quadlayers/links.php';
require_once WPMI_PLUGIN_DIR . 'includes/wpmi.php';
