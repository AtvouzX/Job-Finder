const Company = require('../models/Company');

const companyController = {
  async getAllCompanies(req, res) {
    try {
      const filters = {
        q: req.query.q,
        location: req.query.location,
      }
      const companies = await Company.findAll(filters);
      res.json(companies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCompanyById(req, res) {
    try {
      const { id } = req.params;
      const company = await Company.findById(id);
      res.json(company);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createCompany(req, res) {
    try {
      let companyData = req.body;
      // Generate slug from name if not provided
      if (!companyData.slug && companyData.name) {
        companyData.slug = companyData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      }
      const newCompany = await Company.create(companyData);
      res.status(201).json(newCompany);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateCompany(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedCompany = await Company.update(id, updates);
      res.json(updatedCompany);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteCompany(req, res) {
    try {
      const { id } = req.params;
      await Company.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createCompanies(req, res) {
    try {
      let companiesData = req.body;
      if (Array.isArray(companiesData)) {
        companiesData = companiesData.map(company => {
          if (!company.slug && company.name) {
            company.slug = company.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
          }
          return company;
        });
      }
      const newCompanies = await Company.createBulk(companiesData);
      res.status(201).json(newCompanies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = companyController;