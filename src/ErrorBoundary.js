import React from 'react'
import ErrorBody from './components/ErrorBody'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { status: null, message: '' }
    }
  
    static getDerivedStateFromError(error) { 
        // Update state so the next render will show the fallback UI.
        return { status: error.status, message: error.message }  
    }
    
    // componentDidCatch(error, errorInfo) {    
    //     // You can also log the error to an error reporting service    
    //     logErrorToMyService(error, errorInfo)
    // }
    
    render() {
        if (this.state.status || this.state.message) {      
            return <ErrorBody status={this.state.status} message={this.state.message} />   
        }

        return this.props.children
    }
}

export default ErrorBoundary