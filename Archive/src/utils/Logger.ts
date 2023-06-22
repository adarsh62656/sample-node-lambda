import { createLogger, format, transports } from 'winston';

import { env } from '../constants/env.constants';
import util from 'util';

const { combine, timestamp, errors } = format;

const enumerateErrorFormat = format((info) => {
    if (info.message instanceof Error) {
        info.message = Object.assign(
            {
                message: info.message.message,
                stack: info.message.stack,
            },
            info.message,
        );
    }

    if (info instanceof Error) {
        return Object.assign(
            {
                message: info.message,
                stack: info.stack,
            },
            info,
        );
    }

    return info;
});

const customFormat = combine(
    errors({ stack: true }),
    enumerateErrorFormat(),
    timestamp({
        format: 'MM-DD-YYYY HH:mm:ss',
    }),
    format.json(),
    {
        transform: (info) => {
            const args = [info.message, ...(info[Symbol.for('splat')] || [])];
            info.message = args
                .map((arg) => {
                    if (typeof arg == 'object') {
                        return util.inspect(arg, { compact: true, depth: 1 });
                    }
                    return arg;
                })
                .join(' ');

            return info;
        },
    },
);

const Logger = createLogger({
    level: 'debug',
    format: customFormat,
});

Logger.add(
    new transports.Console({
        format: customFormat,
        level: env.LOG_LEVEL ?? 'trace',
    }),
);

export default Logger;
