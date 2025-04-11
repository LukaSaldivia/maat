import Filter from "./Filter.js";
import { FilterOptions } from "./FilterOptions.js";

import RangeFilter from "./variations/RangeFilter.js";
import TextFilter from "./variations/TextFilter.js";
import DateFilter from "./variations/DateFilter.js";
import NumberFilter from "./variations/NumberFilter.js";
import StrictTextFilter from "./variations/StrictTextFilter.js";


export default class FilterCollection<C extends string>{
  filters : Filter<C>[] = []
  map = {
    "range" : (options : FilterOptions<C>) : Filter<C> => {
      if (options.type != 'range') {
        throw new Error()
      }
      return new RangeFilter<C>(options.min, options.max, options.field, options.score)
    },
    "text" : (options : FilterOptions<C>) : Filter<C> => {
      if (options.type != 'text') {
        throw new Error()
      }
      return new TextFilter<C>(options.value, options.field, options.score)
    },
    "date" : (options : FilterOptions<C>) : Filter<C> => {
      if (options.type != 'date') {
        throw new Error()
      }
      return new DateFilter<C>(options.value, options.field, options.score)
    },
    "number" : (options : FilterOptions<C>) : Filter<C> => {
      if (options.type != 'number') {
        throw new Error()
      }
      return new NumberFilter<C>(options.value, options.field, options.score)
    },
    "stricttext" : (options : FilterOptions<C>) : Filter<C> => {
      if (options.type != 'stricttext') {
        throw new Error()
      }
      return new StrictTextFilter<C>(options.value, options.field, options.score)
    },
    
  }

  appendFilter(options : FilterOptions<C>){
    let filter : Filter<C> = this.map[options.type](options)
    this.filters.push(filter)
    return this
  }
}