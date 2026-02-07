import { getHeroes } from "@/app/services/heroes.service";
import HeroesClient from "./HeroClient";
import { App } from "antd";

interface PageProps {
  searchParams?: {
    page?: string;
    search?: string;
  };
}

export default async function HeroesPage({ searchParams }: PageProps) {
  
  const page = Number(searchParams?.page) || 1;

  const data = await getHeroes(page, searchParams?.search);

  return <HeroesClient initialData={data}/>;
}
