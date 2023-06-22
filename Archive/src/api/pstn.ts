import Logger from '../utils/Logger';
import axios from 'axios';
import { env } from '../constants/env.constants';

export class PSTNController {
    static async pstnHandler(event: unknown): Promise<unknown> {
        try {
            Logger.info(`Entering into <PSTNController.pstnHandler> with event: ${JSON.stringify(event)}`);
            if (!env.API_URL) {
                throw new Error('API_URL_NOT_FOUND');
            }
            const axiosResponse = await axios.get(env.API_URL);
            Logger.info('Resolving from <PSTNController.pstnHandler> with data: ' + JSON.stringify(axiosResponse.data));
            return {
                Schema: '1.0',
                Actions: [
                    {
                        Type: 'PlayAudio',
                        Parameters: {
                            PlaybackTerminators: ['1', '8', '#'],
                            Repeat: '5',
                            AudioSource: {
                                Type: 'S3',
                                BucketName: 'modern-meetings-recording-test-bucket',
                                Key: 'pstn/pstn_audio.wav',
                            },
                        },
                    },
                ],
            };
        } catch (err) {
            Logger.error('Error from <PSTNController.pstnHandler> with:' + JSON.stringify(err));
            return {
                Schema: '1.0',
                Actions: [
                    {
                        Type: 'Hangup',
                    },
                ],
            };
        }
    }
}

export const pstnHandler = PSTNController.pstnHandler;
