import chalk from 'chalk';
import dayjs from 'dayjs';

const log = console.log;

export interface VisibleLoggerConfig {
    /** Shows timestamps with each log entry. Defaults to false */
    includeTimestamps?: boolean;
    /** Includes the UTC offset with each timestamps, defaults to false */
    includeUtcOffset?: boolean;
    /** Shows the category with each log, such as 'WARN', 'SUCCESS', or 'ERROR', defaults to true */
    includeCategory?: boolean;
}

export class VisibleLogger {

    showTimestamp: boolean;
    timestampFormatString: string;
    showCategory: boolean;

    constructor(config?: VisibleLoggerConfig) {
        this.showTimestamp = config?.includeTimestamps || false;
        this.timestampFormatString = `YYYY-MM-DDTHH:mm:ss${config?.includeUtcOffset && 'Z[Z]'}`;
        this.showCategory = config?.includeCategory || true;
    }

    /**
     * Prints an error log to the console with or without an error object and stack trace.
     * @param logText Text to print to console
     * @param error Optional error object
     */
    error(logText: string, error?: Error) {
        const errorText = error ? `${logText}\n${error?.stack}` : logText;
        log(this._getTimestamp(), this._redTitle(this._getLeading('error')), this._redText(errorText));
    }

    /**
     * Prints an informational log with default category 'INFO'
     * @param logText Text to print to console
     * @param category Optional category 
     */
    info(logText: string, category?: string) {
        log(this._getTimestamp(), this._blueTitle(this._getLeading(category || 'Info')), this._blueText(logText));
    }

    /**
     * Prints a success log with a default category 'SUCCESS'
     * @param logText Text to print to console
     * @param category Optional category
     */
    success(logText: string, category?: string) {
        log(this._getTimestamp(), this._greenTitle(this._getLeading(category || 'Success')), this._greenText(logText));
    }

    /**
     * Prints a warning log with a default category of 'WARN'
     * @param logText Text to print to console
     * @param category Optional category
     */
    warn(logText: string, category?: string) {
        log(this._getTimestamp(), this._yellowTitle(this._getLeading(category || 'Warn')), this._yellowText(logText));
    }

    /**
     * Prints a basic log with default category of 'LOG'
     * @param logText Text to print to console
     * @param category Optional category
     */
    log(logText: string, category?: string) {
        log(this._getTimestamp(), this._blackTitle(this._getLeading(category)), logText);
    }

    private _getLeading(category?: string): string {
        return this.showCategory ? chalk.whiteBright(` [ ${category?.toUpperCase() || 'LOG'} ] `) : '';
    }

    private _redTitle(input: string) {
        return chalk.bgRed.bold(input);
    }

    private _redText(input: string): string {
        return chalk.red(input);
    }

    private _greenTitle(input: string): string {
        return chalk.bgGreen.bold(input);
    }

    private _greenText(input: string): string {
        return chalk.green(input);
    }

    private _blueTitle(input: string): string {
        return chalk.bgBlue.bold(input);
    }

    private _blueText(input: string): string {
        return chalk.blue(input);
    }

    private _yellowTitle(input: string): string {
        return chalk.bgYellow.bold(input);
    }

    private _yellowText(input: string): string {
        return chalk.yellow(input);
    }

    private _blackTitle(input: string): string {
        return chalk.bgBlack.bold(input);
    }

    private _getTimestamp(): string {
        return chalk.gray(this.showTimestamp ? dayjs(Date.now()).format(this.timestampFormatString) : '');
    }
}

/**
 * 
 * @param options Optional VisbleLoggerConfig options
 * @returns Configured instance of VisibleLogger
 */
export const loggerFactory = (options?: VisibleLoggerConfig): VisibleLogger => {
    return new VisibleLogger(options);
}

const logger = loggerFactory();

export default logger;