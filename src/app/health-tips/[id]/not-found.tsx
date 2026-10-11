import Link from "next/link";

export default function TipNotFound() {
  return (
    <main className="page-container flex flex-col items-center gap-3 py-24 text-center">
      <h1 className="text-2xl font-bold text-heading">টিপসটি পাওয়া যায়নি</h1>
      <p className="text-slate-500">লিংকটি ভুল হতে পারে বা পেজটি সরানো হয়েছে।</p>
      <Link className="btn-primary mt-2" href="/health-tips">
        সব টিপস দেখুন
      </Link>
    </main>
  );
}
