interface Card {
  id: string;
  name: string;
  description: string;
  img: string;
  link: string;
}

interface Section {
  title: string;
  cards: Array<Card>;
}

export type {Card,Section}