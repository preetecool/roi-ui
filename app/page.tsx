import { source } from "@/lib/source";
import HomeClient from "./home-client";

export default function Home() {
  return <HomeClient pageTree={source.pageTree} />;
}
