type Category = {
  slug: string;
  name: string;
};

type FilterPanelProps = {
  categories: Category[];
  category: string;
  updateFilters: (filterName: string, value: string) => void;
  // clearFilter: () => void;
  // hasFilters: () => boolean;
};

const FilterPanel = ({
  categories,
  category,
  updateFilters,
  // clearFilter,
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
            <button key={cat.slug} onClick={() => updateFilters("category", cat.slug)}
              className={`block w-full text-left px-3 py-3 text-sm rounded-md transition-all ${category === cat.slug ? "bg-gray-300 text-orange-500" : "text-olive-600 hover:bg-blue-400"}`}>
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
