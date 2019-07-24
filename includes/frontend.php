<?php

if (!defined('ABSPATH')) {
  die('-1');
}

if (!class_exists('WPMI_Frontend')) {

  class WPMI_Frontend extends WPMI {

    private static $instance;

    function enqueue() {
      $this->enqueue_style_icons();

      wp_enqueue_style('wpmi-icons', plugins_url('assets/css/wpmi.css', WPMI_PLUGIN_FILE), array(), WPMI_PLUGIN_VERSION, 'all');
    }

    function nav_menu_item_title($title, $menu_item_id) {

      $classes = array();

      $wpmi = $style = $size = $color = '';

      $new_title = $title;

      if (!is_admin() && !wp_doing_ajax()) {

        if ($wpmi = get_post_meta($menu_item_id, WPMI_DB_KEY, true)) {

          if (isset($wpmi['icon']) && $wpmi['icon'] != '') {

            foreach ($wpmi as $key => $value) {

              if (!in_array($key, array('icon', 'color')) && $value != '') {
                $classes[] = "wpmi-{$key}-{$value}";
              }

              if ($key === 'icon') {
                $classes[] = $value;
              }
            }

            if (!empty($wpmi['label'])) {
              $title = '';
            }

            if (!empty($wpmi['size'])) {
              $size = 'font-size:' . $wpmi['size'] . 'em;';
            }

            if (!empty($wpmi['color'])) {
              $color = 'color:' . $wpmi['color'];
            }

            $style = ' style="' . $size . $color . '"';

            $icon = '<i' . $style . ' class="wpmi-icon ' . join(' ', array_map('esc_attr', $classes)) . '"></i>';

            if (isset($wpmi['position']) && $wpmi['position'] == 'after') {
              $new_title = $title . $icon;
            } else {
              $new_title = $icon . $title;
            }
          }
        }
      }

      return apply_filters('wp_menu_icons_item_title', $new_title, $menu_item_id, $wpmi, $title);
    }

    function init() {
      add_action('wp_enqueue_scripts', array($this, 'enqueue'));
      add_filter('the_title', array($this, 'nav_menu_item_title'), 999, 2);
    }

    public static function instance() {
      if (!isset(self::$instance)) {
        self::$instance = new self();
        self::$instance->init();
      }
      return self::$instance;
    }

  }

  WPMI_Frontend::instance();
}

