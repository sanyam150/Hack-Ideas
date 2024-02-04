export const challengesInformation = {
  getAllChalleneges: function () {
    if (localStorage.getItem("challenges"))
      return JSON.parse(localStorage.getItem("challenges")) || [];
  },
  getChallengeById: function (id) {
    let isChallengeFound = false;
    const getAllChalleneges = this.getAllChalleneges();
    getAllChalleneges &&
      getAllChalleneges.map((challenge) => {
        if (challenge.id === id) {
          isChallengeFound = true;
          return true;
        } else return false;
      });
    return isChallengeFound;
  },
  getStandardTime: function (time) {
    let updatedTime = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(time);
    return updatedTime;
  },
  sortingChallenge: function (challenges, criteria, state) {
    const sortedChallenges = [...challenges].sort((a, b) => {
      let valueA = a[criteria];
      let valueB = b[criteria];

      // Handle array criteria
      if (Array.isArray(valueA)) {
        valueA = valueA.length;
      }
      if (Array.isArray(valueB)) {
        valueB = valueB.length;
      }
      return state ? valueA - valueB : valueB - valueA;
    });
    return sortedChallenges;
  },
};
