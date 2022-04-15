import jwt from 'jsonwebtoken'

const generateToken = (id: string) => {
  return jwt.sign({ id }, 'Secret', {
    expiresIn: '20d'
  })
}

export default generateToken