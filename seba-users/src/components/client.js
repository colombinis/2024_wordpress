import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	__experimentalText as Text,
	__experimentalHeading as Heading,
} from "@wordpress/components";

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
				//@TODO: add some message to the user / log ?
				return;
			}
			setclientes(clientes);
		}

		loadclientes();
	}, [props]);

	return (
		<ul className="client-list">
			{clientes?.map((client) => (
				<li key={client.id}>
					<strong>Nombre:</strong>{client.meta.nombre}<br/>
					<strong>Apellido:</strong>{client.meta.apellido}<br/>
					<strong>Provincia:</strong>{getProvinciaText(client.meta.provincia)}
					<Card>
						<CardHeader>
							<Heading level={ 4 }>{client.meta.apellido}</Heading>
						</CardHeader>
						<CardBody>
							<Text>{client.meta.nombre}</Text>
						</CardBody>
						<CardFooter>
							<Text>{getProvinciaText(client.meta.provincia)}</Text>
						</CardFooter>
					</Card>
				</li>
			))}
		</ul>

	);
};
