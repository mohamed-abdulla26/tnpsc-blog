// "use client";
// import Link from "next/link";
// import { useState, useEffect } from "react";

// export default function Post({ post, posts = [] }) {
//   const [mainImage, setMainImage] = useState(
//     post?.image ? `/images/${post.image}` : "/images/default.jpg"
//   );

//   // Check main image validity
//   useEffect(() => {
//     fetch(mainImage).then((res) => {
//       if (!res.ok) setMainImage("/images/default.jpg");
//     });
//   }, [mainImage]);

//   const getImage = (img) => {
//     if (!img || img.trim() === "") return "/images/default.jpg";
//     return `/images/${img.replace(/\s/g, "-")}`;
//   };

//   return (
//     <main className="min-h-screen bg-white text-black">
//       {/* HEADER */}
//       <header className="w-full bg-white border-b">
//         <div className="container mx-auto px-4 py-2 flex items-center justify-between">
//           <a href="/" className="text-xl font-bold">
//             ALL POSTS
//           </a>
//         </div>
//       </header>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 container mx-auto px-4 py-10">
//         {/* LEFT SIDE — POST CONTENT */}
//         <div className="lg:col-span-2">
//           <h2 className="text-4xl font-bold mb-4">{post.title}</h2>
//           <p className="text-gray-600 mb-4">
//             Published on {post.created_at_formatted}
//           </p>

//           <img
//             src={mainImage}
//             alt={post.title}
//             className="rounded-lg shadow mb-6 w-full h-auto"
//             onError={(e) => (e.currentTarget.src = "/images/default.jpg")}
//           />


 
//           <div
//             className="prose prose-lg max-w-none"
//             dangerouslySetInnerHTML={{ __html: post.description }}
//           ></div>

//  </div>

//         {/* RIGHT SIDEBAR */}
//         <aside className="space-y-8">
//           <div className="bg-white rounded-xl shadow p-6">
//             <h3 className="text-xl font-bold mb-4">Latest Posts</h3>
//             <div className="space-y-4">
//               {posts.slice(0, 4).map((p) => (
//                 <Link key={p._id} href={"/post/" + p._id}>
//                   <div className="flex gap-3 hover:opacity-80">
//                     <img
//                       src={getImage(p.image)}
//                       alt={p.title}
//                       className="rounded-md w-20 h-16 object-cover"
//                       onError={(e) => (e.currentTarget.src = "/images/default.jpg")}
//                     />
//                     <p className="text-sm font-medium">{p.title}</p>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow p-6">
//             <h3 className="text-xl font-bold mb-4">NEXTJS</h3>
//             <ul className="space-y-2 text-gray-700">
//               <li>• Flexible Rendering Options</li>
//               <li>• Built-in Performance Optimizations</li>
//               <li>• Enhanced Developer Experience</li>
//               <li>• SEO Friendliness</li>
//               <li>• Scalability and Integration</li>
//             </ul>
//           </div>
//         </aside>
//       </div>
//     </main>
//   );
// }




"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Post({ post, posts = [] }) {
  const [mainImage, setMainImage] = useState(
    post?.image ? `/images/${post.image}` : "/images/default.jpg"
  );

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [submitMsg, setSubmitMsg] = useState("");

  // Check main image validity
  useEffect(() => {
    fetch(mainImage).then((res) => {
      if (!res.ok) setMainImage("/images/default.jpg");
    });
  }, [mainImage]);

  const getImage = (img) => {
    if (!img || img.trim() === "") return "/images/default.jpg";
    return `/images/${img.replace(/\s/g, "-")}`;
  };

  const handleCtaSubmit = async (e) => {
  e.preventDefault();
  setSubmitMsg("Submitting...");

  // Save enquiry
  const res = await fetch("/api/enquiry", {
    method: "POST",
    body: JSON.stringify(form),
    headers: { "Content-Type": "application/json" }
  });

  const result = await res.json();
  setSubmitMsg(result.message);

  // Execute CTA Action
  const { actionType, actionValue } = post.cta;

  setTimeout(() => {
    if (actionType === "text") alert(actionValue);
    if (actionType === "url") window.open(actionValue, "_blank");
    if (actionType === "download") window.open(actionValue, "_blank");
    if (actionType === "call") window.location.href = `tel:${actionValue}`;
  }, 800);
};



  return (
    <main className="min-h-screen bg-white text-black">
      {/* HEADER */}
      <header className="w-full bg-white border-b">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <a href="/" className="text-xl font-bold">
            ALL POSTS
          </a>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 container mx-auto px-4 py-10">
        {/* LEFT SIDE — POST CONTENT */}
        <div className="lg:col-span-2">
          <h2 className="text-4xl font-bold mb-4">{post.title}</h2>
          <p className="text-gray-600 mb-4">
            Published on {post.created_at_formatted}
          </p>

          <img
            src={mainImage}
            alt={post.title}
            className="rounded-lg shadow mb-6 w-full h-auto"
            onError={(e) => (e.currentTarget.src = "/images/default.jpg")}
          />

          <button>{post.cta.text}</button>


           
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.description }}
          ></div>

          {/* CTA BUTTON #2 */}
          <button>{post.cta.text}</button>


  </div>

        {/* RIGHT SIDEBAR */}
        <aside className="space-y-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-4">Latest Posts</h3>
            <div className="space-y-4">
              {posts.slice(0, 4).map((p) => (
                <Link key={p._id} href={"/post/" + p._id}>
                  <div className="flex gap-3 hover:opacity-80">
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
        </aside>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">{post.cta.text}</h3>

            <form onSubmit={handleCtaSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border rounded"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />

              <input
                type="text"
                placeholder="Phone"
                className="w-full p-3 border rounded"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />

              {submitMsg && (
                <p className="text-center text-purple-700">{submitMsg}</p>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800"
              >
                Submit
              </button>

              <button
                onClick={() => setShowModal(false)}
                type="button"
                className="w-full py-2 mt-2 bg-gray-300 rounded-lg"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
