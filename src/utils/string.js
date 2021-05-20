const slugify = (s) => s.toLowerCase().replace(/ /g, '-');

const capitalise = (s) => s[0].toUpperCase() + s.substring(1);

const humanReadableDate = (dateStr) => (new Date(dateStr))
  .toLocaleDateString('en-us', {year: 'numeric', month: 'long', day: 'numeric'})
;

const queryStringToObj = (queryString) => [...new URLSearchParams(queryString).entries()]
  .reduce((prev, [key,val]) => {prev[key] = val; return prev}, {})
;

export default {slugify, capitalise, humanReadableDate, queryStringToObj};
