
import React, { useState, useCallback } from 'react';
import Scene from './components/Scene';
import Overlay from './components/Overlay';
import { WishResponse, TreeMorphState } from './types';
import { generateHolidayWish } from './services/geminiService';

const App: React.FC = () => {
  const [morphState, setMorphState] = useState<TreeMorphState>(TreeMorphState.SCATTERED);
  const [wish, setWish] = useState<WishResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleTreeInteraction = useCallback(async () => {
    // If scattered, bring it together
    if (morphState === TreeMorphState.SCATTERED) {
      setMorphState(TreeMorphState.TREE_SHAPE);
      return;
    }

    // If already tree, trigger AI wish
    if (loading || wish) return;
    
    setLoading(true);
    try {
      const newWish = await generateHolidayWish();
      setWish(newWish);
    } catch (err) {
      console.error("Interaction failed:", err);
    } finally {
      setLoading(false);
    }
  }, [loading, wish, morphState]);

  const clearWish = useCallback(() => {
    setWish(null);
    setMorphState(TreeMorphState.SCATTERED);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      {/* 3D Visual Experience */}
      <Scene morphState={morphState} onInteract={handleTreeInteraction} />
      
      {/* Luxurious UI Overlay */}
      <Overlay 
        wish={wish} 
        loading={loading} 
        onClear={clearWish} 
        morphState={morphState}
      />

      {/* Decorative Gradient Background Blur */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-900/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-yellow-900/5 blur-[150px] rounded-full"></div>
      </div>
    </div>
  );
};

export default App;
