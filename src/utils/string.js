const slugify = (s) => {
  return s.toLowerCase().replace(/ /g, '-');
};

const capitalise = (s) => {
  return s[0].toUpperCase() + s.substring(1);
}

export default {slugify, capitalise};