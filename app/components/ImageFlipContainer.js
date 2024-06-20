import ImageFlipCard from './ImageFlipCard';
import authFetch from '../api/authFetch'
import { WORDS_ENDPOINT } from "../../constants"

const ImageFlipContainer = async ({ lecture }) => {
  const data = await authFetch(`${WORDS_ENDPOINT}?lecture=${lecture}&sortOrder=asc`, { cache: 'no-store', method: "GET" })
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return (
    <div className='container d-inline-flex py-2'>
      <div className='row justify-content-center '>
        {data.map((word) => (
          <div className='col-sm-3 my-4' key={word.id} >
            <ImageFlipCard
              img={word.image}
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
