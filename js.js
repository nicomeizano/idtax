

var taxThreshold = [];
var taxReliefs = [];
var salaryAnnual = 0;
var salaryMonthly = 0;

function init() {

    // 0 to 50.000.000 IDR              - tax rate is 5%
    // 50.000.000 to 250.000.000 IDR    - tax rate is 15%
    // 250.000.000 to 500.000.000 IDR   - tax rate is 25%
    // more than 500.000.000 IDR        - tax rate is 30%

    taxThreshold.push({ amount: 0, tax: 0.05 })
    taxThreshold.push({ amount: 50000000, tax: 0.015 })
    taxThreshold.push({ amount: 250000000, tax: 0.025 })
    taxThreshold.push({ amount: 500000000, tax: 0.030 })

    // TK0  - Single                    : 54.000.000 IDR
    // K0   - Married with no dependant : 58.500.000 IDR
    // K1   - Married with 1 dependant  : 63.000.000 IDR
    // K2   - Married with 2 dependants : 67.500.000 IDR
    // K3   - Married with 3 dependants : 72.000.000 IDR

    taxReliefs.push({ name: 'TK0', amount: 54000000 })
    taxReliefs.push({ name: 'K0', amount: 58500000 })
    taxReliefs.push({ name: 'K1', amount: 63000000 })
    taxReliefs.push({ name: 'K2', amount: 67500000 })
    taxReliefs.push({ name: 'K3', amount: 72000000 })
}


function updateSalary() {
    salaryMonthly = document.getElementById('salaryMonthly').value;
    salaryAnnual = salaryMonthly * 12;

    document.getElementById('salaryAnnual').value = salaryAnnual;
}

function calculateTax() {

    var salaryAnnualAfterRelief = taxReliefCalculation();
    var thresholdSalary = 0
    var totalTax = 0;
    for (i = 0; i < taxThreshold.length; i++) {
        if (i < taxThreshold.length - 1 && salaryAnnualAfterRelief > taxThreshold[i + 1].amount) {
            thresholdSalary = taxThreshold[i + 1].amount - taxThreshold[i].amount;
            totalTax += thresholdSalary * taxThreshold[i].tax;
            //console.log(i + " : " + thresholdSalary + " - " + thresholdSalary * taxThreshold[i].tax)
        }
        else {
            thresholdSalary = salaryAnnualAfterRelief - taxThreshold[i].amount;
            totalTax += thresholdSalary * taxThreshold[i].tax;
            //console.log(i + " : " + tempSalaryAnnual + " - " + tempSalaryAnnual * taxThreshold[i].tax)
            break;
        }
    }

    document.getElementById('totalTax').value = totalTax;
}

function taxReliefCalculation() {

    var result = 0;
    var profile = document.getElementById('profile').value;
    if (profile) {

        for (i = 0; i < taxReliefs.length; i++) {
            if (profile == taxReliefs[i].name) {
                console.log(taxReliefs[i].amount);

                result = salaryAnnual - taxReliefs[i].amount;
                if (result < 0) result = 0;

                return result;
            }
        }
    }
    else return salaryAnnual;
}


init();



