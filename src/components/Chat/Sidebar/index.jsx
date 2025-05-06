import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import locales from "@/language/locales";

export default function Sidebar({
  onSelectFriend,
  onlineFriend,
  selectedFriend,
  lang,
  scrMode,
}) {
  const [appUser, setAppUser] = useState({});
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const nickname = localStorage.getItem("nickname");
  const navigate = useNavigate();

  const toggleDropdown = () => setOpen(!open);

  const AI_USER = {
    fullName: "embeddedAIByConnectee",
    nickname: "embeddedAIByConnectee",
    isAI: true,
  };

  useEffect(() => {
    fetchFullnameForAvatar();
    fetchFriends();
    fetchFriendRequests();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchFullnameForAvatar = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/user/get-appUser-by-nickname?nickname=` +
          localStorage.getItem("nickname"),
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setAppUser(res.data);
      }
    } catch (e) {
      alert(e);
      setAppUser({});
    }
  };

  const fetchFriends = async () => {
    try {
      const res = await fetch(`${API_URL}/api/user/friend-list`, {
        credentials: "include",
      });
      const apiFriends = res.ok ? await res.json() : [];
      setFriends([AI_USER, ...apiFriends]);
    } catch {
      setFriends([]);
    } finally {
      setLoadingFriends(false);
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/user/get-friend-request`,
        {
          credentials: "include",
        }
      );
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
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const fetchSearch = async () => {
    setSearchLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/user/find-friend?input=${encodeURIComponent(
          searchInput
        )}`,
        {
          credentials: "include",
        }
      );

      if (res.ok) {
        const data = await res.json();
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
      const res = await fetch(
        `${API_URL}/api/user/send-friend-request?nickname=${encodeURIComponent(
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
        `${API_URL}/api/user/accept-friend-request?nickname=${encodeURIComponent(
          nickName
        )}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (res.ok) {
        alert(`Đã chấp nhận @${nickName}`);
        fetchFriends();
        fetchFriendRequests();
      } else {
        alert("Chấp nhận thất bại");
      }
    } catch (error) {
      console.error("Lỗi chấp nhận kết bạn:", error);
    }
  };

  const getAvatarLetter = (nickname) => {
    if (!nickname) return "?";
    if (nickname === "embeddedAIByConnectee") return "AI";
    const parts = nickname.trim().split(" ");
    return parts[parts.length - 1][0]?.toUpperCase() || "?";
  };

  const getFullName = (fullName) => {
    if (fullName === "embeddedAIByConnectee") return "Gemini";
    return fullName;
  };

  const getNickame = (nickname) => {
    if (nickname === "embeddedAIByConnectee") return "Gemini";
    return nickname;
  };

  const handleMenuClick = () => {
    navigate("/settings");
  };

  const handleLogOut = async () => {
    try {
      await fetch(`${API_URL}/api/user/logout`, {
        method: "post",
        credentials: "include",
      });

      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className={`w-full flex flex-col h-screen border-r ${
        scrMode === "dark"
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-white text-black border-gray-300"
      }`}
    >
      {/* Header & Search */}
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold text-lg">Connectee</div>
          <div className="relative">
            <div
              onClick={toggleDropdown}
              className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg cursor-pointer"
            >
              {getAvatarLetter(appUser.fullName)}
            </div>

            {open && (
              <div
                ref={dropdownRef}
                className="absolute top-full mt-2 right-0 w-48 sm:w-60 shadow-xl rounded-xl p-3 sm:p-4 z-50 border"
                style={{
                  backgroundColor: scrMode === "dark" ? "#1f2937" : "#dbeafe",
                  borderColor: scrMode === "dark" ? "#4b5563" : "#bfdbfe",
                  color: scrMode === "dark" ? "#ffffff" : "#000000",
                }}
              >
                <div
                  className="text-sm mb-2"
                  style={{
                    color: scrMode === "dark" ? "#d1d5db" : "#374151",
                  }}
                >
                  <div className="font-semibold text-base sm:text-lg">
                    {appUser.fullName}
                  </div>
                  <div
                    style={{
                      color: scrMode === "dark" ? "#9ca3af" : "#6b7280",
                    }}
                  >
                    @{appUser.nickname}
                  </div>
                </div>

                <button
                  onClick={handleMenuClick}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                  style={{
                    color: "#2563eb",
                    backgroundColor:
                      scrMode === "dark" ? "transparent" : undefined,
                  }}
                >
                  ⚙️ {locales[lang].setting}
                </button>

                <button
                  onClick={handleLogOut}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                  style={{
                    color: "#dc2626",
                    backgroundColor:
                      scrMode === "dark" ? "transparent" : undefined,
                  }}
                >
                  🚪 {locales[lang].logOut}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder={locales[lang].findFriend}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={`w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
              scrMode === "dark"
                ? "bg-gray-800 text-white placeholder-gray-400"
                : "bg-gray-100 text-black"
            }`}
          />
          <i className="ri-search-line absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          {searchInput.trim() !== "" && (
            <div
              className={`absolute w-full shadow-lg rounded-lg mt-2 max-h-60 overflow-y-auto z-10 ${
                scrMode === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-black"
              }`}
            >
              {searchLoading ? (
                <div className="p-3 sm:p-4 text-gray-500">
                  {locales[lang].searching}
                </div>
              ) : searchResults.filter((u) => u.nickname !== nickname).length ===
                0 ? (
                <div className="p-3 sm:p-4 text-gray-500">
                  {locales[lang].noFriendFound}
                </div>
              ) : (
                searchResults
                  .filter((u) => u.nickname !== nickname)
                  .map((u) => {
                    const isFriend = friends.some(
                      (friend) => friend.nickname === u.nickname
                    );

                    return (
                      <div
                        key={u.nickname}
                        className={`flex items-center px-3 sm:px-4 py-2 cursor-pointer border-b ${
                          scrMode === "dark"
                            ? "bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                            : "bg-white text-black border-gray-200 hover:bg-gray-100"
                        }`}
                        onClick={() => onSelectFriend(u)}
                      >
                        <div
                          className={`w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2 sm:mr-3 text-blue-500 font-bold text-sm ${
                            scrMode === "dark"
                              ? "bg-gray-600 text-white"
                              : "bg-gray-200 text-blue-500"
                          }`}
                        >
                          {getLastWordFirstChar(u.fullName)}
                        </div>
                        <div className="flex-1">
                          <div
                            className={`font-medium text-sm ${
                              scrMode === "dark" ? "text-white" : "text-black"
                            }`}
                          >
                            {u.fullName}
                          </div>
                          <div
                            className={`text-xs ${
                              scrMode === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          >
                            @{u.nickname}
                          </div>
                        </div>
                        {isFriend ? (
                          <></>
                        ) : (
                          <button
                            className={`text-xs ${
                              scrMode === "dark"
                                ? "text-green-400"
                                : "text-green-500"
                            } hover:underline ml-2`}
                            onClick={(e) => {
                              e.stopPropagation();
                              sendFriendRequest(u.nickname);
                            }}
                          >
                            {locales[lang].addFriend}
                          </button>
                        )}
                      </div>
                    );
                  })
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bạn bè */}
      <div
        className={`flex-1 overflow-y-auto border-b transition ${
          scrMode === "dark" ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="p-3 font-semibold text-gray-700 dark:text-gray-200 text-sm">
          {locales[lang].friend}
        </div>
        {loadingFriends ? (
          <div className="p-3 sm:p-4 text-gray-500 dark:text-gray-400 text-sm">
            {locales[lang].loadingFriendList}
          </div>
        ) : friends.length === 0 ? (
          <div className="p-3 sm:p-4 text-gray-500 dark:text-gray-400 text-sm">
            {locales[lang].findNoFriends}
          </div>
        ) : (
          <div className="space-y-2 px-2 pb-3">
            {friends.map((f) => {
              const isSelected = selectedFriend?.nickname === f.nickname;
              const isAI =
                f.nickname === "embeddedAIByConnectee" &&
                f.fullName === "embeddedAIByConnectee";
              const isOnline = onlineFriend[f.nickname] === "true";

              return (
                <div
                  key={f.nickname}
                  onClick={() => onSelectFriend(f)}
                  className="flex items-center p-2 sm:p-3 rounded-2xl border shadow-sm cursor-pointer transition hover:opacity-90"
                  style={{
                    backgroundColor: isSelected
                      ? scrMode === "light"
                        ? "#dbeafe"
                        : "#1e40af80"
                      : scrMode === "light"
                      ? "#ffffff"
                      : "#1f2937",
                    borderColor: scrMode === "light" ? "#e5e7eb" : "#374151",
                  }}
                >
                  <div
                    className="w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center mr-2 sm:mr-3 font-bold"
                    style={{
                      backgroundColor:
                        scrMode === "light" ? "#d1d5db" : "#4b5563",
                      color: scrMode === "light" ? "#2563eb" : "#ffffff",
                    }}
                  >
                    {getAvatarLetter(f.fullName)}
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <div
                      className="font-medium text-sm"
                      style={{
                        color: scrMode === "light" ? "#1f2937" : "#f9fafb",
                      }}
                    >
                      {getFullName(f.fullName)}
                    </div>
                    {!isAI && (
                      <span className="inline-block w-2.5 h-2.5 rounded-full" style={{
                        backgroundColor: isOnline ? "#03AC03" : "transparent"
                      }} />
                    )}
                    <div
                      className="text-xs truncate"
                      style={{
                        color: scrMode === "light" ? "#6b7280" : "#d1d5db",
                      }}
                    >
                      @{getNickame(f.nickname)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lời mời kết bạn */}
      <div
        className={`h-48 sm:h-64 overflow-y-auto border-t-1 transition ${
          scrMode === "dark" ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="p-3 font-semibold text-gray-700 dark:text-gray-200 text-sm">
          {locales[lang].friendRequest}
        </div>
        {loadingRequests ? (
          <div className="p-3 sm:p-4 text-gray-500 dark:text-gray-400 text-sm">
            {locales[lang].loadingFriendRequest}
          </div>
        ) : friendRequests.length === 0 ? (
          <div className="p-3 sm:p-4 text-gray-500 dark:text-gray-400 text-sm">
            {locales[lang].noFriendRequest}
          </div>
        ) : (
          <div className="space-y-2 px-2 pb-3">
            {friendRequests.map((r) => (
              <div
                key={r.nickname}
                className="flex items-center p-2 sm:p-3 rounded-2xl border shadow-sm transition hover:bg-gray-50 dark:hover:bg-gray-700"
                style={{
                  backgroundColor:
                    scrMode === "dark" ? "#1f2937" : "#ffffff",
                  borderColor: scrMode === "light" ? "#e5e7eb" : "#374151",
                }}
              >
                <div
                  className="w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center mr-2 sm:mr-3 text-blue-500 font-bold"
                  style={{
                    backgroundColor:
                      scrMode === "dark" ? "#4b5563" : "#d1d5db",
                  }}
                >
                  {getLastWordFirstChar(r.fullName)}
                </div>
                <div className="flex-1">
                  <div
                    className="font-medium text-sm"
                    style={{
                      color: scrMode === "dark" ? "#f9fafb" : "#1f2937",
                    }}
                  >
                    {r.fullName}
                  </div>
                  <div
                    className="text-xs truncate"
                    style={{
                      color: scrMode === "dark" ? "#d1d5db" : "#6b7280",
                    }}
                  >
                    @{r.nickname}
                  </div>
                </div>
                <button
                  className="text-xs text-green-600 dark:text-green-400 hover:underline ml-2"
                  onClick={() => acceptFriendRequest(r.nickname)}
                >
                  {locales[lang].accept}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function getLastWordFirstChar(fullName) {
  if (!fullName) return "?";
  const words = fullName.trim().split(" ");
  return words[words.length - 1].charAt(0).toUpperCase();
}
