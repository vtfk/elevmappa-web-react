export const config = {
  productOwner: process.env.REACT_APP_PRODUCT_OWNER || 'Vestfold og Telemark'
}

export const API = {
  URL: process.env.REACT_APP_API_URL
}

export const AUTH = {
  auth: {
    clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
    authority: process.env.REACT_APP_AUTH_AUTHORITY,
    redirectUri: process.env.REACT_APP_AUTH_REDIRECT_URL,
    postLogoutRedirectUri: process.env.REACT_APP_AUTH_POST_LOGOUT_URL
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
}

export const loginRequest = {
  scopes: ['openId', 'profile', 'User.Read', 'Group.Read.All'],
  forceRefresh: true
}
