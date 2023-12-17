"use client";

import { Button } from "./ui/button";
import {
  Activity,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  SunMoon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";

function MoreDropdown() {
  const [open, setOpen] = useState(false);
  const [showThemeToggle, setShowThemeToggle] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setShowThemeToggle(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownRef]);

  return (
    <DropdownMenu open={open}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          size={"lg"}
          onClick={() => setOpen((prev) => !prev)}
          className="justify-start space-x-2 px-3 md:w-full"
        >
          <Menu />
          <div className="hidden lg:block">More</div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        ref={dropdownRef}
        align="start"
        className={cn(
          "w-64 rounded-xl p-0 transition-opacity dark:bg-neutral-800",
          !open && "opacity-0",
        )}
      >
        {showThemeToggle ? (
          <>
            <DropdownMenuLabel className="flex items-center justify-between px-4 py-1">
              <div className="flex items-center gap-1">
                <Button
                  asChild
                  variant={"ghost"}
                  className="w-6 p-0 dark:hover:bg-[#3C3C3C]"
                >
                  <ChevronLeft
                    onClick={() => setShowThemeToggle(false)}
                    className="cursor-pointer"
                  />
                </Button>
                <span className="select-none font-bold">Change theme</span>
              </div>
              {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-gray-200 dark:bg-neutral-700" />

            <DropdownMenuGroup>
              <DropdownMenuItem className="m-1.5 cursor-pointer items-center justify-between rounded-lg px-4 py-2 font-medium dark:hover:bg-[#3C3C3C]">
                <Label htmlFor="themeToggle" className="cursor-pointer">
                  Dark mode
                </Label>
                <Switch
                  id="themeToggle"
                  checked={theme === "dark"}
                  onCheckedChange={(checked) =>
                    setTheme(checked ? "dark" : "light")
                  }
                  className="data-[state=checked]:bg-emerald-400"
                />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        ) : (
          <DropdownMenuGroup>
            {menuItems.map((menuItem) => {
              const Icon = menuItem.icon;

              const handleMenuItemClick = () => {
                if (menuItem.label === "Change theme") {
                  setShowThemeToggle(true);
                }
                if (menuItem.label === "Sign out") {
                  signOut();
                }
              };

              return (
                <DropdownMenuItem
                  key={menuItem.label}
                  onClick={handleMenuItemClick}
                  className="m-1.5 cursor-pointer items-center justify-between rounded-lg px-4 py-2 font-medium dark:hover:bg-[#3C3C3C]"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Icon />
                    <span>{menuItem.label}</span>
                  </div>
                  {menuItem.subMenu && <ChevronRight />}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default MoreDropdown;

const menuItems = [
  { icon: Settings, label: "Settings", subMenu: false },
  { icon: Activity, label: "Your activity", subMenu: false },
  { icon: Bookmark, label: "Saved", subMenu: false },
  { icon: SunMoon, label: "Change theme", subMenu: true },
  { icon: LogOut, label: "Sign out", subMenu: false },
];
