let taxThresholdList = [];
let profileList = [];
let salaryAnnual = 0;
let salaryMonthly = 0;
const isRequired = () => { throw new Error('param is required'); };

function init() {
    // 0 to 50.000.000 IDR              - tax rate is 5%
    // 50.000.000 to 250.000.000 IDR    - tax rate is 15%
    // 250.000.000 to 500.000.000 IDR   - tax rate is 25%
    // more than 500.000.000 IDR        - tax rate is 30%
    taxThresholdList.push({ amount: 0, tax: 0.05 })
    taxThresholdList.push({ amount: 50000000, tax: 0.15 })
    taxThresholdList.push({ amount: 250000000, tax: 0.25 })
    taxThresholdList.push({ amount: 500000000, tax: 0.30 })

    // TK0  - Single                    : 54.000.000 IDR
    // K0   - Married with no dependant : 58.500.000 IDR
    // K1   - Married with 1 dependant  : 63.000.000 IDR
    // K2   - Married with 2 dependants : 67.500.000 IDR
    // K3   - Married with 3 dependants : 72.000.000 IDR
    profileList.push({ name: 'TK0', amount: 54000000 })
    profileList.push({ name: 'K0', amount: 58500000 })
    profileList.push({ name: 'K1', amount: 63000000 })
    profileList.push({ name: 'K2', amount: 67500000 })
    profileList.push({ name: 'K3', amount: 72000000 })
}

function updateSalary(_salaryMonthly = salaryMonthly) {
    if (_salaryMonthly) { salaryMonthly = _salaryMonthly; }
    else salaryMonthly = document.getElementById('salaryMonthly').value;

    salaryAnnual = salaryMonthly * 12;
    document.getElementById('salaryAnnual').value = salaryAnnual;
    return salaryAnnual;
}

function calculateTaxRelief(profile = isRequired(), _salaryAnnual = salaryAnnual) {
    let result = 0;
    if (profile) {
        for (i = 0; i < profileList.length; i++) {
            if (profile == profileList[i].name) {
                result = _salaryAnnual - profileList[i].amount;
                if (result < 0) result = 0;
                //console.log("return result: " + _salaryAnnual + " - " + profileOption[i].amount);
                return result;
            }
        }
    }
    else return _salaryAnnual;
}

function calculateIncomeTax(profile = document.getElementById('profile').value, _salaryAnnual = salaryAnnual) {
    //console.log(profile + "  -  " + _salaryAnnual);
    let salaryAnnualAfterRelief = calculateTaxRelief(profile, _salaryAnnual);
    //console.log("after relief:  " + salaryAnnualAfterRelief);
    let thresholdSalary = 0
    let totalTax = 0;
    for (i = 0; i < taxThresholdList.length; i++) {
        if (i < taxThresholdList.length - 1 && salaryAnnualAfterRelief > taxThresholdList[i + 1].amount) {
    thresholdSalary = taxThresholdList[i + 1].amount - taxThresholdList[i].amount;
            totalTax += thresholdSalary * taxThresholdList[i].tax;
            console.log(i + " : " + thresholdSalary + " - " + thresholdSalary * taxThresholdList[i].tax)
        }
        else {
            thresholdSalary = salaryAnnualAfterRelief - taxThresholdList[i].amount;
            totalTax += thresholdSalary * taxThresholdList[i].tax;
            console.log(i + " : " + salaryAnnualAfterRelief + " - " + thresholdSalary + " - " + taxThresholdList[i].tax  + " || " + totalTax )
            break;
        }
    }
     document.getElementById('totalTax').value = totalTax;
            console.log("total tax : " + totalTax)
            return totalTax;
}

init();

if(typeof module !== 'undefined')
{
    module.exports.init = init;
    module.exports.updateSalary = updateSalary;
    module.exports.calculateIncomeTax = calculateIncomeTax;
    module.exports.calculateTaxRelief = calculateTaxRelief;
    module.exports.taxThreshold = taxThresholdList;
    module.exports.profileOption = profileList;
    module.exports.document = this.document;
}
else if(window)
{
    window.init = init;
    window.updateSalary = updateSalary;
    window.calculateIncomeTax = calculateIncomeTax;
    window.calculateTaxRelief = calculateTaxRelief;
    window.taxThreshold = taxThresholdList;
    window.profileOption = profileList;
    window.document = this.document;
}



// module.exports = taxReliefs;
