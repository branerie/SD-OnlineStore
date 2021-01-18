import React from 'react'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { error: null }
    }
  
    static getDerivedStateFromError(error) { 
        // Update state so the next render will show the fallback UI.
        return { error: error.message }  
    }
    
    // componentDidCatch(error, errorInfo) {    
    //     // You can also log the error to an error reporting service    
    //     logErrorToMyService(error, errorInfo)
    // }
    
    render() {
        if (this.state.error) {      
            // You can render any custom fallback UI
            return <h1>{this.state.error}</h1>   
        }

        return this.props.children
    }
}

export default ErrorBoundary