import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './components/App/App.tsx'
import {store} from './store/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
