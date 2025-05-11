import cookieParser from "cookie-parser";
import { glopalErrHandling } from "../utils/errorHandling.js";
import { AppError } from "../utils/appError.js";
import authRouter from './auth/auth.router.js'
import queryRouter from './query/query.router.js'
import healthRouter from './health/health.router.js'
import masterQueryRouter from './query/masterQuery.router.js'
const initApp = (app, express) => {
  // Built-in Middleware
  app.use(express.json());
  app.use(cookieParser());
  // Custom Middlewares

  // Routes
  app.use("/auth", authRouter);
  app.use("/api/query", queryRouter);
  app.use("/api/health", healthRouter);
  app.use("/api/query/master", masterQueryRouter);


  // Catch-all for undefined routes
  app.use((req, res, next) => {
    next(
      new AppError("Not Found", 404, {
        method: req.method,
        url: req.originalUrl,
      })
    );
  });

  // Global Error Handler
  app.use(glopalErrHandling);


};

export default initApp;
