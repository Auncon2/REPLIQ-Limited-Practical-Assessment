"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const AuthPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState(true); 
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (pathname === "/auth/signup") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [pathname]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAuth = (e) => {
    e.preventDefault();

    if (isLogin) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (
        storedUser &&
        storedUser.email === form.email &&
        storedUser.password === form.password
      ) {
        localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
        window.dispatchEvent(new Event("login"));
        alert("Login successful!");
        router.push("/");
      } else {
        alert("Invalid email or password.");
      }
    } else {
      localStorage.setItem("user", JSON.stringify(form));
      alert("Registration successful! Now login.");
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-yellow-50 z-10">
      <div className="container m-auto px-6 pt-32 md:px-12 lg:pt-[4.8rem] lg:px-7">
        <div className="flex items-center flex-wrap px-2 md:px-0">
          <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow space-y-4">
            <h2 className="text-2xl text-center font-bold text-yellow-700">
              {isLogin ? "Login" : "Sign up"}
            </h2>
            <form className="space-y-3" onSubmit={handleAuth}>
              {!isLogin && (
                <>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  />
                </>
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
              <button
                type="submit"
                className="w-full text-yellow-800 bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300  py-2 rounded"
              >
                {isLogin ? "Login" : "Sign up"}
              </button>
            </form>
            <p className="text-sm text-center">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 underline"
              >
                {isLogin ? "Sign up" : "Login"}
              </button>
            </p>
          </div>
          <div className="hidden md:block md:w-7/12 lg:w-6/12 relative">
            <Image
              src="/images/home/food.webp"
              className="relative w-full"
              alt="food illustration"
              loading="lazy"
              width={850}
              height={700}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
