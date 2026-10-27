// get/update handlers for a table that always holds a single row (hero, about us, ...)
// `validate(values)` gets the row as it would look after the update and returns an error message or nothing
module.exports = function singleton(Model, defaults = {}, validate) {
  const getRow = async () => (await Model.findOrCreate({ where: { id: 1 }, defaults }))[0];

  return {
    defaults,

    get: async (req, res) => res.json(await getRow()),

    update: async (req, res) => {
      const row = await getRow();
      const changes = {};
      Object.keys(Model.rawAttributes).forEach((key) => {
        if (!['id', 'createdAt', 'updatedAt'].includes(key) && req.body[key] !== undefined) {
          changes[key] = req.body[key];
        }
      });
      const problem = validate && validate({ ...row.toJSON(), ...changes });
      if (problem) return res.status(400).json({ message: problem });
      await row.update(changes);
      res.json(row);
    },
  };
};
