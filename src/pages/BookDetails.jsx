import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { enqueueSnackbar } from "notistack";

import API from "../api/api";
import Loader from "../components/Loader";

const BookDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [book, setBook] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchBook = async () => {
    try {
      const { data } = await API.get(`/${id}`);

      setBook(data);
    } catch (error) {
      enqueueSnackbar("Failed to fetch book", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  if (loading) return <Loader />;

  if (!book) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Book Not Found
      </h1>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate("/")}
        className="flex items-center cursor-pointer gap-2 mb-6 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-100"
      >
        <FaArrowLeft />
        Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-64 sm:h-96 md:h-[500px] object-cover"
        />

        <div className="p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-600">
            {book.title}
          </h1>

          <div className="mt-5 space-y-2 text-sm sm:text-base md:text-lg text-gray-700">
            <p>
              <span className="font-semibold">
                Author:
              </span>{" "}
              {book.author}
            </p>

            <p>
              <span className="font-semibold">
                Genre:
              </span>{" "}
              {book.genre}
            </p>

            <p>
              <span className="font-semibold">
                Published:
              </span>{" "}
              {book.publishDate}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-3">
              Summary
            </h2>

            <p className="text-gray-700 leading-7 sm:leading-8 text-sm sm:text-base md:text-lg">
              {book.summary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;