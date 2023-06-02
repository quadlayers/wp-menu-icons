<?php

namespace QuadLayers\WPMI\Entities;

use QuadLayers\WPMI\Entities\Entity_Base;

abstract class Entity_Uploaded extends Entity_Base {

	public function __construct() {

		parent::__construct();
		$this->type = 'uploaded';
		unset( $this->iconmap );
	}

	abstract public function on_create();
}
