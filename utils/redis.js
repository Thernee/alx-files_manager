import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();

    this.client.on('error', (err) => console.log(err));
  }

  isAlive () {
    return this.client.connected;
  }

  async get (key) {
    const getKeyFunc = promisify(this.client.get).bind(this.client);
    return await getKeyFunc(key);
  }

  async set (key, value, duration) {
    const setKeyFunc = promisify(this.client.set).bind(this.client);
    return await setKeyFunc(key, value, 'EX', duration);
  }

  async del (key) {
    const delKeyFunc = promisify(this.client.del).bind(this.client);
    return await delKeyFunc(key);
  }

}

const redisClient = new RedisClient();
export default redisClient;
