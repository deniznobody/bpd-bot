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
    id: { type: String, default: ',', unique: true },
    prefix: { type: String, default: ',' },
    trustedUsers: { type: Array, default: [] },
    blackListedUsers: { type: Array, default: [] }, 
    punishments: { type: Object, default: {}},
    config: { type: Object, default: {
        'vanityProtector': false,
        'antiRaid': false
    }},
});

const GldModel = mongoose.model<IGuild>('guilds', guildSchema);

export { IGuild, GldModel };