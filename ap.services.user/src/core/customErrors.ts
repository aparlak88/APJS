export class InvalidParameterError extends Error {
  constructor() {
    super("Invalid parameters");
    this.name = "InvalidParameterError";
  }
}

export class ValidationError extends Error {
  constructor() {
    super("Validation error");
    this.name = "ValidationError";
  }
}

export class EntityNotFoundError extends Error {
  constructor() {
    super("Entity not found error");
    this.name = "EntityNotFoundError";
  }
}

export class EntityOperationError extends Error {
  constructor() {
    super("Entity operation error");
    this.name = "EntityOperationError";
  }
}

export class UtilityOperationError extends Error {
  constructor() {
    super("Utility operation error");
    this.name = "UtilityOperationError";
  }
}