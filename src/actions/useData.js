import mockData from "./mockData.js";
import languageInfo from "../languageInfo.js";
import { combineReducers } from "redux";
import axios from "axios";

const state = (
  state2 = {
    user: { _id: "", fullName: "", nickname: "", language: "" },
    thoughts: [],
    groups: [],
    group: {
      _id: "",
      title: "",
      participants: [],
      thoughts: [],
      creator: "",
    },
    browserLanguageCode:'en',
    browserLanguage:'English',
    browserFlag:"https://flagcdn.com/16x12/us.png",
    interfaceStrings:{
      "login": "Login",
      "register": "Register",
      "firstName": "First Name",
      "lastName": "Last Name",
      "nickname": "Nickname",
      "password": "Password",
      "verifyPassword": "Verify Password",
      "searchForGroup": "Search for Group",
      "welcome": "Welcome",
      "userPage": "User Page",
      "ghosting": "Ghosting",
      "fullName": "Full Name",
      "changePassword": "Change Password",
      "currentPassword": "Current Password",
      "newPassword": "New Password",
      "confirmNewPassword": "Confirm New Password",
      "myGroups": "My Groups",
      "title": "Title",
      "createGroup": "Create Group",
      "inviteCode": "Invite Code",
      "joinGroup": "Join Group",
      "enter": "Enter",
      "delete": "Delete",
      "getInviteCode": "Get Invite Code",
      "reviseMessage": "Revise Message",
      "send": "Send",
      "deleteThought": "Delete this thought?",
      "yes": "Yes",
      "no": "No",
      "update": "Update",
      "language": "Language",
      "noThoughts": "Please generate an invite code and share it with your friend",
      "noGroups": "Please create a group",
      "noUser": "User not found",
      "passError1": "Passwords do not match",
      "user": "User",
      "created": "created!",
      "registerUnsuccessful": "Register unsuccessful",
      "welcome1": "One stop real time communicator for the diversed multi-lingual environment.",
      "welcome2": "We will be your voice.",
      "portal": "portal"
  },
  message:'',
  ghosting:'',
  command:'',
  test: "",
  },
  action
) => {
  switch (action.type) {
    case "RESET_THOUGHTS":
      return { ...state2, thoughts: [] };
    case "SET_THOUGHTS":
      return { ...state2, thoughts: action.payload };
    case "GET_10_THOUGHTS":
      return { ...state2, thoughts: [...action.payload, ...state2.thoughts] };
    case "CREATE_THOUGHT":
      let newState = {
        ...state2,
        thoughts: [...state2.thoughts, action.payload.newThought],
      };
      let indexOfGrp = newState.groups
        .map((grp) => grp._id)
        .indexOf(action.payload.g_id);
      newState.groups[indexOfGrp].thoughts.push(action.payload.newThought._id);
      return newState;
    case "DELETE_THOUGHT":
      state2.thoughts = state2.thoughts.filter(
        (thought) => thought._id !== action.payload.t_id
      );
      let indexOfGrp2 = state2.groups
        .map((grp) => grp._id)
        .indexOf(action.payload.g_id);
      state2.groups[indexOfGrp2].thoughts = state2.groups[
        indexOfGrp2
      ].thoughts.filter((t_id) => t_id !== action.payload.t_id);
      return {...state2};
    case "EDIT_THOUGHT":
      let indexOfThought = state2.thoughts.map((thought) => thought._id).indexOf(action.payload._id);
      state2.thoughts[indexOfThought].message=action.payload.message
      return {
        ...state2
      };
    case "CREATE_USER_GROUP":
      return {
        ...state2,
        user: {
          ...state2.user,
          groups: [...state2.user.groups, action.payload],
        },
      };
    case "SET_GROUPS":
      return { ...state2, groups: action.payload };
    case "UPDATE_GROUPS":
      return { ...state2, groups: [...state2.groups, action.payload] };
    case "SET_GROUP":
      return { ...state2, group: action.payload };
    case "LEAVE_GROUP":
      return { ...state2, groups: state2.groups.filter(group=>group._id!==action.payload) };
    case "SET_USER":
      return { ...state2, user: action.payload };
    case "LOGIN":
      return { ...state2, user: action.payload.user, groups:action.payload.groups };
    case "SET_MESSAGE":
      return { ...state2, message: action.payload };
    case "SET_GHOSTING":
      return { ...state2, ghosting: action.payload };
    case "SET_BROWSER_LANGUAGE":
      let needed = languageInfo.find(languageArray=>languageArray[1]===action.payload.languageCode)
      return { ...state2, browserLanguageCode: action.payload.languageCode, browserLanguage: needed[2], interfaceStrings: needed[3], browserFlag: needed[4]};
    case "SET_INTERFACE_STRINGS":
      return { ...state2, interfaceStrings: action.payload };
    case "SET_COMMAND":
      return { ...state2, command: action.payload };
    case "CLEAR_STATE":
      return { ...state2, user: {   _id: "", fullName: "", nickname: "", language: "" },thoughts: [],groups: [],group: {_id: "",title: "",participants: [],thoughts: [],creator: ""}, ghosting:'' };
    case "TEST":
      return { ...state2, test: action.payload };
    default:
      return state2;
  }
};

const url = "http://localhost:5000/";

export const resetThoughts = () => async (dispatch) => {
  try {
    dispatch({ type: "RESET_THOUGHTS" });
  } catch (error) {
    console.log(error.message);
  }
};

export const getThoughts = (getInfo) => async (dispatch) => {
  try {
    const { data } = await axios.get(url + "portal/thoughts/" + getInfo.g_id + '/' + JSON.stringify(getInfo.languages) );
    dispatch({
      type: "SET_THOUGHTS",
      payload: data.thoughts[0].map((thing) => thing),
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const get10Thoughts = (thoughts) => async (dispatch) => {
  try {
    const data = mockData.thoughts
      .filter((thought) => thoughts.includes(thought._id))
      .sort((a, b) => a.createdAt - b.createdAt);
    //const {data} = await axios.get(url+'thought/array/'+thoughts)
    dispatch({ type: "GET_10_THOUGHTS", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createThought = (thoughtData) => async (dispatch) => {
  try {
    //given {g_id, thought:{_id, message, language, creator, creatorNickName}}, this route should add a thought to the database, and then add that thought's _id property to it's group's thoughts array.
    const newThought = await axios.post(url + "portal/" + "shane", thoughtData);
    dispatch({
      type: "CREATE_THOUGHT",
      payload: { newThought: newThought.data, g_id: thoughtData.g_id },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteThought = (deleteData) => async (dispatch) => {
  try {
    console.log(deleteData);
    const thingyy = await axios.post(url + "portal/deleteThought/", 
      deleteData
    );
    //given {t_id, u_id, g_id}
    dispatch({ type: "DELETE_THOUGHT", payload: deleteData });
  } catch (error) {
    console.log(error);
  }
};

export const editThought = (editData) => async (dispatch) => {
  try {
    //given {newMessage, t_id, u_id}
    const thingyy = await axios.put(url + "thought/", {
      _id: editData.t_id,
      thoughtToUpdate: { translations:[editData.newTranslation] },
    });
    dispatch({ type: "EDIT_THOUGHT", payload: thingyy.data });
  } catch (error) {
    console.log(error);
  }
};

export const createGrp = (grpData) => async (dispatch) => {
  try {
    //given {u_id, title} this route should add the new grp to the database and the user object
    const {data} = await axios.post(url + "portal/group", {
      title: grpData.title,
      u_id: grpData.u_id,
    });
    dispatch({ type: "UPDATE_GROUPS", payload: data });
    dispatch({ type: "SET_GROUP", payload: data });
    return data
  } catch (error) {
    console.log(error);
  }
};

export const invite = (inviteData) => async (dispatch) => {
  try {
    //{u_id, g_id}.
    const results = await axios.get(url + "portal/invite/" + inviteData.g_id);
    dispatch({
      type: "CREATE_THOUGHT",
      payload: { g_id: inviteData.g_id, newThought: results.data.thoughts[0] },
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const joinGrp = (joinData) => async (dispatch) => {
  try {
    //given {code, u_id}, find the group in the database and verify the code
    const data = await axios.get(
      url + "portal/join/" + joinData.fullCode + "/" + joinData.u_id
    );
    dispatch({ type: "UPDATE_GROUPS", payload: data.data.groups[0] });
    dispatch({ type: "SET_GROUP", payload: data.data.groups[0] });
    return data
  } catch (error) {
    console.log(error.message);
  }
};

export const leaveGroup = (leaveData) => async (dispatch) => {
  try {
    //given {code, u_id}, find the group in the database and verify the code
    const { data } = await axios.put(url + "portal/leave/group", leaveData)
    console.log(data.groups[0]._id )
    dispatch({ type: "LEAVE_GROUP", payload: data.groups[0]._id });
  } catch (error) {
    console.log(error.message);
  }
};

//this function is of no use to anyone besides the developer.
export const getGrps = (groups) => async (dispatch) => {
  try {
    const data = mockData.groups.filter((grp) => groups.includes(grp._id));
    //const {data} = await axios.get(url+'group')

    dispatch({ type: "SET_GROUPS", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const setGrp = (group) => async (dispatch) => {
  try {
    dispatch({ type: "SET_GROUP", payload: group });
  } catch (error) {
    console.log(error.message);
  }
};

export const login = (input) => async (dispatch) => {
  try {
    //given {username, password}
    const thingyy = await axios.get(
      url + "portal/login/" + input.nickname + "/" + input.password
    );
    dispatch({ type: "LOGIN", payload: {user:thingyy.data.users[0], groups: thingyy.data.groups} });
    return thingyy.data
  } catch (error) {
    console.log(error);
  }
};

export const register = (data) => async (dispatch) => {
  try {
    let newData={
      "nickname": data.nickname,
      "language": data.language,
      "fullName": data.firstName+" "+data.lastName,
      "password": data.password,
  }
      const registerResult = await axios.post(url + "user/", newData);
      return (registerResult.data)
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = (input) => async (dispatch) => {
  try {
    //#region -----------------ROUTE NEEDED------------------------------------------------
    //given {u_id, password, newPassword newPassword2}, this route should check that newPassowrd and newPassword2 are equal and valid passwords.
    //after that, it should check if password === the user password in the database. if it does, change the users password to newPassword.
    //this result should return only a successful code or an error. no further info is needed.
    //#endregion -----------------ROUTE NEEDED------------------------------------------------
    //a dispatch may be needed here to provide the user with a status on how the request turned out. this functionality is essential, but I'm not sure if a dispatch is the best way to do it.
  } catch (error) {
    console.log(error);
  }
};

export const changeUserLanguage = (input) => async (dispatch) => {
  //given {u_id:idValue, userPutter:{language:languageValue}}
  try {
    const {data} = await axios.put(url + "user/" + input.u_id, input);
    dispatch({ type: "SET_USER", payload: data});
  } catch (error) {
    console.log(error);
  }
};

export const setStateMessage = (string) => async (dispatch) => {
  try {
    dispatch({ type: "SET_MESSAGE", payload: string});
  } catch (error) {
    console.log(error);
  }
};

export const setGhosting = (string) => async (dispatch) => {
  try {
    dispatch({ type: "SET_GHOSTING", payload: string});
  } catch (error) {
    console.log(error);
  }
};

export const setBrowserLanguage = (languageInfo) => async (dispatch) => {
  try {
    dispatch({ type: "SET_BROWSER_LANGUAGE", payload: languageInfo });
  } catch (error) {
    console.log(error);
  }
};

export const clearState = () => async (dispatch) => {
  try {
    dispatch({ type: "CLEAR_STATE" });
  } catch (error) {
    console.log(error);
  }
};

export const setCommand = (commandString) => async (dispatch) => {
  try {
    dispatch({ type: "SET_COMMAND", payload: commandString });
  } catch (error) {
    console.log(error.message);
  }
};

export const test = () => async (dispatch) => {
  try {
    let thing ={u_id:"61e21c9d4f3bb4083d03577f",g_id:"61e21cae4f3bb4083d035782"}
    const { data } = await axios.put(url + "portal/leave/group", thing)
    dispatch({ type: "TEST", payload: data.groups[0]._id });
  } catch (error) {
    console.log(error);
  }
};

export const thing = combineReducers({
  state,
});
