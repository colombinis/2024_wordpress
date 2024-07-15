import { useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';

export const Client = (props) => {
	var query = {
		per_page: props.posts_per_page,
		order: props.order.toLowerCase()
	};
	const clientes = useSelect(
        select =>
            select( coreDataStore ).getEntityRecords( 'postType', 'seba-users-client',query ),
        []
    );
	//debugger;
	console.log(props);

    return (
		<div>
			<h1>Clientes</h1>
			<ul>
				{clientes?.map( ( client ) => (
					<li key={ client.id }>{ client.meta.nombre } - { client.meta.apellido } - { client.meta.provincia } </li>
				) )}
			</ul>
		</div>
	);
}
