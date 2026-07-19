import { useState } from 'react'

const initialForm = {
  title: '',
  type: 'Film',
  category: 'Aksiyon',
  status: 'İzlenecek',
}

function MediaForm({ editingMedia, onSave, onCancel }) {
  const [formData, setFormData] = useState(() =>
    editingMedia
      ? {
          title: editingMedia.title,
          type: editingMedia.type,
          category: editingMedia.category,
          status: editingMedia.status,
        }
      : initialForm,
  )

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((currentForm) => ({ ...currentForm, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const cleanTitle = formData.title.trim()
    if (!cleanTitle) return

    onSave({ ...formData, title: cleanTitle })
    setFormData(initialForm)
  }

  function handleCancel() {
    setFormData(initialForm)
    onCancel()
  }

  return (
    <section className="form-card" aria-labelledby="form-title">
      <div className="section-heading">
        <div className="section-icon" aria-hidden="true">+</div>
        <div>
          <p className="eyebrow">KOLEKSİYONUN</p>
          <h2 id="form-title">
            {editingMedia ? 'Kaydı düzenle' : 'Yeni yapım ekle'}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="field field-title">
            <label htmlFor="title">Yapım adı</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Örn. Interstellar"
              autoComplete="off"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="type">Tür</label>
            <select id="type" name="type" value={formData.type} onChange={handleChange}>
              <option>Film</option>
              <option>Dizi</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="category">Kategori</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option>Aksiyon</option>
              <option>Komedi</option>
              <option>Dram</option>
              <option>Bilim Kurgu</option>
              <option>Diğer</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="status">İzleme durumu</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>İzlenecek</option>
              <option>İzleniyor</option>
              <option>İzlendi</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          {editingMedia && (
            <button className="button button-secondary" type="button" onClick={handleCancel}>
              Vazgeç
            </button>
          )}
          <button className="button button-primary" type="submit">
            {editingMedia ? 'Güncelle' : 'Listeye ekle'}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
    </section>
  )
}

export default MediaForm
