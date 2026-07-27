export type DOMAIN_ERROR =
  | "INVALID_WORD"
  | "INCORRECT_GUESS"
  | "INVALID_WORD_LENGTH"
  | "NO_TARGET_WORD"
  | "INVALID_SEED_LENGTH"
  | "INVALID_SEED";

export class DomainError extends Error {
  constructor(public readonly message: DOMAIN_ERROR) {
    super(message);
    this.name = "DomainError";
  }
}
