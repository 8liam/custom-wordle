import Navbar from "@/app/components/navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <a className="font-3xl bg-correct p-2" href="/create">
          Create a Quiz
        </a>
      </main>
    </>
  );
}
