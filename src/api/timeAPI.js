// import axios from "axios";

const timeAPI = {
  getCurrentUnixTime: () => {
    // return new Promise((resolve, reject) => {
    //   axios
    //     .get("https://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh")
    //     .then((res) => {
    //       const { unixtime } = res.data;
    //       resolve(unixtime);
    //     });
    // });
    const time = Math.round(new Date().getTime()/1000);
    return time.toString();
  },
};

export default timeAPI;
