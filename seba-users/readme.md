# Seba Users

Author: Sebastian A. Colombini

## Description

Descripción del ejercicio:
Crear un bloque personalizado de Gutenberg que permita mostrar una lista de clientes en una página de WordPress. Cada cliente debe tener un campo para el nombre, apellido y uno para la provincia. El bloque debe ser configurable para mostrar una cantidad especifica de clientes. Y además debe tener la opción de ordenar los mismos ascendente / descendentemente.

### Requisitos:
- Crear un plugin de WordPress para alojar el bloque Gutenberg.
- Crear un Custom post type que represente los clientes.
- Crear los campos Nombre, Apellido y Provincia (este campo debe ser populado con informacion traida por la api https://www.argentina.gob.ar/datos-abiertos/georef/openapi#/Recursos/get_provincias)
- Crear el bloque Gutenberg utilizando JavaScript (React) para definir el aspecto y el comportamiento del bloque.
- Permitir la configuración de uno o más clientes en el bloque.
- Mostrar la lista de los clientes en la página de WordPress de la siguiente manera: {{ cliente.apellido }} {{ cliente.nombre }} - {{ cliente.provincia }}
- Asegurar que el bloque sea responsivo y se vea bien en dispositivos móviles y de escritorio.

## Installation

This section describes how to install the plugin and get it working.

1. Upload the plugin files to the `/wp-content/plugins/seba-users` directory, or install the plugin through the WordPress plugins screen directly.
2. Activate the plugin through the 'Plugins' screen in WordPress

## Local development
NOTE: as preconditions for local development, you need to have installed on your machine:
- Node and npm
- Docker
- wp-env

1. Clone the repository
2. cd to the plugin's folder
3. Run `npm install` && `npm build`
4. wp-env start

