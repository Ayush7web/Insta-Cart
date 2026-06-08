import { useEffect, useState } from "react";
import { productSeparateData } from "../data/productSeparateData";
import { Zap } from "lucide-react";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";

type Product = {
  _id: string;
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
  hasFilters?: boolean;
};

const FlashDeals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(productSeparateData.filter((p: any) => p.stock > 0));
    setTimeout(() => setLoading(false), 2000);
  });
  return (
    <div className="min-h-screen bg-blend-hue">
      {/* Banner  */}
      <div className="bg-linear-to-r from-orange-400 to bg-orange-600 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Zap className="size-6 fill-white" />
            <h1 className="text-3xl font-bold">FLASH DEALS</h1>
            <Zap className="size-6 fill-white" />
          </div>
        </div>

        {/* sm: >=640 px ya usse bara  rahega tabhi kaam karega */}
        <p className="text-white/80  text-center items-center justify-center mx-auto sm:whitespace-nowrap">
          Limited-time offers on your favorite organic products. Grab them
          before they're gone!
        </p>
      </div>

      {/* =================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <Loading />
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <Zap className="size-16 text-shadow-amber-300 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-green-950 mb-2 ">No deals right now</h2>
            <p className="text-sm text-lime-950">Check back soon for amazing offers</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
{
  products.map((product) => product.stock > 0 && (
    <ProductCard key={product._id} product={product}/>
  ))
}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashDeals;
