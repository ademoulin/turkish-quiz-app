/** Owner choices are instructional filters, not mastery categories. */
export const ownerSelections = [
 {id:'mixed',label:'All owners'},
 {id:'ben',label:'My · benim'},
 {id:'sen',label:'Your (singular) · senin'},
 {id:'o',label:'His/her · onun'},
 {id:'biz',label:'Our · bizim'},
 {id:'siz',label:'Your (plural/formal) · sizin'},
 {id:'onlar',label:'Their · onların'},
] as const;
export type OwnerSelection = typeof ownerSelections[number]['id'] | 'named';
export function matchesOwner(owner:string, selection:OwnerSelection='mixed') {
 return selection==='mixed' || (selection==='named'
  ? !ownerSelections.some(o=>o.id===owner)
  : owner===selection);
}
