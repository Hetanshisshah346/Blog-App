import { Router } from "express";
import { ArticleController } from "../controller/article";

export class ArticleRoutes {
  private router: Router;
  public articleController: ArticleController;

  constructor() {
    this.router = Router();
    this.articleController = new ArticleController();
    this.setUpRoutes();
  }

  private setUpRoutes() {
    const { create, allArticles, allArticlesSearchByTitle, editArticle, deleteArticle, detailsArticle } = this.articleController;

    this.router.post("/create", create);
    this.router.get("/allShow", allArticles);
    this.router.get("/search", allArticlesSearchByTitle);
    this.router.post("/update", editArticle);
    this.router.post("/delete/:id", deleteArticle);
    this.router.get("/details/:id", detailsArticle);
  }

  public getRouter() {
    return this.router;
  }
}
