import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/hooks/useCart";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index.tsx";
import GuideButton from "@/components/GuideButton";

const MentionsLegales = lazy(() => import("./pages/MentionsLegales.tsx"));
const PolitiqueConfidentialite = lazy(() => import("./pages/PolitiqueConfidentialite.tsx"));
const CGV = lazy(() => import("./pages/CGV.tsx"));
const ProductDetail = lazy(() => import("./pages/ProductDetail.tsx"));
const OfferDetail = lazy(() => import("./pages/OfferDetail.tsx"));
const GuidePathologies = lazy(() => import("./pages/GuidePathologies.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/mentions-legales" element={<MentionsLegales />} />
                  <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
                  <Route path="/cgv" element={<CGV />} />
                  <Route path="/produit/:slug" element={<ProductDetail />} />
                  <Route path="/offre/:slug" element={<OfferDetail />} />
                  <Route path="/guide-pathologies" element={<GuidePathologies />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <GuideButton />
              </Suspense>
            </BrowserRouter>
          </CartProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
