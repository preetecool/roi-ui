import HomePage from "@/components/home/home-page";
import { source } from "@/lib/source";

export default function Home() {
  return <HomePage pageTree={source.pageTree} />;
}
