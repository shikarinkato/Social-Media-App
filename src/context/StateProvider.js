import { createContext, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserIcon from "../assests/img/userIcon.png";

export const Context = createContext();
let serverUrl;
serverUrl = "https://social-media-backend-6mz4.onrender.com";
// serverUrl = "http://localhost:5000/api/v1";

export function StateProvider({ children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [searchedUserPosts, setSearchedUserPosts] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchedUser, setSearchedUser] = useState("");

  async function createAccount(name, username, email, password, bio, pic) {
    setLoading(true);

    try {
      if (!name || !username || !email || !password || !bio) {
        setLoading(false);
        toast.error("Required Fields are Missing", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
        if (!pic) {
          pic = UserIcon;
        }
      } else {
        let res = await fetch(`${serverUrl}/user/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            userName: username,
            email,
            password,
            bio,
            pic,
          }),
        });
        let data = await res.json();
        if (res.ok) {
          setLoading(false);
          navigate("/login");
          toast.success(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (res.status === 401) {
          navigate("/login");
          setLoading(false);
          toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          setLoading(false);
          toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  }

  async function GetIn(emailOrusername, password) {
    setLoading(true);

    try {
      if (!emailOrusername || !password) {
        setLoading(false);
        toast.error("Required Fields are Missing", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        let res = await fetch(`${serverUrl}/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailOrusername,
            password,
          }),
        });
        let data = await res.json();
        if (res.ok) {
          setIsAuthenticated(true);
          sessionStorage.setItem("token", JSON.stringify(data.token));
          sessionStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
          setLoading(false);
          navigate("/");
          toast.success(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (res.status === 401) {
          toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          setLoading(false);
          toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  }

  let GetUser = useCallback(async function () {
    setLoading(true);
    let token = JSON.parse(sessionStorage.getItem("token"));
    try {
      let res = await fetch(`${serverUrl}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await res.json();
      if (data.success === true) {
        setIsAuthenticated(true);
        setUser(data.user);
        setLoading(false);
        toast.success(data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (res.status === 401) {
        setLoading(false);
        toast.error(data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        setLoading(false);
        toast.error(data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  let FetchGlobalPosts = useCallback(async function () {
    setLoading(true);
    try {
      let res = await fetch(`${serverUrl}/posts/global`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      if (data.success === true) {
        setLoading(false);
        setPosts(data.totalPosts);
        toast.success(data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        setLoading(false);
        throw new Error(data.message);
        // toast.error(data.message, {
        //   position: "top-center",
        //   autoClose: 2000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   progress: undefined,
        //   theme: "dark",
        // });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  async function createPost(img, interactions, postCaption) {
    setLoading(true);
    let token = JSON.parse(sessionStorage.getItem("token"));
    try {
      if (!interactions) {
        setLoading(false);
        toast.error("Required Fields are Missing", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        let res = await fetch(`${serverUrl}/posts/add`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            img,
            interactions,
            postCaption,
          }),
        });
        let data = await res.json();
        if (res.ok) {
          setLoading(false);
          toast.success(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (res.status === 401) {
          setLoading(false);
          toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          setLoading(false);
          toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  }

  let GetUserPosts = useCallback(async function (userid) {
    setLoading(true);
    let token = JSON.parse(sessionStorage.getItem("token"));
    try {
      if (!userid) {
        setLoading(false);
        toast.error("Required Fields are Missing", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        let res = await fetch(`${serverUrl}/posts/user/${userid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        let data = await res.json();
        if (res.ok) {
          setLoading(false);
          setUserPosts(data.updatedPostsArr);
          toast.success(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (res.status === 401) {
          setLoading(false);
          toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          setLoading(false);
          // toast.error(data.message, {
          //   position: "top-center",
          //   autoClose: 2000,
          //   hideProgressBar: false,
          //   closeOnClick: true,
          //   progress: undefined,
          //   theme: "dark",
          // });
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  async function SearchUser(query) {
    setLoading(true);
    try {
      if (!query) {
        setLoading(false);
        toast.error("Required Fields are Missing", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        let res = await fetch(`${serverUrl}/user/search?user=${query}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        let data = await res.json();
        if (data.success === true) {
          setLoading(false);
          setSearchedUsers(data.searchedUsers);
          toast.success(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (res.status === 401) {
          setLoading(false);
          toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          setLoading(false);
          toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  }

  let GetSearchedUser = useCallback(async function (userId) {
    setLoading(true);
    try {
      if (!userId) {
        toast.error("Required Fields are Missing", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        let res = await fetch(`${serverUrl}/user/search/get?id=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        let data = await res.json();
        if (data.success === true) {
          setLoading(false);
          setSearchedUser(data.searchedUser);
          setSearchedUserPosts(data.searchedUser.userPosts);
          toast.success(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (res.status === 401) {
          setLoading(false);
          toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          setLoading(false);
          toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  async function ChangeFollowings(anotherUser, action, pic) {
    setLoading(true);
    console.log(anotherUser);
    let token = JSON.parse(sessionStorage.getItem("token"));
    try {
      if (!anotherUser || !action || !pic) {
        setLoading(false);
        toast.error("Required Fields are Missing", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        let res = await fetch(`${serverUrl}/user/followings`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            anotherUser,
            action,
            pic,
          }),
        });
        let data = await res.json();
        if (res.ok) {
          setLoading(false);
          toast.success(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (res.status === 401) {
          setLoading(false);
          toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          setLoading(false);
          toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  }

  async function ChangeLikes(action, postId, userId, byUser) {
    setLoading(true);
    let token = JSON.parse(sessionStorage.getItem("token"));
    try {
      if (!action || !postId || !userId || !byUser) {
        setLoading(false);
        toast.error("Required Fields are Missing", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        let res = await fetch(`${serverUrl}/interactions/like`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            action,
            postId,
            userId,
            byUser,
          }),
        });
        let data = await res.json();
        if (res.ok) {
          setLoading(false);
          toast.success(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (res.status === 401) {
          toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  }

  async function AddComment(comment, postId, userId, anotherUser) {
    setLoading(true);
    let token = JSON.parse(sessionStorage.getItem("token"));
    try {
      if (!comment || !postId || !userId || !anotherUser) {
        setLoading(false);
        toast.error("Required Fields are Missing", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        let res = await fetch(`${serverUrl}/interactions/comment`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            comment,
            postId,
            userId,
            anotherUser,
          }),
        });
        let data = await res.json();
        if (res.ok) {
          setLoading(false);
          toast.success(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (res.status === 401) {
          toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  }

  async function DeletePost(postId) {
    setLoading(true);
    let token = JSON.parse(sessionStorage.getItem("token"));
    try {
      if (!postId) {
        setLoading(false);
        toast.error("Required Fields are Missing", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        let res = await fetch(`${serverUrl}/posts/${postId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        let data = await res.json();
        console.log(data);
        console.log(res);
        if (data.success === true) {
          setLoading(false);
          toast.success(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        } else if (res.status === 401) {
          setLoading(false);
          toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        } else {
          setLoading(false);
          toast.error(data.message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Context.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        posts,
        userPosts,
        searchedUsers,
        searchedUser,
        searchedUserPosts,
        setUser,
        setIsAuthenticated,
        setLoading,
        setUserPosts,
        setSearchedUsers,
        setSearchedUserPosts,
        createAccount,
        GetIn,
        GetUser,
        setPosts,
        FetchGlobalPosts,
        createPost,
        GetUserPosts,
        SearchUser,
        GetSearchedUser,
        ChangeFollowings,
        ChangeLikes,
        AddComment,
        DeletePost,
      }}
    >
      {children}
    </Context.Provider>
  );
}
