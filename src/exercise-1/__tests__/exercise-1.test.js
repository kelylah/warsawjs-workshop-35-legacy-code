import invoices from '../invoices.json';
import vehicles from '../vehicles.json';
import {statement, renderStatementToHtml} from '../exercise-1.js';

test('print statement in text', () =>{
  const result = statement(invoices[0], vehicles);
  expect(result).toMatchSnapshot();
});

test('print statement in html', () =>{
  const result = renderStatementToHtml(invoices[0], vehicles);
  expect(result).toMatchSnapshot();
});
