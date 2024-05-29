// frontend/src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './components/Home';
import ListAllArticles from './components/ListAllArticles';
import ArticleDetails from './components/ArticleDetails';
import CreateArticles from './components/CreateArticles';
import EditArticles from './components/EditArticle';


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
      
        <Routes>
          <Route path="/articles/create" element={<CreateArticles />} />
          <Route path="/" element={<ListAllArticles />} />
           <Route path="/articles/:id" element={<ArticleDetails />} />
           <Route path="/update/articles/:id" element={<EditArticles />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
