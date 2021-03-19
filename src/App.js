import React from 'react'
import './App.css'
import ErrorBoundary from './ErrorBoundary'
import ErrorContextInitializer from './contexts/ErrorContextInitializer'
import Navigation from './navigation'
import UserContextInitializer from './contexts/UserContextInitializer'

function App() {
	return (
		<ErrorBoundary>
			<ErrorContextInitializer>
				<UserContextInitializer>
					<Navigation />
				</UserContextInitializer>
			</ErrorContextInitializer>
		</ErrorBoundary>
	)
}

export default App
