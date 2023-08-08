import axios from 'axios';

export class Curl {
  url;
  method = 'GET';
  params;
  headers;
  body;
  output;
  options = {
    verbose: false,
    headerOnly: false,
    compressed: false,
  };

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
  setOptions(options) {
    this.options = options;

    return this;
  }

  getCommand() {
    return [`curl`, ...(this.hasOptions() ? [this.getOptions()] : [])].join(
      ' '
    );
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

  getOptions() {
    return `-${this.options.verbose ? 'v' : ''}${
      this.options.headerOnly ? 'I' : ''
    }${this.options.compressed ? ' --compressed' : ''}`;
  }

  hasOptions() {
    return (
      this.options.verbose || this.options.headerOnly || this.options.compressed
    );
  }

  result() {
    return [
      `${this.getCommand()} -X ${this.method} ${this.getUrl()}`,
      ...(this.params ? [this.getParams()] : []),
      ...(this.headers ? [this.getHeaders()] : []),
      ...(this.body ? [this.getBody()] : []),
      ...(this.output ? [this.getOutput()] : []),
    ].join(' \\\n\t');
  }
}
