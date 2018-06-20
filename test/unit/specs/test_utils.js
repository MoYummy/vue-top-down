export function domEqual(resultHTML, expectHTML, expectEqual = true) {
  const res = document.createElement('div')
  res.innerHTML = resultHTML
  const exp = document.createElement('div')
  exp.innerHTML = expectHTML
  const isEqual = res.isEqualNode(exp)
  if (expectEqual != isEqual) {
    console.error('\nResult:' + res.innerHTML + '\nExpect:' + exp.innerHTML + '\n')
  }
  return isEqual
}

export function objEqual(resultObj, expectObj) {
  return JSON.stringify(resultObj) === JSON.stringify(expectObj)
}