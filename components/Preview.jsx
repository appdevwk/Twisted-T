"use client";

import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import useStore from '../store';

export function TeePreview({ design, onSave }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    // Simple canvas without Fabric.js to avoid import conflicts
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw t-shirt outline
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, 280, 380);
      
      // Add placeholder text
      ctx.fillStyle = '#666';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('T-Shirt Design Area', 150, 200);
      ctx.fillText('Click Save to Add to Cart', 150, 220);
    }
  }, [design]);

  return (
    <div className="p-4 bg-white rounded shadow">
      <canvas ref={canvasRef} width={300} height={400} className="border border-gray-300" />
      <button 
        onClick={() => onSave(canvasRef.current?.toDataURL())}
        className="mt-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Save T-Shirt Design
      </button>
    </div>
  );
}

export function MugPreview({ design, onSave }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <Canvas style={{ height: '300px' }} camera={{ position: [0, 6, 10], fov: 40 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <mesh rotation={[0, Math.PI / 4, 0]}>
          <cylinderGeometry args={[1.5, 1.8, 4, 32]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <OrbitControls enablePan={false} />
      </Canvas>
      <button 
        onClick={() => onSave('mug-design-' + Date.now())}
        className="mt-2 bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        Save Mug Design
      </button>
    </div>
  );
}
