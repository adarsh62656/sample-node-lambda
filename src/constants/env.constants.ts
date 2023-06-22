import { getEnv } from '../utils/EnvUtils';

export const env = {
    LOG_LEVEL: getEnv('LOG_LEVEL'),
    API_URL: getEnv('API_URL'),
};
