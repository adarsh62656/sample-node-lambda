/**
 * EnvUtils is a utility class containing methods related to environment variables.
 */
export default class ENVUtils {
    /**
     * Gets the environment variable key pair
     * @param key
     */
    public static getEnv(key: string): string | undefined {
        const result = process.env[key];
        console.log('Fetching environment variable ' + key + '= ' + result);
        return result;
    }
    /**
     * Sets the environment variable
     * @param key
     */
    public static setEnv(key: string, value: string) {
        process.env[key] = value;
        return true;
    }
}

export const getEnv = ENVUtils.getEnv;
