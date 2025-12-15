

"use client";

import { useState, useEffect } from "react";
import Editor from "@/components/Editor";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [h1, setH1] = useState(""); // ✅ NEW
  const [metaDescription, setMetaDescription] = useState(""); // ✅ NEW
  const [description, setDescription] = useState(""); // HTML (Quill)
  const [image, setImage] = useState("");
  const [msg, setMsg] = useState("");

  const [ctaList, setCtaList] = useState([]);      // CTA list from DB
  const [selectedCta, setSelectedCta] = useState(""); // Selected CTA ID


  useEffect(() => {
    async function loadCTA() {
      try {
        const res = await fetch("/api/cta/list");
        const data = await res.json();
        setCtaList(data.data || []);
      } catch (err) {
        console.error("Failed to load CTA:", err);
      }
    }

    loadCTA();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Submitting...");

    const res = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        title,
        h1,
        metaDescription,
        description,
        image,
        cta: selectedCta, // 👈 Add CTA to backend
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (data.success) {
      setMsg("Post added successfully!");
      setTitle("");
      setH1("");
      setMetaDescription("");
      setDescription("");
      setImage("");
      setSelectedCta("");
    } else {
      setMsg(data.message || "Failed to add post.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-100 to-white p-6">

      <div className="w-full max-w-2xl bg-white/40 backdrop-blur-xl shadow-2xl p-8 rounded-2xl border border-white/30">

        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          Add New Blog Post
        </h2>

        {msg && (
          <p className="mb-4 text-center font-medium text-purple-600">
            {msg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* =======================
               TITLE
           ======================= */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter post title"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 
                         focus:ring-purple-400 focus:outline-none shadow-sm text-black"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              H1</label>

            <input
              type="text"
              placeholder="H1 (SEO heading)"
              value={h1}
              onChange={(e) => setH1(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 
                         focus:ring-purple-400 focus:outline-none shadow-sm text-black"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              metaDescription
            </label>

            {/* META DESCRIPTION */}
            <textarea
              placeholder="Meta description (max 160 chars)"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              maxLength={160}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 
                         focus:ring-purple-400 focus:outline-none shadow-sm text-black"
              required
            />
          </div>




          {/* =======================
               DESCRIPTION (QUILL)
           ======================= */}
          <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-1 text-black"></div>
          <label className="block mb-1 font-medium text-gray-700">
            Description
          </label>

          <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-1 text-black">
            <Editor value={description} onChange={setDescription} />

          </div>

//           {/* =======================
//               IMAGE
//           ======================= */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Image File (optional)
            </label>
            <input
              type="text"
              placeholder="example: post1.jpg"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 
                    focus:ring-purple-400 focus:outline-none shadow-sm text-black"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          {/* =======================
           CTA DROPDOWN
     ======================= */}           <div>
            <label className="block mb-1 font-medium text-gray-700">
              Select CTA

            </label>




            <select
              className="w-full p-2 border rounded 
              bg-white text-black 
              focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={selectedCta}
              onChange={(e) => setSelectedCta(e.target.value)}
            >
              <option value="">-- Select CTA --</option>

              {ctaList.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.text}
                </option>
              ))}
            </select>


          </div>


          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white 
                        font-semibold rounded-xl shadow-lg transition-all duration-300"
          >
            Add Post
          </button>
        </form>
      </div >
    </div >
  );
}






