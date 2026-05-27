import { useState } from "react";
import { BikeIcon, Loader2Icon, LockIcon, MailIcon, UserIcon } from "lucide-react";  
import HeroSectionData from "../assets/hero_bg.jpeg";
import { Link } from "react-router-dom";
const Login = () => {
  const [isLoginState, setIsLoginState] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => (window.location.href = "/"), 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* left side */}
      <div className="hidden lg:flex lg:w-1/2 bg-app-green relative items-center justify-center">
        <img
          src={HeroSectionData}
          alt=""
          className="absolute inset-0 object-cover h-full bg-center opacity-30"
        />
        <div className="relative text-center px-12">
          <h2 className="text font-semibold text-white mb-4">
            Welcome back to Instacart
          </h2>
          <p className="text-white/60 font-serif text-xl max-w-sm mx-auto">
            Fresh groceries and organic produce, delivered to your doorstep.
          </p>
        </div>
      </div>
      {/* Right side */}
      <div className=" flex-1 flex-center px-4 py-12 bg-app-cream ">
        <div className="w-full max-w-md">
          {/* form header message */}

          <div className="text-center mb-8">
            <Link to={"/"} className="inline-flex items-center gap-2 mb-6">
              <BikeIcon className="size-8 text-app-green" />
              <span className=" text-2xl font-semibold text-app-green">
                Instacart
              </span>
            </Link>
            <h1 className="text-2xl font-semibold text-app-green mb-2">
              {isLoginState
                ? "sign in to your account"
                : "sign up for your account"}
            </h1>
            <p className="text-sm text-app-text-light">
              {isLoginState
                ? "Don't have an account"
                : "Already have an account?"}
              <button
                onClick={ () => setIsLoginState(!isLoginState)}
                className="text-orange-500 ml-1 font-semibold hover:text-orange-600 transition-colors"
              >
                {isLoginState ? "create one" : "sign In"}
              </button>
            </p>
          </div>

          {/* Login register form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 1st placeholder */}
            {!isLoginState && (
              <label className="text-sm flex flex-col gap-1">
                Name
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                  <input
                    type="text"
                    name=""
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="your name"
                    className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all"
                  />
                </div>
              </label>
            )}
            {/* 2nd placeholder */}
            <label className="text-sm flex flex-col gap-1">
              Email address
              <div className="relative">
                <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                <input
                  type="email"
                  name=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="xyz@gmail.com "
                  className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all"
                />
              </div>
            </label>
{/* 3rd placeholder */}
            <label className="text-sm flex flex-col gap-1">
              Password
              <div className="relative">
                <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-app-text-light" />
                <input
                  type="password"
                  name=""
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="********"
                  className="w-full pl-11 pr-4 py-3 text-sm bg-white rounded-xl border not-focus:border-app-border transition-all"
                />
              </div>
            </label>
            <button type="submit" disabled={loading} className="flex-center w-full py-3 bg-green-950 text-white font-semibold rounded-xl hover:bg-green-900 transition-colors disabled:opacity-50">
              {loading ? <Loader2Icon className="animate-spin"/> : isLoginState ?  "Sign In" : "SIgn Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
