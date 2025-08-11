import createClient from 'openapi-fetch';
import type { paths } from './types.generated';

export const client = createClient<paths>({ baseUrl: process.env.EXPO_PUBLIC_PARSING_API_URL });
