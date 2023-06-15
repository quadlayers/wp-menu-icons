<?php

namespace QuadLayers\WPMI\Entities\Libraries;

abstract class Base {

	protected $folder_path = 'wp-menu-icons-pro';
	protected $baseurl;
	protected $basedir;
	public $type = 'default';
	public $name;
	public $label;
	public $prefix;
	public $stylesheet_file;
	public $json_file;

	public $stylesheet_file_path;
	public $json_file_path;

	public $stylesheet_file_url;
	public $json_file_url;

	public $iconmap;
	public $is_loaded;

	public function __construct() {

		$wp_upload_dir = wp_upload_dir();

		$this->baseurl = "{$wp_upload_dir['baseurl']}/{$this->folder_path}/";
		$this->basedir = "{$wp_upload_dir['basedir']}/{$this->folder_path}/";

		$this->stylesheet_file_path = $this->get_file_path( $this->stylesheet_file );
		$this->json_file_path       = $this->get_file_path( $this->json_file );

		$this->stylesheet_file_url = $this->stylesheet_file_url ?? $this->get_file_url( $this->stylesheet_file );
		$this->json_file_url       = $this->json_file_url ?? $this->get_file_url( $this->json_file );

		$this->is_loaded = $this->is_library_loaded();

		if ( $this->is_loaded ) {
			add_action( 'wp_loaded', array( $this, 'register_assets' ) );
		}
	}

	/**
	 * TODO: delete this method
	 */
	public function get_folder_path() {
		return "{$this->basedir}{$this->name}";
	}

	protected function get_file_path( $filename ) {
		return "{$this->basedir}{$this->name}/{$filename}";
	}

	protected function get_file_url( $filename ) {
		return "{$this->baseurl}{$this->name}/{$filename}";
	}

	protected function is_library_loaded() {
		return is_file( $this->stylesheet_file_path ) && is_file( $this->json_file_path );
	}

	public function get_style_name() {
		return "wp-menu-icons-$this->name";
	}

	public function register_assets() {
		$name = $this->get_style_name();
		if ( ! wp_style_is( $name, 'registered' ) ) {
			wp_register_style( $name, $this->stylesheet_file_url );
		}
	}
}
