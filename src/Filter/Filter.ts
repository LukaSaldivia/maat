export default abstract class Filter<C extends string> {
  field: C
  score: number
  fallbackCase = "CASE WHEN 1=1 THEN 0 ELSE 0 END"
  constructor(field: C, score?: number) {
    this.field = field
    this.score = score || 1
  }

  get(): string {
    let cases : string[] = []
    cases.push(this._buildCaseQuery())
    cases.unshift(this.fallbackCase)
    return cases.join('+')
  }

  abstract _buildCaseQuery() : string

  abstract value(): string[]
}