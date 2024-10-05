import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center min-h-screen p-5 md:p-20 bg-primary">
      <div className="flex items-center justify-center ">
        <h1 className="text-3xl xl:text-8xl font-bold text-white text-center">Selamat Datang di <br />Denapella Quality Control Portal</h1>
      </div>
      <div className="flex flex-col gap-2 md:gap-5 w-full items-center justify-center ">
        <Link href={'/login'}>
          <p className="bg-secondary md:text-2xl text-primary font-semibold rounded-xl px-8 py-3">Get Started</p>
        </Link>
      </div>
    </div>
  );
}
