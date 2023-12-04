export function GetWinningNumbersFromCard(line: string): number[] {
  const [cardNumberString, cardData] = line.split(":");

  const [winningNumbersString, playingNumbersString] = cardData.split("|");

  const winningNumbers = winningNumbersString
    .trim()
    .split(/\s+/)
    .map((s) => parseInt(s));

  const playingNumbers = playingNumbersString
    .trim()
    .split(/\s+/)
    .map((s) => parseInt(s));

  const matches: number[] = [];
  playingNumbers.forEach((play) => {
    if (winningNumbers.includes(play)) {
      matches.push(play);
    }
  });

  return matches;
}
