module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;
    if (!data) return;
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === 'string') {
        data[key] = data[key].trim();
      }
    });
  },
  async beforeUpdate(event) {
    const { data } = event.params;
    if (!data) return;
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === 'string') {
        data[key] = data[key].trim();
      }
    });
  },
};
