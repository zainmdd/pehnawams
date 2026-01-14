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

  // 🔹 Fetch live waitlist count on mount
  useEffect(() => {
    async function fetchCount() {
      try {
        const res = await fetch("/api/sheet", { cache: "no-store" });
        const data = await res.json();
        if (data.count !== undefined) setCount(data.count);
      } catch (err) {
        console.error("❌ Error fetching waitlist count:", err);
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

    if (name === "phone")
      setErrors((prev) => ({ ...prev, phone: validatePhone(value) }));
    if (name === "email")
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        alert("⚠️ You’re already on the waitlist!");
      } else if (data.status === "success") {
        setSuccess(true);
        setFormData({ name: "", city: "", phone: "", email: "" });

        // Refresh waitlist count
        const updated = await fetch("/api/sheet", { cache: "no-store" });
        const newData = await updated.json();
        if (newData.count) setCount(newData.count);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form.");
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

      {/* 🔹 Live Waitlist Count ABOVE Join Now button */}
      <p className="text-sm text-gray-700 mt-1 text-left">
        {countLoading
          ? "Loading waitlist count..."
          : count
          ? `${count}+ users have already joined the waitlist.`
          : "Be the first to join the waitlist!"}
      </p>

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white py-3 px-6 rounded-lg shadow-md w-fit text-left disabled:opacity-70"
      >
        {loading ? "Submitting..." : success ? "Submitted ✅" : "Join now"}
      </button>
    </form>
  );
}

