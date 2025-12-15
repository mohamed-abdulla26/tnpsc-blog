import Link from "next/link";

export default function Header() {
    return (
        <header className="w-full bg-black text-white shadow-sm sticky top-0 flex justify-between items-center px-4 h-[60px]">
 
    <h1 className="text-4xl">TNPSC Info</h1>

    <nav className="flex items-center space-x-6">
      <Link href="/add-post" className="hover:text-blue-500">Add Blog</Link>
      <Link href="/cta-form" className="hover:text-blue-500">Create Blog Action</Link>
    </nav>
  
</header>

    );
}
