const supabase = require('../config/supabase');

class Job {
  static async findAll(filters = {}) {
    const { q, location, is_remote, salary_min, salary_max } = filters

    let query = supabase
      .from('jobs')
      .select('*, companies(name, website, contact_email)')
      .eq('is_published', true)

    // Apply free-text search across common fields
    if (q) {
      const like = `%${q}%`
      // Search title OR short_description OR description
      query = query.or(
        `title.ilike.${like},short_description.ilike.${like},description.ilike.${like}`
      )
    }

    if (location) {
      const likeLoc = `%${location}%`
      query = query.ilike('location', likeLoc)
    }

    if (is_remote !== undefined) {
      query = query.eq('is_remote', is_remote)
    }

    if (salary_min !== undefined) {
      query = query.gte('salary_min', salary_min)
    }

    if (salary_max !== undefined) {
      query = query.lte('salary_max', salary_max)
    }

    const { data, error } = await query.order('posted_at', { ascending: false })
    if (error) throw error

    // Fetch company data for each job
    const jobsWithCompanies = await Promise.all(
      data.map(async (job) => {
        if (job.company_id) {
          const { data: companyData, error: companyError } = await supabase
            .from('companies')
            .select('name, website, contact_email')
            .eq('id', job.company_id)
            .single();

          if (!companyError && companyData) {
            job.companies = companyData;
          }
        }
        return job;
      })
    );

    return jobsWithCompanies
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;

    // Fetch company data separately to ensure contact_email is included
    if (data.company_id) {
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .select('name, website, contact_email')
        .eq('id', data.company_id)
        .single();

      if (!companyError && companyData) {
        data.companies = companyData;
      }
    }

    return data;
  }

  static async create(jobData) {
    const { data, error } = await supabase
      .from('jobs')
      .insert(jobData)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async createBulk(jobArray) {
    if (!Array.isArray(jobArray)) {
      throw new Error('createBulk expects an array of job objects')
    }

    // Insert multiple rows at once and return inserted rows
    const { data, error } = await supabase
      .from('jobs')
      .insert(jobArray)
      .select();

    if (error) throw error;
    return data;
  }

  static async update(id, updates) {
    const { data, error } = await supabase
      .from('jobs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async delete(id) {
    const { error } = await supabase
      .from('jobs')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }

  static async findByCompany(companyId) {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('company_id', companyId);
    if (error) throw error;
    return data;
  }
}

module.exports = Job;