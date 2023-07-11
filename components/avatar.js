import ContentfulImage from './contentful-image'

export default function Avatar({ name, picture }) {
  return (
    <div className="avatar">
      <div className="avatar__portrait">
        <div>Bilde av forfatteren</div>
        {/* <ContentfulImage
          src={picture.url}
          layout="fill"
          alt={name}
        /> */}
      </div>
      <div>{name}</div>
    </div>
  )
}
