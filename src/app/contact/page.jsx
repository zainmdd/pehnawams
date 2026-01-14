"use client";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-blue-100 flex flex-col items-center justify-center px-6 py-12 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
        Need Assistance? We're Here to Help!
      </h1>

      <p className="text-gray-700 leading-relaxed max-w-2xl whitespace-pre-line">
        {`Whether you have an issue with an order, a question about our products, or general feedback — our team is ready to assist.

📩 For Support, Orders, or Payments:
Email us at support@pehnawa.app
We aim to respond to all inquiries within 24–48 hours.

💬 For Suggestions or Collaboration:
Email us at founder@pehnawa.app

Pehnawa Headquarters
Bengaluru, Karnataka, India
Mon – Fri | 10:00 AM – 6:00 PM (IST)

We’re happy to hear from you anytime.`}
      </p>
    </div>
  );
}
