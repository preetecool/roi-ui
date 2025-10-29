"use client";

import { Button } from "@/registry/brook/tailwind/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/brook/tailwind/ui/card";

const items = [
  {
    id: "ACME001",
    from: "Acme Corp.",
    date: "14:30, July 31, 2025",
    amount: "-$7894",
  },
  {
    id: "BROOK02",
    from: "Brook Inc.",
    date: "11:11, July 31, 2025",
    amount: "$4574",
  },
  {
    id: "GLOBEX3",
    from: "Globex Industries",
    date: "10:22, July 31, 2025",
    amount: "$27,440",
  },
  {
    id: "AWS0004",
    from: "AWS",
    date: "3:00, July 31, 2025",
    amount: "-$740",
  },
  {
    id: "ZENITH5",
    from: "Zenith Labs",
    date: "16:50, July 31, 2025",
    amount: "$14,019",
  },
];

export function CardHistory() {
  return (
    <Card style={{ height: "100%", width: "100%", maxWidth: "500px" }}>
      <CardHeader>
        <CardTitle style={{ fontSize: "1.125rem" }}>Transactions</CardTitle>
        <CardAction>
          <Button size="sm" style={{ fontSize: "0.75rem" }} variant="ghost">
            View All
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {items.map(({ id, from, date, amount }) => (
          <div
            className="flex items-center justify-between border-t border-t-[color:oklch(from_var(--border)_l_c_h_/_0.4)] pt-5 pr-1 pb-2 pl-1 text-[0.85rem]"
            key={id}
          >
            <div className="flex flex-col gap-1">
              <div className="font-normal text-[var(--foreground)]">{from}</div>
              <div className="font-light text-[var(--muted-foreground)]">
                {date}
              </div>
            </div>
            <div className="font-light text-[var(--muted-foreground)]">
              {amount}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
