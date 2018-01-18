export const delay = function (ms: number): Promise<{}> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
