import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  useParams } from 'react-router-dom';

interface Article {
  _id: string;
  title: string;
  description: string;
  category: string;
  slug: string;
}

const ArticleDetails: React.FC = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    fetchArticleDetails();
  }, []);

  const fetchArticleDetails = async () => {
    try {
      const response = await axios.get(`http://192.168.1.60:3000/article/details/${id}`);
      setArticle(response.data.data);
    } catch (error) {
      console.error('Error fetching article details', error);
    }
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg" style={{ minHeight: '100vh' }}>
       
      <div className="card shadow" style={{  width: '700px'}}>
        <div className="card-body card-hover">
          <h2>{article.title}</h2>
          <p><strong>Category: </strong> {article.category}</p>
          <p>{article.description}</p>
          <div className="d-grid mt-5">
          <a href={`/`}>
            <button type="submit" className="bg-card h-100 w-25 btn text-white">
              Back
            </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;
