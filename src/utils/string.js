const slugify = (s) => s.toLowerCase().replace(/ /g, '-');

const capitalise = (s) => s[0].toUpperCase() + s.substring(1);

const humanReadableDate = (dateStr) => (new Date(dateStr))
  .toLocaleDateString('en-us', {year: 'numeric', month: 'long', day: 'numeric'})
;

export default {slugify, capitalise, humanReadableDate};