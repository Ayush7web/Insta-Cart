import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { UseCart } from "../context/CartContext";
import Loading from "../components/Loading";
import {
  CalendarSearchIcon,
  ChevronRightIcon,
  PackageIcon,
} from "lucide-react";
import { dashboardOrderData } from "../data/dashboardOrderData";

type Order = {
  _id: string;
  createdAt: string;
  status: string;
  items: { name?: string; image?: string; price?: number }[];
  total: number;
};

const statusColors: Record<string, string> = {
  placed: "bg-yellow-200 text-amber-900",
  "Out for Delivery": "bg-indigo-100 text-indigo-800",
  Delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

  // const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";
// =======================================================

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();

  const tabs = ["all", "placed", "Out for Delivery", "Delivered"];

  const { clearCart } = UseCart();

  const fetchOrders = async () => {
    // dashboardOrderData contains product-like objects; map them to Order shape
    const mapped: Order[] = dashboardOrderData.map((item: any) => ({
      _id: String(
        item.id ?? item._id ?? Math.random().toString(36).slice(2, 10),
      ),
      createdAt: item.createdAt ?? new Date().toISOString(),
      status: item.status ?? "placed",
      items: [
        {
          name: item.name,
          image: item.image,
        },
      ],
      totalPrice:item.price ?? "22",
      total: item.total ?? 0,
    }));

    setOrders(mapped);
    setLoading(false);
  };

  useEffect(() => {
    const run = async () => {
      if (searchParams.get("clearCart")) {
        clearCart();
        setSearchParams({});
        setTimeout(() => {
          fetchOrders();
        }, 2000);
      } else {
        fetchOrders();
      }
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-amber-500 mb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-green-950 mb-6 ">
          My Orders
        </h1>

        {/* Tabs  */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-xl whitespace-nowrap transition-colors ${activeTab === tab ? "bg-green-950 text-white" : "bg-white text-lime-900 hover:bg-amber-200"}`}
            >
              {tab === "all" ? "All Orders" : tab}
            </button>
          ))}
        </div>

        {/* orders list */}
        {loading ? (
          <Loading />
        ) : orders.length === 0 ? (
          <div className=" flex flex-col items-center py-16">
            <PackageIcon style={{ color: "white" }} className="size-16 mb-4" />
            <h2 className="text-lg font-medium text-green-950 mb-2">
              No Orders yet
            </h2>
            <p className="text-sm text-lime-950 mb-4">
              Start shopping to see your orders here
            </p>
            <Link
              to="/products"
              className="inline-flex px-4 py-2 bg-green-700 text-white text-sm rounded-lg"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order._id}
                to={`/orders/${order._id}`}
                className="block max-w-4xl bg-white rounded-2xl p-5 hover:shadow transition-all"
              >
                {/* Order id , date , & status */}
                <div className="flex items-start justify-between mb-3">
                  {/* left  */}

                  <div className="">
                    <p className="text-sm font-medium text-green-950">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <CalendarSearchIcon className="size-3 text-amber-950" />
                      <span className="text-xs text-lime-950">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* right  */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-4 py-1 text-xs font-medium rounded-full ${statusColors[order.status] || "bg-gray-800 text-white"}`}
                    >
                      {order.status}
                    </span>
                    <ChevronRightIcon className="size-4 text-amber-950 " />
                  </div>
                </div>

                {/* items thumbnails */}
                <div className="flex items-center gap-2 mb-3">
                  {order.items.slice(0, 4).map((item, i) => (
                    <img
                      key={i}
                      src={item.image}
                      alt={item.name}
                      className="size-12 sm:size-16 rounded-lg object-cover border"
                    />
                  ))}
                  {order.items.length > 4 && (
                    <div className="size-12 sm:size-16 rounded-lg bg-amber-300 flex items-center justify-center text-xs font-semibold text-amber-950">
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>

                {/* total items & price */}
                <div className="flex justify-between items-center pt-3">
                  <span className="text-amber-950">
                    {order.items.length} items
                  </span>
                  <span className="font-semibold text-green-950">
                    {"$29"}{order.total.toFixed()} 
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      
    </div>
  );
};

export default MyOrders;
