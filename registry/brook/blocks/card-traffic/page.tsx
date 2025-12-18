"use client";
import { CardTraffic } from "./components/card-traffic";
import trafficData from "./data.json";

export default function Page() {
  return <CardTraffic data={trafficData} />;
}
