// In this file we are connecting to the mongodb only one time using the same connection because our code can run many times and if you connect to the mongodb again and again it may slow down the performance and our app may crash.

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

const cached = global.mongoose;
