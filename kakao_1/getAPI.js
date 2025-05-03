// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const API = TMDB_API_KEY
const firebaseConfig = FirebaseConfig;

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const search_movie_options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API}`
  }
};

const get_moviedetail_by_id = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API}`
  }
}


export const searchMovie = (search) => {
  return (fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`, search_movie_options)
    .then(res => res.json())
    .then(data => data.results)
    .catch(err => console.error(err))
  )
}

export const getMovieDetail = (ID) => {
  return (fetch(`https://api.themoviedb.org/3/movie/${ID}?language=en-US`, get_moviedetail_by_id)
    .then(res => res.json())
    .then(data => data)
    .catch(err => console.error(err))
  )
}
export const getMoiveLikeList = () => {
  const querySnapshot = getDocs(collection(db, "movie_like_list"));
  return querySnapshot
}

export const addMovieLikeList = (doc) => {
  addDoc(collection(db, "movie_like_list"), doc);
}