import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { FaArrowLeft } from "react-icons/fa";

import API from "../api/api";
import BookForm from "../components/BookForm";

const AddBook = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await API.post("/", data);

      enqueueSnackbar("Book added successfully", {
        variant: "success",
      });

      navigate("/");
    } catch (error) {
      enqueueSnackbar("Failed to add book", {
        variant: "error",
      });
    }
  };

  return (
    <div>
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 mb-6 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-100"
      >
        <FaArrowLeft />
        Back
      </button>

      <BookForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddBook;