import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  
  try {
    const { items, total } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items in cart' });
    }
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.type === 'tee' ? 'Custom T-Shirt' : 'Custom Mug',
            description: 'Custom designed merchandise from Twisted-T',
          },
          unit_amount: item.price,
        },
        quantity: 1,
      })),
      mode: 'payment',
      success_url: `${process.env.FRONT_URL}/?success=true`,
      cancel_url: `${process.env.FRONT_URL}/?canceled=true`,
    });
    
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Checkout failed' });
  }
}
