"use client";

import type { PageTree } from "fumadocs-core/server";
import { Component, FileText, Puzzle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/brook/ui/command/command";
import { Kbd } from "@/registry/brook/ui/kbd/kbd";
import styles from "./search.module.css";

type SearchProps = {
  tree: PageTree.Root;
};

const ArrowIcon = () => (
  <svg
    fill="none"
    height="10"
    viewBox="0 0 14 10"
    width="14"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fillRule="nonzero">
      <path
        className={styles.arrowPoint}
        d="M1 1l4 4-4 4"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="2"
      />
      <path
        className={styles.arrowShaft}
        d="M1.8 5h4.8"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="2"
      />
    </g>
  </svg>
);

export function Search({ tree }: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 150);
  };

  const handleSelect = (url: string) => {
    router.push(url);
    handleClose();
  };

  const getIcon = (url: string, name: string) => {
    const nameLower = name.toLowerCase();

    if (
      nameLower === "introduction" ||
      nameLower === "quick start" ||
      nameLower === "about roi ui"
    ) {
      return <ArrowIcon />;
    }

    const componentExamples = [
      "expandable card",
      "login card",
      "task card",
      "transaction card",
      "website traffic",
      "chat",
      "task",
      "image card",
      "transaction history",
    ];

    if (componentExamples.some((example) => nameLower.includes(example))) {
      return <Component size={16} />;
    }

    const puzzleExamples = [
      "dialog",
      "tabs",
      "accordion",
      "badge error",
      "badge success",
      "copy button",
      "like button",
      "dropdown menu motion",
    ];

    if (
      url.includes("/examples/") &&
      puzzleExamples.some((example) => nameLower.includes(example))
    ) {
      return <Puzzle size={16} />;
    }

    if (url.includes("/components/") || url.includes("/ui/")) {
      return <Puzzle size={16} />;
    }

    return <FileText size={16} />;
  };

  const formatHeading = (text: string) =>
    text
      .split(" / ")
      .map((part) => {
        if (part.toLowerCase() === "ui") {
          return "UI";
        }
        return part
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ");
      })
      .join(" / ");

  const collectGroups = (
    node: PageTree.Node,
    parentName = ""
  ): Array<{
    heading: string;
    pages: Array<{ name: string; url: string }>;
  }> => {
    const groups: Array<{
      heading: string;
      pages: Array<{ name: string; url: string }>;
    }> = [];

    if (node.type === "folder" && node.children) {
      const pages: Array<{ name: string; url: string }> = [];

      for (const child of node.children) {
        if (child.type === "page" && child.url) {
          pages.push({
            name: child.name?.toString() || "",
            url: child.url,
          });
        }
      }

      if (pages.length > 0) {
        const rawHeading = parentName
          ? `${parentName} / ${node.name?.toString() || ""}`
          : node.name?.toString() || "";
        const heading = formatHeading(rawHeading);
        groups.push({ heading, pages });
      }

      for (const child of node.children) {
        if (child.type === "folder") {
          const childGroups = collectGroups(
            child,
            parentName
              ? `${parentName} / ${node.name?.toString() || ""}`
              : node.name?.toString() || ""
          );
          groups.push(...childGroups);
        }
      }
    }

    return groups;
  };

  const allGroups = tree.children.flatMap((topLevel) =>
    collectGroups(topLevel)
  );

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ""}`}
        onClick={handleClose}
      />
      <div
        className={`${styles.commandWrapper} ${isClosing ? styles.commandWrapperClosing : ""}`}
      >
        <Command>
          <CommandInput placeholder="Search documentation..." ref={inputRef} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {allGroups.map((group, idx) => (
              <CommandGroup
                heading={group.heading}
                key={`${group.heading}-${idx}`}
              >
                {group.pages.map((page) => (
                  <CommandItem
                    key={page.url}
                    onSelect={() => handleSelect(page.url)}
                    value={`${group.heading} ${page.name}`}
                  >
                    {getIcon(page.url, page.name)}
                    <div className={styles.commandItemContent}>
                      <div className={styles.commandItemTitle}>{page.name}</div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
          <div className={styles.commandFooter}>
            <div className={styles.commandFooterItem}>
              <Kbd className={styles.commandFooterKbd} size="md">
                <svg
                  fill="none"
                  height="14"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width="14"
                >
                  <polyline points="9 10 4 15 9 20" />
                  <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                </svg>
              </Kbd>
              <span className={styles.commandFooterText}>Go to page</span>
            </div>
          </div>
        </Command>
      </div>
    </>
  );
}
