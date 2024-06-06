const createQuery = (query = '', replacements = {}) => {
  const regex = new RegExp(Object.keys(replacements).join('|'), 'gi');
  return query.replace(regex, (matched) => replacements[matched]);
};

module.exports = {
  createQuery,
};
