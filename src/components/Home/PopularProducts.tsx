import { Link } from "react-router-dom";
// import type { Product } from "../../types";
import { categoriesData } from "../../data/categoriesData";
import { ArrowBigRightIcon } from "lucide-react";
import ProductCard from "../ProductCard";
// import { useEffect, useState } from "react";

const PopularProducts = () => {



  interface Product {
    _id: string;
    name: string;
    image: string;
    price: number;
    originalPrice: number;
    unit: string;
    discount: number;
    rating: number;
    reviewCount: number;
  }

  

  const products: Product[] = categoriesData.slice(0, 10).map((product) => {
    const { id, price, originalPrice, ...rest } = product;

    return {
      ...rest,
      _id: String(id),
      price: Number(price),
      originalPrice: Number(originalPrice),
    };
  });
  // const [products, setProducts] = useState<Product[]([])>

  // useEffect(()=>{
  //   setProducts(categoriesData.slice(0,10))
  // },[])

  return (
    <section className="pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold">Popular Products</h2>
            <p className="text-sm text-lime-500 mt-1">
              Top-rated products this season
            </p>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-orange-600 hover:text-orange-500 flex items-center gap-1 transition-colors"
          >
            View All <ArrowBigRightIcon />
          </Link>
        </div>

        {/* ============================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 xl:gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
