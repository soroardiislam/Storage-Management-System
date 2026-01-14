import * as authService from "./service.js";
export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const token = await authService.login(req.body.email, req.body.password);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
export const forgotPassword = async (req, res, next) => {
  try {
    await authService.forgotPassword(req.body.email);
    res.json({
      message: "Email sent",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
export const resetPassword = async (req, res, next) => {
  try {
    await authService.resetPassword(req.body.token, req.body.password);
    res.json({
      message: "Password reset",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
