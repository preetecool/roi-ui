"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/brook/ui/command/command";
import { Kbd } from "@/registry/brook/ui/kbd/kbd";
import type { PageTree } from "fumadocs-core/server";
import { Component, FileText, Puzzle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./search.module.css";

interface SearchProps {
  tree: PageTree.Root;
}

const ArrowIcon = () => {
  return (
    <svg viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg" width="14" height="10">
      <g fillRule="nonzero">
        <path
          d="M1 1l4 4-4 4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
          className={styles.arrowPoint}
        />
        <path
          d="M1.8 5h4.8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
          className={styles.arrowShaft}
        />
      </g>
    </svg>
  );
};

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

    if (nameLower === "introduction" || nameLower === "quick start" || nameLower === "about roi ui") {
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

    if (url.includes("/examples/") && puzzleExamples.some((example) => nameLower.includes(example))) {
      return <Puzzle size={16} />;
    }

    if (url.includes("/components/") || url.includes("/ui/")) {
      return <Puzzle size={16} />;
    }

    return <FileText size={16} />;
  };

  const formatHeading = (text: string) => {
    return text
      .split(" / ")
      .map((part) => {
        if (part.toLowerCase() === "ui") {
          return "UI";
        }
        return part
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ");
      })
      .join(" / ");
  };

  const collectGroups = (
    node: PageTree.Node,
    parentName: string = "",
  ): Array<{ heading: string; pages: Array<{ name: string; url: string }> }> => {
    const groups: Array<{ heading: string; pages: Array<{ name: string; url: string }> }> = [];

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
            parentName ? `${parentName} / ${node.name?.toString() || ""}` : node.name?.toString() || "",
          );
          groups.push(...childGroups);
        }
      }
    }

    return groups;
  };

  const allGroups = tree.children.flatMap((topLevel) => collectGroups(topLevel));

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ""}`} onClick={handleClose} />
      <div className={`${styles.commandWrapper} ${isClosing ? styles.commandWrapperClosing : ""}`}>
        <Command>
          <CommandInput ref={inputRef} placeholder="Search documentation..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {allGroups.map((group, idx) => (
              <CommandGroup key={`${group.heading}-${idx}`} heading={group.heading}>
                {group.pages.map((page) => (
                  <CommandItem
                    key={page.url}
                    value={`${group.heading} ${page.name}`}
                    onSelect={() => handleSelect(page.url)}
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
              <Kbd size="md" className={styles.commandFooterKbd}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
