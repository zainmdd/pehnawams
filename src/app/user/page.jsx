"use client"; 
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Page() {
  const [count, setCount] = useState(163);
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    phone: "",
    email: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("users") || "[]");
    setCount(163 + stored.length);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.city || !formData.phone || !formData.email) {
      setError("⚠️ Please fill in all fields");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setError("⚠️ Phone number must be 10 digits");
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.email)) {
      setError("⚠️ Email must be a valid Gmail address");
      return;
    }

    // Check duplicates
    const stored = JSON.parse(localStorage.getItem("users") || "[]");
    const phoneExists = stored.find((user) => user.phone === formData.phone);
    const emailExists = stored.find((user) => user.email === formData.email);

    if (phoneExists && emailExists) {
      setError("⚠️ This phone number and email are already registered");
      return;
    } else if (phoneExists) {
      setError("⚠️ This phone number is already registered");
      return;
    } else if (emailExists) {
      setError("⚠️ This email is already registered");
      return;
    }

    // --- Save new user ---
    stored.push({ ...formData, date: new Date().toISOString() });
    localStorage.setItem("users", JSON.stringify(stored));

    setCount(163 + stored.length);
    setFormData({ name: "", city: "", phone: "", email: "" });
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
            placeholder="Email "
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
          />

          {/* Error message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Count Text */}
          <p className="text-sm font-medium text-black text-left">
            {count}+ have already joined the waitlist.
          </p>

          {/* Button */}
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-800 transition self-start"
          >
            Join now
          </button>
        </form>
      </div>
    </div>
  );
}
