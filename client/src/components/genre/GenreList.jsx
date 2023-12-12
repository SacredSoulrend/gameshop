import styled from 'styled-components';
import Api from '../../Api';
import { useEffect } from 'react';

const GenreList = () => {
  useEffect(()=>{
    getGenreList()
  },[])
  const getGenreList=()=>{
    Api.getGenreList.then((resp)=> {
      console.log(resp.data.results);
    })
  }
  return (
    <GenreListWrapper>
    </GenreListWrapper>
  )
}

export default GenreList

const GenreListWrapper = styled.div`
  div:has(.section-btn){
    margin-top: 60px;
  }
`;