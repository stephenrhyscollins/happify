//if upload to git then include in .gitignore
const MONGODB = {
    dbURI : 'mongodb://webserver:hEBRFLuQbqX489Ku@ds129939.mlab.com:29939/happify'
}

const COOKIE = {
    key : ["key1test", "key2test"]
}

const GOOGLE = {
  clientID: '925927814509-ovq6onqnqgkcm365sb6a4v5p824inlva.apps.googleusercontent.com',
  clientSecret: 'yMyIq1Epez6m9xtflsLpoJ_N',
  callbackURL : '/auth/google/redirect'
}

const FACEBOOK = {
  clientID: '925927814509-ovq6onqnqgkcm365sb6a4v5p824inlva.apps.googleusercontent.com',
  clientSecret: 'yMyIq1Epez6m9xtflsLpoJ_N',
  callbackURL : '/auth/facebook/redirect'
}
module.exports = {
  GOOGLE : GOOGLE,
  FACEBOOK : FACEBOOK,
  MONGODB : MONGODB,
  COOKIE : COOKIE
}
