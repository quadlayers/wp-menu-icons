<?php

/**
 * Plugin Name:             WP Menu Icons
 * Plugin URI:              https://quadlayers.com/products/wp-menu-icons/
 * Description:             Add icons to your menu items.
 * Version:                 3.1.9
 * Text Domain:             wp-menu-icons
 * Author:                  QuadLayers
 * Author URI:              https://quadlayers.com
 * License:                 GPLv3
 * Domain Path:             /languages
 * Request at least:        4.7.0
 * Tested up to:            6.4
 * Requires PHP:            5.6
 */

if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

define( 'WPMI_PLUGIN_NAME', 'WP Menu Icons' );
define( 'WPMI_PLUGIN_VERSION', '3.1.9' );
define( 'WPMI_PLUGIN_FILE', __FILE__ );
define( 'WPMI_PLUGIN_DIR', __DIR__ . DIRECTORY_SEPARATOR );
define( 'WPMI_PLUGIN_BASENAME', plugin_basename( __FILE__ ) );
define( 'WPMI_DOMAIN', 'wpmi' );
define( 'WPMI_PREFIX', WPMI_DOMAIN );
define( 'WPMI_DB_KEY', '_menu_item_wpmi' );
define( 'WPMI_WORDPRESS_URL', 'https://wordpress.org/plugins/wp-menu-icons/' );
define( 'WPMI_REVIEW_URL', 'https://wordpress.org/support/plugin/wp-menu-icons/reviews/?filter=5#new-post' );
define( 'WPMI_DEMO_URL', 'https://quadlayers.com/demo/wp-menu-icons/?utm_source=wpmi_admin' );
define( 'WPMI_DOCUMENTATION_URL', 'https://quadlayers.com/documentation/wp-menu-icons/?utm_source=wpmi_admin' );
define( 'WPMI_SUPPORT_URL', 'https://quadlayers.com/account/support/?utm_source=wpmi_admin' );
define( 'WPMI_GROUP_URL', 'https://www.facebook.com/groups/quadlayers' );
define( 'WPMI_DEVELOPER', false );
define( 'WPMI_PREMIUM_SELL_URL', 'https://quadlayers.com/products/wp-menu-icons/?utm_source=wpmi_admin' );
/**
 * Load composer autoload
 */
require_once __DIR__ . '/vendor/autoload.php';
/**
 * Load vendor_packages packages
 */
require_once __DIR__ . '/vendor_packages/wp-i18n-map.php';
require_once __DIR__ . '/vendor_packages/wp-dashboard-widget-news.php';
require_once __DIR__ . '/vendor_packages/wp-plugin-table-links.php';
require_once __DIR__ . '/vendor_packages/wp-notice-plugin-promote.php';
require_once __DIR__ . '/vendor_packages/wp-plugin-install-tab.php';
/**
 * Load plugin classes
 */
require_once __DIR__ . '/lib/class-plugin.php';
