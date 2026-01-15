import authRoutes from "../modules/auth/route.js";
import userRoutes from "../modules/users/route.js";


export default (app) => {
  app.use("/api/auth", authRoutes);
   app.use("/api/users", userRoutes);
 
};
