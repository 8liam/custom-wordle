import Navbar from "@/app/components/navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center p-24 space-y-4">
        <h1 className="text-4xl font-semibold">Customdle</h1>
        <p className="text-xl font-light">
          Make custom wordle games for you and your friends to challenge each
          other.
        </p>
        <a
          className="font-3xl bg-correct p-2 rounded hover:bg-wrong duration-300"
          href="/create"
        >
          Create a Custom Game
        </a>
      </main>
    </>
  );
}
