import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="navbar">
      <nav className="flex justify-between items-center max-w-7xl mx-auto h-16">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center">
          <h1 className="text-xl font-semibold text-white">VentureX</h1>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {session && session?.user ? (
            <>
              <Link href="/startup/create" className="nav-button">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden text-white" />
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="nav-link">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-white" />
                </button>
              </form>

              <div className="flex items-center gap-2 px-2">
                <Link href={`/user/${session?.id}`}>
                  <Avatar className="size-10">
                    <AvatarImage
                      src={session?.user?.image || ""}
                      alt={session?.user?.name || ""}
                    />
                    <AvatarFallback>AV</AvatarFallback>
                  </Avatar>
                </Link>
              </div>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit" className="nav-button">
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
