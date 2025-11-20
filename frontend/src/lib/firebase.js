import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Function to save email to Firestore
export const saveEmail = async (email) => {
  try {
    const docRef = await addDoc(collection(db, "emailSubscribers"), {
      email: email,
      timestamp: serverTimestamp(),
      source: "landing_page"
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding email: ", error);
    return { success: false, error: error.message };
  }
};

// Function to save contact form to Firestore
export const saveContactForm = async (formData) => {
  try {
    const dataToSave = {
      name: formData.name,
      email: formData.email,
      country: formData.country,
      message: formData.message,
      timestamp: serverTimestamp()
    };
    
    // Only add optional fields if they have values
    if (formData.website) {
      dataToSave.website = formData.website;
    }
    if (formData.jobFunction) {
      dataToSave.jobFunction = formData.jobFunction;
    }
    
    const docRef = await addDoc(collection(db, "contactForms"), dataToSave);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding contact form: ", error);
    return { success: false, error: error.message };
  }
};

// Function to get all waitlist subscribers
export const getWaitlistSubscribers = async () => {
  try {
    const q = query(collection(db, "emailSubscribers"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const subscribers = [];
    querySnapshot.forEach((doc) => {
      subscribers.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: subscribers };
  } catch (error) {
    console.error("Error fetching waitlist subscribers: ", error);
    return { success: false, error: error.message };
  }
};

// Function to get all contact forms
export const getContactForms = async () => {
  try {
    const q = query(collection(db, "contactForms"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    const forms = [];
    querySnapshot.forEach((doc) => {
      forms.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: forms };
  } catch (error) {
    console.error("Error fetching contact forms: ", error);
    return { success: false, error: error.message };
  }
};

export { app, analytics, db };
