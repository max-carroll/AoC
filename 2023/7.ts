import { data } from "../7.raw";
import { SumArray } from "../utils";

export enum Hand {
  highCard,
  onePair,
  twoPair,
  threeOfAKind,
  fullHouse,
  fourOfAKind,
  fiveOfAKind,
}

export function getHandInfo(hand: string, jsAreWild = false): Hand {
  const map = new Map<string, number>();

  for (let card of hand) {
    let currentNumber = map.get(card) ?? 0;
    currentNumber++;

    map.set(card, currentNumber);
  }

  let hasA3OfAKind = false;
  let numberOfPairs = 0;

  let resultingHand: Hand = Hand.highCard;
  for (let [card, qty] of map) {
    if (jsAreWild && card === "J") {
      continue;
    }
    switch (qty) {
      case 1:
        break;
      case 2:
        numberOfPairs++;
        break;
      case 3:
        hasA3OfAKind = true;
        break;
      case 4:
        resultingHand = Hand.fourOfAKind;
        if (!jsAreWild) {
          return resultingHand;
        }
        break;
      case 5:
        resultingHand = Hand.fiveOfAKind;
        return resultingHand;
    }
  }

  const numberOfJs = hand.split("").filter((c) => c === "J").length;
  if (jsAreWild && numberOfJs > 0) {
    const removeTheJs = hand
      .split("")
      .filter((c) => c !== "J")
      .join("");
    let handRank = getHandInfo(removeTheJs, false);

    // increment by the number of Js
    for (let i = 1; i <= numberOfJs; i++) {
      handRank = increaseHandByOne(handRank);
    }
    return handRank;
  }

  if (hasA3OfAKind && numberOfPairs === 1) {
    return Hand.fullHouse;
  }

  if (hasA3OfAKind) {
    return Hand.threeOfAKind;
  }

  if (numberOfPairs === 2) {
    return Hand.twoPair;
  }

  if (numberOfPairs === 1) {
    return Hand.onePair;
  }

  return resultingHand;
}

export interface HandInfo {
  hand: string;
  bid: number;
  rank?: number;
  winnings?: number;
}

export function getRanksHands(
  handInfos: HandInfo[],
  jsAreWild = false
): HandInfo[] {
  let rankedHands = handInfos.sort((a, b) => {
    const aHand = getHandInfo(a.hand, jsAreWild);
    const bHand = getHandInfo(b.hand, jsAreWild);

    if (aHand < bHand) {
      return -1;
    } else if (aHand > bHand) {
      return +1;
    } else if (aHand === bHand) {
      for (let i = 0; i <= 4; i++) {
        const aa = letterToNumber(a.hand[i], jsAreWild);
        const bb = letterToNumber(b.hand[i], jsAreWild);

        if (aa < bb) {
          return -1;
        } else if (aa > bb) {
          return +1;
        } else {
          continue;
        }
      }
    }
    return 0;
  });

  return rankedHands;
}

export function getRanksAndWInningInfo(
  handInfos: HandInfo[],
  jsAreWild = false
): HandInfo[] {
  let rankedHands = getRanksHands(handInfos, jsAreWild);

  rankedHands = rankedHands.map((h, i) => ({
    ...h,
    rank: i + 1,
    winnings: (i + 1) * h.bid,
  }));

  return rankedHands;
}

export function letterToNumber(letter: string, jsAreWild = false): number {
  const num = parseInt(letter, 10);

  if (!isNaN(num)) {
    return num;
  }

  switch (letter) {
    case "T":
      return 10;
    case "J":
      if (jsAreWild) {
        return 1;
      } else {
        return 11;
      }

    case "Q":
      return 12;
    case "K":
      return 13;
    case "A":
      return 14;
  }

  throw new Error("didnt get the number");
}

function part1() {
  const lines = data.split("\n");

  const handInfos = lines.map((l) => {
    const [hand, bid] = l.split(" ");

    const handInfo: HandInfo = { hand, bid: parseInt(bid, 10) };
    return handInfo;
  });

  const handInfosWithEvenMoreInfo = getRanksAndWInningInfo(handInfos);

  const winnings = handInfosWithEvenMoreInfo.map((info) => {
    if (info.winnings === undefined || isNaN(info.winnings)) {
      console.log("oops the winnings are wrong");
    }
    return info.winnings!;
  });

  const allTheWInnings = SumArray(winnings);
  console.log("all winnings", allTheWInnings);
}

part1();

function increaseHandByOne(hand: Hand): Hand {
  switch (hand) {
    case Hand.highCard:
      return Hand.onePair;
    case Hand.onePair:
      return Hand.threeOfAKind;
    case Hand.twoPair:
      return Hand.fullHouse;
    case Hand.threeOfAKind:
      return Hand.fourOfAKind;
    case Hand.fullHouse:
      return Hand.fourOfAKind;
    case Hand.fourOfAKind:
      return Hand.fiveOfAKind;
    case Hand.fiveOfAKind:
      return Hand.fiveOfAKind;
  }

  throw new Error(`could not get hand for hand ${hand}`);
}

function part2() {
  const lines = data.split("\n");

  const handInfos = lines.map((l) => {
    const [hand, bid] = l.split(" ");

    const handInfo: HandInfo = { hand, bid: parseInt(bid, 10) };
    return handInfo;
  });

  let handInfosWithEvenMoreInfo = getRanksAndWInningInfo(handInfos, true);

  const winnings = handInfosWithEvenMoreInfo.map((info) => {
    if (info.winnings === undefined || isNaN(info.winnings)) {
      console.log("oops the winnings are wrong");
    }
    return info.winnings!;
  });

  handInfosWithEvenMoreInfo = handInfosWithEvenMoreInfo.map((h) => ({
    ...h,
    result: Hand[getHandInfo(h.hand, true)],
  }));

  // console.table(handInfosWithEvenMoreInfo);

  const allTheWInnings = SumArray(winnings);
  console.log("all winnings part 2", allTheWInnings); // 255181856 (too low - wrong)
  // snd try 255501454 (wrong)
  // 3rd try 255374738
  // 4th try 255398310 (wrong)
  // 5th try 255632664
}

part2();
