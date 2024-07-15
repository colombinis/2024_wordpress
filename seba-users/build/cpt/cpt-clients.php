<?php
class cpt_clients
{
	const SLUG = 'seba-users-client';

	private static $instance = null;

	public static function getInstance()
	{
		if (self::$instance === null) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	private function __construct()
	{
		add_action('init', [__CLASS__, 'registerCpTypeClients']);
		add_action( 'add_meta_boxes', [__CLASS__,'register_meta_box']);
		add_action("save_post_".self::SLUG, [__CLASS__,"save_custom_meta_box"],10,3);
	}

	public function registerCpTypeClients()
	{
		register_post_type(
			self::SLUG,
			array(
				'labels'                => array(
					'name'          => __('Clients', 'seba-users'),
					'singular_name' => __('Client', 'seba-users'),
				),
				'public'                => true,
				'publicly_queryable'    => true,
				'show_ui'               => true,
				'show_in_menu'          => true,
				'show_in_nav_menus'     => true,
				'show_in_admin_bar'     => true,
				'query_var'             => true,
				'capability_type'       => 'post',
				'has_archive'           => false,
				'hierarchical'          => false,
				'menu_position'         => null,
				'supports'              => ['title','custom-fields'],
				'menu_icon'             => 'dashicons-groups',
				'show_in_rest'          => true,
				'rest_base'             => self::SLUG,
				'rest_controller_class' => 'WP_REST_Posts_Controller',
				'rewrite'               => array(
					'slug' => self::SLUG,
				)
			)
		);

		register_meta(
			'post',
			'nombre',
			array(
				'object_subtype' => self::SLUG,
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
				'default'      => 'default nombre',
			)
		);

		register_meta(
			'post',
			'apellido',
			array(
				'object_subtype' => self::SLUG,
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
				'default'      => 'default apellido',
			)
		);

		register_meta(
			'post',
			'provincia',
			array(
				'object_subtype' => self::SLUG,
				'show_in_rest' => true,
				'single'       => true,
				'type'         => 'string',
				'default'      => 'default provincia',
			)
		);
	}



	function register_meta_box() {
		add_meta_box( self::SLUG.'-meta-box-id', esc_html__( 'Client data', 'text-domain' ), [__CLASS__,'meta_box_callback'], self::SLUG );
	}

	function meta_box_callback( $object ) {

		$provincias = self::getProvincias();

		$nombre = get_post_meta($object->ID, "nombre", true);
		$apellido = get_post_meta($object->ID, "apellido", true);
		$provincia_id = get_post_meta($object->ID, "provincia", true);

		wp_nonce_field(basename(__FILE__), "meta-box-nonce");
		?>
			<div>
				<label for="nombre">Nombre</label>
				<input name="nombre" type="text" value="<?php echo $nombre; ?>">
				<br>
				<label for="apellido">Apellido</label>
				<input name="apellido" type="text" value="<?php echo $apellido; ?>">
				<br>

				<label for="provincia">Provincia</label>
				<select name="provincia">
					<?php foreach($provincias as $provincia): ?>
						<option
							<?php echo ($provincia['ID'] == $provincia_id) ? 'selected':''; ?>
							value="<?php echo $provincia['ID']; ?>">
							<?php echo $provincia['nombre']; ?>
						</option>
					<?php endforeach; ?>
				</select>

			</div>
		<?php
	}

	function save_custom_meta_box($post_id, $post, $update)
	{
		if (!isset($_POST["meta-box-nonce"]) || !wp_verify_nonce($_POST["meta-box-nonce"], basename(__FILE__)))
			return $post_id;

		if(!current_user_can("edit_post", $post_id))
			return $post_id;

		if(defined("DOING_AUTOSAVE") && DOING_AUTOSAVE)
			return $post_id;


		if(self::SLUG != $post->post_type)
			return $post_id;

		//@TODO: add sanitization
		$nombre = $_POST["nombre"] ?? '';
		$apellido = $_POST["apellido"] ?? '';
		$provincia = $_POST["provincia"] ?? '';

		//@TODO: add validations rules before save
		update_post_meta($post_id, "nombre", $nombre);
		update_post_meta($post_id, "apellido", $apellido);
		update_post_meta($post_id, "provincia", $provincia);


	}

	public function getProvincias(){
		// $response = wp_remote_get( 'https://www.argentina.gob.ar/datos-abiertos/georef/openapi#/Recursos/get_provincias' );
		// $body     = wp_remote_retrieve_body( $response );
		//@TODO:
		// use wp_remote_get function to fetch and end point from an external service
		// and use cache to improve performance with wp_cache_get/wp_cache_add

		return [
			["ID" => 1,"nombre" => "Provincia 1"],
			["ID" => 2,"nombre" => "Provincia 2"],
			["ID" => 3,"nombre" => "Provincia 3"],
		];
	}
}

cpt_clients::getInstance();
