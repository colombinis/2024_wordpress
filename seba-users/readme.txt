=== Seba Users ===
Contributors:      Seba Colombini
Tags:              block
Tested up to:      6.1
Stable tag:        0.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

== Description ==

Descripción del ejercicio:
Crear un bloque personalizado de Gutenberg que permita mostrar una lista de clientes  en una página de WordPress. Cada cliente debe tener un campo para el nombre, apellido y uno para la provincia . El bloque debe ser configurable para mostrar una cantidad especifica de clientes. Y además debe tener la opción de ordenar los mismos ascendente / descendentemente.

Requisitos:
- Crear un plugin de WordPress para alojar el bloque Gutenberg.
- Crear un Custom post type que represente los clientes.
- Crear los campos Nombre, Apellido y Provincia (este campo debe ser populado con informacion traida por la api https://www.argentina.gob.ar/datos-abiertos/georef/openapi#/Recursos/get_provincias)
- Crear el bloque Gutenberg utilizando JavaScript (React) para definir el aspecto y el comportamiento del bloque.
- Permitir la configuración de uno o más clientes en el bloque.
- Mostrar la lista de los clientes en la página de WordPress de la siguiente manera: {{ cliente.apellido }} {{ cliente.nombre }} - {{ cliente.provincia }}
- Asegurar que el bloque sea responsivo y se vea bien en dispositivos móviles y de escritorio.

== Installation ==

This section describes how to install the plugin and get it working.

e.g.

1. Upload the plugin files to the `/wp-content/plugins/seba-users` directory, or install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress


== Frequently Asked Questions ==

= A question that someone might have =

An answer to that question.

= What about foo bar? =

Answer to foo bar dilemma.

== Screenshots ==

1. This screen shot description corresponds to screenshot-1.(png|jpg|jpeg|gif). Note that the screenshot is taken from
the /assets directory or the directory that contains the stable readme.txt (tags or trunk). Screenshots in the /assets
directory take precedence. For example, `/assets/screenshot-1.png` would win over `/tags/4.3/screenshot-1.png`
(or jpg, jpeg, gif).
2. This is the second screen shot

