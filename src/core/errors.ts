export class HTTPError extends Error {
  public status: number;
  public data: unknown;

  constructor(status: number, data: unknown) {
    super(`HTTP Error: ${status}`);
    this.name = 'HTTPError';
    this.status = status;
    this.data = data;
  }
}

export class AlreadyInSystemError extends HTTPError {}
