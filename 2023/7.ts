export enum Hand {
  highCard,
  onePair,
  twoPair,
  threeOfAKind,
  fullHouse,
  fourOfAKind,
  fiveOfAKind,
}

export function getHandInfo(hand: string): Hand {
  const map = new Map<string, number>();

  for (let card of hand) {
    let currentNumber = map.get(card) ?? 0;
    currentNumber++;

    map.set(card, currentNumber);
  }

  const handKindMap = new Map<Hand, number>();

  let hasA3 = false;
  let numberOfPairs = 0;

  let resultingHand: Hand = Hand.highCard;
  for (let [card, qty] of map) {
    switch (qty) {
      case 1:
        break;
      case 2:
        numberOfPairs++;
        break;
      case 3:
        hasA3 = true;
        break;
      case 4:
        resultingHand = Hand.fourOfAKind;
        return resultingHand;
      case 5:
        resultingHand = Hand.fiveOfAKind;
        return resultingHand;
    }
  }

  if (hasA3 && numberOfPairs === 1) {
    return Hand.fullHouse;
  }

  if (hasA3) {
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

interface HandInfo {
  hand: string;
  bid: number;
  rank?: number;
}

export function getRanksHands(handInfos: HandInfo[]): HandInfo[] {
  const rankedHands = handInfos.sort((a, b) => {
    const aHand = getHandInfo(a.hand);
    const bHand = getHandInfo(b.hand);

    if (aHand < bHand) {
      return 1;
    } else if (aHand > bHand) {
      return -1;
    } else if (aHand === bHand) {
      for (let i = 0; i <= 4; i++) {
        const aa = letterToNumber(a.hand[i]);
        const bb = letterToNumber(b.hand[i]);

        if (aa < bb) {
          return 1;
        } else if (aa > bb) {
          return -1;
        } else {
          continue;
        }
      }
    }
    return 0;
  });

  return rankedHands;
}

export function letterToNumber(letter: string): number {
  const num = parseInt(letter, 10);

  if (!isNaN(num)) {
    return num;
  }

  switch (letter) {
    case "T":
      return 10;
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    case "A":
      return 14;
  }

  throw new Error("didnt get the number");
}
