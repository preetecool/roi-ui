"use client";
import { CardTraffic } from "./components/card-traffic";
import trafficData from "./data.json";

export default function Page() {
  return <CardTraffic bounceRate={24.1} conversionRate={2.8} data={trafficData} />;
}
