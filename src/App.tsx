import { useEffect, useState } from 'react';

import { Header } from './components/Header';
import { Content } from './components/Content';
import { SideBar, GenreResponseProps } from './components/SideBar';

import { api } from './services/api';

import './styles/global.scss';
import './styles/sidebar.scss';
import './styles/content.scss';


export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  const handleClickButton = (id: number) => {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        handleClickButton={handleClickButton}
        selectedGenreId={selectedGenreId}
        genres={genres}
      />

      <div className="container">
        <Header selectedGenre={selectedGenre} />

        <main>
          <Content selectedGenreId={selectedGenreId} />
        </main>
      </div>
    </div >
  )
}