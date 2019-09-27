const key = process.env.API_KEY
const readImage = () => {
  // Be aware! We are handling only the first <input type="file" /> element
  // To avoid errors, it should be placed before this piece of code
  let input = document.querySelector('input[type=file]')

  // You will receive the Base64 value every time a user selects a file from his device
  // As an example I selected a one-pixel red dot GIF file from my computer
  input.onchange = function() {
    let file = input.files[0],
      reader = new FileReader()

    reader.onloadend = function() {
      // Since it contains the Data URI, we should remove the prefix and keep only Base64 string
      var b64 = reader.result.replace(/^data:.+;base64,/, '')
      console.log(b64) //-> "R0lGODdhAQABAPAAAP8AAAAAACwAAAAAAQABAAACAkQBADs="
    }

    reader.readAsDataURL(file)
  }
}
module.exports = {
  readImage
}
