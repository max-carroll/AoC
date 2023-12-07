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

  return resultingHand;
}
