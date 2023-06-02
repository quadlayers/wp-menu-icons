<?php

namespace QuadLayers\WPMI\Entities;

abstract class Entity_Base {

	protected $path        = null;
	protected $folder_path = 'wp-menu-icons-pro/icons-library';
	protected $baseurl;
	protected $basedir;
	public $name    = null;
	public $label   = null;
	public $version = null;
	public $prefix;
	public $stylesheet_file;
	public $json_file;
	public $stylesheet_file_path;
	public $json_file_path;
	public $stylesheet_file_url;
	public $json_file_url;
	public $type = 'default';
	public $iconmap;

	public function __construct() {

		$wp_upload_dir = wp_upload_dir();

		$this->baseurl = "{$wp_upload_dir['baseurl']}/{$this->folder_path}/";
		$this->basedir = "{$wp_upload_dir['basedir']}/{$this->folder_path}/";

		$this->stylesheet_file_path = $this->get_file_path( $this->stylesheet_file );
		$this->json_file_path       = $this->get_file_path( $this->json_file );

		$this->stylesheet_file_url = $this->get_file_url( $this->stylesheet_file );
		$this->json_file_url       = $this->get_file_url( $this->json_file );

		add_action( 'wp_loaded', array( $this, 'register_assets' ) );
		/*
			enqueue_block_assets
			Is not working on Gutenberg 13.8 because this filter extecuted before block_editor_settings_all
			Therefore it is not loaded in EditorStyles
		*/
		add_action( 'enqueue_block_assets', array( $this, 'block_assets' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'block_assets' ) );
	}

	/**
	 * Actions
	 */
	public function register_assets() {

		if ( ! $this->is_library_loaded() ) {
			return;
		}

		wp_register_style(
			"wp-menu-icons-pro-icons-{$this->get_name()}",
			$this->get_stylesheet_url(),
			'',
			$this->get_version()
		);

	}

	public function block_assets() {

		/**
		 * Allways load library in admin panel to allow icons in the editor via enqueue_block_editor_assets
		 */
		if ( $this->is_library_available_frontend() || is_admin() ) {
			wp_enqueue_style( "wp-menu-icons-pro-icons-{$this->get_name()}" );
		}

	}

	/**
	 * Getters
	 */
	public function get_prefix() {

		if ( ! $this->prefix ) {
			return "{$this->name}-icon-";
		}

		return $this->prefix;
	}

	public function get_name() {
		return $this->name;
	}

	public function get_label() {

		if ( $this->label ) {
			return $this->label;
		}

		return $this->name;
	}

	public function get_base_dir() {
		return $this->basedir;
	}

	public function get_base_url() {
		return $this->baseurl;
	}

	public function get_folder_path() {
		return "{$this->get_base_dir()}{$this->get_name()}";
	}

	public function get_folder_url() {
		return "{$this->get_base_url()}{$this->get_name()}";
	}

	public function get_file_path( $filename ) {

		if ( ! $filename ) {
			return false;
		}

		// $path = $this->get_folder_path() . '/' . $filename;

		// if ( is_file( $path ) ) {
		return $this->get_folder_path() . '/' . $filename;
		// }

		// return false;
	}

	public function get_file_url( $filename ) {

		if ( ! $filename ) {
			return false;
		}

		return $this->get_folder_url() . '/' . $filename;
	}

	public function get_library_assets() {
		return array(
			'name'           => $this->get_name(),
			'label'          => $this->get_label(),
			'prefix'         => $this->get_prefix(),
			'json_url'       => $this->get_json_url(),
			'stylesheet_url' => $this->get_stylesheet_url(),
		);
	}

	public function get_version() {
		return $this->version;
	}

	public function get_json_url() {

		if ( ! is_file( $this->get_json_path() ) ) {
			return;
		}

		return $this->get_file_url( '/' . $this->json_file );
	}

	public function get_json_path() {
		return $this->get_file_path( $this->json_file );
	}

	public function get_stylesheet_url() {

		if ( ! is_file( $this->get_stylesheet_path() ) ) {
			return;
		}

		return $this->get_file_url( '/' . $this->stylesheet_file );
	}

	public function get_stylesheet_path() {
		return $this->get_file_path( $this->stylesheet_file );
	}

	/**
	 * Change prefix css
	 */
	public function change_prefix_css( $stylesheet_content, $replace = array( 'icon-' ) ) {
		$prefix_class       = '.wp-block-wowmall-icon [class^="' . $this->get_prefix() . '"]:before, ';
		$prefix_class      .= '.wp-block-wowmall-icon [class*="' . $this->get_prefix() . '"]:before,';
		$stylesheet_content = str_replace( $replace, array( $this->get_prefix() ), $stylesheet_content );
		$stylesheet_content = str_replace( array( '[class^=' ), array( "{$prefix_class} [class^=" ), $stylesheet_content );
		return $stylesheet_content;
	}

	/**
	 * Is_ functions
	 */
	public function is_library_available_frontend() {
		return $this->is_library_loaded();
	}

	public function is_library_available_admin() {
		return $this->is_library_loaded();
	}

	public function is_library_loaded() {

		if ( $this->get_json_url() && $this->get_stylesheet_url() ) {
			return true;
		}

		return false;
	}

	// protected function register( $block ) {
	// Load::instance()->register( $block );
	// }
}
