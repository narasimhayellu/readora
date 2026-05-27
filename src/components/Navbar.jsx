import { Link } from "react-router-dom";
import { FaBook } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl sm:text-2xl font-bold"
        >
          <FaBook />
          Readora
        </Link>

        <Link
          to="/add-book"
          className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 w-full sm:w-auto text-center"
        >
          Add Book
        </Link>
      </div>
    </div>
  );
};

export default Navbar;