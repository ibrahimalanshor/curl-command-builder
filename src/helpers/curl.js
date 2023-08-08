import axios from 'axios';

export class Curl {
  url;
  method = 'GET';
  params;
  headers;
  body;
  output;

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
  setOutput(output) {
    this.output = output;

    return this;
  }

  getUrl() {
    const url = this.url ?? '';

    return url;
  }

  getParams() {
    const params = this.params.split('\n').join(' \\\n\t--url-query ');

    return `--url-query ${params}`;
  }

  getHeaders() {
    const headers = this.headers.split('\n').join(' \\\n\t-H ');

    return `-H ${headers}`;
  }

  getBody() {
    return `-d '${this.body}'`;
  }

  getOutput() {
    return `-o '${this.output}'`;
  }

  result() {
    return [
      `curl -X ${this.method} ${this.getUrl()}`,
      ...(this.params ? [this.getParams()] : []),
      ...(this.headers ? [this.getHeaders()] : []),
      ...(this.body ? [this.getBody()] : []),
      ...(this.output ? [this.getOutput()] : []),
    ].join(' \\\n\t');
  }
}
