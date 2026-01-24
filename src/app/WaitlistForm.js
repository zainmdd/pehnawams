"use client";

import { useState, useEffect } from "react";

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [count, setCount] = useState(null);
  const [countLoading, setCountLoading] = useState(true);
  const [globalError, setGlobalError] = useState("");

  // Fetch live waitlist count on mount
  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch("/api/sheet");
        const data = await res.json();
        if (data.success && data.count !== undefined) {
          setCount(data.count);
        } else {
          console.error("Failed to fetch count:", data.error);
          setCount(0);
        }
      } catch (err) {
        console.error("Error fetching waitlist count:", err);
        setCount(0);
      } finally {
        setCountLoading(false);
      }
    }
    fetchCount();
  }, []);

  const validatePhone = (phone) =>
    /^\d{10}$/.test(phone) ? "" : "Phone number must be 10 digits";
  const validateEmail = (email) =>
    /\S+@\S+\.\S+/.test(email) ? "" : "Enter a valid email";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setGlobalError(""); // Clear global error on change

    if (name === "phone")
      setErrors((prev) => ({ ...prev, phone: validatePhone(value) }));
    if (name === "email")
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError("");

    const phoneError = validatePhone(formData.phone);
    const emailError = validateEmail(formData.email);
    setErrors({ phone: phoneError, email: emailError });

    if (phoneError || emailError) return;

    setLoading(true);
    try {
      const response = await fetch("/api/sheet", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.status === "exists") {
        setGlobalError(data.message || "⚠️ You're already on the waitlist!");
      } else if (data.status === "success") {
        setSuccess(true);
        setFormData({ name: "", city: "", phone: "", email: "" });

        // Update count after successful submission
        setCount(data.count || count + 1);

        // Reset success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else if (data.status === "error") {
        setGlobalError(
          data.message || "Something went wrong. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setGlobalError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md p-6 w-full lg:w-[400px] flex flex-col gap-3"
    >
      <p className="font-Dm Sans font-bold text-2xl text-left">
        Get early access
      </p>

      {/* Global Error Message */}
      {globalError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
          {globalError}
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded text-sm">
          ✅ Successfully added to the waitlist!
        </div>
      )}

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        type="text"
        placeholder="Name"
        className="font-inter text-sm border border-gray-300 p-2 rounded outline-none focus:border-black focus:ring-1 focus:ring-black"
        required
      />
      <input
        name="city"
        value={formData.city}
        onChange={handleChange}
        type="text"
        placeholder="City"
        className="font-inter text-sm border border-gray-300 p-2 rounded outline-none focus:border-black focus:ring-1 focus:ring-black"
        required
      />
      <input
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        type="text"
        placeholder="Phone Number"
        maxLength={10}
        className="font-inter text-sm border border-gray-300 p-2 rounded outline-none focus:border-black focus:ring-1 focus:ring-black"
        required
      />
      {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        type="email"
        placeholder="Email"
        className="font-inter text-sm border border-gray-300 p-2 rounded outline-none focus:border-black focus:ring-1 focus:ring-black"
        required
      />
      {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

      {/* Live Waitlist Count */}
      <p className="text-sm text-gray-700 mt-1 text-left">
        {countLoading
          ? "Fetching waitlist count..."
          : count !== null
            ? `${count}+ users have already joined the waitlist.`
            : "Be the first to join the waitlist!"}
      </p>

      <button
        type="submit"
        disabled={loading}
        className={`
    ${success ? "bg-green-700 hover:bg-green-800" : "bg-black hover:bg-gray-800"}
    text-white py-3 px-6 rounded-lg shadow-md w-fit text-left
    disabled:opacity-70
    transition-colors
  `}
      >
        {loading ? "Submitting..." : success ? "Submitted ✅" : "Join now"}
      </button>
    </form>
  );
}
