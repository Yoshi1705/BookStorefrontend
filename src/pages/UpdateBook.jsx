import React, { useState,useEffect} from 'react';
import axios from 'axios';
import Backbutton from "../Components/Backbutton";
import Spinner from "../Components/Spinner";
import { useNavigate , useParams} from 'react-router-dom';
import BACKEND_URL from '../config';

const UpdateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedyear, setPublishedYear] = useState('');
  const [loading,setloading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    setloading(true);
    axios.get(`${BACKEND_URL}/${id}`).then((res)=>{
         setTitle(res.data.title);
         setAuthor(res.data.author);
         setPublishedYear(res.data.publishedyear);
         setloading(false);
    }).catch((err) =>{
      setloading(false);
      console.log(err);
    })

  },[id])
  
  const handleEditBook = async () => {
    try {
      setloading(true);
      await axios.put(`${BACKEND_URL}/${id}`, {
        title,
        author,
        publishedyear,
      });
      setloading(false);
      navigate("/")

      setTitle('');
      setAuthor('');
      setPublishedYear('');

     } catch (error) {
      setloading(false);
      console.error('Error creating book:', error);
     }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div  className = "p-4 mx-4">
        <Backbutton />
      </div>
      {loading ? (<Spinner />) :""}
      <div className="bg-gray-200 p-8 rounded-md">
        <h1 className="text-2xl font-bold mb-4">Create Book</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-600">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-medium text-gray-600">
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="publishedyear" className="block text-sm font-medium text-gray-600">
              Published Year
            </label>
            <input
              type="text"
              id="publishedyear"
              name="publishedyear"
              value={publishedyear}
              onChange={(e) => setPublishedYear(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full"
            />
          </div>
          <button
            type="button"
            onClick={handleEditBook}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Edit Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
