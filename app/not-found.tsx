import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><span>404 / SIGNAL LOST</span><h1>Bu sayfa ağda bulunamadı.</h1><Link href="/">Ana sisteme dön →</Link></main>;
}
