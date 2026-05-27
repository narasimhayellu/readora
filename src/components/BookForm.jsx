import { useState, useEffect } from "react";

const genres = [
  "Fiction",
  "Science",
  "History",
  "Biography",
  "Fantasy",
  "Technology",
  "Horror",
  "Romance",
  "Self Help",
  "Finance",
];

const BookForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publishDate: "",
    image: "",
    summary: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        author: initialData.author || "",
        genre: initialData.genre || "",
        publishDate: initialData.publishDate || "",
        image: initialData.image || "",
        summary: initialData.summary || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 1024 * 1024) {
      alert("Please upload image smaller than 1MB");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.src = event.target.result;

      img.onload = () => {
        const canvas =
          document.createElement("canvas");

        const MAX_WIDTH = 300;
        const MAX_HEIGHT = 400;

        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }

        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(
          img,
          0,
          0,
          width,
          height
        );

        const compressedImage =
          canvas.toDataURL(
            "image/jpeg",
            0.7
          );

        setFormData((prev) => ({
          ...prev,
          image: compressedImage,
        }));
      };
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeof onSubmit === "function") {
      onSubmit(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-6 rounded-xl shadow-md max-w-xl mx-auto"
    >
      <div className="space-y-5">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="summary"
          placeholder="Book Summary"
          value={formData.summary}
          onChange={handleChange}
          required
          rows={4}
          className="w-full border p-3 rounded-lg resize-none"
        />

        <select
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg bg-white"
        >
          <option value="">
            Select Genre
          </option>

          {genres.map((genre) => (
            <option
              key={genre}
              value={genre}
            >
              {genre}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="publishDate"
          value={formData.publishDate}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        />

        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Upload Book Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border p-3 rounded-lg bg-white"
          />
        </div>

        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="w-full max-w-[180px] h-52 object-cover rounded-lg mt-4"
          />
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg cursor-pointer font-semibold hover:bg-indigo-700 transition"
        >
          Add Book
        </button>
      </div>
    </form>
  );
};

export default BookForm;