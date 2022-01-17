export const ApiServer = 'https://localhost:44375';
export const ApiBaseUrl = `${ApiServer}/api/`;
export const AuthSettings = {
  client_id: 'zRdr62vu9AHvR2QAPXHYElIi3UBYWDni',
  domain: 'moga.us.auth0.com',
  redirect_uri: window.location.origin + '/signin-callback',
  scope: 'openid profile QandAAPI email',
  audience: 'https://qanda',
};
