"use client";

import { Flex, Grid, Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

const { useBreakpoint } = Grid;

interface SearchBarProps {
  onCreate: () => void;
  onSearch: (value: string) => void; // nova prop
}

export default function SearchBar({ onCreate, onSearch }: SearchBarProps) {
  const screens = useBreakpoint();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    onSearch(search);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Flex gap={16} vertical={!screens.md}  align="center">
      <Button type="primary" block={!screens.md} onClick={onCreate} style={{borderRadius:"100px"}}>
        Criar
      </Button>

      <Input
        placeholder="Buscar herói"
        prefix={<SearchOutlined />}
        className="rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyPress}
      />

      <Button block={!screens.md} onClick={handleSearch} style={{borderRadius:"100px"}}>
        Buscar
      </Button>
    </Flex>
  );
}
