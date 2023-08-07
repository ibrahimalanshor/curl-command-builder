export class Curl {
  url;
  params;
  headers;
  body;

  setUrl(url) {
    this.url = url;

    return this;
  }
  setParams(params) {
    this.params = params;

    return this;
  }
  setHeaders(headers) {
    this.headers = headers;

    return this;
  }
  setBody(body) {
    this.body = body;

    return this;
  }

  getUrl() {
    const url = this.url ?? '';

    return `${url}${this.getParams()}`;
  }

  getParams() {
    return this.params ? `?${this.params.split('\n').join('&')}` : '';
  }

  getHeaders() {
    const headers = this.headers.split('\n').join(' \\\n\t-H ');

    return `-H ${headers}`;
  }

  getBody() {
    return `-d '${this.body}'`;
  }

  result() {
    return [
      `curl -X ${this.getUrl()}`,
      ...(this.headers ? [this.getHeaders()] : []),
      ...(this.body ? [this.getBody()] : []),
    ].join(' \\\n\t');
  }
}
