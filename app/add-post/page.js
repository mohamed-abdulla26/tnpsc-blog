// "use client";

// import { useState } from "react";
// import Editor from "@/components/Editor";

// export default function AddPost() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState(""); // HTML from Quill
//   const [image, setImage] = useState("");
//   const [msg, setMsg] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMsg("Submitting...");

//     const res = await fetch("/api/post", {
//       method: "POST",
//       body: JSON.stringify({ title, description, image }),
//       headers: { "Content-Type": "application/json" },
//     });

//     const data = await res.json();

//     if (data.success) {
//       setMsg("Post added successfully!");
//       setTitle("");
//       setDescription("");
//       setImage("");
//     } else {
//       setMsg(data.message || "Failed to add post.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-100 to-white p-6">

//       <div className="w-full max-w-2xl bg-white/40 backdrop-blur-xl shadow-2xl p-8 rounded-2xl border border-white/30">

//         <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
//           Add New Blog Post
//         </h2>

//         {msg && (
//           <p className="mb-4 text-center font-medium text-purple-600">
//             {msg}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">

//           {/* Title */}
//           <div>
//             <label className="block mb-1 font-medium text-gray-700">
//               Title
//             </label>
//             <input
//               type="text"
//               placeholder="Enter post title"
//               className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 
//                          focus:ring-purple-400 focus:outline-none shadow-sm text-black"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>

//           {/* React Quill Description */}
//           <div>
//             <label className="block mb-1 font-medium text-gray-700">
//               Description
//             </label>

//             <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-1 text-black">
//               <Editor value={description} onChange={setDescription} />
//             </div>
//           </div>

//           {/* Image */}
//           <div>
//             <label className="block mb-1 font-medium text-gray-700">
//               Image File (optional)
//             </label>
//             <input
//               type="text"
//               placeholder="example: post1.jpg"
//               className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 
//                          focus:ring-purple-400 focus:outline-none shadow-sm text-black"
//               value={image}
//               onChange={(e) => setImage(e.target.value)}
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white 
//                        font-semibold rounded-xl shadow-lg transition-all duration-300"
//           >
//             Add Post
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import Editor from "@/components/Editor";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // HTML (Quill)
  const [image, setImage] = useState("");
  const [msg, setMsg] = useState("");

  const [ctaList, setCtaList] = useState([]);      // CTA list from DB
  const [selectedCta, setSelectedCta] = useState(""); // Selected CTA ID

  // ===========================
  // LOAD CTA LIST
  // ===========================
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

  // ===========================
  // SUBMIT POST TO DATABASE
  // ===========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Submitting...");

    const res = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        title,
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

          {/* =======================
              DESCRIPTION (QUILL)
          ======================= */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Description
            </label>

            <div className="bg-white border border-gray-300 rounded-lg shadow-sm p-1 text-black">
              <Editor value={description} onChange={setDescription} />
            </div>
          </div>

          {/* =======================
              IMAGE
          ======================= */}
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
          ======================= */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Select CTA
            </label>

            <select
  className="w-full p-2 border rounded"
  value={selectedCta}
  onChange={(e) => setSelectedCta(e.target.value)}
  required
>

  <option value="">-- Select CTA --</option>
  {ctaList.map((c) => (
    <option key={c._id} value={c._id}>
      {c.text}
    </option>
  ))}
</select>

          </div>

          {/* =======================
              SUBMIT BUTTON
          ======================= */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white 
                       font-semibold rounded-xl shadow-lg transition-all duration-300"
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
}
