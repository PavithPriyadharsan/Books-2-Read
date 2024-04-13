import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-blue-300 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-x-2">
          <svg
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 19V5l7 7-7 7z"
              />
            </svg>
            <Link to="/" className="text-black text-xl font-bold">
              Books2Read
            </Link>
          </div>
          <div className="flex justify-center items-center gap-x-4">
            <button
              className={`bg-sky-600 hover:bg-sky-900 px-4 py-1 rounded-lg ${showType === 'table' ? 'bg-sky-600 text-white' : ''}`}
              onClick={() => setShowType('table')}
            >
              Table
            </button>
            <button
              className={`bg-sky-600 hover:bg-sky-900 px-4 py-1 rounded-lg ${showType === 'card' ? 'bg-sky-600 text-white' : ''}`}
              onClick={() => setShowType('card')}
            >
              Card
            </button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-medium">Books List</h1>
          <Link to="/books/create">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : showType === 'table' ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>
    </div>
  );
};

export default Home;
