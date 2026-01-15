/**
 * Main App Component
 * 
 * This component uses the ContentProvider to provide CMS content
 * to all child components. Content is fetched from the content service
 * which can be configured to use a CMS API.
 */

import './App.css'
import { ContentProvider, useContentContext } from './context/ContentContext'
import { Navbar, Hero, Services, Projects, Contact, Footer } from './components/sections'
import { ErrorBoundary } from './components/ErrorBoundary'

/**
 * Main content component that consumes the content context
 */
function AppContent() {
  const { content, loading, error } = useContentContext();

  // Optional: Show loading state
  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Optional: Show error state (content will still use defaults)
  if (error) {
    console.warn('Content loading error:', error);
  }

  return (
    <div className="app">
      <Navbar content={content.navigation} />
      <Hero content={content.hero} />
      <Services content={content.services} />
      <Projects content={content.projects} />
      <Contact content={content.contact} />
      <Footer content={content.footer} />
    </div>
  );
}

/**
 * App wrapper with ErrorBoundary and ContentProvider
 */
function App() {
  return (
    <ErrorBoundary>
      <ContentProvider>
        <AppContent />
      </ContentProvider>
    </ErrorBoundary>
  );
}

export default App
