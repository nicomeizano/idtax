const { test } = require('@jest/globals');
const index = require('../index');

describe('variable test', () => {
  test.each(index.taxThreshold)('taxThreshold properties', (taxThreshold) => {
    expect(taxThreshold).toEqual(expect.objectContaining({
      amount: expect.any(Number),
      tax: expect.any(Number),
    }))
  })
  test.each(index.profileOption)('profile properties', (profileOption) => {
    expect(profileOption).toEqual(expect.objectContaining({
      amount: expect.any(Number),
      name: expect.any(String),
    }))
  })
});

let updateSalaryCases = [
  { monthly: 1, expected: 12 },
  { monthly: 1000000, expected: 12000000 },
  { monthly: 12345, expected: 148140 },
  { monthly: 60000000, expected: 720000000 },
];

test.each(updateSalaryCases)('updateSalary', (salaryCase) => {
  document.body.innerHTML = `<input id="salaryAnnual" value="X" />`;
  expect(index.updateSalary(salaryCase.monthly)).toBe(salaryCase.expected)
})

// Annual	          120000000	540000000	240000000	800000000	300000000	64000000
// Profile	        63000000	67500000	54000000	58500000	72000000	72000000
// ExpectedRelief	  57000000	472500000	186000000	741500000	228000000	0
// ExpectedTax	    3550000	  88125000	22900000	167450000	29200000	0
// TK0  - Single                    : 54.000.000 IDR
// K0   - Married with no dependant : 58.500.000 IDR
// K1   - Married with 1 dependant  : 63.000.000 IDR
// K2   - Married with 2 dependants : 67.500.000 IDR
// K3   - Married with 3 dependants : 72.000.000 IDR

let calculateTaxCases = [];
calculateTaxCases.push({ profile: "K1", salaryAnnual: 120000000, expectedRelief: 57000000, expectedTax: 3550000 });
calculateTaxCases.push({ profile: "K2", salaryAnnual: 540000000, expectedRelief: 472500000, expectedTax: 88125000 });
calculateTaxCases.push({ profile: "TK0", salaryAnnual: 240000000, expectedRelief: 186000000, expectedTax: 22900000 });
calculateTaxCases.push({ profile: "K0", salaryAnnual: 800000000, expectedRelief: 741500000, expectedTax: 167450000 });
calculateTaxCases.push({ profile: "K3", salaryAnnual: 300000000, expectedRelief: 228000000, expectedTax: 29200000 });
calculateTaxCases.push({ profile: "K3", salaryAnnual: 64000000, expectedRelief: 0, expectedTax: 0 });

test.each(calculateTaxCases)('calculateTaxRelief', (taxCase) => {
  expect(index.calculateTaxRelief(taxCase.profile, taxCase.salaryAnnual)).toBe(taxCase.expectedRelief)
})

test.each(calculateTaxCases)('calculateIncomeTax', (taxCase) => {
  document.body.innerHTML = `<input id="totalTax" value="2" />`;
  expect(index.calculateIncomeTax(taxCase.profile, taxCase.salaryAnnual)).toBe(taxCase.expectedTax)
})
