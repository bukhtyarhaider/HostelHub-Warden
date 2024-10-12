// firebase.ts
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { FormData } from "../types/types";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export const uploadCnicImage = async (
  userId: string,
  image: File,
  imageName: string
) => {
  const imageRef = ref(storage, `cnicImages/${userId}/${imageName}`);
  try {
    const snapshot = await uploadBytes(imageRef, image);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signUp = async (userData: FormData) => {
  const {
    fullName,
    email,
    phoneNumber,
    hostelName,
    hostelAddress,
    password,
    cnicFront,
    cnicBack,
  } = userData;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    let cnicFrontPath;
    if (cnicFront) {
      cnicFrontPath = await uploadCnicImage(user.uid, cnicFront, "cnicFront");
    }
    let cnicBackPath;
    if (cnicBack) {
      cnicBackPath = await uploadCnicImage(user.uid, cnicBack, "cnicBack");
    }

    await setDoc(doc(db, "users", user.uid), {
      fullName,
      email,
      phoneNumber,
      hostelName,
      hostelAddress,
      cnicFrontPath,
      cnicBackPath,
      type: "wardan",
    });
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const observeAuthState = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getCurrentAuth = () => {
  return auth;
};

export const updateUserProfile = async (
  displayName: string,
  phoneNumber: string,
  address: string,
  state: string,
  profileImageUrl: string
) => {
  try {
    const user = auth.currentUser;
    if (user) {
      // Update the authentication profile
      await updateProfile(user, { displayName, photoURL: profileImageUrl });

      // Update additional information in Firestore
      await setDoc(
        doc(db, "users", user.uid),
        {
          contactNumber: phoneNumber,
          currentAddress: address,
          currentState: state,
          profilePhotoURL: profileImageUrl,
        },
        { merge: true }
      );

      return "User profile updated successfully.";
    } else {
      throw new Error("No user is currently signed in.");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const updateProfilePassword = async (newPassword: string) => {
  const user = auth.currentUser;
  if (user) {
    try {
      await updatePassword(user, newPassword);
    } catch (error: any) {
      if (error.code === "auth/requires-recent-login") {
        throw new Error("Please re-authenticate to update your password.");
      } else {
        throw new Error(error.message);
      }
    }
  } else {
    throw new Error("No user is currently signed in.");
  }
};

export const getUserProfile = async () => {
  const user = auth.currentUser;
  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        ...userData,
      };
    } else {
      throw new Error("User data not found.");
    }
  } else {
    throw new Error("No user is currently signed in.");
  }
};

export const uploadProfileImage = async (file: File, userEmail: string) => {
  try {
    const imageRef = ref(storage, `profilePictures/${userEmail}`);
    const snapshot = await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Failed to upload profile image: " + error.message);
    } else {
      throw new Error(
        "Failed to upload profile image: An unexpected error occurred"
      );
    }
  }
};
