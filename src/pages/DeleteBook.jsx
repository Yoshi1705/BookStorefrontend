import React , {useState} from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from "../Components/Spinner";
import BACKEND_URL from '../config';

const DeleteBook = () => {
  const navigate = useNavigate(); 
  const {id} = useParams();
  const [loading,setloading] = useState(false);


  const handleDelete = () => {
    setloading(true);
    axios.delete(`${BACKEND_URL}/${id}`).then(()=>{
      setloading(false);
      navigate("/");
    }).catch((err)=>{
      console.log(err);
    }) 
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 p-8 rounded-md">
        <h1 className="text-2xl font-bold mb-4">Delete Book</h1>
        {loading ? (<Spinner />) : ""}
        <p className="text-gray-600 mb-4">Are you sure you want to delete the book?</p>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white p-2 rounded-md mr-2"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
