import type { Board } from "./types";

export function saveStateLocallyPlugin (board: Board) {
    localStorage.setItem(`board`, JSON.stringify(board))
}