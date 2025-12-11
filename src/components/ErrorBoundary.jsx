import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger text-center m-4">
          <h4>Oops! Algo salió mal</h4>
          <p>Ha ocurrido un error inesperado. Por favor, recarga la página.</p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Recargar Página
          </button>
          {import.meta.env.DEV && (
            <details className="mt-3">
              <summary>Detalles del error (desarrollo)</summary>
              <pre className="text-left">{this.state.error?.toString()}</pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
