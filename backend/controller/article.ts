import { Request, Response } from "express";
import Article from "../model/article";

export class ArticleController {
  public async create(req: Request, res: Response) {
    try {
      const { title, description, category } = req.body;

      const slug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
      const findSlug = await Article.findOne({ slug: slug });
      if (findSlug) {
        return res.status(200).json({
          status: false,
          message: "This slug is already exist , Please add New slug.",
        });
      }

      const article = await Article.create({
        title,
        description,
        category,
        slug: slug,
      });

      if (!article) {
        return res
          .status(200)
          .json({ status: false, message: "Article is not added." });
      }

      await article.save();
      return res
        .status(200)
        .json({ status: true, message: "Article is added successfully." });
    } catch (err: any) {
      return res.status(500).json({ status: false, message: err.message });
    }
  }

  

  public async allArticles(req: Request, res: Response) {
    try {
      let query: any = {};
      const searchTerm: any = req.query.search;
      if (searchTerm) {
        query.$or = [
          { slug: { $regex: new RegExp(searchTerm, "i") } },
          { title: { $regex: new RegExp(searchTerm, "i") } },
          { category: { $regex: new RegExp(searchTerm, "i") } },
        ];
      }

      const articles = await Article.find(query).sort({'createdAt': -1});
      if (!articles) {
        return res
          .status(200)
          .json({ status: false, message: "Article is not found." });
      }

      return res.status(200).json({ status: true, data: articles });
    } catch (err: any) {
      return res.status(500).json({ status: false, message: err.message });
    }
  }

  public async allArticlesSearchByTitle(req: Request, res: Response) {
    try {
      let query: any = {};
      const searchTerm: any = req.query.search;
      if (searchTerm) {
        query.$or = [
          { slug: { $regex: new RegExp(searchTerm, "i") } },
          { title: { $regex: new RegExp(searchTerm, "i") } },
          { category: { $regex: new RegExp(searchTerm, "i") } },
        ];
      }
      const articles = await Article.find(query).sort({ createdAt: -1 });
      if (!articles) {
        return res
          .status(200)
          .json({ status: false, message: "Article is not found." });
      }

      return res.status(200).json({ status: true, data: articles });
    } catch (err: any) {
      return res.status(500).json({ status: false, message: err.message });
    }
  }

  public async editArticle(req: Request, res: Response) {
    try {
      const { title,id, description, category } = req.body;
      const findId = await Article.findById({ _id: id });

      if (!findId) {
        return res
          .status(200)
          .json({ status: false, message: "Article not found." });
      }

      const slug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
      const findSlug = await Article.findOne({ slug: slug });
      if (findSlug) {
        return res.status(200).json({
          status: false,
          message: "This slug is already exist , Please add New slug.",
        });
      }

      const article = await Article.findByIdAndUpdate(
        { _id: id },
        { title: title, description: description, category: category, slug: slug },
        { new: true }
      );

      if (!article) {
        return res
          .status(200)
          .json({ status: false, message: "Article not updated." });
      }
      return res
        .status(200)
        .json({ status: true, message: "Article updated successfully." });
    } catch (err: any) {
      return res.status(500).json({ status: false, message: err.message });
    }
  }

  public async deleteArticle(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const findId = await Article.findById({ _id: id });

      if (!findId) {
        return res
          .status(200)
          .json({ status: false, message: "Article not found." });
      }

      const article = await Article.findByIdAndDelete({ _id: id });

      if (!article) {
        return res
          .status(200)
          .json({ status: false, message: "Article not deleted." });
      }
      return res
        .status(200)
        .json({ status: true, message: "Article deleted successfully." });
    } catch (err: any) {
      return res.status(500).json({ status: false, message: err.message });
    }
  }

  public async detailsArticle(req: Request, res: Response) {
    try {
      const id = req.params.id;

      const article = await Article.findById({ _id: id });

      if (!article) {
        return res
          .status(200)
          .json({ status: false, message: "Article not found." });
      }
const data = {
  title: article.title,
  description: article.description,
  category: article.category
}
     
      return res
        .status(200)
        .json({ status: true, message: "Article details page show." , data: data});
    } catch (err: any) {
      return res.status(500).json({ status: false, message: err.message });
    }
  }
}
