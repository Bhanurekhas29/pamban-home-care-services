const blank = (value) => !value || !String(value).trim();

// Builds a validate(values) function: returns a message for the first problem, or undefined.
//   required: [[field, 'Label'], ...]            must not be empty
//   pairs:    [[fieldA, fieldB, 'Name'], ...]    fill in both or leave both empty
function validator({ required = [], pairs = [] }) {
  return (values) => {
    for (const [field, label] of required) {
      if (blank(values[field])) return `${label} is required`;
    }
    for (const [a, b, name] of pairs) {
      if (blank(values[a]) !== blank(values[b])) {
        return `${name}: fill in both the text and the link, or leave both empty`;
      }
    }
    return undefined;
  };
}

// For a JSON list of records: message if any record has an empty `field`, e.g. "Step 2 needs a title"
validator.itemProblem = (items, field, noun, what) => {
  const index = (items || []).findIndex((item) => blank(item[field]));
  return index >= 0 ? `${noun} ${index + 1} needs ${what}` : undefined;
};

validator.blank = blank;

module.exports = validator;
