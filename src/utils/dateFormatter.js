export function formatDateString(inputDateString) {
  const dateParts = inputDateString.split('-')

  const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2])

  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const formattedDateString = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`

  return formattedDateString
}

export function unformatDateString(inputDate) {
  const parts = inputDate.split('.');
  if (parts.length === 3) {
    const unformattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return unformattedDate;
  }
}