import { bank, validateBank } from '../src/yeniHitit';
validateBank(bank);
console.log(`Yeni Hitit v82 validated: ${bank.questions.length} questions, ${new Set(bank.questions.map(q => q.skill_id)).size} skills, four options and valid answer keys; prosody excluded.`);
