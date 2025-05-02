import { useEffect, useState } from "react";

export default function Sidebar({ onSelectFriend, selectedFriend }) {
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const AI_USER = {
    fullName: 'embeddedAIByConnectee',
    nickname: 'embeddedAIByConnectee',
    isAI: true
  };


  useEffect(() => {
    fetchFriends();
    fetchFriendRequests();
  }, []);


  const fetchFriends = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/user/friend-list", {
        credentials: "include",
      });
      const apiFriends = res.ok ? await res.json() : [];
    // Gộp AI_USER vào đầu danh sách
    setFriends([AI_USER, ...apiFriends]);
    } catch {
      setFriends([]);
    } finally {
      setLoadingFriends(false);
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/user/get-friend-request", {
        credentials: "include",
      });
      setFriendRequests(res.ok ? await res.json() : []);
    } catch {
      setFriendRequests([]);
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    if (searchInput.trim() === "") {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchSearch();
    }, 300); // debounce 300ms

    return () => clearTimeout(timer);
  }, [searchInput]);

  const fetchSearch = async () => {
    setSearchLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/api/user/find-friend?input=${encodeURIComponent(
          searchInput
        )}`,
        {
          credentials: "include",
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Lỗi tìm kiếm bạn bè:", error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const sendFriendRequest = async (nickName) => {
    try {
      console.log(nickName);

      const res = await fetch(
        `http://localhost:8080/api/user/send-friend-request?nickname=${encodeURIComponent(
          nickName
        )}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (res.ok) {
        alert(`Đã gửi lời mời kết bạn tới @${nickName}`);
      } else {
        console.error(res.status);
        alert("Gửi lời mời thất bại");
      }
    } catch (error) {
      console.error("Lỗi gửi lời mời:", error);
    }
  };

  const acceptFriendRequest = async (nickName) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/user/accept-friend-request?nickname=${encodeURIComponent(
          nickName
        )}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (res.ok) {
        alert(`Đã chấp nhận @${nickName}`);
        fetchFriends(); // reload lại danh sách bạn bè
        fetchFriendRequests(); // reload lại danh sách lời mời
      } else {
        alert("Chấp nhận thất bại");
      }
    } catch (error) {
      console.error("Lỗi chấp nhận kết bạn:", error);
    }
  };


  // Lấy chữ cái đầu của từ cuối cùng trong nickname
  const getAvatarLetter = (nickname) => {
    if (!nickname) return "?";
    if(nickname === "embeddedAIByConnectee") return "AI";
    const parts = nickname.trim().split(" ");
    return parts[parts.length - 1][0]?.toUpperCase() || "?";
  };

  const getFullName = (fullName) => {
    if(fullName === "embeddedAIByConnectee") return "Gemini"
    return fullName
  }

  const getNickame = (nickname) => {
    if(nickname === "embeddedAIByConnectee") return "Gemini"
    return nickname
  }

  return (
    <div className=" w-md bg-white flex flex-col border-r border-gray-300 h-screen">
      {/* Header & Search */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold text-lg">Connectee</div>
          <i className="ri-menu-line text-xl text-gray-600 hover:text-blue-600 cursor-pointer" />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm bạn bè"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          {searchInput.trim() !== "" && (
            <div className="absolute w-full bg-white shadow-lg rounded-lg mt-2 max-h-60 overflow-y-auto z-10">
              {searchLoading ? (
                <div className="p-4 text-gray-500">Đang tìm kiếm...</div>
              ) : searchResults.length === 0 ? (
                <div className="p-4 text-gray-500">
                  Không tìm thấy bạn bè nào.
                </div>
              ) : (
                searchResults.map((u) => (
                  <div
                    key={u.nickname}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
                    // onClick={() => onSelectFriend(u)}
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 text-blue-500 font-bold">
                      {getLastWordFirstChar(u.fullName)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{u.fullName}</div>
                      <div className="text-sm text-gray-500">@{u.nickname}</div>
                    </div>
                    <button
                      className="text-sm text-green-500 hover:underline ml-2"
                      onClick={() => sendFriendRequest(u.nickname)}
                    >
                      Kết bạn
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bạn bè */}
      <div className="flex-1 overflow-y-auto border-b border-gray-200">
        <div className="p-2 font-semibold">Bạn bè</div>
        {loadingFriends ? (
          <div className="p-4 text-gray-500">Đang tải danh sách...</div>
        ) : friends.length === 0 ? (
          <div className="p-4 text-gray-500">Bạn chưa có bạn bè nào.</div>
        ) : (
          friends.map((f) => (
            <div
              key={f.nickname}
              onClick={() => onSelectFriend(f)}
              className={`flex items-center px-4 py-3 rounded-xl hover:bg-blue-50 cursor-pointer border-b last:border-none ${
                selectedFriend?.nickname === f.nickname ? "bg-blue-100" : ""
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3 text-blue-600 font-bold">
                {getAvatarLetter(f.fullName)}
              </div>
              <div className="flex-1">
                <div className="font-medium">{getFullName(f.fullName)}</div>
                <div className="text-sm text-gray-500 truncate">
                  @{getNickame(f.nickname)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Lời mời kết bạn */}
      <div className="h-64 overflow-y-auto">
        <div className="p-2 font-semibold">Lời mời kết bạn</div>
        {loadingRequests ? (
          <div className="p-4 text-gray-500">Đang tải lời mời...</div>
        ) : friendRequests.length === 0 ? (
          <div className="p-4 text-gray-500">Không có lời mời nào.</div>
        ) : (
          friendRequests.map((r) => (
            <div
              key={r.nickname}
              className="flex items-center px-4 py-3 hover:bg-gray-100 border-b last:border-none"
            >
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3 text-blue-500 font-bold">
                {getLastWordFirstChar(r.fullName)}
              </div>
              <div className="flex-1">
                <div className="font-medium">{r.fullName}</div>
                <div className="text-sm text-gray-500 truncate">
                  @{r.nickname}
                </div>
              </div>
              <button
                className="text-sm text-green-500 hover:underline ml-2"
                onClick={() => acceptFriendRequest(r.nickname)}
              >
                Chấp nhận
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Hàm lấy ký tự đầu của từ cuối cùng trong fullName
function getLastWordFirstChar(fullName) {
  if (!fullName) return "?";
  const words = fullName.trim().split(" ");
  return words[words.length - 1].charAt(0).toUpperCase();
}
