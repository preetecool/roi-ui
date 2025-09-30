"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/registry/brook/ui/card/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/registry/brook/ui/avatar/avatar";
import { Badge } from "@/registry/brook/ui/badge/badge";
import styles from "./showcase-card-task.module.css";
import { MessageCircle, Calendar, LayoutList } from "lucide-react";

export function ShowcaseCardTask() {
  return (
    <Card className={styles.taskCard} style={{ width: "100%", height: "250px", backgroundColor: 'color-mix(in oklch, var(--card) 70%, transparent)' }}>
      <CardHeader>
        <CardTitle style={{ fontSize: "1rem" }}> Update Documentation</CardTitle>
        <CardDescription>Update the card component documentation to reflect the new style</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={styles.contentContainer}>
          <div className={styles.badgeContainer}>
            <Badge variant="destructive" size="sm">
              <span>Urgent</span>
            </Badge>
            <Badge size="sm">
              <span>Docs</span>
            </Badge>
          </div>
          <div>
            <Avatar style={{ width: '28px', height: '28px' }}>
              <AvatarImage src="/preetecool.png" alt="profile image for @preetecool" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardContent>

      <div className={styles.divider}></div>
      <CardFooter>
        <div className={styles.footerContainer}>
          <div className={styles.footerItem}>
            <MessageCircle size="16" />
            <span>4</span>
          </div>
          <div className={styles.footerItem}>
            <LayoutList size="16" />
            <span>4/5 Subtasks</span>
          </div>
          <div className={styles.footerItem}>
            <Calendar size="16" />
            <span className={styles.tomorrowText}>Tomorrow </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
