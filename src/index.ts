import dotenv from 'dotenv';
import { myServer } from './server';
dotenv.config();

const PORT = Number(process.env.RSS_PORT) || 4000;
myServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
