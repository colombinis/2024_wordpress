/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {Panel,PanelBody,PanelRow, SelectControl} from '@wordpress/components';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import {Client} from './components/client';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	return (
		<>
		<InspectorControls>
				<Panel>
					<PanelBody title={__('Opciones',"sacsi")}>
						<PanelRow>
							<SelectControl
								label={__('Order',"sacsi")}
								value= {attributes.order}
								options={[
									{label: 'ASC', value: 'ASC'},
									{label: 'DESC', value: 'DESC'}
								]}
								onChange={order => setAttributes({order})}
							>
							</SelectControl>
						</PanelRow>
						<PanelRow>
							<SelectControl
								label={__('Per page',"sacsi")}
								value= {attributes.posts_per_page}
								options={[
									{label: '1', value: '1'},
									{label: '5', value: '5'},
									{label: '10', value: '10'}
								]}
								onChange={
									(posts_per_page) => {
										debugger
										setAttributes({posts_per_page})
									}
								}
							>
							</SelectControl>

						</PanelRow>

					</PanelBody>
				</Panel>
			</InspectorControls>

		<div data-wrapper="from-editor" { ...useBlockProps() }>
			<Client order={attributes.order} posts_per_page={attributes.posts_per_page} />
		</div>
		</>
	);
}

