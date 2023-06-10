export default class CustomError {
  static createCustomerError(name = 'Error', message, cause) {
    const customError = new Error(message, { cause });
    customError.name = name;
    throw customError;
  }
}
