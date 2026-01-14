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
