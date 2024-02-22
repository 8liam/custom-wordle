export default function Navbar() {
  return (
    <nav className="bg-invalid text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo and title */}
        <h1 className="text-lg font-semibold">Customdle</h1>
        {/* Navigation Links */}
        <div className="flex space-x-4">
          <a
            href="/create"
            className="hover:bg-wrong bg-correct duration-300 px-3 py-2 rounded"
          >
            Create
          </a>
        </div>
      </div>
    </nav>
  );
}
