import Config from 'react-native-config';
import createClient from 'openapi-fetch';
import type { paths } from './types.generated';

export const client = createClient<paths>({ baseUrl: Config.PARSING_API_URL });
