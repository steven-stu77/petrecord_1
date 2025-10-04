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
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '1.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        width: '100%',
        maxWidth: '28rem',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: 'rgb(31, 41, 55)'
            }}>
              {editingPet ? 'Edit Pet' : 'Add New Pet'}
            </h2>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label htmlFor="name" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'rgb(55, 65, 81)',
                marginBottom: '0.5rem'
              }}>
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid rgb(209, 213, 219)',
                  borderRadius: '0.75rem',
                  outline: 'none',
                  fontSize: '1rem'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(59, 130, 246)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(209, 213, 219)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                placeholder="Enter pet's name"
              />
            </div>
            <div>
              <label htmlFor="species" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'rgb(55, 65, 81)',
                marginBottom: '0.5rem'
              }}>
                Species
              </label>
              <select
                id="species"
                value={formData.species}
                onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid rgb(209, 213, 219)',
                  borderRadius: '0.75rem',
                  outline: 'none',
                  fontSize: '1rem',
                  backgroundColor: 'white'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(59, 130, 246)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(209, 213, 219)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
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
              <label htmlFor="breed" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'rgb(55, 65, 81)',
                marginBottom: '0.5rem'
              }}>
                Breed
              </label>
              <input
                id="breed"
                type="text"
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid rgb(209, 213, 219)',
                  borderRadius: '0.75rem',
                  outline: 'none',
                  fontSize: '1rem'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(59, 130, 246)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(209, 213, 219)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                placeholder="Enter breed"
              />
            </div>
            <div>
              <label htmlFor="birthday" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'rgb(55, 65, 81)',
                marginBottom: '0.5rem'
              }}>
                Birthday
              </label>
              <input
                id="birthday"
                type="date"
                value={formData.birthday}
                onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid rgb(209, 213, 219)',
                  borderRadius: '0.75rem',
                  outline: 'none',
                  fontSize: '1rem'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(59, 130, 246)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(209, 213, 219)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            <div>
              <label htmlFor="photo" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: 'rgb(55, 65, 81)',
                marginBottom: '0.5rem'
              }}>
                Photo URL
              </label>
              <input
                id="photo"
                type="url"
                value={formData.photo}
                onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                placeholder="https://example.com/pet-photo.jpg"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid rgb(209, 213, 219)',
                  borderRadius: '0.75rem',
                  outline: 'none',
                  fontSize: '1rem'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(59, 130, 246)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgb(209, 213, 219)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: '0.5rem 1rem',
                  border: '1px solid rgb(209, 213, 219)',
                  color: 'rgb(55, 65, 81)',
                  borderRadius: '9999px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  fontWeight: '500',
                  fontSize: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(249, 250, 251)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  flex: 1,
                  padding: '0.5rem 1rem',
                  backgroundColor: 'rgb(59, 130, 246)',
                  color: 'white',
                  borderRadius: '9999px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  fontWeight: '500',
                  fontSize: '1rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(37, 99, 235)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(59, 130, 246)';
                }}
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
