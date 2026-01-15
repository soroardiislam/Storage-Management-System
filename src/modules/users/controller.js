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
export const listUsers = async (req, res, next) => {
  try {
    const users = await userService.listUsers(req.query.page, req.query.limit);
    res.json({
      message: "User list open successfully",
      success: true,
      users,
    });
  } catch (err) {
    next(err);
  }
};
