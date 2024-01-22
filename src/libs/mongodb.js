import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDb database.');
  } catch (error) {
    console.log('Failed to connect to MongoDb database.', error.message);
  };
};

export default connectMongoDB;