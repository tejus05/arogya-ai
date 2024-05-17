"use client";

import Skeleton from '@/components/Skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?(): void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick }) => {
  return (
    <Link
      href={href}
      className={`md:text-[15px] hover:text-white hover:bg-indigo-600 px-3 py-2 hover:rounded-full transition-all duration-0 text-[#222222] text-xs font-medium cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 flex flex-col items-center pt-4 bg-white w-full">
      <div className="flex gap-5 px-5 w-full text-black whitespace-nowrap max-w-7xl">
        <Link
          href="/"
          className="sm:text-3xl my-auto font-bold text-xl hover:opacity-90 transition text-black/85 cursor-pointer"
        >
          ArogyaAI
        </Link>
        <div className="flex-1" />
        <nav className="hidden justify-between items-center md:flex space-x-10">
          <NavLink href="/">Home</NavLink>
          <NavLink href="dashboard">Dashboard</NavLink>
          <AuthStatus />
        </nav>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <button
              className="flex items-center md:hidden"
              aria-label="Toggle Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="top" className="flex flex-col items-center justify-center gap-4 p-4">
            <Link href="/" className="text-xl  font-bold">
              ArogyaAI
            </Link>
            <NavLink onClick={() => setIsOpen(false)} href="/">
              Home
            </NavLink>
            <AuthStatus />
          </SheetContent>
        </Sheet>
      </div>
      <div className="self-stretch mt-4 w-full border-t border-solid bg-neutral-400 border-neutral-400 h-[1px] shadow-md shadow-neutral-400" />
    </header>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  let sessionImage = session?.user?.image;

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Log In
      </Link>
    );

  return (
    <div>
      {status === "authenticated" && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
            // @ts-ignore
              src={sessionImage}
              className="cursor-pointer rounded-full"
              width={40}
              height={40}
              alt="profile-image"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className='bg-white'>
              <p>{session.user!.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuItem className='bg-white'>
              <Link href="/api/auth/signout">Log Out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default Navbar;
