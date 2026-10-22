/** Separate an already-visible intended meaning; never add a translation to a meaning question. */
export function lessonPresentation(prompt:string,meaning:string){
 const prefix=`Intended message: ${meaning} `;
 const hasMeaning=prompt.startsWith(prefix);
 const instruction=(hasMeaning?prompt.slice(prefix.length):prompt)
  .replace('Choose the complete word that fits the supplied phrase.','Choose the form that completes the sentence.')
  .replace('Type the complete word that fits the supplied phrase.','Type the form that completes the sentence.');
 return {instruction,meaning:hasMeaning?meaning:undefined};
}
export function lessonHeading(label:string){
 const parts=label.split(' · ');
 return parts.length>1?{eyebrow:`Lesson ${parts[0]}`,title:parts.slice(1).join(' · ')}:{eyebrow:'Grammar practice',title:label};
}
