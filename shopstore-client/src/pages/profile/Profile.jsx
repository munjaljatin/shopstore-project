import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  MapPin,
  Package,
  LogOut,
  Pencil,
  Loader2,
} from "lucide-react";
import { getProfile } from "../../api/profile.api";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Profile = () => {
  const { logout } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProfile();

        setProfile(data.user);
      } catch (error) {
        console.error("Failed to fetch profile:", error);

        setError(
          error.response?.data?.message || "Unable to load your profile.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        {" "}
        <div className="flex items-center gap-3 text-gray-600">
          {" "}
          <Loader2 className="w-5 h-5 animate-spin" />{" "}
          <span>Loading profile...</span>{" "}
        </div>{" "}
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        {" "}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center max-w-md w-full">
          {" "}
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            {" "}
            <User className="w-7 h-7 text-red-500" />{" "}
          </div>
          ```
          <h2 className="text-xl font-semibold text-gray-900">
            Unable to load profile
          </h2>
          <p className="mt-2 text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      {" "}
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>

          <p className="mt-2 text-gray-500">
            Manage your account information and preferences.
          </p>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-indigo-600 to-violet-600" />

          <div className="px-6 pb-6 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              {/* Avatar */}
              <div className="-mt-12">
                <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md">
                  <div className="w-full h-full rounded-full bg-indigo-100 flex items-center justify-center">
                    <User className="w-10 h-10 text-indigo-600" />
                  </div>
                </div>
              </div>

              {/* Edit button */}
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                <Pencil className="w-4 h-4" />
                Edit Profile
              </button>
            </div>

            {/* Basic Info */}
            <div className="mt-5">
              <h2 className="text-2xl font-semibold text-gray-900">Customer</h2>

              <p className="text-sm text-gray-500 mt-1">
                Account ID: #{profile.userId}
              </p>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Account Information
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Information associated with your account.
            </p>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* User ID */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
              <div className="w-11 h-11 rounded-lg bg-indigo-100 flex items-center justify-center">
                <User className="w-5 h-5 text-indigo-600" />
              </div>

              <div>
                <p className="text-xs text-gray-500">User ID</p>

                <p className="font-medium text-gray-900">#{profile.userId}</p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
              <div className="w-11 h-11 rounded-lg bg-green-100 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-green-600" />
              </div>

              <div>
                <p className="text-xs text-gray-500">Account Type</p>

                <p className="font-medium text-gray-900 capitalize">
                  {profile.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/addresses"
            className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-sm transition"
          >
            <MapPin className="w-6 h-6 text-indigo-600 mb-4" />

            <h3 className="font-semibold text-gray-900">My Addresses</h3>

            <p className="text-sm text-gray-500 mt-1">
              Manage your delivery addresses.
            </p>
          </Link>

          <Link
            to="/orders"
            className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-indigo-300 hover:shadow-sm transition"
          >
            <Package className="w-6 h-6 text-indigo-600 mb-4" />

            <h3 className="font-semibold text-gray-900">My Orders</h3>

            <p className="text-sm text-gray-500 mt-1">
              View your previous and current orders.
            </p>
          </Link>

          <button
            onClick={logout}
            className="text-left bg-white border border-gray-200 rounded-2xl p-5 hover:border-red-300 hover:shadow-sm transition"
          >
            <LogOut className="w-6 h-6 text-red-500 mb-4" />

            <h3 className="font-semibold text-gray-900">Logout</h3>

            <p className="text-sm text-gray-500 mt-1">
              Sign out of your account.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
