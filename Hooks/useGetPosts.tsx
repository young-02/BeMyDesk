import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { dbService } from '@/shared/firebase';
import { useRouter } from 'next/router';

export default function useGetPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const collectionRef = collection(dbService, 'postData');

    const q = query(collectionRef, orderBy('timestamp', 'asc'));

    onSnapshot(collectionRef, (snapshot: any) =>
      setPosts(
        snapshot.docs.map((doc: any) => ({ ...doc.data(), id: doc.id })),
      ),
    );
  }, []);

  return { posts };
}
