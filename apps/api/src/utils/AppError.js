// src/utils/AppError.js
export class AppError extends Error {
  constructor(pesan, status = 400) {
    super(pesan);
    this.status = status;
  }
}
