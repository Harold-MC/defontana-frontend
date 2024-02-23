export default interface Pokemon {
  name: string;
  abilities: {
    ability: { name: string; url: string };
  }[];
  stats: {
    stat: { name: string; url: string };
    base_stat: number;
    effort: number;
  }[];
  height: number;
  weight: number;
}
