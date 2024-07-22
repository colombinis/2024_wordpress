<?php



/**
 * Class cpt_clients
 *
 * @package Seba_Users
 */

/**
 * Test_CPT_Clients test case.
 */
class Test_CPT_Clients extends WP_UnitTestCase {

	public $cpt_clients;

    public function setup (): void{
        parent::setup();
		require_once __DIR__ . '/../../../build/cpt/cpt-clients.php';
		$this->cpt_clients = cpt_clients::getInstance();
    }

	public function test_getInstance_returns_singleton() {
        $instance1 = cpt_clients::getInstance();
        $instance2 = cpt_clients::getInstance();

        $this->assertInstanceOf(cpt_clients::class, $instance1);
        $this->assertSame($instance1, $instance2);
    }

	public function test_registerCpTypeClients_registers_post_type() {
        global $wp_post_types;

        cpt_clients::registerCpTypeClients();

        $this->assertArrayHasKey('seba-users-client', $wp_post_types);
        $this->assertEquals('Clients', $wp_post_types['seba-users-client']->labels->name);
        $this->assertEquals('Client', $wp_post_types['seba-users-client']->labels->singular_name);
    }

	public function test_registerCpTypeClients_registers_meta_fields() {
        global $wp_meta_keys;

        cpt_clients::registerCpTypeClients();

        $this->assertArrayHasKey('post', $wp_meta_keys);
        $this->assertArrayHasKey('nombre', $wp_meta_keys['post']['seba-users-client']);
        $this->assertArrayHasKey('apellido', $wp_meta_keys['post']['seba-users-client']);
        $this->assertArrayHasKey('provincia', $wp_meta_keys['post']['seba-users-client']);
    }

	public function test_getProvincias_returns_cached_data() {
        $mock_data = [
            ['id' => '1', 'nombre' => 'Buenos Aires'],
            ['id' => '2', 'nombre' => 'Córdoba']
        ];

        wp_cache_set('seba-users-client_provincias', $mock_data);

        $instance = cpt_clients::getInstance();
        $result = $instance->getProvincias();

        $this->assertEquals($mock_data, $result);
    }

}
