import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";
import { useEffect, useState } from "@wordpress/element";

const getProvinciaText = (provincia_data) => {
	const provincia = provincia_data.split("|");
	//if provincia has separator
	return provincia[1] ? provincia[1] : provincia[0];
};

export const Client = (props) => {
	const [clientes, setclientes] = useState([]);
	useEffect(() => {
		async function loadclientes() {
			var queryParams = {
				per_page: props.data.posts_per_page,
				order: props.data.order.toLowerCase(),
			};

			const clientes = await apiFetch({
				path: addQueryArgs("/wp/v2/seba-users-client", queryParams),
			});

			if (!clientes) {
				// oups! something went wrong
				return;
			}
			setclientes(clientes);
		}

		loadclientes();
	}, [props]);

	return (
		<div>
			<h1>Clientes</h1>
			<ul>
				{clientes?.map((client) => (
					<li key={client.id}>
						{client.meta.nombre} - {client.meta.apellido} --{" "}
						{getProvinciaText(client.meta.provincia)}{" "}
					</li>
				))}
			</ul>
		</div>
	);
};
