type Category = {
  slug: string;
  name: string;
};

type FilterPanelProps = {
  maxPrice: string;
  minPrice: string;
  categories: Category[];
  category: string;
  updateFilters: (filterName: string, value: string) => void;
  clearFilter: () => void;
  // hasFilters?: () => boolean;
  organic?: string;
};

const FilterPanel = ({
  maxPrice,
  minPrice,
  categories,
  category,
  updateFilters,
  clearFilter,
  // hasFilters,
}: FilterPanelProps) => {
  const categoriesWithAll: Category[] = [
    { slug: "", name: "All categories" },
    ...categories,
  ];
  return (
    <div className="space-y-6">
      {/* categories */}
      <div className="">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-orange-600">Categories</h3>
        </div>
        <div className="space-y-1.5">
          {categoriesWithAll.map((cat: Category) => (
            <button
              key={cat.slug}
              onClick={() => updateFilters("category", cat.slug)}
              className={`block w-full text-left px-3 py-3 text-sm rounded-md transition-all ${category === cat.slug ? "bg-gray-300 text-orange-500" : "text-olive-600 hover:bg-blue-400"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="text-sm font-semibold text-green-950 mb-3">
          Price Range
        </h3>
        <div className=" flex items-center gap-2">
          <input
            type="number"
            placeholder="min"
            value={minPrice}
            onChange={(e) => updateFilters("minPrice", e.target.value)}
            className="w-full px-3 py-3 text-sm bg-white rounded-lg border not-focus:border"
          />
          <span className="text-amber-950">-</span>

          <input
            type="number"
            placeholder="max"
            value={maxPrice}
            onChange={(e) => updateFilters("maxPrice", e.target.value)}
            className="w-full px-3 py-3 text-sm bg-white rounded-lg border not-focus:border"
          />
        </div>
      </div>
      {/* Filters  */}

      <button
        onClick={clearFilter}
        className="w-full py-3 text-sm text-ellipsis border hover:bg-red-400 rounded-lg transition-colors font-medium"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterPanel;
