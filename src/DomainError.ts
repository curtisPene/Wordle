export type DOMAIN_ERROR =
  | "INVALID_WORD"
  | "INCORRECT_GUESS"
  | "INVALID_WORD_LENGTH";

export class DomainError extends Error {
  constructor(public readonly message: DOMAIN_ERROR) {
    super(message);
    this.name = "DomainError";
  }
}
