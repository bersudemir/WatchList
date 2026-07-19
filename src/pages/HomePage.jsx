import { useEffect, useState } from 'react'
import MediaForm from '../components/MediaForm.jsx'
import MediaList from '../components/MediaList.jsx'

const STORAGE_KEY = 'watchlist-items'

const initialMedia = [
  { id: 'sample-1', title: 'Interstellar', type: 'Film', category: 'Bilim Kurgu', status: 'İzlendi' },
  { id: 'sample-2', title: 'Breaking Bad', type: 'Dizi', category: 'Dram', status: 'İzlendi' },
  { id: 'sample-3', title: 'Inception', type: 'Film', category: 'Bilim Kurgu', status: 'İzlendi' },
  { id: 'sample-4', title: 'Dark', type: 'Dizi', category: 'Bilim Kurgu', status: 'İzleniyor' },
  { id: 'sample-5', title: 'The Truman Show', type: 'Film', category: 'Dram', status: 'İzlenecek' },
  { id: 'sample-6', title: 'Sherlock', type: 'Dizi', category: 'Dram', status: 'İzlendi' },
  { id: 'sample-7', title: 'The Matrix', type: 'Film', category: 'Bilim Kurgu', status: 'İzlendi' },
  { id: 'sample-8', title: 'Friends', type: 'Dizi', category: 'Komedi', status: 'İzleniyor' },
  { id: 'sample-9', title: 'Parasite', type: 'Film', category: 'Dram', status: 'İzlenecek' },
  { id: 'sample-10', title: 'Stranger Things', type: 'Dizi', category: 'Bilim Kurgu', status: 'İzlenecek' },
  { id: 'sample-11', title: 'The Office', type: 'Dizi', category: 'Komedi', status: 'İzleniyor' },
  { id: 'sample-12', title: 'The Prestige', type: 'Film', category: 'Dram', status: 'İzlenecek' },
]

function getSavedMedia() {
  try {
    const savedValue = localStorage.getItem(STORAGE_KEY)

    if (savedValue === null) {
      return initialMedia
    }

    const savedMedia = JSON.parse(savedValue)
    return Array.isArray(savedMedia) ? savedMedia : []
  } catch {
    return []
  }
}

function HomePage() {
  const [mediaItems, setMediaItems] = useState(getSavedMedia)
  const [editingMedia, setEditingMedia] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mediaItems))
  }, [mediaItems])

  function handleSave(formData) {
    if (editingMedia) {
      setMediaItems((currentItems) =>
        currentItems.map((item) =>
          item.id === editingMedia.id ? { ...item, ...formData } : item,
        ),
      )
      setEditingMedia(null)
      return
    }

    const newMedia = {
      id: `${Date.now()}-${Math.random()}`,
      ...formData,
    }
    setMediaItems((currentItems) => [newMedia, ...currentItems])
  }

  function handleDelete(id) {
    setMediaItems((currentItems) => currentItems.filter((item) => item.id !== id))

    if (editingMedia?.id === id) {
      setEditingMedia(null)
    }
  }

  function handleEdit(media) {
    setEditingMedia(media)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const normalizedSearch = searchTerm.trim().toLocaleLowerCase('tr-TR')
  const filteredMedia = mediaItems.filter((item) =>
    item.title.toLocaleLowerCase('tr-TR').includes(normalizedSearch),
  )

  const summary = [
    { label: 'Toplam', count: mediaItems.length, className: 'summary-total' },
    {
      label: 'İzlenecek',
      count: mediaItems.filter((item) => item.status === 'İzlenecek').length,
      className: 'summary-planned',
    },
    {
      label: 'İzleniyor',
      count: mediaItems.filter((item) => item.status === 'İzleniyor').length,
      className: 'summary-watching',
    },
    {
      label: 'İzlendi',
      count: mediaItems.filter((item) => item.status === 'İzlendi').length,
      className: 'summary-watched',
    },
  ]

  return (
    <>
      <header className="hero-header">
        <div className="header-glow" aria-hidden="true" />
        <div className="container header-content">
          <div className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="header-label">KİŞİSEL İZLEME LİSTEN</p>
          <h1>WATCH<span>LIST</span></h1>
          <p className="header-description">Film ve dizilerini keşfet, kaydet ve takip et.</p>
        </div>
      </header>

      <main className="container main-content">
        <section className="summary-grid" aria-label="İzleme listesi özeti">
          {summary.map((item) => (
            <div className={`summary-card ${item.className}`} key={item.label}>
              <div>
                <p>{item.label}</p>
                <strong>{item.count}</strong>
              </div>
              <span className="summary-indicator" aria-hidden="true" />
            </div>
          ))}
        </section>

        <MediaForm
          key={editingMedia?.id ?? 'new-media'}
          editingMedia={editingMedia}
          onSave={handleSave}
          onCancel={() => setEditingMedia(null)}
        />

        <section className="list-section" aria-labelledby="list-title">
          <div className="list-header">
            <div>
              <p className="eyebrow">KOLEKSİYON</p>
              <h2 id="list-title">İzleme listem</h2>
            </div>
            <label className="search-box">
              <span className="sr-only">Yapım adına göre ara</span>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m21 21-4.35-4.35m2.35-5.4A7.75 7.75 0 1 1 3.5 11.25a7.75 7.75 0 0 1 15.5 0Z" />
              </svg>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Yapım ara..."
              />
            </label>
          </div>

          <MediaList
            mediaItems={filteredMedia}
            searchTerm={searchTerm}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </main>

      <footer>
        <div className="container">WATCHLIST · İzlediklerin hep yanında</div>
      </footer>
    </>
  )
}

export default HomePage
