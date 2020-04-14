class CancelledPromiseError extends Error {
  constructor(promise) {
    super('Promise was cancelled');
    this.name = 'CancelledPromiseError';
    this.promise = promise;
  }
}

const cancellable = (original) => {
  let cancel = () => { };

  const cancellation = new Promise(
    (resolve, reject) => {
      cancel = () => reject(new CancelledPromiseError(original));
    },
  );

  const wrapped = Promise.race([original, cancellation]);

  return [wrapped, cancel];
};

export { cancellable, CancelledPromiseError };
