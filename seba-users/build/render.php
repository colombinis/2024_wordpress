<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

require_once(__DIR__ . "/cpt/cpt-clients.php");

$clientes = new WP_Query(
	array(
		'post_type' => cpt_clients::SLUG,
		'order' => $attributes['order'],
		'orderby' => 'meta_value',
		'meta_key' => 'nombre',
		'posts_per_page' => $attributes['posts_per_page']
	)
);

// $attributes (array): The block attributes.
// print_r($attributes);
// $content (string): The block default content.
// print_r($content);
// $block (WP_Block): The block instance.
// print_r($block);

?>
<hr>
<h2>PHP version</h2>
<ul <?php echo get_block_wrapper_attributes(); ?>>
	<?php if ($clientes) : ?>
		<?php foreach ($clientes->posts as $client) : ?>
			<li>
				<?php echo $client->nombre; ?>
				<?php echo $client->apellido; ?>
			</li>
		<?php endforeach; ?>
	<?php else : ?>
		<li>No hay resultados</li>
	<?php endif; ?>
</ul>

<hr>
<h2>React version</h2>
<div id="my-clients-component" data-order="<?= $attributes['order']; ?>" data-perpage="<?= $attributes['posts_per_page']; ?>"></div>
