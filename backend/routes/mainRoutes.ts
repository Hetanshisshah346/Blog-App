import { Router } from "express";
import { ArticleRoutes } from "./article";

const mainRouter: Router = Router();

const articleRoutes: Router = new ArticleRoutes().getRouter();
mainRouter.use("/article", articleRoutes);

export default mainRouter;
