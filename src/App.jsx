import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Check, Code2, Palette, ShoppingBag } from 'lucide-react'

const services = [
  {
    id: 'design', number: '01', label: 'Design', title: 'A site that feels like you.',
    detail: 'Thoughtful visual direction and clear page layouts, shaped around your brand and the people you want to reach.',
    features: ['Visual direction', 'Responsive page design', 'Content structure'], icon: Palette,
  },
  {
    id: 'development', number: '02', label: 'Development', title: 'Made to work everywhere.',
    detail: 'Accessible, responsive websites built with modern open-source tools and the flexibility to grow with you.',
    features: ['Responsive implementation', 'Accessibility-minded details', 'Performance foundations'], icon: Code2,
  },
  {
    id: 'stores', number: '03', label: 'Online stores', title: 'A smoother way to shop.',
    detail: 'A considered storefront that makes it easy for people to discover your products and place an order.',
    features: ['Product storytelling', 'Simple shopping journeys', 'Mobile-first storefronts'], icon: ShoppingBag,
  },
]

const processSteps = [
  { number: '01', title: 'Get aligned', detail: 'We learn about your business, your audience, and what the site needs to do.' },
  { number: '02', title: 'Make it real', detail: 'We shape the design and build, sharing progress and decisions as we go.' },
  { number: '03', title: 'Go live', detail: 'We help prepare your site for launch and make sure the handoff is clear.' },
]

function App() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0)
  const activeService = services[activeServiceIndex]
  const ActiveServiceIcon = activeService.icon

  function handleServiceKeyDown(event, currentIndex) {
    let nextIndex = currentIndex

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % services.length
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + services.length) % services.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = services.length - 1
    } else {
      return
    }

    event.preventDefault()
    setActiveServiceIndex(nextIndex)
    document.getElementById(`service-tab-${services[nextIndex].id}`)?.focus()
  }

  return (
    <main className="site-shell">
      <header className="site-header flex items-center justify-between px-5 sm:px-8">
        <a className="wordmark" href="#top" aria-label="Vexa home">vexa<sup>®</sup></a>
        <nav className="main-nav flex items-center gap-5 sm:gap-9" aria-label="Main navigation">
          <a href="#services">Services</a>
          <a className="nav-contact" href="mailto:vexa.works.bussniess@gmail.com">
            Start a project <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Independent web studio</p>
          <h1>Good ideas deserve a <span>good website.</span></h1>
          <p className="hero-description">Vexa designs and builds thoughtful websites for people ready to grow online.</p>
          <div className="hero-bottom">
            <a className="primary-link" href="mailto:vexa.works.bussniess@gmail.com">
              Tell us what you’re making <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <span className="hero-note">Design · Development · E-commerce</span>
          </div>
        </div>

        <div className="preview-wrap" aria-label="Example website layout preview">
          <div className="site-preview">
            <div className="preview-bar">
              <span className="preview-dots"><i /><i /><i /></span>
              <span>your-next-thing.com</span>
              <span className="preview-menu">MENU</span>
            </div>
            <div className="preview-content">
              <div className="preview-brand">GOOD THINGS STUDIO</div>
              <div className="preview-heading">A little more<br /><em>you.</em></div>
              <div className="preview-bottom">
                <span>Thoughtful design for everyday living.</span>
                <span className="preview-cta">EXPLORE <ArrowRight size={13} /></span>
              </div>
              <div className="preview-shape" aria-hidden="true"><span>01</span></div>
            </div>
          </div>
          <span className="preview-caption">A site should feel like your business.</span>
        </div>
      </section>

      <section className="services-section section-pad" id="services">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A few ways we can help</p>
            <h2>From first thought<br />to <span>live website.</span></h2>
          </div>
          <p className="section-aside">Choose what you need.<br />We’ll figure out the rest together.</p>
        </div>
        <div className="service-experience">
          <div className="service-tabs" role="tablist" aria-label="Vexa services">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <button
                  aria-controls="service-panel"
                  aria-selected={activeServiceIndex === index}
                  className={`service-tab${activeServiceIndex === index ? ' is-active' : ''}`}
                  id={`service-tab-${service.id}`}
                  key={service.id}
                  onClick={() => setActiveServiceIndex(index)}
                  onKeyDown={(event) => handleServiceKeyDown(event, index)}
                  role="tab"
                  tabIndex={activeServiceIndex === index ? 0 : -1}
                  type="button"
                >
                  <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
                  <span>{service.label}</span>
                  <ArrowRight className="tab-arrow" size={15} aria-hidden="true" />
                </button>
              )
            })}
          </div>
          <div
            aria-labelledby={`service-tab-${activeService.id}`}
            className="service-panel"
            id="service-panel"
            key={activeService.id}
            role="tabpanel"
            tabIndex={0}
          >
            <div className="panel-heading">
              <span className="panel-icon"><ActiveServiceIcon size={23} strokeWidth={1.6} aria-hidden="true" /></span>
              <span className="panel-kicker">Service {activeService.number}</span>
            </div>
            <h3>{activeService.title}</h3>
            <p className="panel-description">{activeService.detail}</p>
            <ul className="service-features">
              {activeService.features.map((feature) => (
                <li key={feature}><Check size={15} aria-hidden="true" />{feature}</li>
              ))}
            </ul>
            <a className="panel-link" href={`mailto:vexa.works.bussniess@gmail.com?subject=${encodeURIComponent(`Let's talk about ${activeService.label.toLowerCase()}`)}`}>
              Ask about {activeService.label.toLowerCase()} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="process-section section-pad" id="process">
        <div className="process-heading">
          <p className="eyebrow">Good work, clearly done</p>
          <h2>A simple process.<br /><span>No mystery.</span></h2>
        </div>
        <div className="process-grid">
          {processSteps.map((step) => (
            <article className="process-step" key={step.number}>
              <span className="process-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer section-pad" id="contact">
        <div className="footer-cta">
          <div>
            <p className="eyebrow">Have a project in mind?</p>
            <h2>Let’s build<br /><span>something good.</span></h2>
          </div>
          <a className="footer-email" href="mailto:vexa.works.bussniess@gmail.com">
            Email Vexa <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="footer-bottom">
          <a className="wordmark footer-wordmark" href="#top">vexa<sup>®</sup></a>
          <span>Built with open-source tools</span>
          <div className="footer-tools">
            <a href="https://github.com/facebook/react" target="_blank" rel="noreferrer">React</a>
            <a href="https://github.com/tailwindlabs/tailwindcss" target="_blank" rel="noreferrer">Tailwind</a>
            <a href="https://github.com/lucide-icons/lucide" target="_blank" rel="noreferrer">Lucide</a>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App