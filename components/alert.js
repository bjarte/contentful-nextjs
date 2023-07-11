import Container from './container'

export default function Alert({ preview }) {

  if (preview) {
    return (
      <div className="border-b bg-accent-7 border-accent-7 text-white">
        <Container>
          <div className="py-2 text-center text-sm">
            This is page is a preview. <a href="/api/exit-preview">Click here to exit preview mode.</a>
          </div>
        </Container>
      </div>
    )
  } else {
    return (
      <div className="border-b bg-accent-7 border-accent-7 text-white">
        <Container>
          <div className="py-2 text-center text-sm">
            This is page is NOT a preview.
          </div>
        </Container>
      </div>
    )
  }
}
