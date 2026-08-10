import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { registerUser } from "../../api/auth.api";
import toast from "react-hot-toast";

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      console.log(response);
      console.log(data);
      toast.success(response.message || "Registration Successful");
      reset();
      console.log("called after calling the reset function ()");
    } catch (error) {
      console.log("Error Object:", error);
      console.log("Error Response:", error.response);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-[calc(100vh)] flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <UserPlus className="text-blue-600" size={36} />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-center mb-2">Create Account</h2>
        <p className="text-center text-gray-500 mb-8">
          Register to continue shopping.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">Name</label>

            <input
              type="text"
              placeholder="John Doe"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              {...register("name", {
                required: "Name is required",
              })}
            />
            <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
          </div>
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              {...register("email", {
                required: "Email is required",
              })}
            />
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>
          <div>
            <label className="block mb-2 font-medium">
              Role "customer/vendor"
            </label>
            <input
              type="text"
              placeholder="role..."
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              {...register("role", {
                required: "Role is required",
              })}
            />
            <p className="text-red-500 text-sm mt-1">{errors.role?.message}</p>
          </div>
          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.password?.message}
            </p>
          </div>
          <button
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {isSubmitting ? "Creating Account..." : "Register"}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
