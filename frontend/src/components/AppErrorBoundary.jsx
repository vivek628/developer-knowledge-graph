import { Component } from 'react';

// API failures are handled inside pages. This boundary is the final fallback for
// an unexpected rendering bug, preventing users from seeing a blank screen.
export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('Unexpected frontend error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="grid min-h-screen place-items-center bg-canvas p-6">
          <div className="panel max-w-md p-8 text-center" role="alert">
            <p className="text-lg font-semibold">The page could not be displayed</p>
            <p className="mt-2 text-sm leading-6 text-ink-500">Refresh the page to try again. Your graph data has not been changed.</p>
            <button type="button" onClick={() => window.location.reload()} className="mt-5 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">Refresh page</button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
