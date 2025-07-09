import { v4 as uuidv4 } from "uuid";

export const scienceCategories = [
  {
    id: uuidv4(),
    name: "Computers",
    value: "18",
  },
  {
    id: uuidv4(),
    name: "Nature",
    value: "17",
  },
  {
    id: uuidv4(),
    name: "Mathematics",
    value: "19",
  },
  {
    id: uuidv4(),
    name: "Gadgets",
    value: "30",
  },
  {
    id: uuidv4(),
    name: "Animals",
    value: "27",
  },
];

export const historyCategories = [
  {
    id: uuidv4(),
    name: "History",
    value: "23",
  },
  {
    id: uuidv4(),
    name: "Mythology",
    value: "20",
  },
];

export const genKnowledgeCategories = [
  {
    id: uuidv4(),
    name: "General Knowledge",
    value: "9",
  },
];

export const entertainmentCategories = [
  {
    id: uuidv4(),
    name: "Books",
    value: "10",
  },
  {
    id: uuidv4(),
    name: "Film",
    value: "11",
  },
  {
    id: uuidv4(),
    name: "Music",
    value: "12",
  },
  {
    id: uuidv4(),
    name: "Musicals",
    value: "13",
  },
  {
    id: uuidv4(),
    name: "Video Games",
    value: "15",
  },
  {
    id: uuidv4(),
    name: "Board Games",
    value: "16",
  },
  {
    id: uuidv4(),
    name: "Television",
    value: "14",
  },
  {
    id: uuidv4(),
    name: "Comics",
    value: "29",
  },
  {
    id: uuidv4(),
    name: "Anime & Manga",
    value: "31",
  },
  {
    id: uuidv4(),
    name: "Animations",
    value: "32",
  },
];

export const politicsCategories = [
  {
    id: uuidv4(),
    name: "Politics",
    value: "24",
  },
];

export const geographyCategories = [
  {
    id: uuidv4(),
    name: "Geography",
    value: "22",
  },
];

export const artCategories = [
  {
    id: uuidv4(),
    name: "Art",
    value: "25",
  },
];

export const allCategories = {
  science: scienceCategories,
  history: historyCategories,
  generalKnowledge: genKnowledgeCategories,
  entertainment: entertainmentCategories,
  politics: politicsCategories,
  geography: geographyCategories,
  art: artCategories,
};
