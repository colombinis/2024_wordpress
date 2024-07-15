# Seba Users

Author: Sebastian A. Colombini

## Description

Descripción del ejercicio:
Crear un bloque personalizado de Gutenberg que permita mostrar una lista de clientes en una página de WordPress. Cada cliente debe tener un campo para el nombre, apellido y uno para la provincia. El bloque debe ser configurable para mostrar una cantidad especifica de clientes. Y además debe tener la opción de ordenar los mismos ascendente / descendentemente.

### Requisitos:
[ok]- Crear un plugin de WordPress para alojar el bloque Gutenberg.
[ok]- Crear un Custom post type que represente los clientes.
[wip]- Crear los campos Nombre, Apellido y Provincia (este campo debe ser populado con informacion traida por la api https://www.argentina.gob.ar/datos-abiertos/georef/openapi#/Recursos/get_provincias)
[ok]- Crear el bloque Gutenberg utilizando JavaScript (React) para definir el aspecto y el comportamiento del bloque.
[ok]- Permitir la configuración de uno o más clientes en el bloque.
[wip]- Mostrar la lista de los clientes en la página de WordPress de la siguiente manera: {{ cliente.apellido }} {{ cliente.nombre }} - {{ cliente.provincia }}
[miss]- Asegurar que el bloque sea responsivo y se vea bien en dispositivos móviles y de escritorio.

## Installation

This section describes how to install the plugin and get it working.

1. Upload the plugin files to the `/wp-content/plugins/seba-users` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress

## TODO list
buscar en el codigo por '@TODO'

```
seba-users/build/cpt/cpt-clients.php:
  145
  146: 		//@TODO: add sanitization
  147  		$nombre = $_POST["nombre"] ?? '';

  150
  151: 		//@TODO: add validations rules before save
  152  		update_post_meta($post_id, "nombre", $nombre);

  161  		// $body     = wp_remote_retrieve_body( $response );
  162: 		//@TODO:
  163  		// use wp_remote_get function to fetch and end point from an external service

```
