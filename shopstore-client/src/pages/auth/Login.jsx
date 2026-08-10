import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { loginUser } from "../../api/auth.api";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      const { token, user } = response.data;
      login(user, token);
      toast.success("Login Successful");

      // Redirect the user based on the role
      if (user.role === "vendor") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <LogIn size={36} className="text-blue-600" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-8">Login to your account.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="john@example.com"
              {...register("email", {
                required: "Email is required",
              })}
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>
          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="********"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>
          <button
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
