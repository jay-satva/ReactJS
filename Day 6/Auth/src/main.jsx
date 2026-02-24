// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import { store, persistor } from './app/store'
import { logout } from './redux/slice/authSlice'
import App from './App'

window.addEventListener('storage', (event) => {
    if (event.key === 'persist:root') {
        // event.newValue is the new localStorage value as a JSON string
        if (!event.newValue) return
        
        const newState = JSON.parse(event.newValue)
        const authState = JSON.parse(newState.auth)
        // redux-persist stores each slice as a JSON string inside the root JSON
        
        if (!authState.isAuthenticated) {
            // another tab logged out — sync this tab
            store.dispatch(logout())
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>
)