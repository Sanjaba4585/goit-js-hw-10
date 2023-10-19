import axios from 'axios';
const URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_Utq0hlMivbHo39VL70zl84zHokxz90UZKgltekVoHuKpuxSnkDAmT7xUyS5OqyVj';
axios.defaults.headers.common['x-api-key'] = API_KEY;

function searchCats() {
  const BREEDS_URL = `${URL}breeds`;
  return axios.get(`${BREEDS_URL}`).then(resp => {
    if (resp.status !== 200) {
      throw new Error(resp.status);
    }
    return resp.data;
  });
}
function fetchCatByBreed(breedId) {
  const IMG_URL = `${URL}images/search`;
  const params = new URLSearchParams({
    breed_ids: breedId,
  });
  return axios.get(`${IMG_URL}?${params}`).then(resp => {
    if (resp.status !== 200) {
      throw new Error(res.status);
    }
    return resp.data[0];
  });
}

export { searchCats, fetchCatByBreed };
