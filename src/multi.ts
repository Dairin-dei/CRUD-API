import dotenv from 'dotenv';
import { default as cluster } from 'cluster';
import { cpus } from 'os';
import { myServer } from './server';
dotenv.config();

const PORT = Number(process.env.RSS_PORT) || 4000;
const cpusLength = cpus().length;
if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < cpusLength; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  myServer.listen(PORT, () => {
    console.log(`Server on worker ${process.pid} is running on port ${PORT}`);
  });
}
