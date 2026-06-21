import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dashboardOrderData } from "../data/dashboardOrderData";
import Loading from "../components/Loading";
import { ArrowLeftIcon } from "lucide-react";
import OrderOTP from "../components/OrderTracking/OrderOTP";

type Order = {
  _id: string;
  id: string;
  createdAt: string;
  status: string;
  items: { name?: string; image?: string; price?: number }[];
  total: number;
  newDate: string;
  deliveryOtp: string;
};

const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  // const [liveLocation, setLiveLocation] = useState<{
  //   lat: number;
  //   lng: number;
  // } | null>(null);

  useEffect(() => {
    setOrder(dashboardOrderData.find((o) => o._id.toString() === id) as any);
    console.log(setOrder);
    setLoading(false);
  }, [id, navigate]);

  if (loading) return <Loading />;
  if (!order) return null;

  return (
    <div className="min-h-screen mb-20 bg-amber-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 text-sm text-green-950 hover:text-green-900 mb-6 transition-colors"
        >
          <ArrowLeftIcon className="size-4" /> Back to Orders
        </button>

        {/* order Id , date , status */}
        <div className="flex items-center justify-between mb-8">
          <div className="">
            <h1 className="text-2xl font-semibold text-green-950">
              Order #{order!._id.slice(-8).toUpperCase()}
            </h1>
            <p className="text-sm text-amber-950 mt-1">
              Placed on{" "}1
              {new Date(order!.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <span
            className={`px-4 py-1.5 text-sm font-semibold rounded-full ${order!.status === "Delivered" ? "bg-green-100 text-gray-950" : order!.status === "cancelled" ? "bg-red-100 text-red-700" : "bg-orange-600 text-white"}`}
          >
            {order!.status} Delivery
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left side -Timeline + map area */}
          <div className="lg:col-span-2 space-y-6">
            {/* OTP card  */}
            <OrderOTP order={order} />
          </div>

          {/* Right side -Order details  */}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
