import {canScore,anchorsFor} from './scoring.mjs';
export function destination(index,delta,count){return Math.max(0,Math.min(count-1,index+delta));}
export function swipeDirection(dx,dy){return Math.abs(dx)>=70&&Math.abs(dx)>Math.abs(dy)*1.5?(dx<0?1:-1):0;}
export function pickScore(item,age,value){return canScore(item,age)&&anchorsFor(item,age).some(a=>a.score===value);}
