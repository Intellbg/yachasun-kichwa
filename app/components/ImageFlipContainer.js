import ImageFlipCard from './ImageFlipCard';
import authFetch from '../api/authFetch'
import { WORDS_ENDPOINT } from "../../constants"

const ImageFlipContainer = async ({ lecture,sort='kichwa', tag="" }) => {
  var url = `${WORDS_ENDPOINT}?lecture=${lecture}&sortOrder=asc&sort=${sort}`
  if (tag){ url+=`&tags=${tag}`}
  const data = await authFetch(url, { cache: 'no-store', method: "GET" })
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return (
    <div className='container d-inline-flex py-2'>
      <div className='row justify-content-center '>
        {data.map((word) => (
          <div className='col-sm-3 my-4' key={word.id} >
            <ImageFlipCard
              key={word.id}
              img={"/img/downloads/"+word.english+'.jpg'}
              front={word.kichwa}
              back={word.spanish}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageFlipContainer;
