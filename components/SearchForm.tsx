"use client";

import React, { useEffect, useRef } from "react";
import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";
import Typed from "typed.js";

const SearchForm = ({ query }: { query?: string }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const typed = new Typed(searchInputRef.current, {
      strings: [
        'Search "AI Startups"',
        'Search "Health Startups"',
        'Search "EdTech Startups"',
      ],
      typeSpeed: 60,
      backSpeed: 60,
      loop: true,
      attr: "placeholder",
      smartBackspace: true,
    });

    return () => typed.destroy();
  }, []);

  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        ref={searchInputRef}
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search"
      />

      <div className="flex gap-2">
        {query && <SearchFormReset />}
        <button type="submit" className="search-btn text-white">
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
