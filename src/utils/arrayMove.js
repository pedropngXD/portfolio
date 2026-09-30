export function arrayMove(array, fromIndex, toIndex) {
  const newArray = [...array]
  const [removed] = newArray.splice(fromIndex, 1)
  newArray.splice(toIndex, 0, removed)
  return newArray
}
