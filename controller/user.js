const UserModel = require('../model/user')

const userController = {
  async profile(req, res, next) {
    const userId = req.userId

    try {
      // fetch user infor from database
      const user = await UserModel.findById(userId, '-__v -password -createdAt -updatedAt')

      // if user not found
      if (!user) {
        return res.json({
          message: 'User not found'
        })
      }

      // response
      return res.json(user)
    } catch (error) {
      return next(error)
    }
  }
}

module.exports = userController
