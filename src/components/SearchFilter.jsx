const SearchFilter = ({
  search,
  setSearch,
  genre,
  setGenre,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 my-5">
      <input
        type="text"
        placeholder="Search by title or author"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-3 rounded-lg flex-1 bg-white w-full"
      />

      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="border p-3 rounded-lg bg-white w-full md:w-60"
      >
        <option value="">All Genres</option>
        <option value="Fiction">Fiction</option>
        <option value="Science">Science</option>
        <option value="History">History</option>
        <option value="Biography">Biography</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Technology">Technology</option>
        <option value="Horror">Horror</option>
        <option value="Romance">Romance</option>
        <option value="Self Help">Self Help</option>
        <option value="Finance">Finance</option>
      </select>
    </div>
  );
};

export default SearchFilter;