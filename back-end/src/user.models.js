import mongoose from "mongoose";



const eventSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    eventName: { type: String,unique: true, index: true },
    maxParticipants: { type: Number, index: true },
    description: { type: String, index: true },
    image: { type: String, index: true },
    lastDate: { type: Date, index: true },
    location: {
        address: { type: String, index: true },
        city: { type: String, index: true },
        state: { type: String, index: true },
        zipCode: { type: String, index: true },
        country: { type: String, index: true }
    },
    organizer: { type: String, index: true },
    registrationCode: { type: String, index: true },
    registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const userSchema = new mongoose.Schema({
    name: {type:String},
    email: { type: String, unique: true },
    createdEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    joinedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
});

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb+srv://preetpatel1356:preet123@cluster0.t0etv0s.mongodb.net/Event`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB connection FAILED ", error.message);
        process.exitCode = 1; // Set exit code to indicate an error
    }
};

export default connectDB;

export const   Event = mongoose.model('Event', eventSchema);
export const   User = mongoose.model('User', userSchema);