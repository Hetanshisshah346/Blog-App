import React, { useState, ChangeEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { EditArticleAsync } from "../features/blogSlice";
import axios from "axios";
const EditArticles: React.FC = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: id,
    title: "",
    description: "",
    category: "",
  });
  // const [Data, setdata] = useState({
   
  //   title: "",
  //   description: "",
  //   category: "",
  // });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData) {
      dispatch(EditArticleAsync({ id: formData, navigate }));
    } else {
      console.error("Something went wrong..");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/article/details/${id}`);
        const articleData = response.data.data;
        setFormData({
          ...formData,
          title: articleData.title,
          description: articleData.description,
          category: articleData.category,
        });
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchData();
  }, [id]); 
  return (
    <div className="bg">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <form id="editForm" onSubmit={handleSubmit} className="w-50 card p-5" data-parsley-validate>
          <h2 className="text-center mb-4">Edit Article</h2>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              data-parsley-required="true"
              data-parsley-required-message="Please enter title"
              
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              data-parsley-required="true"
              data-parsley-required-message="Please enter description"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-control" 
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              data-parsley-required="true"
              data-parsley-required-message="Please select category"
              
            >
              <option value="">Select a category</option>
              <option value="Food">Food</option>
              <option value="Educations">Educations</option>
              <option value="Businessmen">Businessmen</option>
              <option value="Positions">Positions</option>
            </select>
          </div>
          <div className="d-grid mt-5">
            <button
              type="submit"
              className="bg-card h-100 w-100 btn text-white"
            >
              Edit Article
            </button>
          </div>
        </form>
      </div>
    </div>
    
  );
  
};

export default EditArticles;
