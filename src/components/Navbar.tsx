import {
  ArrowUpRightIcon,
  BikeIcon,
  ChevronDownIcon,
  LogOut,
  MapPinIcon,
  MenuIcon,
  PackageIcon,
  SearchIcon,
  ShieldIcon,
  ShoppingCartIcon,
  User2Icon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseCart } from "../context/CartContext";

const Navbar = () => {
  type User = {
    name: string;
    email: string;
    isAdmin?: boolean;
  } | null;

  const user: User = {
    name: "Ayush Kumar",
    email: "ayush@gmail.com",
    isAdmin: true,
  };

  // const [cartCount] = useState<number>(5);

  const { cartCount } = UseCart()

  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // handle the form yani search jo karega usko handle karega
  const navigate = useNavigate();

  const handleSearch = (e:React.SubmitEvent)=>{
    e.preventDefault();
    if(searchQuery.trim()){
      navigate(`./search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

const handleLogout = () =>{
  setUserMenuOpen(false)
  navigate('/');
}






  return (
    <nav className="bg-white sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 gap-4">
        {/* logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-[22px] font-medium shrink-0"
        >
          <BikeIcon size={24} />
          Instacart
        </Link>

        <div className="w-full flex items-center justify-end gap-4 lg:gap-10">
          {/* NAv links - Desktop */}
          <div className="hidden md:flex items-center gap-6 text-xl font-medium text-zinc-600">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/deals" className="text-orange-600">
              Deals
            </Link>
          </div>

          {/* search */}
          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-sm text-xl sm:text-sm">
            <div className="relative w-full">
              <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search for groceries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 p-2 bg-orange-50 rounded-full ring-orange-300 focus:ring-orange-700 "
              />
            </div>
          </form>

          {/* right actions */}
          <div className="flex items-center gap-3">
            {/* cart  */}

            <button className="relative p-2 rounded-xl" onClick={() => {}}>
              <ShoppingCartIcon className=" size-6 text-zinc-900" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 size-5 bg-orange-500 text-white text-[15px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            {/* user  */}

            <div className="relative">
              {user ? (
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2"
                >
                  <div className="flex items-center justify-center size-8 rounded-full bg-green-950 text-white font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDownIcon className="size-3 text-zinc-500" />
                </button>
              ) : (
                <div className="items-center gap-2">
                  <Link
                    to="/login"
                    className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-950 rounded-full hover: bg-green-950-light transition-colors"
                  >
                    <UserIcon size={18} /> Sign In
                  </Link>
                  {userMenuOpen ? (
                    <XIcon
                      className="md:hidden"
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                    />
                  ) : (
                    <MenuIcon
                      className="md:hidden"
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                    />
                  )}
                </div>
              )}

              {/* for dropdown list */}
              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  />

                  <div className="absolute right-0 mt-2.5 w-56 bg-white rounded-xl shadow-lg border py-2 z-50 flex flex-col">
                    {user && (
                      <div className="px-4 py-3 border-b">
                        <p className="text-sm font-medium text-zinc-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-zinc-500">{user.email}</p>
                      </div>
                    )}

                    {!user && (
                      <Link
                        to="/login"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-zinc-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User2Icon size={18} />
                        Sign In
                      </Link>
                    )}

                    {user && (
                      <>
                        <Link
                          to="/orders"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-zinc-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <PackageIcon size={18} />
                          My Orders
                        </Link>

                        <Link
                          to="/addresses"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-zinc-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <MapPinIcon size={18} />
                          My Address
                        </Link>
                      </>
                    )}

                    <Link
                      to="/products"
                      className=" flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-zinc-50"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <ArrowUpRightIcon size={18} />
                      Products
                    </Link>

                    <Link
                      to="/deals"
                      className=" flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-zinc-50"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <ArrowUpRightIcon size={18} />
                      Deals
                    </Link>

                    {user?.isAdmin && (
                      <Link
                        to="/admin/products"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-orange-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <ShieldIcon className="text-orange-500" size={18} />
                        Admin Panel
                      </Link>
                    )}

                    {user && (
                      <div className="border-t mt-1 pt-1">
                        <button onClick={handleLogout}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-red-50 w-full transition-colors"
                          // onClick={() => setUserMenuOpen(false)}
                        >
                          <LogOut size={18} />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
