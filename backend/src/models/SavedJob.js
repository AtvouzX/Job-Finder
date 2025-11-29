const supabase = require('../config/supabase');

class SavedJob {
  static async findAll(filters = {}) {
    const { job_id } = filters;

    let query = supabase
      .from('saved_jobs')
      .select('*, jobs(*, companies(name, website, contact_email))');

    if (job_id) {
      query = query.eq('job_id', job_id);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error) throw error;

    return data;
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('saved_jobs')
      .select('*, jobs(*, companies(name, website, contact_email))')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  static async create(savedJobData) {
    const { data, error } = await supabase
      .from('saved_jobs')
      .insert(savedJobData)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async update(id, updates) {
    const { data, error } = await supabase
      .from('saved_jobs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  static async delete(id) {
    const { error } = await supabase
      .from('saved_jobs')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return true;
  }

  static async findByJob(jobId) {
    const { data, error } = await supabase
      .from('saved_jobs')
      .select('*')
      .eq('job_id', jobId)
      .single();
    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is not found
    return data;
  }
}

module.exports = SavedJob;