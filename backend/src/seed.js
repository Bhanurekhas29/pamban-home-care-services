require('dotenv').config();
const bcrypt = require('bcryptjs');
const {
  sequelize, Admin, SiteSetting, MenuItem, Service, ServicesSection, PhysiotherapySection, PhysiotherapyTreatment,
  WhyChooseSection, ProfessionalCareSection, PromisesSection, HowItWorksSection, GoogleSection, ContactSection,
  FooterSection, SeoSetting,
} = require('./models');
const whyChooseDefaults = require('./controllers/whyChooseController').defaults;
const professionalCareDefaults = require('./controllers/professionalCareController').defaults;
const promisesDefaults = require('./controllers/promisesController').defaults;
const physioDefaults = require('./controllers/physiotherapyController').section.defaults;
const servicesSectionDefaults = require('./controllers/servicesController').section.defaults;

(async () => {
  await sequelize.sync();

  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  const email = process.env.ADMIN_EMAIL || null;
  const [admin, created] = await Admin.findOrCreate({
    where: { username: process.env.ADMIN_USERNAME },
    defaults: { passwordHash, email },
  });
  if (!created) await admin.update({ passwordHash, ...(email && { email }) });
  console.log(`Admin "${admin.username}" ${created ? 'created' : 'password refreshed'}`);

  await SiteSetting.findOrCreate({ where: { id: 1 } });

  if ((await MenuItem.count()) === 0) {
    await MenuItem.bulkCreate([
      { label: 'Home', link: '#home', sortOrder: 1 },
      { label: 'About Us', link: '#about', sortOrder: 2 },
      { label: 'Home Care Services', link: '#services', sortOrder: 3 },
      { label: 'Physiotherapy', link: '#physiotherapy', sortOrder: 4 },
      { label: 'Why Choose Us', link: '#why-choose-us', sortOrder: 5 },
    ]);
    console.log('Default menu added');
  }

  await ServicesSection.findOrCreate({ where: { id: 1 }, defaults: servicesSectionDefaults });

  await WhyChooseSection.findOrCreate({ where: { id: 1 }, defaults: whyChooseDefaults });
  await ProfessionalCareSection.findOrCreate({ where: { id: 1 }, defaults: professionalCareDefaults });
  await PromisesSection.findOrCreate({ where: { id: 1 }, defaults: promisesDefaults });
  await HowItWorksSection.findOrCreate({ where: { id: 1 }, defaults: require('./controllers/howItWorksController').defaults });
  await SeoSetting.findOrCreate({ where: { id: 1 }, defaults: require('./controllers/seoController').defaults });
  await FooterSection.findOrCreate({ where: { id: 1 }, defaults: require('./controllers/footerController').defaults });
  await GoogleSection.findOrCreate({ where: { id: 1 }, defaults: require('./controllers/googleController').defaults });
  await ContactSection.findOrCreate({ where: { id: 1 }, defaults: require('./controllers/contactController').defaults });

  await PhysiotherapySection.findOrCreate({ where: { id: 1 }, defaults: physioDefaults });

  if ((await PhysiotherapyTreatment.count()) === 0) {
    await PhysiotherapyTreatment.bulkCreate([
      ['Pain Relief Therapy', 'physical_therapy'], ['Post-Surgery Rehabilitation', 'bed'],
      ['Sports Injury Recovery', 'sports_gymnastics'], ['Elderly Physiotherapy', 'elderly'],
      ['Stroke & Neurological Rehabilitation', 'neurology'], ['Strength, Mobility & Balance Training', 'fitness_center'],
    ].map(([title, icon], i) => ({ title, icon, sortOrder: i + 1 })));
    console.log('Physiotherapy treatments added (upload their photos in the admin)');
  }

  if ((await Service.count()) === 0) {
    const cards = [
      ['Elderly Care', 'elderly'], ['Nursing Care', 'stethoscope'], ['Patient Care', 'healing'],
      ['Companion Care', 'favorite'], ['Bedridden Care', 'bed'], ['Palliative Care', 'volunteer_activism'],
      ['Injection & Dressing Care', 'vaccines'], ['Post Hospital Care', 'local_hospital'],
      ['Cooking Service', 'soup_kitchen'], ['Baby Care', 'child_care'],
    ];
    await Service.bulkCreate([
      ...cards.map(([title, icon], i) => ({ title, icon, sortOrder: i + 1 })),
      {
        title: 'Medicine Assistance', icon: 'medication', isWide: true, sortOrder: cards.length + 1,
        description:
          'We assist home care clients with their medicine requirements. If you need medicines, you can contact us for assistance. We coordinate with our associated pharmacy to check medicine availability, arrange the required medicines, and assist with home delivery where available.',
      },
    ]);
    console.log('Services added (upload their photos in the admin)');
  }
  await sequelize.close();
})().catch((e) => { console.error(e.message); process.exit(1); });
