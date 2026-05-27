import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import API from "../api/api";
import BookForm from "../components/BookForm";
import Loader from "../components/Loader";
import { enqueueSnackbar } from "notistack";

const EditBook = () => {
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

  const handleSubmit = async (data) => {
    try {
      await API.put(`/${id}`, data);

      enqueueSnackbar("Book updated successfully", {
        variant: "success",
      });

      navigate("/");
    } catch (error) {
      enqueueSnackbar("Update failed", {
        variant: "error",
      });
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <button
        onClick={() => navigate("/")}
        className="flex items-center cursor-pointer gap-2 mb-6 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-100"
      >
        <FaArrowLeft />
        Back
      </button>

      <BookForm
        onSubmit={handleSubmit}
        initialData={book}
      />
    </div>
  );
};

export default EditBook;