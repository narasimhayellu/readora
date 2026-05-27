import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const BookCard = ({ book, handleDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition flex flex-col h-full">
      <Link to={`/book/${book.id}`} className="flex-1">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-56 sm:h-60 object-cover"
        />

        <div className="p-4 sm:p-5">
          <h2 className="text-xl sm:text-2xl font-bold text-indigo-600 line-clamp-2">
            {book.title}
          </h2>

          <p className="mt-2 text-gray-700 text-sm sm:text-base">
            <span className="font-semibold">Author:</span>{" "}
            {book.author}
          </p>

          <p className="text-gray-700 text-sm sm:text-base">
            <span className="font-semibold">Genre:</span>{" "}
            {book.genre}
          </p>

          <p className="text-gray-700 text-sm sm:text-base">
            <span className="font-semibold">Published:</span>{" "}
            {book.publishDate}
          </p>

          <p className="text-gray-600 mt-3 line-clamp-3 text-sm sm:text-base">
            {book.summary}
          </p>
        </div>
      </Link>

      <div className="flex items-center gap-3 px-4 sm:px-5 pb-5 mt-auto">
        <Link
          to={`/edit-book/${book.id}`}
          className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-yellow-600 transition"
        >
          <FaEdit />
          Edit
        </Link>

        <button
          onClick={() => handleDelete(book.id)}
          className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-red-600 transition"
        >
          <FaTrash />
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;