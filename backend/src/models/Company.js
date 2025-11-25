const supabase = require('../config/supabase');

class Company {
  static async findAll() {
    const { data, error } = await supabase
      .from('companies')
      .select('*');
    if (error) throw error;
    return data;
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }

  static async create(companyData) {
    const { data, error } = await supabase
      .from('companies')
      .insert(companyData)
      .select()
      .single();
    if (error) throw error;
    return data;
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
}

module.exports = Company;