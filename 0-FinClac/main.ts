import { Command } from 'commander';

export function calculateCompoundInterest(principal: number, annualRate: number, years: number, compoundingFrequency: number = 1): number {
  const ratePerPeriod = annualRate / compoundingFrequency;
  const numberOfPeriods = years * compoundingFrequency;
  return principal * Math.pow(1 + ratePerPeriod, numberOfPeriods);
}

const program = new Command();

program
  .version('1.0.0')
  .description('A financial calculator for compound interest');

program
  .command('calculate <principal> <annualRate> <years>')
  .option('-f, --frequency <frequency>', 'Compounding frequency per year (e.g., 1 for annually, 12 for monthly)', '1')
  .description('Calculate compound interest')
  .action((principal: string, annualRate: string, years: string, options) => {
    const p = parseFloat(principal);
    const r = parseFloat(annualRate);
    const y = parseFloat(years);
    const f = parseFloat(options.frequency);

    if (isNaN(p) || isNaN(r) || isNaN(y) || isNaN(f)) {
      console.error('Error: All arguments must be valid numbers.');
      process.exit(1);
    }

    const result = calculateCompoundInterest(p, r, y, f);
    console.log(`Final Capital: ${result.toFixed(2)}`);
  });

program.parse(process.argv);