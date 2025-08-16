const mongoose = require('mongoose');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const secretKey = process.env.CRYPTO_SECRET;

const Schema = mongoose.Schema;

const otherContactSchema = new Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String }
});

const socialChannelSchema = new Schema({
    platform: { type: String },
    url: { type: String }
});

const proposalSchema = new Schema({
  clientName: { type: String, required: true },
  contactNumber: { type: String },
  email: { type: String, required: true, unique: true, trim: true },
  websiteUrl: { type: String },
  companyName: { type: String },
  projectRequirements: { type: String },
  sensitiveDetails: { type: String },
  otherCommunicationMethods: [{ type: String }],
  otherContacts: [otherContactSchema],
  socialChannels: [socialChannelSchema],
  emailService: { type: String },
}, {
  timestamps: true,
});

proposalSchema.pre('save', function(next) {
  if (!this.isModified('sensitiveDetails') || !this.sensitiveDetails) {
    return next();
  }
  try {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
    let encrypted = cipher.update(this.sensitiveDetails);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    this.sensitiveDetails = iv.toString('hex') + ':' + encrypted.toString('hex');
    next();
  } catch (error) {
    next(error);
  }
});

proposalSchema.methods.decryptSensitiveDetails = function() {
  if (!this.sensitiveDetails) {
    return '';
  }
  try {
    const textParts = this.sensitiveDetails.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const encryptedText = Buffer.from(textParts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    // If decryption fails, it might be because the data was not encrypted
    // or the key is wrong. Returning the raw data is a safe fallback.
    return this.sensitiveDetails;
  }
};

const Proposal = mongoose.model('Proposal', proposalSchema);

module.exports = Proposal;
