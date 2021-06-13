import logger from './logger';

export function methodLog(
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Object,
  propertyName: string,
  propertyDescriptor: PropertyDescriptor,
): PropertyDescriptor {
  const method = propertyDescriptor.value;

  propertyDescriptor.value = async function (...args: unknown[]) {
    try {
      const start = Date.now();
      const result = await method.apply(this, args);
      logger.info(`${propertyName} execution time: ${Date.now() - start} ms`);
      return result;
    } catch (error) {
      logger.error(
        `Method: ${propertyName}\nWith args: ${JSON.stringify(
          args,
          null,
          2,
        )}\nError message: ${error}`,
      );
    }
  };
  return propertyDescriptor;
}
