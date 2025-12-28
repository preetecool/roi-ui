"use client";
import { CardImageSection } from "./components/card-image-section";
import data from "./data.json";

export default function Page() {
  return <CardImageSection data={data} />;
}
