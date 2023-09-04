/**
 * Gets the environment variable.
 *
 * @param {string} key Environment variable key
 * @param {string | undefined} defaultValue Default value if the environment variable is undefined.
 * @returns {string} Environment variable value or the default value.
 * @throws {Error} if the environment variable is missing.
 */
export const demandEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw new Error(`Environment variable ${key} is required.`);
  }

  return value;
};

/**
 * Builds a filter by regex for the keys and values provided
 *
 * @param {Record<keyof T, string>} object
 * @returns Filter by regex for the given keys and values
 *
 * Example:
 * ```
 * getModelFilterByRegex<Product>({ name: 'mach', code: '123' })
 *
 * // returns
 * const filter = { name: { $options: 'i', $regex: 'mach', code: { $options: 'i', $regex: '123' } }
 * ```
 */
export const getModelFilterByRegex = <T>(
  object: Partial<Record<keyof T, string | undefined>>,
) => {
  const filter: { [P in keyof T]?: { $options: string; $regex: string } } = {};

  for (const [key, value] of Object.entries(object)) {
    if (value) {
      filter[key as keyof T] = {
        $options: 'i',
        $regex: `${value}`,
      };
    }
  }

  return filter;
};
