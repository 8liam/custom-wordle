export default function Navbar() {
  return (
    <nav className="bg-invalid text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo and title */}
        <a href="/" className="text-lg font-semibold">Customdle</a>
        {/* Navigation Links */}
        <div className="flex space-x-4">
          <a href="/create" className="hover:bg-correct px-3 py-2 rounded bg-wrong duration-300">
            Create
          </a>
        </div>
      </div>
    </nav>
  );
}
