import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase-config";

export const migrateData = async () => {
  const oldCollection = "job-applications";
  const cvsCollection = "cvs";

  try {
    const querySnapshot = await getDocs(collection(db, oldCollection));

    console.log(`Found ${querySnapshot.docs.length} documents to migrate`);

    for (const document of querySnapshot.docs) {
      const data = document.data();

      if (data.fileId && data.storagePath) {
        console.log(`Migrating CV: ${data.name}`);

        const uploadedAt =
          typeof data.uploadedAt === "string"
            ? Timestamp.fromDate(new Date(data.uploadedAt))
            : data.uploadedAt || Timestamp.now();

        await addDoc(collection(db, cvsCollection), {
          fileId: data.fileId,
          name: data.name,
          size: data.size,
          storagePath: data.storagePath,
          uploadedAt,
        });

        await deleteDoc(doc(db, oldCollection, document.id));
        console.log(`✓ Migrated CV: ${data.name}`);
      } else {
        console.log(
          `Deleting mock application: ${data.jobTitle} at ${data.company}`
        );
        await deleteDoc(doc(db, oldCollection, document.id));
        console.log(`✓ Deleted mock application`);
      }
    }

    console.log("Migration completed successfully!");
    return { success: true, message: "Migration completed successfully!" };
  } catch (error) {
    console.error("Migration failed:", error);
    return {
      success: false,
      message: `Migration failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
};
