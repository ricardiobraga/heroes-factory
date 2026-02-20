import { createPrismaClient } from "@/shared/database/prisma";

const prisma = createPrismaClient();

const heroes = [
  {
    name: "Peter Benjamin Parker",
    nickname: "Spider-Man",
    dateOfBirth: new Date("2001-08-10"),
    universe: "Marvel",
    mainPower: "Agilidade e força",
    avatarUrl: "https://example.com/spiderman.png",
  },
  {
    name: "Bruce Wayne",
    nickname: "Batman",
    dateOfBirth: new Date("1939-05-27"),
    universe: "DC",
    mainPower: "Intelecto e combate",
    avatarUrl: "https://example.com/batman.png",
  },
  {
    name: "Clark Joseph Kent",
    nickname: "Superman",
    dateOfBirth: new Date("1938-06-18"),
    universe: "DC",
    mainPower: "Força e voo",
    avatarUrl: "https://example.com/superman.png",
  },
  {
    name: "Tony Stark",
    nickname: "Iron Man",
    dateOfBirth: new Date("1970-05-29"),
    universe: "Marvel",
    mainPower: "Intelecto e tecnologia",
    avatarUrl: "https://example.com/ironman.png",
  },
  {
    name: "Natasha Romanoff",
    nickname: "Black Widow",
    dateOfBirth: new Date("1984-11-22"),
    universe: "Marvel",
    mainPower: "Agilidade e espionagem",
    avatarUrl: "https://example.com/blackwidow.png",
  },
  {
    name: "Diana Prince",
    nickname: "Wonder Woman",
    dateOfBirth: new Date("1941-12-01"),
    universe: "DC",
    mainPower: "Força e luta",
    avatarUrl: "https://example.com/wonderwoman.png",
  },
  {
    name: "Steve Rogers",
    nickname: "Captain America",
    dateOfBirth: new Date("1920-07-04"),
    universe: "Marvel",
    mainPower: "Força e liderança",
    avatarUrl: "https://example.com/captainamerica.png",
  },
  {
    name: "Barry Allen",
    nickname: "Flash",
    dateOfBirth: new Date("1956-10-01"),
    universe: "DC",
    mainPower: "Velocidade",
    avatarUrl: "https://example.com/flash.png",
  },
  {
    name: "Hal Jordan",
    nickname: "Green Lantern",
    dateOfBirth: new Date("1959-07-01"),
    universe: "DC",
    mainPower: "Anel de poder",
    avatarUrl: "https://example.com/greenlantern.png",
  },
  {
    name: "Wade Wilson",
    nickname: "Deadpool",
    dateOfBirth: new Date("1991-02-09"),
    universe: "Marvel",
    mainPower: "Regeneração",
    avatarUrl: "https://example.com/deadpool.png",
  },
  {
    name: "Scott Lang",
    nickname: "Ant-Man",
    dateOfBirth: new Date("1979-06-29"),
    universe: "Marvel",
    mainPower: "Encolher e crescer",
    avatarUrl: "https://example.com/antman.png",
  },
  {
    name: "Bruce Banner",
    nickname: "Hulk",
    dateOfBirth: new Date("1962-12-18"),
    universe: "Marvel",
    mainPower: "Força",
    avatarUrl: "https://example.com/hulk.png",
  },
  {
    name: "Stephen Strange",
    nickname: "Doctor Strange",
    dateOfBirth: new Date("1963-11-18"),
    universe: "Marvel",
    mainPower: "Magia",
    avatarUrl: "https://example.com/doctorstrange.png",
  },
  {
    name: "Arthur Curry",
    nickname: "Aquaman",
    dateOfBirth: new Date("1941-11-01"),
    universe: "DC",
    mainPower: "Força e controle da água",
    avatarUrl: "https://example.com/aquaman.png",
  },
  {
    name: "Jean Grey",
    nickname: "Phoenix",
    dateOfBirth: new Date("1963-09-01"),
    universe: "Marvel",
    mainPower: "Telepatia e telecinese",
    avatarUrl: "https://example.com/phoenix.png",
  },
  {
    name: "Logan",
    nickname: "Wolverine",
    dateOfBirth: new Date("1974-05-01"),
    universe: "Marvel",
    mainPower: "Regeneração e garras",
    avatarUrl: "https://example.com/wolverine.png",
  },
  {
    name: "Peter Quill",
    nickname: "Star-Lord",
    dateOfBirth: new Date("1980-06-11"),
    universe: "Marvel",
    mainPower: "Liderança e armas",
    avatarUrl: "https://example.com/starlord.png",
  },
  {
    name: "Gamora",
    nickname: "Gamora",
    dateOfBirth: new Date("1975-07-05"),
    universe: "Marvel",
    mainPower: "Combate e força",
    avatarUrl: "https://example.com/gamora.png",
  },
  {
    name: "Tony Stark (Young)",
    nickname: "Iron Lad",
    dateOfBirth: new Date("2000-01-01"),
    universe: "Marvel",
    mainPower: "Inteligência",
    avatarUrl: "https://example.com/ironlad.png",
  },
  {
    name: "Matt Murdock",
    nickname: "Daredevil",
    dateOfBirth: new Date("1964-02-14"),
    universe: "Marvel",
    mainPower: "Sentidos aguçados",
    avatarUrl: "https://example.com/daredevil.png",
  }
];

async function main() {
  console.log("🧹 Limpando tabela de heróis...");
  await prisma.hero.deleteMany(); // remove todos os registros

  console.log("🌱 Inserindo heróis...");
  for (const hero of heroes) {
    await prisma.hero.create({ data: hero });
  }

  console.log("✅ Seed finalizado!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
