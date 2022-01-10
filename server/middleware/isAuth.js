import jwt from 'jsonwebtoken'

export default function (req, res, next) {
  console.log('isauth')
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    const error = new Error('Not authenticated.')
    error.statusCode = 401
    throw error
  }
  const token = authHeader.split(' ')[1]
  let decodedToken
  try {
    decodedToken = jwt.verify(token, 'expressnuxtsecret')
  } catch (err) {
    err.statusCode = 500
    throw err
  }
  if (!decodedToken) {
    const error = new Error('Not authenticated.')
    error.statusCode = 401
    throw error
  }
  req.userId = decodedToken.userId
  next()
}
