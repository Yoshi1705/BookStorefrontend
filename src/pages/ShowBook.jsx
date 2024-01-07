import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../Components/Spinner";
import Backbutton from "../Components/Backbutton";
import img from "../images/img.jpg";
import BACKEND_URL from "../config";
const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setloading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setloading(true);
    const delay = 2000;

    const timeoutId = setTimeout(() => {
      axios
        .get(`${BACKEND_URL}/${id}`)
        .then((res) => {
          setBook(res.data);
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [id]);

   

  const cardStyle = {
    height: "300px",
    width : "500px",
    backgroundImage: `url(${img})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius : "6px"
  };
  
  const contentStyle = {
    position: 'absolute',
    top: '50%',
    left: '47%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  };
  console.log(book);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="p-4">
            <Backbutton />
          </div>
          <div  style= {
            cardStyle
          }>
            <div style={contentStyle} className="shadow-xl p-3 border-2 border-green-600">
              <h2 className="text-2xl font-bold mb-4 text-black">{book.title}</h2>
              <p className="text-lg mb-2 text-black">Author: {book.author}</p>
              <p className="text-lg mb-2 text-black">Published Year: {book.publishedyear}</p>
              <p className="text-lg mb-2 text-black">
                Create Time: {new Date(book.createdAt).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }).replace(',', '')}
              </p>
              <p className="text-lg mb-2 text-black">
              Update Time: {new Date(book.updatedAt).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }).replace(',', '')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
