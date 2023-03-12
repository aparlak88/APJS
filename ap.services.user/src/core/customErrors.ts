export class InvalidParameterError extends Error {
  constructor() {
    super('Invalid parameters');
    this.name = 'InvalidParameterError';
  }
}

export class ValidationError extends Error {
    constructor() {
      super('Validation error');
      this.name = 'ValidationError';
    }
  }
