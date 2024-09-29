export const delayResponse = <T>(data: T, delay: number): Promise<T> => {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      resolve(data); // Return the data after the delay
      clearTimeout(timeoutId); // Clear the timeout once the data is resolved
    }, delay);
  });
};
