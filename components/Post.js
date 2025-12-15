

"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Post({ post, relatedPosts = [] }) {
  const [submitted, setSubmitted] = useState(false);
  const [actionText, setActionText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});


  const [mainImage, setMainImage] = useState(
    post?.image ? `/images/${post.image}` : "/images/default.jpg"
  );

  /* ✅ IMAGE FALLBACK CHECK */
  useEffect(() => {
    fetch(mainImage).then((res) => {
      if (!res.ok) setMainImage("/images/default.jpg");
    });
  }, [mainImage]);

  const getImage = (img) => {
    if (!img || img.trim() === "") return "/images/default.jpg";
    return `/images/${img.replace(/\s/g, "-")}`;
  };

  /* FORM VALIDATION */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  const validateForm = () => {
    let err = {};

    // Name
    if (!form.name.trim()) {
      err.name = "Name is required";
    }

    // Email
    if (!form.email.trim()) {
      err.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      err.email = "Enter valid email";
    }

    // Phone
    if (!form.phone.trim()) {
      err.phone = "Phone number is required";
    } else if (!phoneRegex.test(form.phone)) {
      err.phone = "Enter valid 10-digit number";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };




  const handleCtaSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          postId: post._id,
        }),
      });

      if (!res.ok) {
        alert("Enquiry submit failed");
        return;
      }

      const { actionType, actionValue } = post.cta;

      // ✅ ONLY THIS LOGIC IS NEW
      if (actionType === "text") {
        setActionText(actionValue);
        setSubmitted(true);
        // ✅ reset form
        setForm({ name: "", email: "", phone: "" });
        setErrors({});
      }   // hide form, show text


      if (actionType === "url") {
        window.open(actionValue, "_blank"); // new tab
        setShowModal(false);                // close modal
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };



  return (
    <main className="min-h-screen bg-gray-50 text-black">



      {/* HEADER */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">

          {/* LEFT: Back */}
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
          >
            ← All Posts
          </Link>


          {/* RIGHT: EMPTY (for balance) */}
          <div className="w-[80px]" />

        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 container mx-auto px-4 py-10">

        {/* LEFT CONTENT */}
        <article className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
          <h1 className="text-3xl font-bold mb-2">
            {post.h1 || post.title}
          </h1>



          <p className="text-gray-500 mb-4">
            Published on{" "}
            {new Date(post.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>


          {/* IMAGE */}
          <img
            src={mainImage}
            alt={post.title}
            className="w-full h-80 object-cover rounded-xl mb-6"
            onError={(e) => (e.currentTarget.src = "/images/default.jpg")}
          />


          {post.cta && (
            <div className="my-6 text-center">


              <button
                onClick={() => {
                  setShowModal(true);
                  setSubmitted(false);
                  setActionText("");
                  setForm({ name: "", email: "", phone: "" }); // ✅
                  setErrors({}); // ✅
                }}
                className="px-6 py-3 bg-purple-700 text-white rounded-lg font-medium hover:bg-purple-800"
              >
                {post.cta.text}
              </button>

            </div>
          )}

          {/* CONTENT */}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.description }}
          />

          {/* CTA END OF CONTENT */}
          {post.cta && (
            <div className="my-8 text-center">

              <button
                onClick={() => {
                  setShowModal(true);
                  setSubmitted(false);
                  setActionText("");
                  setForm({ name: "", email: "", phone: "" }); // ✅
                  setErrors({}); // ✅
                }}
                className="px-6 py-3 bg-purple-700 text-white rounded-lg font-medium hover:bg-purple-800"
              >
                {post.cta.text}
              </button>

            </div>
          )}
        </article>
        {/* RIGHT SIDEBAR */}
        <aside className="space-y-8">

          {/* LATEST POSTS */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-4">Latest Posts</h3>

            <div className="space-y-4">
              {relatedPosts.slice(0, 4).map((p) => (
                <Link key={p._id} href={"/post/" + p._id}>
                  <div className="flex gap-3 hover:opacity-80 cursor-pointer">
                    <img
                      src={getImage(p.image)}
                      alt={p.title}
                      className="rounded-md w-20 h-16 object-cover"
                      onError={(e) =>
                        (e.currentTarget.src = "/images/default.jpg")
                      }
                    />

                    <p className="text-sm font-medium">{p.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* NEXTJS BOX (ADD HERE) */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-4">NEXTJS</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Flexible Rendering Options</li>
              <li>• Built-in Performance Optimizations</li>
              <li>• Enhanced Developer Experience</li>
              <li>• SEO Friendliness</li>
              <li>• Scalability and Integration</li>
            </ul>
          </div>

        </aside>


      </div>

      {/* CTA MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">
            {!submitted ? (
              <>
                <h2 className="text-xl font-bold mb-4">{post.cta.text}</h2>

                <form onSubmit={handleCtaSubmit} className="space-y-4">
                  <input
                    className="w-full border p-2 rounded"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

                  <input
                    className="w-full border p-2 rounded"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

                  <input
                    className="w-full border p-2 rounded"
                    placeholder="Phone"
                    value={form.phone}
                    maxLength={10}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })
                    }
                  />
                  {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}

                  <button className="w-full bg-purple-700 text-white py-2 rounded">
                    Submit
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="w-full bg-gray-200 py-2 rounded"
                  >
                    Close
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-xl font-bold mb-3">Thank You </h2>
                <p className="text-gray-700">{actionText}</p>

                <button
                  onClick={() => setShowModal(false)}
                  className="mt-4 w-full bg-gray-200 py-2 rounded"
                >
                  Close
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </main>
  );
}
