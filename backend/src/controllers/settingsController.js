const { SiteSetting } = require('../models');

// site_settings always holds a single row
const getRow = async () => (await SiteSetting.findOrCreate({ where: { id: 1 } }))[0];

exports.get = async (req, res) => res.json(await getRow());

exports.update = async (req, res) => {
  const row = await getRow();
  const {
    siteName, tagline, headerLogoUrl, footerLogoUrl, ctaLabel, ctaLink,
    showCredit, creditText, creditUrl,
  } = req.body;
  if (siteName !== undefined && !siteName.trim()) {
    return res.status(400).json({ message: 'Website name is required' });
  }
  await row.update({
    siteName, tagline, headerLogoUrl, footerLogoUrl, ctaLabel, ctaLink,
    showCredit, creditText, creditUrl,
  });
  res.json(row);
};
