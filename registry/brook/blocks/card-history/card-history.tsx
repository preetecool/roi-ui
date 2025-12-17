"use client";

import { Button } from "@/registry/brook/ui/button/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/registry/brook/ui/card/card";
import styles from "./card-history.module.css";

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
          <div className={styles.transactionItem} key={id}>
            <div className={styles.title}>
              <div className={styles.from}>{from}</div>
              <div className={styles.date}>{date}</div>
            </div>
            <div className={styles.amount}>{amount}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
