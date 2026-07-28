export type GameStateReason = "TARGET_WORD_NOT_SET";

export class GameStateError extends Error {
  constructor(public readonly reason: GameStateReason) {
    super(reason);
    this.name = "GameStateError";
  }
}
