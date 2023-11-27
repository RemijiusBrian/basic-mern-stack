import { RequestHandler } from "express";
import UserModel from "../models/user";
import createHttpError from "http-errors";
import apiRespose from "../util/apiRespose";
import mongoose from "mongoose";

export const getUsersList: RequestHandler = async (req, res, next) => {
    try {
        const users = await UserModel.find().exec();
        res.status(200).json(apiRespose(200, users));
    } catch (error) {
        next(error);
    }
};

export const getUserById: RequestHandler = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        if (!mongoose.isValidObjectId(userId))
            throw createHttpError(400, "Invalid ID");
        const user = await UserModel.findById(userId);
        if (!user) throw createHttpError(404, "User not found");

        res.status(201).json(apiRespose(201, user));
    } catch (error) {
        next(error);
    }
};

interface CreateUserBody {
    firstName?: string,
    lastName?: string,
    email?: string,
    phone?: string,
    gender?: string,
    dob?: string
}

export const createUser: RequestHandler<unknown, unknown, CreateUserBody, unknown> = async (req, res, next) => {
    const firstName = req.body.firstName?.trim();
    const lastName = req.body.lastName?.trim();
    const email = req.body.email?.trim();
    const phone = req.body.phone?.trim();
    const gender = req.body.gender?.trim();
    const dob = req.body.dob?.trim();

    try {
        if (!firstName || !lastName || !email || !phone || !gender || !dob)
            throw createHttpError(400, "Invalid user details");

        if (gender.toLocaleLowerCase() != "male" && gender.toLocaleLowerCase() != "female")
            throw createHttpError(400, "Invalid user details");

        const newUser = await UserModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            gender: gender,
            dob: new Date(dob + " 01:00")
        });
        res.status(201).json(apiRespose(201, newUser));
    } catch (error) {
        next(error)
    }
};