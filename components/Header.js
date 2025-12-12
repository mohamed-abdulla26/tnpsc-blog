import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full bg-white text-black shadow-sm">
  <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-4">
    <h1 className="text-2xl">My Blog</h1>

    <nav className="flex items-center space-x-6">
      <Link href="/add-post" className="hover:text-blue-500">AdminLogin</Link>
      <Link href="/" className="hover:text-blue-500">Home</Link>
      <Link href="/about" className="hover:text-blue-500">About</Link>
      <Link href="/contact" className="hover:text-blue-500">contact</Link>
    </nav>
  </div>
</header>

    );
}
