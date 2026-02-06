import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'antd/dist/reset.css'

import { ConfigProvider } from 'antd'
import ptBR from 'antd/locale/pt_BR'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={ptBR}>
      <App />
    </ConfigProvider>  
  </StrictMode>,
)
