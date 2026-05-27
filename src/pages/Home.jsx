import { useEffect, useState } from "react";
import API from "../api/api";
import BookCard from "../components/BookCard";
import SearchFilter from "../components/SearchFilter";
import Loader from "../components/Loader";
import { enqueueSnackbar } from "notistack";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [selectedBookId, setSelectedBookId] =
    useState(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/");

      setBooks(data);
    } catch (error) {
      enqueueSnackbar(
        "Failed to fetch books",
        {
          variant: "error",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedBookId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await API.delete(
        `/${selectedBookId}`
      );

      enqueueSnackbar(
        "Book deleted successfully",
        {
          variant: "success",
        }
      );

      fetchBooks();
    } catch (error) {
      enqueueSnackbar("Delete failed", {
        variant: "error",
      });
    } finally {
      setShowModal(false);
      setSelectedBookId(null);
    }
  };

  const filteredBooks = books.filter(
    (book) => {
      const matchesSearch =
        book.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        book.author
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesGenre = genre
        ? book.genre === genre
        : true;

      return (
        matchesSearch &&
        matchesGenre
      );
    }
  );

  if (loading) return <Loader />;

  return (
    <>
      <SearchFilter
        search={search}
        setSearch={setSearch}
        genre={genre}
        setGenre={setGenre}
      />

      {filteredBooks.length === 0 ? (
        <h2 className="text-center text-2xl font-bold mt-[100px]">
          No Books Found
        </h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              handleDelete={
                handleDeleteClick
              }
            />
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Delete Book
            </h2>

            <p className="text-gray-600">
              Are you sure you want to
              delete this book?
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="flex-1 py-3 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="flex-1 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;