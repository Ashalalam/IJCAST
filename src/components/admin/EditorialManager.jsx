import React, { useState } from 'react';
import { useJournal } from '../../context/JournalContext';
import { Plus, Edit, Trash2, CheckCircle2, XCircle, Users, ArrowUp, ArrowDown } from 'lucide-react';

export const EditorialManager = () => {
  const { editorialMembers, saveEditorialMember, deleteEditorialMember, toggleEditorialActive, reorderEditorialMembers } = useJournal();
  const [editingMember, setEditingMember] = useState(null);

  const moveUp = (index) => {
    if (index === 0) return;
    const reordered = [...editorialMembers];
    const temp = reordered[index];
    reordered[index] = reordered[index - 1];
    reordered[index - 1] = temp;
    reorderEditorialMembers(reordered);
  };

  const moveDown = (index) => {
    if (index === editorialMembers.length - 1) return;
    const reordered = [...editorialMembers];
    const temp = reordered[index];
    reordered[index] = reordered[index + 1];
    reordered[index + 1] = temp;
    reorderEditorialMembers(reordered);
  };

  const initialForm = {
    name: '',
    role: 'Editorial Board Member',
    designation: '',
    institution: '',
    department: '',
    country: '',
    email: '',
    orcid: '',
    photo_url: '',
    bio: '',
    research_area: '',
    is_active: true
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenNew = () => {
    setEditingMember('new');
    setFormData(initialForm);
  };

  const handleEdit = (mem) => {
    setEditingMember(mem.id);
    setFormData({
      name: mem.name,
      role: mem.role,
      designation: mem.designation || '',
      institution: mem.institution,
      department: mem.department || '',
      country: mem.country,
      email: mem.email || '',
      orcid: mem.orcid || '',
      photo_url: mem.photo_url || '',
      bio: mem.bio || '',
      research_area: mem.research_area || '',
      is_active: mem.is_active ?? true
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await saveEditorialMember({
      ...(editingMember !== 'new' ? { id: editingMember } : {}),
      ...formData
    });
    setEditingMember(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-white">Editorial Board Management</h2>
          <p className="text-xs text-slate-400">Add, Edit, Delete, Activate/Deactivate, and Reorder editorial board members.</p>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center space-x-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Editor</span>
        </button>
      </div>

      {/* Form Modal */}
      {editingMember && (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-sm font-bold text-amber-400 font-serif">
            {editingMember === 'new' ? 'Add New Editorial Board Member' : 'Edit Member Profile'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Editorial Role / Position</label>
              <select
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              >
                <option value="Editor-in-Chief">Editor-in-Chief</option>
                <option value="Associate Editor">Associate Editor</option>
                <option value="Editorial Board Member">Editorial Board Member</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 mb-1">Designation</label>
              <input
                type="text"
                value={formData.designation}
                onChange={e => setFormData({ ...formData, designation: e.target.value })}
                placeholder="Senior Professor of Economics"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Institution</label>
              <input
                type="text"
                required
                value={formData.institution}
                onChange={e => setFormData({ ...formData, institution: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Department</label>
              <input
                type="text"
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                placeholder="Department of Commerce"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 mb-1">Country</label>
              <input
                type="text"
                required
                value={formData.country}
                onChange={e => setFormData({ ...formData, country: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">ORCID ID</label>
              <input
                type="text"
                value={formData.orcid}
                onChange={e => setFormData({ ...formData, orcid: e.target.value })}
                placeholder="0000-0001-8842-1200"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 mb-1">Photograph Image URL</label>
              <input
                type="text"
                value={formData.photo_url}
                onChange={e => setFormData({ ...formData, photo_url: e.target.value })}
                placeholder="https://..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Research Area Domain</label>
              <input
                type="text"
                value={formData.research_area}
                onChange={e => setFormData({ ...formData, research_area: e.target.value })}
                placeholder="Commerce & Management"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">Short Bio</label>
            <textarea
              rows={2}
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setEditingMember(null)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow"
            >
              Save Board Member
            </button>
          </div>
        </form>
      )}

      {/* Table with Actions: Add | Edit | Delete | Activate | Deactivate | Reorder */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
            <tr>
              <th className="p-4">Reorder</th>
              <th className="p-4">Photograph & Name</th>
              <th className="p-4">Role / Position</th>
              <th className="p-4">Institution & Country</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {editorialMembers.map((mem, idx) => (
              <tr key={mem.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => moveUp(idx)}
                      disabled={idx === 0}
                      title="Move Up in Order"
                      className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded disabled:opacity-30"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => moveDown(idx)}
                      disabled={idx === editorialMembers.length - 1}
                      title="Move Down in Order"
                      className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded disabled:opacity-30"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
                <td className="p-4 font-bold text-white font-serif flex items-center space-x-3">
                  <img
                    src={mem.photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop'}
                    alt={mem.name}
                    className="w-9 h-9 rounded-full object-cover border-2 border-amber-500 flex-shrink-0"
                  />
                  <div>
                    <p className="text-white text-sm">{mem.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{mem.email}</p>
                  </div>
                </td>
                <td className="p-4 font-semibold text-amber-400">{mem.role}</td>
                <td className="p-4 text-slate-300">
                  <p>{mem.institution}</p>
                  <p className="text-[10px] text-slate-500">{mem.country}</p>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => toggleEditorialActive(mem.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                      mem.is_active ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {mem.is_active ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(mem)}
                    title="Edit Member Profile"
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteEditorialMember(mem.id)}
                    title="Delete Member"
                    className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
