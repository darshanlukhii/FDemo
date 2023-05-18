import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const getUserData = async () => {
  try {
    const data = await firestore()
      .collection('users')
      .doc(`${auth().currentUser.uid}`)
      .get();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getDataBase = () => {
  try {
    let users = [];
    firestore()
      .collection('usersPost')
      .where('PostTime', '<=', new Date())
      .orderBy('PostTime', 'desc')
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        return users;
      });
  } catch (error) {
    console.log(error);
  }
};
