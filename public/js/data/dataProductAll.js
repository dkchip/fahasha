import { dataBackpacks } from "./backpacks.js";
import { dataTextbooks } from "./books.js";
import { dataToys } from "./toys.js";


let dataProductAll = dataBackpacks.concat(dataTextbooks,dataToys)
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
   
export default dataProductAll