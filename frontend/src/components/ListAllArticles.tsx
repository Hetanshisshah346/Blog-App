/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListArticleAsync } from "../features/blogSlice";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { UnknownAction } from "redux";

const ListAllArticles: React.FC = () => {
  const { id } = useParams();
  const [deleteArticle, SetDeleteArticle] = useState(id);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articleIdToDelete, setArticleIdToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  const count = useSelector((state: any) => state?.auth?.data);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ListArticleAsync(searchTerm) as unknown as UnknownAction);
  }, [dispatch, searchTerm]);

  const fetchArticles = async () => {
    try {
      if (!articleIdToDelete) return;
      const url = `http://192.168.1.60:3000/article/delete/${articleIdToDelete}`;
      await axios.post(url);
      SetDeleteArticle(articleIdToDelete);
      setShowDeleteModal(false);
      dispatch(ListArticleAsync(searchTerm) as unknown as UnknownAction);
    } catch (error) {
      console.error("Error deleting article", error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    dispatch(ListArticleAsync(term) as unknown as UnknownAction);
  };

  const handleAddArticle = () => {
    navigate("/articles/create");
  };

  const handleDeleteClick = (id: string) => {
    setArticleIdToDelete(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    fetchArticles();
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="container-fluid min-vh-100 bg p-5">
      <div className="container container-custom mt-5">
        <div className="mb-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search Articles..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="input-group-append ms-3">
              <button
                className="bg-card h-100  btn text-white"
                onClick={handleAddArticle}
              >
                Add Article
              </button>
            </div>
          </div>
        </div>

        <h2>All Articles</h2>
        <div className="row">
          {count?.map((article: any) => (
            <div key={article._id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body card-hover">
                  <h5 className="card-title">{article.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {article.category}
                  </h6>
                  <p className="card-text">{article.description}</p>
                  <div className="row">
                    <div className="col-2">
                      <a href={`/articles/${article._id}`}>
                        <button
                          type="submit"
                          className="bg-card h-100  btn text-white"
                        >
                          Details
                        </button>
                      </a>
                    </div>
                    <div className="col-2 ms-4">
                      <a href={`update/articles/${article._id}`}>
                        <button
                          type="submit"
                          className="bg-card h-100  btn text-white"
                        >
                          Edit
                        </button>
                      </a>
                    </div>
                    <div className="col-1">
                      <button
                        type="button"
                        className="bg-card h-100 btn text-white"
                        onClick={() => handleDeleteClick(article._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={showDeleteModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this article?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            No
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListAllArticles;

