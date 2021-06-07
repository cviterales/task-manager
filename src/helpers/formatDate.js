export const formatDate = (date) => {
  const dateFormat = new Date(date).toLocaleString("es-ES", {
    "day":"2-digit",
    "month": "2-digit",
    "year": "numeric"
  })
  return dateFormat;
}