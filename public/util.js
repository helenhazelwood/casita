const key = process.env.API_KEY

const readImage = () => {
  const preview = document.querySelector('img')
  const file = document.querySelector('input[type="file"]').files[0]
  const reader = new FileReader()

  reader.addEventListener(
    'load',
    function() {
      preview.src = reader.result
    },
    false
  )

  if (file) {
    reader.readAsDataURL(file)
  }
}

module.exports = {
  readImage
}
