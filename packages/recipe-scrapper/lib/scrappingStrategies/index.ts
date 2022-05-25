import { htmlTraversalStrategy } from './htmlTravesralStrategy';
import { itempropsStrategy } from './itempropsStrategy';
import { jsonLdStrategy } from './jsonLdStrategy';
import { metadataStrategy } from './metadataStrategy';

export default [
    metadataStrategy,
    jsonLdStrategy,
    itempropsStrategy,
    htmlTraversalStrategy,
];
