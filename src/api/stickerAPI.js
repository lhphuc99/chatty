import { storage } from "services/firebaseConfig";

const StickerAPI = {
  getQooBee: () => {
    return new Promise((resolve, reject) => {
      // Create a reference under which you want to list
      const storageRef = storage.ref("Sticker");
      var listRef = storageRef.child("/QooBee");
      // Find all the prefixes and items.
      listRef
        .listAll()
        .then(function (res) {

            const list=[];
            res.items.forEach((itemRef,index)=>{
              itemRef.getDownloadURL().then((url)=>{
                list.push({url:url});
                if(index-res.items.length<0)
                  resolve(list);
              });
            })
        })
        .catch(function (error) {
            reject(error);
            console.log(error);
        });
    });
  },

  getMeep: () => {
    return new Promise((resolve, reject) => {
      // Create a reference under which you want to list
      const storageRef = storage.ref("Sticker");
      var listRef = storageRef.child("/Meep");
      // Find all the prefixes and items.
      listRef
        .listAll()
        .then(function (res) {
         
          const list=[];
          res.items.forEach((itemRef,index)=>{
            itemRef.getDownloadURL().then((url)=>{
              list.push({url:url});
              if (index + 1 === res.items.length) resolve(list);
            });
          })
        })
        .catch(function (error) {
            reject(error);
            console.log(error);
        });
    });
  },

  getSpeedy: () => {
    return new Promise((resolve, reject) => {
      // Create a reference under which you want to list
      const storageRef = storage.ref("Sticker");
      var listRef = storageRef.child("/Speedy");
      // Find all the prefixes and items.
      listRef
        .listAll()
        .then(function (res) {
          const list=[];
            res.items.forEach((itemRef,index)=>{
              itemRef.getDownloadURL().then((url)=>{
                list.push({url:url});
                if (index + 1 === res.items.length) resolve(list);
              });
            });
        })
        .catch(function (error) {
            reject(error);
            console.log(error);
        });
    });
  },
};

export default StickerAPI;
