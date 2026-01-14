"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Gift } from "lucide-react";
import WaitlistForm from "../WaitlistForm";// ✅ added

export default function Marketing() {
  const router = useRouter();

  const [navOption, setNavOption] = useState([
    { name: "Register as Partner", isActive: false, link: "https://partners.pehnawa.app/" },
    { name: "Get Early Access", isActive: false, link: "/user" },
    { name: "Contact us", isActive: false, link: "/contact" },
  ]);

 const [activeModal, setActiveModal] = useState(null);
  const openModal = (type) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  const handleNav = (item) => {
    setNavOption((prev) =>
      prev.map((nav) =>
        nav.name === item.name ? { ...nav, isActive: true } : { ...nav, isActive: false }
      )
    );

    if (item.link && item.link !== "#") {
      router.push(item.link);
    }
  };

  return (
    <div className="font-sans overflow-x-hidden w-full max-w-screen min-h-[100dvh]">
      {/* -------------------- HERO -------------------- */}
          <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
  <img
    src="/trail3.png"
    alt="Hero Background"
    className="absolute inset-0 w-full h-full object-cover object-center -z-10 select-none"
  />


        {/* Hero Button */}
        <button
          onClick={() => router.push("/user")}
          className="-mt-60 px-3 py-2 text-sm font-['raleway'] font-bold sm:text-xl bg-black text-white rounded-lg shadow-md hover:bg-gray-800 transition-all duration-200"
        >
          Get Early Access
        </button>

        {/* Navbar */}
        <div className="absolute top-5 left-0 right-0 flex items-center justify-center z-20  px-2">
          <div className="bg-white/30 backdrop-blur-sm p-1 flex rounded-xl text-black shadow-md">
            {navOption.map((item) => (
              <p
                key={item.name}
                onClick={() => handleNav(item)}
                className={`px-3 py-1 rounded-lg cursor-pointer transition 
                text-[10px] font-inter sm:text-xs md:text-sm lg:text-base 
                ${item.isActive ? "bg-white font-bold shadow" : "hover:bg-white/50"}`}
              >
                {item.name}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* -------------------- SECTION -------------------- */}
       
  

      {/* -------------------- FEATURES -------------------- */}
    <div className="flex justify-center mt--60 sm:mt-10 md:mt-40">
        
  <img
   onClick={() => router.push("/user")}
    className="w-full max-w-5xl object-contain mx-auto"
    src="./withbgtxt.png"
    alt="Get early access"
  />
    </div>
  
      {/* -------------------- ACCESS + FOOTER + MODALS -------------------- */}
      <div className="bg-black text-white relative pt-10">
        {/* Early Access */}
        <img
          onClick={() => router.push("/user")}
          className="mx-auto -mt-10 relative z-10"
          src="./getaccess.png"
          alt="Get Access"
        />

        <div className="text-center mt-10">
          <div className="text-2xl md:text-4xl font-['Plus_Jakarta_Sans'] font-bold mb-6 px-2">
            Early Access Benefits
          </div>
          <div className="flex justify-center">
            <img src="./nobg.png" alt="Early Access Benefits" className="w-[90%] md:w-[70%] object-contain" />
          </div>
        </div>

        {/* FOOTER */}
        <div className="bg-white rounded-t-2xl text-black mt-20 px-6 py-10 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Instagram */}
          <div className="flex flex-col items-center lg:flex-[2]">
            <p className="uppercase font-inter font-medium text-lg text-center">
              FOLLOW US ON <span>INSTAGRAM</span>
            </p>
            <img
              onClick={() =>
                router.push("https://www.instagram.com/pehnawa.app?igsh=MW1wN2F0enE3dDQycg%3D%3D&utm_source=qr")
              }
              className="h-28 md:h-40 mt-4 cursor-pointer"
              src="./instalogo.png"
              alt="Instagram"
            />
            <p className="font-montserrat style-medium text-xs text-center mt-2">
              To stay in the loop of new launches & offers
            </p>
          </div>

          {/* Form */}
          {/* ✅ Waitlist Form imported here */}
          <WaitlistForm />
        </div>

        {/* COPYRIGHT + LINKS */}
        <div className="bg-black py-6 flex flex-col items-center gap-3">
          <div className="flex gap-6 text-sm font-semibold justify-center mt-3 text-white font-montserrat">
            <button onClick={() => openModal("terms")} className="hover:underline">
              Terms & Conditions
            </button>
            <button onClick={() => openModal("privacy")} className="hover:underline">
              Privacy Policy
            </button>
            <button onClick={() => openModal("contact")} className="hover:underline">
              Contact Us
            </button>
          </div>
          <p className="text-xs text-white font-montserrat text-center mt-3">
            © 2025 Pehnawa.app All rights reserved.
          </p>
        </div>

        {/* -------------------- MODALS -------------------- */}
        {activeModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal}></div>
            <div className="relative bg-white rounded-2xl shadow-lg max-w-3xl w-full p-6 z-50 overflow-y-auto max-h-[90vh] font-montserrat">
              <button onClick={closeModal} className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl">
                ✖
              </button>

              {/* ---------- TERMS & CONDITIONS ---------- */}
              {activeModal === "terms" && (
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Terms & Conditions</h2>
                  <div className="text-[15px] text-[#4B4B4B] leading-relaxed whitespace-pre-line overflow-y-auto max-h-[70vh] pr-2">
{`Last Updated: 4 October 2025

Welcome to Pehnawa. These Terms & Conditions ("Terms") explain how you may use the 
Pehnawa platform (website, mobile apps and related services) whether you are shopping, 
browsing, or selling on Pehnawa. Please read them carefully, using or accessing Pehnawa means 
you agree to these Terms. If you do not accept these Terms, please do not use our Platform. 

1. Who we are 
Pehnawa is a men-first fashion discovery and commerce platform providing personalised 
recommendations, product listings from independent brands, order fulfilment and related 
services. 
General contact: support@pehnawa.app
Seller & partner contact: partners@pehnawa.app

2. Definitions 
• Platform: Pehnawa website, mobile app(s), seller dashboard, and related services. 
• User / Customer: a person who browses or purchases on the Platform. 
• Seller / Merchant: a brand, shop, or individual selling goods through the Platform. 
• Order: a confirmed purchase placed by a User for Products listed on the Platform. 
• Products: goods offered for sale by Sellers through Pehnawa. 
• AI Services: personalization, recommendations, virtual try-on and related machine assisted features. 

3. Eligibility & Accounts 
• You must be at least 18 years old to create an account. By registering you confirm you meet this age requirement. 
• You agree to provide accurate, complete and up-to-date information during registration 
and to keep your account credentials secure. 
• You are responsible for all activity on your account. Notify us immediately if you suspect 
unauthorized access. 

4. Types of Users on the Platform 
Pehnawa hosts two main user groups: 
• Customers who browse & buy; and 
• Sellers who list & sell Products. 
Different rules and sections below apply to each group. 

5. Seller Onboarding, KYC & Compliance 
• Sellers must provide legal and business information (business name, PAN, GSTIN if applicable, bank account for payouts, identity proof and address proof). 
• Pehnawa may verify seller documents via third-party verification services and may delay onboarding until verification completes. 
• Sellers must promptly update any business or banking changes and cooperate with 
compliance checks, tax requirements (GST/TCS/TDS) and audits. 
• Sellers must follow all local laws (product safety, labelling, tax) and Pehnawa policies. 

6. Product Listings & Quality 
• Sellers control product descriptions, pricing, photos, returns settings (subject to platform 
rules). Sellers warrant listings are accurate, lawful and non-infringing. 
• Pehnawa may remove or refuse listings that violate policy (counterfeit goods, illegal 
items, inaccurate info). 
• Sellers should follow image and content guidelines; Pehnawa may request changes to 
ensure a consistent customer experience. 

7. Fees, Commissions & Payments 
• Sellers agree to pay Pehnawa the commission/fees set out in the Seller Dashboard. 
• Pehnawa will process payments and payouts according to the stated payout schedule, net 
of commissions, refunds, returns, taxes and any holds for disputes or suspicious activity. 
• Customers will pay the price displayed at checkout. Payment processing is done via third
party gateways.

8. Taxes & Regulatory Withholdings 
• Sellers are responsible for correct tax classification of products. 
• Pehnawa may be required to collect/withhold statutory taxes (TCS/TDS) and will reflect 
such withholdings in settlement statements.

9. Orders, Fulfilment & Shipping 
• When a customer places an Order, Pehnawa will confirm acceptance subject to product 
availability and seller fulfilment. 
• Sellers must dispatch orders within the disclosed dispatch time. 
• Delivery timelines depend on location, product type and shipping partner.

10. Returns, Exchanges & Refunds 
• Pehnawa’s returns policy (available on the Platform) sets the standard return window. 
• Sellers must accept returns; Pehnawa may handle return logistics and refunds on behalf 
of Sellers.

11. AI, Personalisation & Image Features 
• Pehnawa provides AI-based recommendations and virtual try-on features. 
• AI suggestions are probabilistic and approximate actual fit, color and texture. 
• If you upload photos for try-on features, consent will be requested as per the Privacy Policy.

12. User Conduct & Prohibited Activities 
• Users must not impersonate others, post abusive content, or breach any law. 
• Sellers must not list counterfeit goods, engage in fake reviews, or attempt off-platform 
fulfilment.

13. Intellectual Property 
• Pehnawa owns or licenses the Platform software, branding, content and AI models. 
• Sellers retain ownership of their content but grant Pehnawa a licence to use it.

14. Data Protection & Privacy 
• Our Privacy Policy explains how we collect, use, store and share data. 
• Sellers must treat customer data as confidential.

15. Disputes, Liability & Indemnity 
• Each party indemnifies the other against losses arising from its breach of these Terms. 
• Pehnawa’s liability is limited to the extent permitted by law.

16. Governing Law & Dispute Resolution 
These Terms are governed by the laws of India. Disputes not resolved in 30 days may be referred to arbitration.

17. Contact
Grievance Officer: Mohammed 
Email: support@pehnawa.app
Phone: +91 9398550513 
Working hours: Mon–Fri, 10:00 AM – 6:00 PM IST 
General support: support@pehnawa.app | partners@pehnawa.app

By using Pehnawa, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.`}
                  </div>
                </div>
              )}


              {/* ---------- PRIVACY POLICY ---------- */}
              {activeModal === "privacy" && (
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Privacy Policy</h2>
                  <div className="text-[15px] text-[#4B4B4B] leading-relaxed whitespace-pre-line overflow-y-auto max-h-[70vh] pr-2">
{`Last Updated: 4 October 2025

At Pehnawa (“we,” “our,” or “us”), your privacy is not just a legal checkbox — it’s a core value. 
We believe that trust is the foundation of fashion and commerce.

1. Who We Are
Pehnawa is a men-first fashion marketplace blending AI-powered personalization with authentic brands and sellers.
Contact: support@pehnawa.app | partners@pehnawa.app

2. Information We Collect
(A) Information you provide:
- Account details (name, phone, email, password, address)
- Style preferences
- Photos (if using virtual try-on)
- Seller KYC details
- Communication data

(B) Automatically collected data:
- Device info, IP, interaction data, logs, crash reports

3. How We Use Your Data
We use your data to:
- Provide and improve services
- Personalize your shopping experience
- Process payments and orders
- Ensure security and prevent fraud
- Communicate updates, offers, and support

4. Data Sharing
We share data with:
- Sellers (for fulfilment)
- Logistics & payment partners
- Analytics providers
All partners follow confidentiality agreements.

5. Data Retention
We retain information as long as necessary for business, legal, or compliance purposes.

6. Your Rights
You can request access, correction, or deletion of your data at any time by contacting support@pehnawa.app.

7. Security
We use encryption, access control, and other safeguards to protect your data.

8. Updates
We may update this policy periodically. Continued use after updates means consent.

For questions, contact our Privacy Officer at admin@pehnawa.app`}
                  </div>
                </div>
              )}


              {/* ---------- CONTACT US ---------- */}
              {activeModal === "contact" && (
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">Contact Us</h2>
                  <p className="text-[15px] text-[#4B4B4B] leading-relaxed font-montserrat">
{`Need Assistance? We're Here to Help!

Whether you have an issue with an order, a question about our products, or general feedback — our team is ready to assist.

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
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
