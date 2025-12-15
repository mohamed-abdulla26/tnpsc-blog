"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";



export default function Home() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef("");

  const stripHtml = (html) => html.replace(/<[^>]+>/g, "");

  const getImage = (src) => {
    if (!src || src.trim() === "") return "/images/default.jpg";
    return `/images/${src.replace(/\s/g, "-")}`;
  };

  const fetchPosts = async (page = 1, query = "") => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts?page=${page}&limit=7&q=${query}`
    );
    const data = await res.json();
    setPosts(data.posts || []);
    setPages(data.pages || 1);
    setPage(data.page || 1);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const searchPost = (e) => {
    if (e.type === "keydown" && e.key !== "Enter") return;
    const query = inputRef.current.value;
    setSearchTerm(query);
    fetchPosts(1, query);
  };

  const handlePageChange = (newPage) => {
    fetchPosts(newPage, searchTerm);
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900">
      {/* HEADER */}
      <header className="w-full shadow bg-white py-4 px-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blog</h1>
        <div className="flex gap-4">
          <input
            onKeyDown={searchPost}
            ref={inputRef}
            type="text"
            placeholder="Search…"
            className="px-4 py-2 border border-gray-300 rounded-md text-black"
          />
          <button
            onClick={searchPost}
            className="px-4 py-2 bg-purple-600 text-white rounded-md"
          >
            Search
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-8 max-w-7xl mx-auto mt-8">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-10">
          {loading ? (
            <p>Loading posts...</p>
          ) : posts.length > 0 ? (
            <>
              {/* FEATURED POST */}
              <div className="bg-white rounded-xl shadow overflow-hidden">
                <img
                  src={getImage(posts[0].image)}
                  onError={(e) => (e.currentTarget.src = "/images/default.jpg")}
                  alt={posts[0].title}
                  className="w-full h-[380px] object-cover"
                />
                <div className="p-6">
                  <h1 className="text-3xl font-bold mb-3">{posts[0].title}</h1>
                  <p className="text-gray-700 mb-4">
                    {stripHtml(posts[0].description).slice(0, 150)}…
                  </p>
                  <Link
                    href={"/post/" + posts[0]._id}
                    className="text-purple-600 font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>

              {/* OTHER POSTS */}
              <div className="grid sm:grid-cols-2 gap-8">
                {posts.slice(1).map((post) => (
                  <Link key={post._id} href={"/post/" + post._id}>
                    <div className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition">
                      <img
                        src={getImage(post.image)}
                        onError={(e) =>
                          (e.currentTarget.src = "/images/default.jpg")
                        }
                        alt={post.title}
                        className="rounded-md h-48 w-full object-cover"
                      />
                      <h2 className="text-xl font-semibold mt-3">{post.title}</h2>
                      <p className="text-gray-600 mt-2 text-sm">
                        {stripHtml(post.description).slice(0, 100)}…
                      </p>
                      <span className="text-purple-600 text-sm mt-3 block">
                        Continue Reading →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>




              {/* PAGINATION (FIGMA STYLE) */}
              <div className="flex justify-center items-center gap-2 mt-10 text-sm">

                {/* PREVIOUS */}
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className={`px-3 py-2 rounded border transition
      ${page === 1
                      ? "text-gray-400 border-gray-200 cursor-not-allowed"
                      : "text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  ‹ Previous
                </button>

                {/* PAGE NUMBERS */}
                {Array.from({ length: pages }, (_, i) => i + 1).map((p) => {
                  // show only nearby pages like figma
                  if (
                    p === 1 ||
                    p === pages ||
                    (p >= page - 1 && p <= page + 1)
                  ) {
                    return (
                      <button
                        key={p}
                        onClick={() => handlePageChange(p)}
                        className={`px-3 py-2 rounded border transition
            ${p === page
                            ? "border-purple-600 text-purple-600 font-medium"
                            : "border-gray-300 text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        {p}
                      </button>
                    );
                  }

                  // dots
                  if (p === page - 2 || p === page + 2) {
                    return (
                      <span key={p} className="px-2 text-gray-400">
                        …
                      </span>
                    );
                  }

                  return null;
                })}

                {/* NEXT */}
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === pages}
                  className={`px-3 py-2 rounded border transition
      ${page === pages
                      ? "text-gray-400 border-gray-200 cursor-not-allowed"
                      : "text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                  Next ›
                </button>

              </div>


            </>
          ) : (
            <p className="text-red-600 font-medium">
              No posts found for: <b>{inputRef.current.value}</b>
            </p>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="space-y-8">
          {/* LATEST POSTS */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-4">Latest Posts</h3>
            <div className="space-y-4">
              {posts.slice(0, 4).map((post) => (
                <Link key={post._id} href={"/post/" + post._id}>
                  <div className="flex gap-3 hover:opacity-80">
                    <img
                      src={getImage(post.image)}
                      onError={(e) =>
                        (e.currentTarget.src = "/images/default.jpg")
                      }
                      alt={post.title}
                      className="rounded-md w-20 h-16 object-cover"
                    />
                    <p className="text-sm font-medium">{post.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* NEXTJS INFO BOX */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold mb-4">NEXTJS</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Flexible Rendering Options</li>
              <li>• Built-in Performance Optimizations</li>
              <li>• Enhanced Developer Experience</li>
              <li>• SEO Friendliness</li>
              <li>• Scalability and Integration</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
