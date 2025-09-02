require('dotenv').config();
const mongoose = require('mongoose');
const { sequelize } = require('../lib/sql');
const ReportMongo = require('../models/Report');
const { ReportSql } = require('../models/ReportSql');

async function run() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('MONGODB_URI not set in env. Aborting migration.');
    process.exit(1);
  }

  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  try {
    await sequelize.authenticate();
    console.log('Connected to SQL DB');
    await sequelize.sync({ alter: true });
    console.log('SQL models synced');

    const reports = await ReportMongo.find().lean();
    console.log('Found', reports.length, 'reports in MongoDB');

    let migrated = 0;
    for (const r of reports) {
      await ReportSql.create({
        title: r.title,
        description: r.description,
        status: r.status || 'pending',
        date: r.date || new Date()
      });
      migrated++;
    }
    console.log('Migrated', migrated, 'reports to SQL');
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    await mongoose.disconnect();
    await sequelize.close();
    process.exit(0);
  }
}

run();
