const base = require("@kyraa/tailwind/tailwind.config");
module.exports = {
  ...base,
  content: ["./src/**/*.{html,js}"],
  prefix: "tw-",
};
