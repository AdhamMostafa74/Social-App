import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import { HeroUIProvider } from '@heroui/react'
import { ToastProvider } from "@heroui/toast";

import CounterContextProvider from './Context/CounterContext.jsx'
import AuthContextProvider from './Context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
    <HeroUIProvider>
        <ToastProvider />

        <CounterContextProvider>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </CounterContextProvider>

    </HeroUIProvider>
)
