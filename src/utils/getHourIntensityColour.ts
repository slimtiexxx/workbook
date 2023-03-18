export const getHourIntensityColour = (hour: number) => {
  if (hour >= 3) {
    return 'bg-green-600'
  }

  if (hour >= 1) {
    return 'bg-green-800'
  }

  if (hour > 0) {
    return 'bg-green-900'
  }

  return 'bg-stone-600'
}
