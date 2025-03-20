import Link from "next/link";
import type { FC } from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer: FC = () => {
  return (
    <footer className="w-full bg-black bg-opacity-20  text-white py-8 px-6 mt-3">
      <div className="container mx-auto flex flex-col items-center md:items-start">
        {/* Top Section */}
        <div className="w-full flex flex-col items-center md:flex-row md:justify-between md:items-center mb-8 md:mb-8">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <span className="text-lg font-semibold">
                <span className="inline-flex items-center">VentureX</span>
              </span>
            </Link>
          </div>

          {/* Navigation Links - Centered on mobile, right-aligned on desktop */}
          <nav className="flex flex-wrap justify-center gap-3 md:gap-4">
            <Link
              href="https://github.com/NavneetPrajapati31"
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              <GitHubIcon />
            </Link>
            <Link
              href="https://www.linkedin.com/in/navneet-prajapati-640345290"
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              <LinkedInIcon />
            </Link>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center w-full text-gray-300 text-sm">
          <div className="text-center md:text-left mb-6 md:mb-0">
            © {new Date().getFullYear()} VentureX. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
