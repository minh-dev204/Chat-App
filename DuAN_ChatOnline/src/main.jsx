import ReactDOM from 'react-dom/client'
import './index.css'
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import User_layout from './components/pages/user_layouts.jsx';
import Login from './components/pages/auth/login.jsx';
import Regsiter from './components/pages/auth/regsiter.jsx';
import App_chat from './components/pages/app_chat.jsx';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx';
import { ChatProvider } from './context/ChatContext.jsx';
import { Message_context, MessageProvider } from './context/MessageContext.jsx';
import { useContext } from 'react';
import { Auth_context } from './context/AuthContext.jsx';
import { NotificationProvider } from './context/Notifications.jsx';


const AppWrapper = ({ children }) => {
  const { user } = useContext(Auth_context)
  const {thongBao} = useContext(Message_context)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <User_layout />,
      children: [
        {
          path: "",  // bảo vệ router
          element: user ? <App_chat /> : <Login />,
        },
        {
          path: "/account",
          element: user ? <App_chat /> : <Login />,
        },
        {
          path: "/auth/regsiter",
          element: user ? <App_chat /> : <Regsiter />,
        },
        {
          path: "/auth/login",
          element: user ? <App_chat /> : <Login />,
        },

      ],
    },
  ]);

  return <RouterProvider router={router} />
};

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthProvider >
    <ChatProvider >
      <MessageProvider>
        <NotificationProvider >
          <AppWrapper />
        </NotificationProvider>
      </MessageProvider>
    </ChatProvider>
  </AuthProvider>
  // </React.StrictMode>,
)
