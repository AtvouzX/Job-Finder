const supabase = require('../config/supabase');

class Company {
  static async findAll(filters = {}) {
    const { q, location } = filters

    let query = supabase
      .from('companies')
      .select('*')

    // Apply filters
    if (q) {
      const like = `%${q}%`
      query = query.ilike('name', like)
    }

    if (location) {
      const likeLoc = `%${location}%`
      query = query.ilike('location', likeLoc)
    }

    const { data, error } = await query
    if (error) throw error;

    // attach job_count for each company (use count head query)
    const companiesWithCount = await Promise.all(
      data.map(async (company) => {
        const { count, error: countError } = await supabase
          .from('jobs')
          .select('id', { count: 'exact', head: true })
          .eq('company_id', company.id);
        if (countError) throw countError;
        return { ...company, job_count: count || 0 };
      })
    );

    return companiesWithCount;
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;

    // get job count for this company
    const { count, error: countError } = await supabase
      .from('jobs')
      .select('id', { count: 'exact', head: true })
      .eq('company_id', id);
    if (countError) throw countError;

    return { ...data, job_count: count || 0 };
  }

  static async create(companyData) {
    const { data, error } = await supabase
      .from('companies')
      .insert(companyData)
      .select()
      .single();
    if (error) throw error;
    // new company has no jobs yet
    return { ...data, job_count: 0 };
  }

  static async update(id, updates) {
    const { data, error } = await supabase
      .from('companies')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async delete(id) {
    const { error } = await supabase
      .from('companies')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }

  static async createBulk(companiesData) {
    const { data, error } = await supabase
      .from('companies')
      .insert(companiesData)
      .select();
    if (error) throw error;
    return data;
  }
}

module.exports = Company;