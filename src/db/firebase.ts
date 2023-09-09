import {cert, initializeApp} from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';

const serviceAccount = require('./../../credientials.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

export {db};
