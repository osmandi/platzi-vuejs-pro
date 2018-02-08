import platziMusicService from './platzi-music'

const trackService = {}

// La q es un estándar para query
trackService.search = function (q) {
  const type = 'track'

  return platziMusicService.get('/search', {
    params: {q, type}
  })
  .then(res => res.data)
}

export default trackService
