import authRoutes from "../modules/auth/route.js";


export default (app) => {
  app.use("/api/auth", authRoutes);
 
};
