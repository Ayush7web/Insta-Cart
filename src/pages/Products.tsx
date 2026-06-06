import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { categoriesData } from "../data/categoriesData";
import { productSeparateData } from "../data/productSeparateData";
import { Link } from "react-router-dom";
import { ChevronDown, Home, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/ProductCard";
// import prod from "../data/categoriesData";

type Product = {
  _id: string
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  unit: string;
  discount: number;
  reviewCount: number;
  stock: number;
  category: string;
  rating: number;
  description?: string;
  organic?: boolean;
};

// const dummproductSeparateDatayProducts: Product[] = [];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
const [totalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const category = searchParams.get("category") || "";
  const organic = searchParams.get("organic") || "";
  const sort = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page")) || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const fetchProducts = async () => {
    setLoading(true);
    setProducts(
      productSeparateData
        .filter((p) => p.category === category || category === "")
        .map((p) => ({
          ...p,
          rating: p.rating ?? 0,
        })),
    );
    setLoading(false);
  };

  const updateFilters = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    if (key !== "page") {
      newParams.delete("page");
    }
    setSearchParams(newParams);
  };

  const clearFilter = () => setSearchParams({});
  const activeCategory = categoriesData.find((c) => c.slug === category);

  // if any of these true ye filters" niche wala "aaply ho jayega

  // const hasFilters = category || organic || minPrice || maxPrice;

  // ===================

  useEffect(() => {
    fetchProducts();
  }, [category, organic, sort, page, minPrice, maxPrice]);

  return (
    <div className="min-h-screen bg-cyan-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        {/* Breadcrumb एक navigation UI element होता है जो user को बताता है कि वह वेबसाइट या ऐप में अभी किस location पर है और वहाँ तक कैसे पहुँचा।

उदाहरण के लिए, अगर आप किसी product page पर हैं:

Home > Electronics > Mobile Phones > iPhone 16 */}

        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-green-200 transition-colors">
            <Home className="size-4" />
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">
            {activeCategory ? activeCategory.name : "All products"}
          </span>
        </nav>

        {/* ===================== */}
        <div className="flex gap-8 xl:gap-10">
          {/* side bar - Desktop */}
          <aside className="hidden lg:block w-65 shrink-0">
            <div className="bg-white rounded-2xl p-4 sticky top-24">
              <p>Filter</p>
            </div>
          </aside>

          {/* main content */}

          <main className="flex-1">
            {/* header  */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-green-600">
                  {activeCategory ? activeCategory.name : "All Products"}
                </h1>
                <p className="text-sm text-lime-900 mt-0.5">
                  {products.length} products found
                </p>
              </div>

              {/* =========================== */}
              <div className="flex flex-col lg:items-center gap-3">
                {/* mobile filters toggle */}
                <button
                  onClick={() => setMobileFiltersOpen(mobileFiltersOpen)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm bg-white rounded-xl border border-amber-100 hover:bg-amber-200 transition-colors"
                >
                  <SlidersHorizontal className="size-4" /> Filters
                </button>

                {/* Sortingggggggg */}
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => updateFilters("sort", e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 text-sm bg-white rounded-xl border border-amber-100 focus:border-green-300 outline-none cursor-pointer"
                  >
                    <option value="">Newest</option>
                    <option value="price_asc">Price: Low to High </option>
                    <option value="price_dec">Price : High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="name">A to Z</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-shadow-indigo-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* product grid  */}
            {loading ? (
              <p>Loading...</p>
            ) : products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg font-semibold text-green-600 mb-2">
                  No products found
                </p>
                <p className="text-sm text-amber-600 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearFilter}
                  className="px-5 py-2 text-sm font-medium bg-green-600 text-white rounded-xl hover:bg-green-900 transition-colors"
                >
                  clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 xl:gap-8">
                {products.map(
                  (product) =>
                    product.stock > 0 && (
                      <ProductCard key={product.id} product={product} />
                    ),
                )}
              </div>
            )}

            {/* pagination  */}
            {totalPages > 1 && (
              <div className="flex-center gap-2 mt-16">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      updateFilters("page", String(i + 1));
                      scrollTo(0, 0);
                    }}
                    className={`size-9 rounded-lg text-sm font-medium transition-colors ${page === i + 1 ? " bg-green-300 text-white" : "bg-white hover:bg-conic-270"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
