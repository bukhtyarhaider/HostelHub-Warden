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
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { IHostel, SignUpForm } from "../types/types";
import { generateWardenId } from "../utils/utils";

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

export const signUp = async (userData: SignUpForm) => {
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

    await updateProfile(user, {
      displayName: fullName,
    });

    const cnicFrontPath = cnicFront
      ? await uploadCnicImage(user.uid, cnicFront, "cnicFront")
      : null;
    const cnicBackPath = cnicBack
      ? await uploadCnicImage(user.uid, cnicBack, "cnicBack")
      : null;

    const wardenId = generateWardenId();

    await setDoc(doc(db, "wardan", user.uid), {
      wardenId,
      fullName,
      email,
      phoneNumber,
      hostel: {
        name: hostelName,
        location: hostelAddress,
      },
      cnic: { front: cnicFrontPath, back: cnicBackPath },
      createdAt: new Date(),
      status: "pending",
    });

    return user;
  } catch (error: any) {
    console.error("Error during signup:", error);
    throw new Error(error.code || error.message);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const applicationDocRef = doc(db, "wardan", user.uid);
    const applicationDoc = await getDoc(applicationDocRef);

    if (applicationDoc.exists()) {
      const applicationData = applicationDoc.data();

      if (applicationData.status === "approved") {
        return user;
      } else if (applicationData.status === "rejected") {
        throw new Error(
          "Your joining request has been rejected. Please contact the admin for more information."
        );
      } else {
        throw new Error(
          "The user status has not been approved yet. Please contact the admin for more information."
        );
      }
    } else {
      throw new Error("No warden application found for this user.");
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const observeAuthState = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        // Check the warden application document for the user
        const wardanDocRef = doc(db, "wardan", user.uid);
        const wardanDoc = await getDoc(wardanDocRef);

        if (wardanDoc.exists()) {
          const applicationData = wardanDoc.data();

          if (applicationData.status === "approved") {
            callback(user);
          } else {
            callback(null);
          }
        } else {
          callback(null); // Document doesn't exist, return null
        }
      } catch (error: any) {
        console.error("Error checking warden application status:", error);
        callback(null);
      }
    } else {
      callback(null);
    }
  });
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
        doc(db, "wardan", user.uid),
        {
          phoneNumber: phoneNumber,
          currentAddress: address,
          currentState: state,
          photoURL: profileImageUrl,
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
    const userDocRef = doc(db, "wardan", user.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        displayName: user.displayName ?? userData.fullName,
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

const uploadImage = async (image: File, path: string): Promise<string> => {
  const storageRef = ref(getStorage(), path);
  const snapshot = await uploadBytes(storageRef, image);
  return getDownloadURL(snapshot.ref);
};

export const createHostel = async (hostel: IHostel) => {
  const {
    name,
    email,
    location,
    contactNumber,
    type,
    description,
    images,
    rooms,
  } = hostel;

  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("No user is currently signed in.");
  }

  const imageUrls = await Promise.all(
    images.map((img) =>
      uploadImage(img, `hostelImages/${currentUser.uid}/${img.name ?? ""}`)
    )
  );

  const hostelData = {
    name,
    email,
    location,
    contactNumber,
    type,
    description,
    images: imageUrls,
    rooms,
  };

  const wardenDocRef = doc(db, "wardan", currentUser.uid);
  await setDoc(
    wardenDocRef,
    {
      hostel: hostelData,
    },
    { merge: true }
  );

  return "Hostel data and images uploaded successfully.";
};

export const getHostelDetails = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("No user is currently signed in.");
  }

  const wardenDocRef = doc(db, "wardan", currentUser.uid);

  const wardenDocSnap = await getDoc(wardenDocRef);

  if (!wardenDocSnap.exists()) {
    throw new Error("No hostel data found for the current user.");
  }

  const wardenData = wardenDocSnap.data();
  const hostelData = wardenData.hostel;

  return hostelData;
};
