function createColumn(
  id,
  nameMapColumn,
  title,
  custom = null,
  renderOptionFunc = null
) {
  return {
    id,
    nameMapColumn,
    title,
    custom: {
      backgroundColor: "#17afc4",
      ...custom,
    },
    renderOptionFunc,
  };
}
export default createColumn;
