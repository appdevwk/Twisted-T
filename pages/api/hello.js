export default function handler(req, res) {
  res.status(200).json({ 
    message: 'Twisted-T API is working!',
    projectId: process.env.VERCEL_PROJECT_ID || 'local-dev',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
}
