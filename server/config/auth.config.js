export default {
  secret: process.env.JWTSECRET,
  jwtExpiration: 3600, // 1 hour
  jwtRefreshExpiration: 86400 // 24 hours
}
