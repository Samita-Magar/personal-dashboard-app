import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsWidget = ({ apiKey, country }) => {
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [page, setPage] = useState(1);

  const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            apiKey,
            country,
            category: selectedCategory,
            pageSize: 3,
            page,
          },
        });
        setNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [apiKey, country, selectedCategory, page]);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    setPage(1);
  };

  return (
    <div className="widget news-widget">
      <h2>Top News</h2>
      <div className="category-filter">
        <label>Filter by Category:</label>
        <select onChange={handleCategoryChange} value={selectedCategory}>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {news.map((article) => (
          <li key={article.title}>
            <div className="news-item">
              <div>
                <h3>{article.title}</h3>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => handlePageClick(page - 1)}
          disabled={page === 1}
        >
          &#8592; Back
        </button>
        <button
          className="pagination-button"
          onClick={() => handlePageClick(page + 1)}
        >
          Next &#8594;
        </button>
      </div>
    </div>
  );
};

export default NewsWidget;
