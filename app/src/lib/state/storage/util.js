export function prefixEndpoint(endpoint) {
  return endpoint.match(/https?:\/\//) ? endpoint : `https://${endpoint}`;
}
