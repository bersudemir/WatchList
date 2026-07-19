const statusClassNames = {
  İzlenecek: 'status-planned',
  İzleniyor: 'status-watching',
  İzlendi: 'status-watched',
}

function MediaCard({ media, onEdit, onDelete }) {
  return (
    <article className="media-card">
      <div className="media-card-top">
        <span className="media-type">{media.type}</span>
        <span className={`status-badge ${statusClassNames[media.status]}`}>
          <span className="status-dot" aria-hidden="true" />
          {media.status}
        </span>
      </div>

      <div className="media-card-content">
        <h3>{media.title}</h3>
        <p>{media.category}</p>
      </div>

      <div className="media-card-actions">
        <button className="card-button edit-button" type="button" onClick={() => onEdit(media)}>
          Düzenle
        </button>
        <button
          className="card-button delete-button"
          type="button"
          onClick={() => onDelete(media.id)}
          aria-label={`${media.title} kaydını sil`}
        >
          Sil
        </button>
      </div>
    </article>
  )
}

export default MediaCard
