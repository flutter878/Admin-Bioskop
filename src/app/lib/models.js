import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nama: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
    },
    alamat: {
    type: String,
    required: true,
    },
    telepon: {
    type: String, 
    },
    jk: {
    type: String,
    enum: ['L', 'P'], 
    required: true,
    },
}, { timestamps: true });

const filmSchema = new mongoose.Schema({
    namaFilm: {
    type: String,
    required: true,
    unique: true,
    },
    genre: {
    type: String,
    required: true,
    },
    rating: {
    type: Number, 
    min: 0,
    max: 10
    },
    durasi: {
    type: Number,
    required: true
    },
    deskripsi: {
    type: String, 
    required: true
    },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Film = mongoose.models.Film || mongoose.model("Film", filmSchema);
