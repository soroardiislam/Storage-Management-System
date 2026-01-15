import * as authService from "./service.js";
export const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);
    res.json({
      message: "User register successfull",
      success: true,
      user: user,
    });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const token = await authService.login(req.body.email, req.body.password);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.setHeader("Authorization", `Bearer ${token}`);

    res.json({
      message: "User login successfull",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    await authService.forgotPassword(req.body.email);
    res.json({
      message: "Email sent successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};
export const resetPassword = async (req, res, next) => {
  try {
    const { otp, newPassword } = req.body;
    await authService.resetPassword(otp, newPassword);
    res.json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.setHeader("Authorization", "");
  res.json({
    success: true,
    message: "Logged out successfully",
  });
};
