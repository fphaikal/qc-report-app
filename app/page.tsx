import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row gap-10 justify-center items-center min-h-screen p-5 md:p-20 bg-gradient-to-tr from-primary to-secondary ">
      <div className="flex md:w-1/2">
        <h1 className="text-3xl xl:text-8xl font-bold text-white">Welcome To QC Report Web Denapella</h1>
      </div>
      <div className="flex flex-col gap-2 md:gap-5 w-full md:w-1/2 md:items-end">
        <Link href={'/login/final-inspection'}>
          <p className="bg-zinc-900 md:text-2xl text-white rounded-xl px-8 py-3">Final Inspection</p>
        </Link>
        <Link href={'/login/final-inspection'}>
          <p className="bg-zinc-900 md:text-2xl text-white rounded-xl px-8 py-3">BNF</p>
        </Link>
        <Link href={'/login/final-inspection'}>
          <p className="bg-zinc-900 md:text-2xl text-white rounded-xl px-8 py-3">BNF</p>
        </Link>
      </div>
    </div>
  );
}
