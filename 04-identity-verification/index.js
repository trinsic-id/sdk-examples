import express from 'express';
import path from 'path';
import { TrinsicService, VerificationType } from "@trinsic/trinsic";

const app = express();

const trinsic = new TrinsicService({
  authToken: "<AUTH_TOKEN>",
});

app.post('/api/create-session', async (req, res) => {
  const verifyResponse = await trinsic.connection().createSession({
    verifications: [
      { type: VerificationType.GOVERNMENT_ID }
    ]
  });

  console.log(verifyResponse);
  res.json(verifyResponse.session);
});

// Serve static files from the 'public' folder
app.use(express.static(process.cwd()));
// Parse JSON bodies for this app. We're only interested in JSON bodies
app.use(express.json());

// Catch-all to return index.html for any other request
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the demo page at http://localhost:${PORT}`);
});
