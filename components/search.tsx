"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useRef } from "react";
import { ArrowUpIcon, ArrowDownIcon, CommandIcon, FileTextIcon, SearchIcon, CornerDownLeftIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import Anchor from "./anchor";
import { advanceSearch, cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Search() {
  const router = useRouter();
  const [searchedInput, setSearchedInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const filteredResults = useMemo(
    () => advanceSearch(searchedInput.trim()),
    [searchedInput]
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredResults]);

  useEffect(() => {
    const handleNavigation = (event: KeyboardEvent) => {
      if (!isOpen || filteredResults.length === 0) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const selectedItem = filteredResults[selectedIndex];
        if (selectedItem) {
          router.push(`/docs${selectedItem.href}`);
          setIsOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleNavigation);
    return () => {
      window.removeEventListener("keydown", handleNavigation);
    };
  }, [isOpen, filteredResults, selectedIndex, router]);

    useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedIndex]);

  return (
    <div>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) setSearchedInput("");
          setIsOpen(open);
        }}
      >
        <DialogTrigger asChild>
          <div className="relative flex-1 cursor-pointer max-w-[140px]">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500 dark:text-stone-400" />
            <Input
              className="md:w-full rounded-full dark:bg-background/95 bg-background border h-9 pl-10 pr-0 sm:pr-4 text-sm shadow-sm overflow-ellipsis"
              placeholder="Search"
              type="search"
            />
            <div className="flex absolute top-1/2 -translate-y-1/2 right-2 text-xs font-medium font-mono items-center gap-0.5 dark:bg-accent bg-accent text-white px-2 py-0.5 rounded-full">
              <CommandIcon className="w-3 h-3" />
              <span>K</span>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="p-0 max-w-[650px] sm:top-[38%] top-[45%] !rounded-md">
          <DialogTitle className="sr-only">Search</DialogTitle>
          <DialogHeader>
            <input
              value={searchedInput}
              onChange={(e) => setSearchedInput(e.target.value)}
              placeholder="Type something to search..."
              autoFocus
              className="h-14 px-6 bg-transparent border-b text-[14px] outline-none"
            />
          </DialogHeader>
          {filteredResults.length == 0 && searchedInput && (
            <p className="text-muted-foreground mx-auto mt-2 text-sm">
              No results found for{" "}
              <span className="text-primary">{`"${searchedInput}"`}</span>
            </p>
          )}
          <ScrollArea className="max-h-[400px] overflow-y-auto">
            <div className="flex flex-col items-start overflow-y-auto sm:px-2 px-1 pb-4">
              {filteredResults.map((item, index) => {
                const level = (item.href.split("/").slice(1).length - 1) as keyof typeof paddingMap;
                const paddingClass = paddingMap[level];
                const isActive = index === selectedIndex;

                return (
                    <DialogClose key={item.href} asChild>
                        <Anchor
                        ref={(el) => {
                            itemRefs.current[index] = el as HTMLDivElement | null;
                          }}
                        className={cn(
                            "dark:hover:bg-accent/15 hover:bg-accent/10 w-full px-3 rounded-sm text-sm flex items-center gap-2.5",
                            isActive && "bg-primary/20 dark:bg-primary/30",
                            paddingClass
                        )}
                        href={`/docs${item.href}`}
                        tabIndex={0}
                        >
                        <div
                            className={cn(
                            "flex items-center w-fit h-full py-3 gap-1.5 px-2",
                            level > 1 && "border-l pl-4"
                            )}
                        >
                            <FileTextIcon className="h-[1.1rem] w-[1.1rem] mr-1" /> {item.title}
                        </div>
                        </Anchor>
                    </DialogClose>
                );
              })}
            </div>
          </ScrollArea>
          <DialogFooter className="md:flex md:justify-start hidden h-14 px-6 bg-transparent border-t text-[14px] outline-none">
            <div className="flex items-center gap-2">
              <span className="dark:bg-accent/15 bg-slate-200 border rounded p-2">
                <ArrowUpIcon className="w-3 h-3"/>
              </span>
              <span className="dark:bg-accent/15 bg-slate-200 border rounded p-2">
                <ArrowDownIcon className="w-3 h-3"/>
              </span>
              <p className="text-muted-foreground">to navigate</p>
              <span className="dark:bg-accent/15 bg-slate-200 border rounded p-2">
                <CornerDownLeftIcon className="w-3 h-3"/>
              </span>
              <p className="text-muted-foreground">to select</p>
              <span className="dark:bg-accent/15 bg-slate-200 border rounded px-2 py-1">
                esc
              </span>
              <p className="text-muted-foreground">to close</p>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const paddingMap = {
  1: "pl-2",
  2: "pl-4",
  3: "pl-10",
} as const;
