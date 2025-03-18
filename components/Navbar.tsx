import { auth, signOut, signIn } from "@/auth";
import Link from "next/link";
import React from "react";

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
                <span>Create</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="nav-link">
                  Logout
                </button>
              </form>

              <div className="flex items-center gap-2 px-2">
                <span className="text-white/70 text-sm">
                  {session?.user?.name}
                </span>
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
