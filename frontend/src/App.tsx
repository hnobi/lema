import { Routes, Route } from "react-router";
import {QueryClientProvider, QueryClient} from '@tanstack/react-query'
import Users from "./pages/Users";
import UserPosts from "./pages/UserPosts";

function App() {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/users/:userId/posts" element={<UserPosts />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App