export type MappingType =
  | "seed-to-soil"
  | "soil-to-fertilizer"
  | "fertilizer-to-water"
  | "water-to-light"
  | "light-to-temperature"
  | "temperature-to-humidity"
  | "humidity-to-location";

export interface GameData {
  seeds: Array<number>;
  mappings: Record<MappingType, Array<Mapping>>;
}

export function ParseRawStringIntoMappingObjects(rawString: string): GameData {
  const sections = rawString.split("\n\n");

  const justDigits = sections[0].match(/[\d\s]+/)?.[0].trim() ?? "";
  console.log(justDigits);
  const seeds = justDigits.split(" ").map((x) => parseInt(x, 10));

  const gameData: GameData = {
    seeds: seeds,
    mappings: {
      "seed-to-soil": CreateMap(sections[1]),
      "soil-to-fertilizer": CreateMap(sections[2]),
      "fertilizer-to-water": CreateMap(sections[3]),
      "water-to-light": CreateMap(sections[4]),
      "light-to-temperature": CreateMap(sections[5]),
      "temperature-to-humidity": CreateMap(sections[6]),
      "humidity-to-location": CreateMap(sections[7]),
    },
  };

  return gameData;
}

export function CreateMap(rawMapString: string): Array<Mapping> {
  const lines = rawMapString.split("\n");

  const mappings: Array<Mapping> = [];

  lines.forEach((line) => {
    if (line.includes("map")) {
      return; // its just the title
    }

    const exploded = line.split(" ");
    if (exploded.length === 3) {
      const [destination, source, range] = exploded;
      const newMapping = new Mapping(
        parseInt(destination),
        parseInt(source),
        parseInt(range)
      );
      mappings.push(newMapping);
    }
  });

  return mappings;
}

export class Mapping {
  constructor(
    public destination: number,
    public source: number,
    public range: number
  ) {}
}

export function GetDestinationUsingMap(
  mappings: Array<Mapping>,
  requestedSource: number
): number {
  for (var mapping of mappings) {
    const { source, destination, range } = mapping;
    const upperSourceBoundary = source + (range - 1);

    const sourceNumberIsWithinBoundary =
      requestedSource <= upperSourceBoundary && requestedSource >= source;

    if (sourceNumberIsWithinBoundary) {
      // JACKPOT we found the correct mapping

      const differenceBetween = requestedSource - source;
      const requestedDestination = destination + differenceBetween;
      return requestedDestination;
    }
  }
  return requestedSource;
}

export function GetDestination(
  mapString: string,
  requestedSource: number
): number {
  const mappings = CreateMap(mapString);

  const result = GetDestinationUsingMap(mappings, requestedSource);
  return result;
}

export interface MappingJourney {
  seed: number;
  soil: number;
  fertilizer: number;
  water: number;
  light: number;
  temperature: number;
  humidity: number;
  location: number;
}

export function GetMappingJourneyForSeed(
  seed: number,
  mappings: Record<MappingType, Array<Mapping>>
): MappingJourney {
  const soil = GetDestinationUsingMap(mappings["seed-to-soil"], seed);
  const fertilizer = GetDestinationUsingMap(
    mappings["soil-to-fertilizer"],
    soil
  );
  const water = GetDestinationUsingMap(
    mappings["fertilizer-to-water"],
    fertilizer
  );
  const light = GetDestinationUsingMap(mappings["water-to-light"], water);
  const temperature = GetDestinationUsingMap(
    mappings["light-to-temperature"],
    light
  );
  const humidity = GetDestinationUsingMap(
    mappings["temperature-to-humidity"],
    temperature
  );

  const location = GetDestinationUsingMap(
    mappings["humidity-to-location"],
    humidity
  );

  const mappingJourney: MappingJourney = {
    seed,
    soil,
    fertilizer,
    water,
    light,
    temperature,
    humidity,
    location,
  };

  return mappingJourney;
}

export function getLowestLocationForSeedMappings(gameData: GameData): number {
  let lowestSoFar: number | undefined;
  for (let seed of gameData.seeds) {
    const journey = GetMappingJourneyForSeed(seed, gameData.mappings);

    const { location } = journey;

    if (lowestSoFar === undefined || location < lowestSoFar) {
      lowestSoFar = location; // set the first time
    }
  }

  return lowestSoFar ?? 0;
}
