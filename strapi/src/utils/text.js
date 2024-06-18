const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const slugify = str => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const periodName = (start, end) => {
  return [start, end].filter(period => period).join(' - ');
};

module.exports = {
  capitalize,
  slugify,
  periodName,
};
