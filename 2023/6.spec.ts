import test from "node:test";
import assert from "node:assert";

// 7ms race tests
test("7ms race: when holding the button for 0 s ", () => {
  const distance = calculateDistanceTraveled(0, 7);
  assert.equal(distance, 0);
});

test("7ms race: when holding the button for 1 s ", () => {
  const distance = calculateDistanceTraveled(1, 7);
  assert.equal(distance, 6);
});

test("7ms race: when holding the button for 2 s ", () => {
  const distance = calculateDistanceTraveled(2, 7);
  assert.equal(distance, 10);
});

test("7ms race: when holding the button for 3 s ", () => {
  const distance = calculateDistanceTraveled(3, 7);
  assert.equal(distance, 12);
});

test("7ms race: when holding the button for 4 s ", () => {
  const distance = calculateDistanceTraveled(4, 7);
  assert.equal(distance, 12);
});

test("7ms race: when holding the button for 5 s ", () => {
  const distance = calculateDistanceTraveled(5, 7);
  assert.equal(distance, 10);
});

test("7ms race: when holding the button for 6 s ", () => {
  const distance = calculateDistanceTraveled(6, 7);
  assert.equal(distance, 6);
});

test("7ms race: when holding the button for 7 s ", () => {
  const distance = calculateDistanceTraveled(7, 7);
  assert.equal(distance, 0);
});

//ways to win
test("calculate number of ways to win: race 1", () => {
  const raceTimeMs = 7;
  const currentRecordDistance = 9;
  const numberOfWaysToWin = calculateNumberOfWaysToWin(
    raceTimeMs,
    currentRecordDistance
  );

  assert.equal(numberOfWaysToWin, 4);
});

test("calculate number of ways to win: race 2", () => {
  const raceTimeMs = 15;
  const currentRecordDistance = 40;
  const numberOfWaysToWin = calculateNumberOfWaysToWin(
    raceTimeMs,
    currentRecordDistance
  );

  assert.equal(numberOfWaysToWin, 8);
});

test("calculate number of ways to win: race 3", () => {
  const raceTimeMs = 30;
  const currentRecordDistance = 200;
  const numberOfWaysToWin = calculateNumberOfWaysToWin(
    raceTimeMs,
    currentRecordDistance
  );

  assert.equal(numberOfWaysToWin, 9);
});

function calculateDistanceTraveled(
  timeButtonHeldFor: number,
  timeInMs: number
) {
  const speed = timeButtonHeldFor;
  const remainingTime = timeInMs - speed;

  return speed * remainingTime;
}

function calculateNumberOfWaysToWin(
  raceTimeMs: number,
  currentRecordDistance: number
): number {
  let waysToWin = 0;
  for (let holdButtonTime = 0; holdButtonTime <= raceTimeMs; holdButtonTime++) {
    if (holdButtonTime % 1000 === 0) {
      const percentage = (holdButtonTime / raceTimeMs) * 100;
      console.log(
        new Date(),
        " on iteration:",
        holdButtonTime,
        "of raceTimeMs",
        " ",
        percentage,
        "% complete"
      );
    }

    const expectedDistance = calculateDistanceTraveled(
      holdButtonTime,
      raceTimeMs
    );
    if (expectedDistance > currentRecordDistance) {
      waysToWin++;
      //   console.log(new Date(), "found winning method!", { holdButtonTime });
    }
  }

  return waysToWin;
}

test("calculate answer to part1", () => {
  const race1 = calculateNumberOfWaysToWin(42, 308);
  const race2 = calculateNumberOfWaysToWin(89, 1170);
  const race3 = calculateNumberOfWaysToWin(91, 1291);
  const race4 = calculateNumberOfWaysToWin(89, 1467);

  const answer = race1 * race2 * race3 * race4;

  assert.equal(answer, 3317888);
});

test("calculate answer to part2", () => {
  const race1 = calculateNumberOfWaysToWin(42899189, 308117012911467);

  assert.equal(race1, 24655068);
});
