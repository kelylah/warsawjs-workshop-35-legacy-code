import '../utils.js';
import { DateRange, Statement } from '../exercise-3.js';

describe('DateRange', () => {
  test('check weekRange', () => {

    const weekRange = new DateRange(new Date('2019-08-01')).weekRange;

    expect(weekRange).toMatchSnapshot();
  });

  test('check range', () => {

    const range = new DateRange(new Date('2019-08-01'), new Date('2019-08-04')).range;

    expect(range).toMatchSnapshot();
  });

  test('check one day range - default', () => {

    const range = new DateRange(new Date('2019-08-01'), new Date('2019-08-04'));

    expect(range).toMatchSnapshot();
  });
});

class Totalizable {
  total() {
    return 10;
  }
}

describe('Statement', () => {
  test('check total', async () => {
    const db = new Totalizable();
    const statement = new Statement(db);

    const startDate = new Date().subtractDays(60);
    const endDate = new Date();

    const total = await statement.ridesTotal(startDate, endDate);

    expect(total).toBe(10);

  });
});