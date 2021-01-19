import React from 'react'
import './App.css'
import ErrorBoundary from './ErrorBoundary'
import ErrorContextInitializer from './ErrorContextInitializer'
import Navigation from './navigation'
import UserContextInitializer from './UserContextInitializer'

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
