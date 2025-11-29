require('dotenv').config();
const express = require('express');
const cors = require('cors');
const companiesRouter = require('./routes/companies');
const jobsRouter = require('./routes/jobs');
const savedJobsRouter = require('./routes/savedJobs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/companies', companiesRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/saved', savedJobsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});