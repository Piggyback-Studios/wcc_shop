"use client";

import ContentContainer from "@/src/components/common/ContentContainer";
import { SearchBarProps } from "@/src/shared/types";

function SearchBar({ onSearch, value }: SearchBarProps) {
  return (
    <section>
      <ContentContainer>
        <h1>Search Our Collection</h1>
        {/* TODO: switch with custom input */}
        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          value={value}
        />
      </ContentContainer>
    </section>
  );
}

export default SearchBar;
