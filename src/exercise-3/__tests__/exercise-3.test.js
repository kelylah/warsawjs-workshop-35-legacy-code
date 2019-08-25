import '../utils.js';
import { DateRange } from '../exercise-3.js';

describe('DateRange', () => {
  test('check weekRange', () => {

    const weekRange = new DateRange(new Date('2019-08-01')).weekRange;

    expect(weekRange).toMatchSnapshot();
  });

  test('check range', () => {

    const range = new DateRange(new Date('2019-08-01'), new Date('2019-08-04')).range;

    expect(range).toMatchSnapshot();
  });
});
