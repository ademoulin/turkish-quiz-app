import {test} from 'node:test';
import assert from 'node:assert/strict';
import {browserScope} from './browser-checks.mjs';

test('unknown/shared changes, missing files and unknown diffs run the full suite',()=>{
 for(const paths of [[],['src/grammarCopy.ts'],['src/casePilot.ts'],['src/grammarRegistry.ts'],['package.json'],['.github/workflows/grammar-checks.yml'],['src/lessonGuides.tsx','src/VerbNounLessons.tsx'],['src/deleted.ts']])assert.equal(browserScope(paths).mode,'full');
});
test('known content changes select relevant checks and shared layout coverage',()=>{
 for(const [path,expected] of [['src/lessonGuides.tsx','e2e/grammar-numbering.spec.ts'],['src/clauseCaseFeedback.ts','e2e/clause-case-choices.spec.ts'],['src/grammarMcRevisions.ts','e2e/grammar-mc-revisions.spec.ts']]){
  const scope=browserScope([path]);assert.equal(scope.mode,'targeted');assert.ok(scope.files.includes(expected));assert.ok(scope.files.includes('e2e/grammar-layout.spec.ts'));
 }
});
test('mixed content and test edits combine checks without duplicate files',()=>{
 const scope=browserScope(['src/clauseCaseFeedback.ts','src/grammarMcRevisions.ts','e2e/grammar-mc-revisions.spec.ts','src/grammarMcRevisions.test.ts','README.md']);
 assert.equal(scope.mode,'targeted');assert.equal(new Set(scope.files).size,scope.files.length);assert.ok(scope.files.includes('e2e/clause-case-choices.spec.ts'));assert.ok(scope.files.includes('e2e/grammar-mc-revisions.spec.ts'));
});
test('documentation/unit-only edits skip UI, while explicit full requests override every scope',()=>{
 assert.equal(browserScope(['README.md','src/grammarCopy.test.ts']).mode,'none');
 for(const paths of [[],['README.md'],['src/lessonGuides.tsx']])assert.equal(browserScope(paths,true).mode,'full');
});
