export default function formatExpirationDate(date) {
  const newDate = new Date(date);

  const year = newDate.getFullYear();
  const month = (newDate.getMonth() + 1).toLocaleString('en-US', {
    // the method getMonth() returns the index, that's why we have to add 1 to it
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const day = newDate
    .getDate()
    .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}
