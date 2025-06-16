let Config = {
  apiUrl:
    process.env.NODE_ENV === 'development'
      ? 'https://dev.api.cloudman.site/v1/api/'
      : 'https://dev.api.cloudman.site/v1/api/',
  devMode: process.env.NODE_ENV,
};

export default Config;
