import * as userService from "./service.js";
export const createUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.json({
      message: "User create successfully",
      success: true,
      user,
    });
  } catch (err) {
    next(err);
  }
};
