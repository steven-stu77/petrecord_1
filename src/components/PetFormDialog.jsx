import { useState, useEffect } from 'react';

export function PetFormDialog({ open, onClose, onSave, editingPet }) {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    birthday: '',
    photo: '',
  });

  useEffect(() => {
    if (editingPet) {
      setFormData({
        name: editingPet.name,
        species: editingPet.species,
        breed: editingPet.breed,
        birthday: editingPet.birthday,
        photo: editingPet.photo,
      });
    } else {
      setFormData({
        name: '',
        species: '',
        breed: '',
        birthday: '',
        photo: '',
      });
    }
  }, [editingPet, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPet) {
      onSave({ ...formData, id: editingPet.id });
    } else {
      onSave(formData);
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {editingPet ? 'Edit Pet' : 'Add New Pet'}
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter pet's name"
              />
            </div>
            <div>
              <label htmlFor="species" className="block text-sm font-medium text-gray-700 mb-2">
                Species
              </label>
              <select
                id="species"
                value={formData.species}
                onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-2">
                Breed
              </label>
              <input
                id="breed"
                type="text"
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter breed"
              />
            </div>
            <div>
              <label htmlFor="birthday" className="block text-sm font-medium text-gray-700 mb-2">
                Birthday
              </label>
              <input
                id="birthday"
                type="date"
                value={formData.birthday}
                onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-2">
                Photo URL
              </label>
              <input
                id="photo"
                type="url"
                value={formData.photo}
                onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                placeholder="https://example.com/pet-photo.jpg"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors duration-200 font-medium"
              >
                {editingPet ? 'Update' : 'Add'} Pet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
