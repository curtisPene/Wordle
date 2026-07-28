import { DomainError } from "@/errors/DomainError";

export type InvalidWordReason = "TOO_SHORT" | "NOT_IN_DICTIONARY";

export class InvalidWordError extends DomainError {
  constructor(public readonly reason: InvalidWordReason) {
    super(reason);
    this.name = "InvalidWordError";
  }
}
