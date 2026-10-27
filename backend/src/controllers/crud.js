// Generic list/get/create/update/delete handlers, used by the admin panel
// `autoOrder`: new rows go to the end of the sortOrder sequence; adds a reorder handler
// `validate(values)` returns an error message (or nothing) for the row as it would be saved
module.exports = function crud(Model, { include, order = [['id', 'DESC']], autoOrder = false, validate } = {}) {
  return {
    reorder: async (req, res) => {
      const { ids } = req.body;
      if (!Array.isArray(ids)) return res.status(400).json({ message: 'ids must be a list' });
      await Promise.all(ids.map((id, i) => Model.update({ sortOrder: i + 1 }, { where: { id } })));
      res.json({ message: 'Order saved' });
    },
    list: async (req, res) => {
      const rows = await Model.findAll({ include, order });
      res.json(rows);
    },
    get: async (req, res) => {
      const row = await Model.findByPk(req.params.id, { include });
      if (!row) return res.status(404).json({ message: 'Not found' });
      res.json(row);
    },
    create: async (req, res) => {
      const body = { ...req.body };
      const problem = validate && validate(body);
      if (problem) return res.status(400).json({ message: problem });
      if (autoOrder) body.sortOrder = ((await Model.max('sortOrder')) || 0) + 1;
      const row = await Model.create(body);
      res.status(201).json(row);
    },
    update: async (req, res) => {
      const row = await Model.findByPk(req.params.id);
      if (!row) return res.status(404).json({ message: 'Not found' });
      const problem = validate && validate({ ...row.toJSON(), ...req.body });
      if (problem) return res.status(400).json({ message: problem });
      await row.update(req.body);
      res.json(row);
    },
    remove: async (req, res) => {
      const row = await Model.findByPk(req.params.id);
      if (!row) return res.status(404).json({ message: 'Not found' });
      await row.destroy();
      res.json({ message: 'Deleted' });
    },
  };
};
