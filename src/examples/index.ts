import logger, { loggerFactory } from '../index';

console.log(' [ DEFAULT LOGGER ]')

logger.info('Default info log');
logger.log('Default plain log');
logger.error('Default error log', new Error('Thrown Error'));
logger.error('Default error log without error object');
logger.warn('Default warning log');
logger.success('Default success log');

console.log('\n\n[ CUSTOM CATEGORY ]');
logger.info('Default info log with category', 'Custom');
logger.log('Default plain log with category', 'Custom');
logger.warn('Default warning log with category', 'Custom');
logger.success('Default success log with category', 'Custom');

const logger2 = loggerFactory({ includeCategory: false, includeTimestamps: true, includeUtcOffset: true });

console.log('\n\n[ WITH TIMESTAMP & UTC OFFSET ]');
logger2.info('Custom info log')
logger2.log('Custom plain log');
logger2.error('Custom error log', new Error('Thrown error'));
logger2.error('Custom error log without error object');
logger2.warn('Custom warning log');
logger2.success('Custom success log');