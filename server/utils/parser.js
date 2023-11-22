import generateJWT from '../helpers/jwt'

const cookieParser = (user, res) => {
  const token = generateJWT(user.id)

  res
    .status(200)
    .cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // login will expires in 7 days
    })
    .json({
      success: true,
      token,
      user,
    })
}

export default cookieParser
