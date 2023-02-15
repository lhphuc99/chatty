import {storage} from 'services/firebaseConfig';

const fileAPI={
    upLoadFile:(file,groupID)=>{
        return new Promise((resolve,reject)=>{
            const storageRef = storage.ref('chats/');
            const name = file.name;
            const imagesRef = storageRef.child('files/'+ groupID +'/'+name);
            console.log(groupID);
            imagesRef.put(file).then((snapShot)=>{
                snapShot.ref.getDownloadURL().then((url)=>{
                    resolve({
                        fileName:name,
                        url:url,
                    });
                });
            }).catch((error)=>{
                reject(error);
                console.log(error);
            });
        })
    },

    upLoadPhoto:(photo,groupID)=>{
        return new Promise((resolve,reject)=>{
            const storageRef = storage.ref('chats/');
            const name = photo.name;
            const imagesRef = storageRef.child('photos/'+ groupID +'/'+name);
            imagesRef.put(photo).then((snapShot)=>{
                snapShot.ref.getDownloadURL().then((url)=>{
                    resolve(url);
                });
            }).catch((error)=>{
                reject(error);
                console.log(error);
            });
        })
    },
}

export default fileAPI;