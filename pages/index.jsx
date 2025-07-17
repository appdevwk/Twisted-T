import { useState } from 'react';
import useStore from '../store';
import { TeePreview, MugPreview } from '../components/Preview';

export default function App() {
  const [view, setView] = useState('home');
  const { cart, addToCart } = useStore();
  
  const handleSave = (type, dataURL) => {
    addToCart({ 
      type, 
      dataURL, 
      price: type === 'tee' ? 2500 : 3500,
      id: Date.now() 
    });
    setView('cart');
  };
  
  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: cart, 
          total: cart.reduce((sum, item) => sum + item.price, 0) 
        })
      });
      
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl font-bold">TWISTED T-Shirt Co.</h1>
        <nav className="flex gap-4 mt-2">
          <button onClick={() => setView('home')} className="hover:underline">
            Home
          </button>
          <button onClick={() => setView('design')} className="hover:underline">
            Design
          </button>
          <button onClick={() => setView('cart')} className="hover:underline">
            Cart ({cart.length})
          </button>
        </nav>
      </header>

      {view === 'home' && (
        <div className="p-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Create Your Own T-Shirts & Mugs!</h2>
          <p className="text-xl mb-8">
            10% of profits donated to fight human trafficking. Proudly made in the USA.
          </p>
          <button 
            onClick={() => setView('design')}
            className="bg-blue-500 text-white px-8 py-4 rounded-lg text-lg hover:bg-blue-600 transition-colors"
          >
            Start Designing
          </button>
        </div>
      )}

      {view === 'design' && (
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6">Design Your Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">T-Shirt Design ($25.00)</h3>
              <TeePreview design={{}} onSave={(dataURL) => handleSave('tee', dataURL)} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Mug Design ($35.00)</h3>
              <MugPreview design={{}} onSave={(dataURL) => handleSave('mug', dataURL)} />
            </div>
          </div>
        </div>
      )}

      {view === 'cart' && (
        <div className="p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-xl mb-4">Your cart is empty</p>
              <button 
                onClick={() => setView('design')}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
              >
                Start Designing
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {cart.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {item.type === 'tee' ? 'Custom T-Shirt' : 'Custom Mug'}
                      </h3>
                      <p className="text-gray-600">${(item.price / 100).toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => {
                        const newCart = cart.filter((_, i) => i !== index);
                        useStore.setState({ cart: newCart });
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center border-t pt-6">
                <div className="text-2xl font-bold">
                  Total: ${(cart.reduce((sum, item) => sum + item.price, 0) / 100).toFixed(2)}
                </div>
                <button 
                  onClick={handleCheckout}
                  className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Checkout with Stripe
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>Made in the USA 🇺🇸 | 10% of profits support anti-human trafficking efforts</p>
      </footer>
    </div>
  );
}
