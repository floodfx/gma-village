
const CLOUD_BUCKET = "gma-village-public-assets"

const imgUrl = (gma) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/gma/gma_${gma.first_name.toLowerCase()}.jpg`;
}

export default imgUrl
