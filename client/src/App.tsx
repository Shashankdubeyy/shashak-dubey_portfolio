import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";



import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleLoaderComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  return (
    <QueryClientProvider client={queryClient}>
      
        {isLoading }
        <div
          className={`transition-opacity duration-500 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          <Router />
        </div>
     
    
    </QueryClientProvider>
  );
}

export default App;
