import axios from 'axios';

export class Curl {
  url;
  method = 'GET';
  params;
  headers;
  body;

  setUrl(url) {
    this.url = url;

    return this;
  }
  setMethod(method) {
    this.method = method;

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
      `curl -X ${this.method} ${this.getUrl()}`,
      ...(this.headers ? [this.getHeaders()] : []),
      ...(this.body ? [this.getBody()] : []),
    ].join(' \\\n\t');
  }

  async test() {
    const params = this.params
      ? Object.fromEntries(
          this.params.split('\n').map((item) => item.split('='))
        )
      : {};
    const headers = this.headers
      ? Object.fromEntries(
          this.headers
            .split('\n')
            .map((item) => item.slice(1, item.length - 1).split(': '))
        )
      : {};

    return await axios[this.method.toLowerCase()](this.url, {
      headers,
      params,
      data: this.body,
    });
  }
}
