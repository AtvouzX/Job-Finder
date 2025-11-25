const supabase = require('../config/supabase');

class Job {
  static async findAll() {
    const { data, error } = await supabase
      .from('jobs')
      .select('*, companies(name, website)')
      .eq('is_published', true)
      .order('posted_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('jobs')
      .select('*, companies(name, website)')
      .eq('id', id)
      .single();
    if (error) throw error;
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