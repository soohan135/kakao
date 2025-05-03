import { getMovieDetail, searchMovie, getMoiveLikeList, addMovieLikeList} from './getAPI.js';

// 검색
document.getElementById("search_submit").addEventListener("click", async function (event) {
  event.preventDefault();
  const search = document.getElementById("search").value;
  const results = await searchMovie(search);

  const cardsHTML = results.map(movie => {

    const id = movie.id;
    const title = movie.title;
    const poster = movie.poster_path;
    const overview = movie.overview;
    const release_date = movie.release_date;

    return `
      <div class="card mb-3" style="max-width: 540px;" id="movie_card">
        <div class="row g-0" id="card">
          <div class="col-md-4">
            <img src="https://image.tmdb.org/t/p/w200/${poster}" class="img-fluid rounded-start" alt="${title}"
              id="poster_image">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <div id="titleandBTN">
                <h5 class="card-title" id="card_title">${title}</h5>
                <button class="likeListBTN" data-id="${id}">즐겨찾기에 추가</button>
                <button class="openModalBtn" data-id="${id}"><strong>+</strong></button>
              </div>
              <p class="card-text"><small class="text-body-secondary" id="release_date">${release_date}</small></p>
              <p class="card-text" id="overview">${overview}</p>
            </div>
          </div>
        </div>
      </div>
      `;
  }).join('');
  document.getElementById('movie_ul').innerHTML = cardsHTML;
});


// 즐겨찾기에 추가

document.getElementById('movie_ul').addEventListener('click', async function (e) {
  if (e.target.classList.contains('likeListBTN')) {
    const movieId = e.target.dataset.id;
    const card = e.target.closest('#movie_card');

    let title = card.querySelector('#card_title').innerText;
    let poster = card.querySelector('#poster_image').src.split('/w200')[1];
    let overview = card.querySelector('#overview').innerText;
    let release_date = card.querySelector('#release_date').innerText;

    let doc = {
      'movieId': movieId,
      'title': title,
      'poster': poster,
      'overview': overview,
      'release_date': release_date
    }
    await addMovieLikeList(doc);
  }
});

// 즐겨찾기 출력

document.getElementById("movie_like_list_btn").addEventListener("click", async function (event) {
  const querySnapshot = await getMoiveLikeList()
  const cardsHTML = querySnapshot.docs.map(doc  => {
    const movie = doc .data();
    
    const id = movie.movieId;
    const title = movie.title;
    const poster = movie.poster;
    const overview = movie.overview;
    const release_date = movie.release_date;

    return `
      <div class="card mb-3" style="max-width: 540px;" id="movie_card">
        <div class="row g-0" id="card">
          <div class="col-md-4">
            <img src="https://image.tmdb.org/t/p/w200${poster}" class="img-fluid rounded-start" alt="${title}"
              id="poster_image">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <div id="titleandBTN">
                <h5 class="card-title" id="card_title">${title}</h5>
                <button class="likeListBTN" data-id="${id}">즐겨찾기에 추가</button>
                <button class="openModalBtn" data-id="${id}"><strong>+</strong></button>
              </div>
              <p class="card-text"><small class="text-body-secondary" id="release_date">${release_date}</small></p>
              <p class="card-text" id="overview">${overview}</p>
            </div>
          </div>
        </div>
      </div>
      `;
  }).join('');
  document.getElementById('movie_ul').innerHTML = cardsHTML;
});

// 모달

const openModalBtn = document.getElementById('openModalBtn');
const closeModal = document.getElementById('closeModal');
const movieModal = document.getElementById('movieModal');

document.getElementById('movie_ul').addEventListener('click', async function (e) {
  if (e.target.classList.contains('openModalBtn')) {
    const movieId = e.target.dataset.id;
    const movie_detail = await getMovieDetail(movieId);

    const modal_title = movie_detail.title;
    const moadal_poster = movie_detail.poster_path;
    const modal_overview = movie_detail.overview;
    const modal_release_date = movie_detail.release_date;
    const modal_vote_average = movie_detail.vote_average;
    const modal_vote_count = movie_detail.vote_count;

    document.getElementById('modalTitle').innerHTML = `${modal_title}`
    document.getElementById('modal_body').innerHTML = `
      <div><img src="https://image.tmdb.org/t/p/w200/${moadal_poster}" alt="" id="modal_poster_minage">
      <p>${modal_release_date}</p>
      <P>평점: ${modal_vote_average}</P>
      <P>투표수: ${modal_vote_count}</P></div>
      <p>${modal_overview}</p>
    `
    document.getElementById('movieModal').style.display = 'flex';
  }
});

// 모달 닫기 버튼
document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('movieModal').style.display = 'none';
});

// 모달  닫기
window.addEventListener('click', (e) => {
  const modal = document.getElementById('movieModal');
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});
