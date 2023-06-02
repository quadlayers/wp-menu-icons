<?php

namespace QuadLayers\WPMI\Controllers;

use QuadLayers\WPMI\Entities\Entity_Interface;

class Library_Builder {
	protected $libraries = [];

	public function add_library( Entity_Interface $library ) {
		$this->libraries[ $library->get_name() ] = $library;
		return $this;
	}

	public function get_libraries() {
		return $this->libraries;
	}
}
