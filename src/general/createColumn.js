function createColumn(
  id,
  nameMapColumn,
  title,
  custom = null,
  renderOptionFuc = null
) {
  return {
    id,
    nameMapColumn,
    title,
    custom: {
      backgroundColor: "#17afc4",
      ...custom,
    },
    renderOptionFuc,
  };
}
export default createColumn;
