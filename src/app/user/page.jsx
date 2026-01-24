"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Page() {
  const [count, setCount] = useState(0);
  const [countLoading, setCountLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Fetch count from API on mount
  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch("/api/sheet");
        const data = await res.json();
        if (data.success) {
          setCount(data.count);
        }
      } catch (err) {
        console.error("Error fetching count:", err);
      } finally {
        setCountLoading(false);
      }
    }
    fetchCount();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (
      !formData.name ||
      !formData.city ||
      !formData.phone ||
      !formData.email
    ) {
      setError("⚠️ Please fill in all fields");
      setLoading(false);
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setError("⚠️ Phone number must be 10 digits");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/sheet", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (data.status === "exists") {
        setError(data.message || "⚠️ You're already registered!");
      } else if (data.status === "success") {
        setSuccess(true);
        setFormData({ name: "", city: "", phone: "", email: "" });
        setCount(data.count || count + 1);

        // Reset success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center text-white">
      {/* Background Image */}
      <Image
        src="/bgonly.png"
        alt="Background"
        fill
        priority
        className="absolute inset-0 object-cover -z-10"
      />

      {/* Form Card */}
      <div className="bg-white text-black rounded-2xl shadow-lg px-6 py-8 w-[85%] max-w-[340px] sm:max-w-[360px]">
        <h1 className="text-2xl font-bold text-center mb-6">
          Get early access
        </h1>

        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded text-sm">
            ✅ Successfully added to the waitlist!
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            maxLength={10}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
          />

          {/* Error message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Count Text */}
          <p className="text-sm font-medium text-black text-left">
            {countLoading
              ? "Fetching waitlist count..."
              : `${count}+ have already joined the waitlist.`}
          </p>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`
              ${success ? "bg-green-700 hover:bg-green-800" : "bg-black hover:bg-gray-800"}
              text-white px-6 py-2 rounded-lg shadow-md w-fit
              disabled:opacity-70
              transition-colors
              self-start
            `}
          >
            {loading ? "Submitting..." : success ? "Submitted ✅" : "Join now"}
          </button>
        </form>
      </div>
    </div>
  );
}
