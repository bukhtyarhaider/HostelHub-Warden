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
  collection,
  addDoc,
  getDocs,
  Timestamp,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  BookingApplication,
  Hostel,
  IHostel,
  SignUpForm,
} from "../types/types";
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

    const hostelRef = await addDoc(collection(db, "hostels"), {
      name: hostelName,
      location: hostelAddress,
    });

    await setDoc(doc(db, "wardens", user.uid), {
      id: user.uid,
      wardenId,
      fullName,
      email,
      phoneNumber,
      cnic: { front: cnicFrontPath, back: cnicBackPath },
      hostelId: hostelRef.id,
      createdAt: Timestamp.now(),
      status: "new",
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

    const applicationDocRef = doc(db, "wardens", user.uid);
    const applicationDoc = await getDoc(applicationDocRef);

    if (applicationDoc.exists()) {
      const applicationData = applicationDoc.data();

      if (applicationData.status === "active") {
        console.log("done");
        return user;
      } else if (applicationData.status === "rejected") {
        throw new Error(
          "Your joining request has been rejected. Please contact the admin for more information."
        );
      } else if (applicationData.status === "banned") {
        throw new Error(
          "Your account is banned for HostelHub. Please contact the admin for more information."
        );
      } else if (applicationData.status === "new") {
        throw new Error(
          "The your status has not been approved yet. Please contact the admin for more information."
        );
      } else {
        throw new Error(
          "Something went wrong. Please contact the admin for more information."
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
        const wardanDocRef = doc(db, "wardens", user.uid);
        const wardanDoc = await getDoc(wardanDocRef);

        if (wardanDoc.exists()) {
          const applicationData = wardanDoc.data();

          if (applicationData.status === "active") {
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
        doc(db, "wardens", user.uid),
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
    const userDocRef = doc(db, "wardens", user.uid);
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

  const wardenDocRef = doc(db, "wardens", currentUser.uid);
  const wardenDoc = await getDoc(wardenDocRef);
  if (!wardenDoc.exists()) {
    throw new Error("Warden record does not exist.");
  }

  const existingHostelId = wardenDoc.data().hostelId;
  const hostelRef = doc(db, "hostels", existingHostelId);

  const imageUrls =
    images instanceof Array
      ? await Promise.all(
          images.map((img) => {
            if (img instanceof File) {
              return uploadImage(
                img,
                `hostelImages/${currentUser.uid}/${img.name}`
              );
            } else {
              return img;
            }
          })
        )
      : [];

  await setDoc(
    hostelRef,
    {
      name,
      email,
      location,
      contactNumber,
      type,
      description,
      images: imageUrls,
    },
    { merge: true }
  );

  if (rooms && rooms.length > 0) {
    const roomsRef = collection(db, `hostels/${existingHostelId}/rooms`);
    for (const room of rooms) {
      await addDoc(roomsRef, room);
    }
  }

  return "Hostel updated successfully with new details and rooms.";
};

export const getHostelDetails = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("No user is currently signed in.");
  }

  const wardenDocRef = doc(db, "wardens", currentUser.uid);
  const wardenDocSnap = await getDoc(wardenDocRef);
  if (!wardenDocSnap.exists()) {
    throw new Error("No hostel data found for the current user.");
  }

  const hostelId = wardenDocSnap.data().hostelId;
  const hostelRef = doc(db, "hostels", hostelId);
  const hostelSnap = await getDoc(hostelRef);

  if (!hostelSnap.exists()) {
    throw new Error("No details found for the associated hostel.");
  }

  const hostelData = hostelSnap.data();
  const roomsRef = collection(db, `hostels/${hostelId}/rooms`);
  const roomSnap = await getDocs(roomsRef);

  return {
    ...hostelData,
    rooms: roomSnap.docs.map((doc) => doc.data()),
  } as Hostel;
};

export const saveNotice = async (title: string, content: string) => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("No user is currently signed in.");
  }

  const wardenDocRef = doc(db, "wardens", currentUser.uid);
  const wardenDoc = await getDoc(wardenDocRef);
  if (!wardenDoc.exists() || !wardenDoc.data().hostelId) {
    throw new Error("Warden not linked to any hostel.");
  }

  const hostelId = wardenDoc.data().hostelId;
  const noticesRef = collection(db, "notices");

  const noticeRef = await addDoc(noticesRef, {
    wardenId: currentUser.uid,
    hostelId: hostelId,
    title,
    body: content,
    date: new Date().toISOString(),
    viewed: false,
  });

  await updateDoc(noticeRef, {
    id: noticeRef.id,
  });
};

export const fetchNotices = async () => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("No user is currently signed in.");
    }

    const noticesRef = collection(db, "notices");
    const queryNotices = query(
      noticesRef,
      where("wardenId", "==", currentUser.uid)
    );
    const snapshot = await getDocs(queryNotices);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error: any) {
    console.error("Error fetching notices:", error);
    throw new Error(error.message);
  }
};

export const fetchHostelBookingApplicationRequests = async (): Promise<
  BookingApplication[]
> => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new Error("No user is currently signed in.");
  }
  const wardenDocRef = doc(db, "wardens", currentUser.uid);
  const wardenDocSnap = await getDoc(wardenDocRef);
  if (!wardenDocSnap.exists()) {
    throw new Error("No hostel data found for the current user.");
  }

  const hostelId = wardenDocSnap.data().hostelId;

  const applicationsRef = collection(db, "bookingApplications");

  // Query to fetch booking applications of the current user
  const userApplicationsQuery = query(
    applicationsRef,
    where("hostel.id", "==", hostelId)
  );

  const snapshot = await getDocs(userApplicationsQuery);

  const applications: BookingApplication[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<BookingApplication, "id">),
  }));

  return applications;
};

export const updateBookingApplicationStatus = async (
  docId: string,
  newStatus: string
): Promise<string> => {
  try {
    const bookingApplicationDocRef = doc(db, "bookingApplications", docId);
    await updateDoc(bookingApplicationDocRef, {
      status: newStatus,
    });

    return "Booking Application status updated successfully.";
  } catch (error) {
    throw new Error(
      "Failed to update Booking Application status: " +
        (error instanceof Error
          ? error.message
          : "An unexpected error occurred")
    );
  }
};
