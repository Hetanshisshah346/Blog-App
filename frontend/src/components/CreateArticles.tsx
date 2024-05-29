import React, { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateArticleAsync } from "../features/blogSlice";

const CreateArticles: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(formData){
      dispatch(CreateArticleAsync({id:formData, navigate}));
  }else{
      console.error("Something went wrong..")
  }
  };

  return (
    <div className="bg">
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <form onSubmit={handleSubmit} className="w-50 card p-5">
          <h2 className="text-center mb-4">Create Article</h2>
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
            <button type="submit" className="bg-card h-100 w-100 btn text-white">
              Create Article
            </button>
          </div>
         
        </form>
      </div>
    </div>
  );
};

export default CreateArticles;
