import * as collections from "../../constants/collections";
import { db } from "../firebase";

// Get user profile by id
export const getUserProfile = (id: string) =>
  db
    .collection(collections.PROFILES)
    .where("userId", "==", id)
    .get();
