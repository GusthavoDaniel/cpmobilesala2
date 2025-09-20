import { db, auth } from './firebase';
import {
  collection, addDoc, updateDoc, deleteDoc, doc,
  onSnapshot, query, orderBy, serverTimestamp
} from 'firebase/firestore';

const colRef = () => collection(db, 'users', auth.currentUser.uid, 'tasks');

export const listenTasks = (cb) => {
  const q = query(colRef(), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    cb(data);
  });
};

export const createTask = (task) =>
  addDoc(colRef(), {
    title: task.title,
    description: task.description || '',
    dueDate: task.dueDate || null,
    notifyAt: task.notifyAt || null,
    done: false,
    priority: task.priority || 'normal',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

export const updateTask = (id, patch) =>
  updateDoc(doc(db, 'users', auth.currentUser.uid, 'tasks', id), {
    ...patch, updatedAt: serverTimestamp()
  });

export const deleteTask = (id) =>
  deleteDoc(doc(db, 'users', auth.currentUser.uid, 'tasks', id));
