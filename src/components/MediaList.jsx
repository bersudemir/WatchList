import MediaCard from './MediaCard.jsx'

function MediaList({ mediaItems, searchTerm, onEdit, onDelete }) {
  if (mediaItems.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon" aria-hidden="true">◇</div>
        <h3>{searchTerm ? 'Eşleşen bir yapım bulunamadı' : 'Listen henüz boş'}</h3>
        <p>
          {searchTerm
            ? 'Farklı bir yapım adıyla tekrar aramayı dene.'
            : 'İzlemek istediğin ilk film veya diziyi yukarıdaki formdan ekle.'}
        </p>
      </div>
    )
  }

  return (
    <div className="media-grid">
      {mediaItems.map((media) => (
        <MediaCard key={media.id} media={media} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default MediaList
