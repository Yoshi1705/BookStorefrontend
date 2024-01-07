import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Spinner from "../Components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BACKEND_URL from "../config";

const Home = () => {
  const [books, setbooks] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);

    // Simulate a 2-second delay
    const delay = 2000;

    // Use setTimeout to delay the API call
    const timeoutId = setTimeout(() => {
      axios
        .get(`${BACKEND_URL}/`)
        .then((response) => {
          setbooks(response.data.data);
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    }, delay);

    // Clear the timeout if the component unmounts before the API call completes
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8 text-green-200">Book List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-yellow-300 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table style={{ borderCollapse: 'separate', borderSpacing: '0.5rem' , width : "100%",}}>
          <thead>
            <tr>
              <th className="border border-gray-600 rounded-md p-1 text-indigo-300">Sno.</th>
              <th className="border border-gray-600 rounded-md p-1 text-indigo-300">Title</th>
              <th className="border border-gray-600 rounded-md max-md:hidden p-1 text-indigo-300">
                Author
              </th>
              <th className="border border-gray-600 rounded-md max-md:hidden p-1 text-indigo-300">
                Publish Year
              </th>
              <th className="border border-gray-600 rounded-md p-1 text-indigo-300">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => {
              return (
                <tr key={book._id}>
                  <td className="border border-gray-600 rounded-md text-center p-2 text-white">
                    {index + 1}
                  </td>
                  <td className="border border-gray-600 rounded-md text-center p-2 text-white">
                    {book.title}
                  </td>
                  <td className="border border-gray-600 rounded-md text-center max-md:hidden p-2 text-white">
                    {book.author}
                  </td>
                  <td className="border border-gray-600 rounded-md text-center max-md:hidden p-2 text-white">
                    {book.publishedyear}
                  </td>
                  <td className="border border-gray-600 rounded-md text-center max-md:hidden p-2">
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/books/details/${book._id}`}>
                        <BsInfoCircle className="text-2xl text-green-300" />
                      </Link>
                      <Link to={`/books/edit/${book._id}`}>
                        <AiOutlineEdit className="text-2xl text-blue-300" />
                      </Link>
                      <Link to={`/books/delete/${book._id}`}>
                        <MdOutlineDelete className="text-2xl text-red-800" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
