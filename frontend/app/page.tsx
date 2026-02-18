import { Container } from "./components/Container/page";
import HeroesPage from "./components/HeroPage/page";
import PageHeader from "./components/PageHeader/page";

export default function Home() {
  return (
    <Container>
      <HeroesPage />
    </Container>
  );
}
