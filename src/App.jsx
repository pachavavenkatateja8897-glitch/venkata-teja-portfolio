import './App.css'

function App() {
  return (
    <main className="portfolio">
      <h1>PACHAVA VENKATA TEJA</h1>
      <p>VIDEO EDITOR × AI CREATIVE</p>

      <section className="showreel-section">
        <h2>SHOWREEL</h2>

        <video
          className="showreel"
          controls
          preload="metadata"
        >
          <source src="/media/showreel.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>
    </main>
  )
}

export default App