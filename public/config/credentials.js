//if upload to git then include in .gitignore
const MONGODB = {
    dbURI : "mongodb://webserver:hEBRFLuQbqX489Ku@ds129939.mlab.com:29939/happify"
}

const COOKIE = {
    key : ["p37TuQw2T8"]
}

const GOOGLE = {
  clientID: '925927814509-ovq6onqnqgkcm365sb6a4v5p824inlva.apps.googleusercontent.com',
  clientSecret: 'WJmOyUl6r1vGnRBtxCdnV8IG',
  callbackURL : '/auth/google/redirect'
}

const FACEBOOK = {
  clientID: '925927814509-ovq6onqnqgkcm365sb6a4v5p824inlva.apps.googleusercontent.com',
  clientSecret: 'yMyIq1Epez6m9xtflsLpoJ_N',
  callbackURL : '/auth/facebook/redirect'
}
const VAPID = {
  subject : "mailto:stephenrhyscollins@me.com",
  public : "BEF0_P-MjVHaQKSJOxT-7LsxuuAer4IS3i3K8wi7ntdCnkvdk72y6OcCuJUIVCjOZ4TCC3Ne5GbD8gyWwuXtKns",
  private : "2GT4_ntYb9tQD0bsVcm3xt_knIn38eFCJvYR_bYFPjc"
}
module.exports = {
  GOOGLE : GOOGLE,
  FACEBOOK : FACEBOOK,
  MONGODB : MONGODB,
  COOKIE : COOKIE,
  VAPID : VAPID
}
