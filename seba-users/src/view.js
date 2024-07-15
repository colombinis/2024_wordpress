/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

// /* eslint-disable no-console */
// debugger;
// let algo = window.wp.data.select( 'core' ).getEntityRecords( 'postType', 'page' )
// console.log( algo );
// debugger;
// console.log( 'Hello World! (from seba-seba-users block)' );
// /* eslint-enable no-console */
//

import { createRoot } from 'react-dom';

import {Client} from './components/client';

const element =document.getElementById( 'my-clients-component' );

const order = element.getAttribute( 'data-order' );
const posts_per_page = element.getAttribute( 'data-perpage' );

const root = createRoot( element );
window.addEventListener(
    'load',
    function () {
        root.render(
			<Client order={order} posts_per_page={posts_per_page} />,
        );
    },
    false
);
