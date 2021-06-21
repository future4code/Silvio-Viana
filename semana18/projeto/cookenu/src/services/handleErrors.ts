export const isVarchar64 = (arr: string[]) : boolean => {

    for (let item of arr) {

      if (typeof item !== "string" || item.length > 64) { return false }
    }

    return true
}

export const isText = (arr: string[]) : boolean => {

  for (let item of arr) {

    if (typeof item !== "string") { return false }
  }

  return true
}