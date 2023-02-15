import React, { useEffect, useState } from 'react';
import SearchItem from '../SearchItem';
import userAPI from 'api/userAPI';
import './style.scss';
import Loading from 'components/Loading';
import { useSelector } from 'react-redux';

function SearchList(props) {

    const [listUser,setListUser]=useState([]);
    const {searchValue}=props;
    const [loading,setLoading]= useState(false);
    const listSendRequest = useSelector((state)=>state.message.sendFriendRequests);
    const listFriend=useSelector((state)=>state.message.friendList);

    function removeUnicode(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        return str;
    }

    useEffect(()=>{
        setLoading(true);
        if(searchValue===''||searchValue===undefined){
            setListUser([]);
            setLoading(false);
        }else
        userAPI.getAllUser().then((users)=>{
            const objectArray = Object.entries(users);
            const list=[];
            objectArray.forEach(([key,value])=>{
                let name = value.firstName+ " " + value.lastName;
                name = removeUnicode(name);
                const keySearch = typeof(searchValue)==='string'?removeUnicode(searchValue):searchValue;
                if(name.toLowerCase().indexOf(keySearch) !== -1){
                    list.push([key,value]);
                }
            });
            setListUser([...list]);
            setLoading(false);
        });
        return ()=>setListUser([]);
    },[searchValue]);
   
    return (
        <ul className="SearchList">
            {loading?<Loading/>:listUser.map((user)=>{
                if(listSendRequest!==null&&listSendRequest.includes(user[0])){
                    return<SearchItem 
                    key={user[0]} 
                    uid={user[0]} 
                    name={user[1].firstName+" "+user[1].lastName}
                    picture={user[1].picture} 
                    isFriend={false}
                    isRequestFriend={true}
                    />
                }
                if(listFriend!==null&&listFriend.includes(user[0])){
                    return<SearchItem 
                    key={user[0]} 
                    uid={user[0]} 
                    name={user[1].firstName+" "+user[1].lastName} 
                    picture={user[1].picture}
                    isFriend={true}
                    isRequestFriend={false}
                    />
                }
                return<SearchItem 
                key={user[0]} 
                uid={user[0]} 
                name={user[1].firstName+" "+user[1].lastName} 
                picture={user[1].picture}
                isFriend={false}
                isRequestFriend={false}
                />
            })}
        </ul>
    );
}

export default SearchList;