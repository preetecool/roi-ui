"use client";

import { Button } from "@/registry/brook/ui/button/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/registry/brook/ui/card/card";
import styles from "./card-transaction.module.css";

const transactions = [
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

export function CardTransaction() {
  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle className={styles.title}>Transactions</CardTitle>
        <CardAction>
          <Button size="sm" variant="ghost">
            View All
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        {transactions.map(({ id, from, date, amount }) => (
          <div className={styles.item} key={id}>
            <div className={styles.itemInfo}>
              <div className={styles.itemFrom}>{from}</div>
              <div className={styles.itemDate}>{date}</div>
            </div>
            <div className={styles.itemAmount}>{amount}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
