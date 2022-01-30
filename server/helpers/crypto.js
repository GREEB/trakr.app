import { createHmac } from 'crypto'

// very simple hashing
export const hash = (addr) => {
  return createHmac('sha256', process.env.DBSECRET)
    .update(addr)
    .digest('hex')
}
