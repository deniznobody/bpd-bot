import mongoose, { Document, Schema } from 'mongoose';

interface IGuild extends Document {
    id: string,
    prefix: string,
    trustedUsers: Array<string>
    blackListedUsers: Array<string>
    punishments: Object,     
    config: {
        vanityProtector: boolean,
        antiRaid: boolean,
    }

 };


const guildSchema: Schema = new Schema({
    id: { type: String, null: false, unique: true },
    prefix: { type: String, default: ',' },
});

const GldModel = mongoose.model<IGuild>('guilds', guildSchema);

export { IGuild, GldModel };